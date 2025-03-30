from fastapi import FastAPI, HTTPException, Request, BackgroundTasks, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any, Tuple
import os
from dotenv import load_dotenv
import tweepy
from newsapi import NewsApiClient
import openai
import requests
from datetime import datetime, timedelta
import time
import logging
import asyncio
import aiohttp
import aiofiles
from PIL import Image
import uuid
import random
import spacy

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Add this near the top with other environment variables
TWITTER_ENABLED = os.getenv("TWITTER_ENABLED", "false").lower() == "true"

# Initialize FastAPI app
app = FastAPI(
    title="Weird News X Generator",
    description="API for generating viral, funny headlines from weird news stories",
    version="1.0.0"
)

# Add middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Initialize API clients
newsapi = NewsApiClient(api_key=os.getenv('NEWS_API_KEY'))
openai.api_key = os.getenv('OPENAI_API_KEY')
client = tweepy.Client(
    consumer_key=os.getenv('TWITTER_API_KEY'),
    consumer_secret=os.getenv('TWITTER_API_SECRET'),
    access_token=os.getenv('TWITTER_ACCESS_TOKEN'),
    access_token_secret=os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
)

# Constants
CACHE_TTL = 300  # 5 minutes
RATE_LIMIT = 100  # requests per minute
RATE_LIMIT_WINDOW = 60  # seconds
MAX_MEDIA_FILES = 4
MAX_POLL_OPTIONS = 4
MAX_POLL_DURATION = 168  # hours
MAX_IMAGE_SIZE = (1920, 1080)
IMAGE_QUALITY = 85

# Cache and rate limiting storage
image_cache = {}
news_cache = {}
rate_limit_data = {}
polls_db = {}

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    logger.warning("Downloading spaCy model...")
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# Pydantic Models
class ImageSuggestion(BaseModel):
    url: str
    style: str
    headline: str

class NewsItem(BaseModel):
    title: str
    description: str
    url: str
    image_url: Optional[str] = None
    funny_headline: Optional[str] = None
    font_suggestions: Optional[List[str]] = None
    image_suggestions: Optional[List[ImageSuggestion]] = None
    tweet_id: Optional[str] = None

class EngagementStats(BaseModel):
    likes: int
    retweets: int
    replies: int
    impressions: int

class BotContext(BaseModel):
    currentHeadline: str
    currentImage: str
    engagement: Dict[str, Any]
    savedStories: List[Dict[str, Any]]
    postHistory: List[Dict[str, Any]]

class BotMessage(BaseModel):
    message: str
    context: BotContext

class NewsFilter(BaseModel):
    keywords: Optional[List[str]] = None
    categories: Optional[List[str]] = None
    regions: Optional[List[str]] = None
    time_range: Optional[str] = "24h"
    min_engagement: Optional[int] = 0
    exclude_keywords: Optional[List[str]] = None

class EngagementPrediction(BaseModel):
    predicted_likes: int
    predicted_retweets: int
    predicted_replies: int
    confidence_score: float
    viral_potential: str

class StoryPriority(BaseModel):
    breaking_news: bool
    viral_potential: float
    engagement_score: float
    freshness_score: float
    source_reliability: float
    total_score: float

class AutomatedFilter(BaseModel):
    min_viral_potential: float = 0.7
    min_engagement_score: float = 0.6
    min_freshness_score: float = 0.8
    preferred_sources: List[str] = []
    excluded_sources: List[str] = []
    keywords_boost: List[str] = []
    auto_post: bool = False
    auto_retry: bool = False
    max_retries: int = 3

class MediaUpload(BaseModel):
    file_type: str
    content: bytes
    description: Optional[str] = None

class Poll(BaseModel):
    options: List[str]
    duration_hours: int

class AnalyticsRequest(BaseModel):
    start_date: datetime
    end_date: datetime
    metrics: List[str]

class PostMetrics(BaseModel):
    post_id: str
    impressions: int
    likes: int
    retweets: int
    replies: int
    engagement_rate: float
    timestamp: datetime

# Knowledge base and patterns
BOT_KNOWLEDGE = {
    "headlines": ["Keep headlines under 280 characters", "Use emojis strategically", "Include numbers for better engagement"],
    "images": ["Choose high-contrast images", "Ensure text is readable", "Use bright, eye-catching colors"],
    "engagement": ["Post during peak hours", "Engage with replies", "Use call-to-actions"],
    "content": ["Keep it concise and clear", "Use active voice", "Include relevant hashtags"]
}

VIRAL_PATTERNS = {
    "high_engagement": [r"breaking", r"exclusive", r"shocking", r"unbelievable", r"mind-blowing"],
    "emotional_triggers": [r"heartbreaking", r"inspiring", r"amazing", r"incredible", r"outrageous"],
    "controversial_topics": [r"debate", r"controversy", r"scandal", r"investigation", r"exposed"],
    "emotional_amplifiers": [r"absolutely", r"literally", r"actually", r"seriously", r"honestly"],
    "internet_slang": [r"vibing", r"mood", r"energy", r"aesthetic", r"goals"],
    "meme_references": [r"plot twist", r"hold my", r"meanwhile", r"nobody:", r"literally nobody:"]
}

# Mappings
REGION_MAPPING = {"world": None, "us": "us", "uk": "gb", "europe": "eu", "asia": "as", "africa": "af", "latin_america": "la", "middle_east": "me"}
CATEGORY_MAPPING = {
    "weird": "weird OR bizarre OR strange OR unusual",
    "funny": "funny OR humorous OR hilarious OR comedy",
    "viral": "viral OR trending OR popular OR sensation",
    "breaking": "breaking OR urgent OR latest OR developing",
    "controversial": "controversial OR debate OR scandal OR investigation",
    "human_interest": "inspiring OR heartwarming OR touching OR emotional"
}

# Emoji mappings
EMOTIONAL_TONES = {
    "excited": ["🎉", "🚀", "⚡", "🔥", "💥"],
    "funny": ["😂", "🤣", "😅", "🤪", "😜"],
    "shocking": ["😱", "😮", "🤯", "😲", "🫢"],
    "heartwarming": ["❤️", "🥰", "💖", "💝", "🥺"],
    "mysterious": ["🕵️", "🤔", "🧐", "👀", "💭"],
    "silly": ["🤡", "🎪", "🎭", "🦄", "🌈"],
    "dramatic": ["🎭", "🎬", "🎪", "🎯", "🎨"]
}

FUN_EMOJI_COMBOS = {
    "excited": ["🎉 🎊 🎈", "🚀 ⚡️ 💥", "🎪 🎭 🎨"],
    "funny": ["😂 🤣 😅", "🤪 😜 😝", "🤡 🎪 🎭"],
    "shocking": ["😱 😮 🤯", "😲 😨 😰", "😳 😱 😨"],
    "heartwarming": ["❤️ 🥰 💖", "💝 💖 💕", "🥺 💖 💝"],
    "mysterious": ["🕵️ 🤔 🧐", "👀 💭 🤫", "🤔 🧐 🔍"],
    "silly": ["🤡 🎪 🎭", "🦄 🌈 🎨", "🎪 🎭 🎨"],
    "dramatic": ["🎭 🎪 🎯", "🎬 🎪 🎨", "🎭 🎯 🎪"]
}

EMOJI_REACTIONS = {
    "positive": ["👍", "👏", "🙌", "💪", "💯"],
    "surprise": ["😮", "😲", "😱", "🤯", "😨"],
    "funny": ["😂", "🤣", "😅", "😆", "😹"],
    "love": ["❤️", "🥰", "💖", "💝", "💕"],
    "thinking": ["🤔", "🧐", "💭", "🤫", "🤨"],
    "celebration": ["🎉", "🎊", "🎈", "🎪", "🎭"]
}

HEADLINE_TEMPLATES = [
    "OMG! You Won't BELIEVE What Happened When {subject} Tried To {action} 😱",
    "PLOT TWIST: {subject} Discovers {discovery} and It's Hilariously WILD! 🤪",
    "Stop Everything! This {subject} Just {action} and We're DYING 😂",
    "Breaking: {subject} Goes Completely Bonkers After {action} 🤯",
    "The Most RIDICULOUS {subject} Story You'll Read Today! 🎪"
]

# Helper functions
def check_rate_limit(request: Request) -> Tuple[bool, str]:
    client_ip = request.client.host
    current_time = time.time()
    
    if client_ip not in rate_limit_data:
        rate_limit_data[client_ip] = []
    
    rate_limit_data[client_ip] = [t for t in rate_limit_data[client_ip] if current_time - t < RATE_LIMIT_WINDOW]
    
    if len(rate_limit_data[client_ip]) >= RATE_LIMIT:
        return False, "Too many requests. Please try again later."
    
    rate_limit_data[client_ip].append(current_time)
    return True, ""

def cache_response(ttl: int = CACHE_TTL):
    def decorator(func):
        cache = {}
        async def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{str(args)}:{str(kwargs)}"
            if cache_key in cache:
                result, timestamp = cache[cache_key]
                if time.time() - timestamp < ttl:
                    return result
            result = await func(*args, **kwargs)
            cache[cache_key] = (result, time.time())
            return result
        return wrapper
    return decorator

# Main functions
async def generate_funny_variations(title: str, description: str) -> List[str]:
    try:
        variations = []
        for _ in range(5):
            prompt = f"""Create an absolutely hilarious, attention-grabbing headline for this news:
            Title: {title}
            Description: {description}

            Make it:
            1. SUPER engaging and shareable
            2. Use internet slang and modern expressions
            3. Include fun emoji combinations (2-3 emojis)
            4. Add unexpected twists
            5. Make it conversational and relatable
            6. Use humor and wit
            7. Create emotional impact
            8. Add viral-worthy elements
            9. Include reaction emojis
            10. Make it meme-worthy
            11. Keep it under 280 characters
            12. Make it unique and not template-based
            13. Use the actual story details creatively
            14. Add a touch of absurdity or exaggeration
            15. Make it feel like a viral social media post

            Examples of style:
            - "Local Cat's TikTok Dance Moves Have Scientists Questioning Physics 😱 😮 🤯"
            - "Grandma's Secret Recipe for World Peace: Just Add More Cats 🐱 🌍 ✨"
            - "Breaking: This Dog's Side Hustle Is More Successful Than My Career 🐕 💼 😭"
            - "Scientists Discover That Plants Have Been Gossiping About Us This Whole Time 🌱 🗣️ 🤫"
            - "Man Accidentally Invents Time Travel While Trying to Fix His Toaster ⏰ 🍞 🚀"
            
            Make it SUPER engaging but keep it tasteful and not clickbaity."""

            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a viral social media expert who creates hilarious, engaging headlines. You excel at finding humor in news stories and making them relatable and shareable."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.9,
                max_tokens=100
            )
            
            variation = response.choices[0].message.content.strip()
            variations.append(variation)
        
        return variations
    except Exception as e:
        logger.error(f"Error generating funny variations: {str(e)}")
        return [title]

def generate_wacky_headline(title: str, description: str) -> str:
    try:
        # Extract key elements for context
        doc = nlp(f"{title} {description}")
        subjects = [ent.text for ent in doc.ents if ent.label_ in ['PERSON', 'ORG', 'GPE', 'NORP']]
        verbs = [token.lemma_ for token in doc if token.pos_ == 'VERB']
        
        # Get story context
        subject = subjects[0] if subjects else "Someone"
        action = verbs[0] if verbs else "did something"
        
        # Select emotional tone and emojis
        tone = random.choice(list(EMOTIONAL_TONES.keys()))
        emoji_combo = random.choice(FUN_EMOJI_COMBOS[tone])
        
        # Create a dynamic prompt based on story elements
        prompt = f"""Create a hilarious, viral-worthy headline for this news:
        Title: {title}
        Description: {description}
        Main Subject: {subject}
        Main Action: {action}

        Make it:
        1. Unique and creative (no templates)
        2. Use the actual story details
        3. Add unexpected twists
        4. Make it relatable and funny
        5. Include modern internet slang
        6. Add a touch of absurdity
        7. Make it feel like a viral social media post
        8. Keep it under 280 characters
        9. Use these emojis naturally: {emoji_combo}

        Make it SUPER engaging but keep it tasteful and not clickbaity."""

        # Generate headline using OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a viral social media expert who creates hilarious, engaging headlines. You excel at finding humor in news stories and making them relatable and shareable."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.9,
            max_tokens=100
        )
        
        headline = response.choices[0].message.content.strip()
        
        # Add random reaction emoji if needed
        if random.random() > 0.5:
            reaction = random.choice(EMOJI_REACTIONS[random.choice(list(EMOJI_REACTIONS.keys()))])
            headline = f"{headline} {reaction}"
        
        return headline
    except Exception as e:
        logger.error(f"Error generating wacky headline: {str(e)}")
        return title

async def generate_image_background(headline: str, style: str) -> Optional[ImageSuggestion]:
    try:
        prompt = f"""Create a {style} illustration that captures the hilarious essence of this headline: {headline}
        Make it eye-catching, fun, and perfect for social media."""

        async with aiohttp.ClientSession() as session:
            async with session.post(
                "https://api.openai.com/v1/images/generations",
                headers={"Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}"},
                json={"prompt": prompt, "n": 1, "size": "1024x1024"}
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return ImageSuggestion(
                        url=data['data'][0]['url'],
                        style=style,
                        headline=headline
                    )
    except Exception as e:
        logger.error(f"Error generating image: {str(e)}")
    return None

@cache_response(ttl=3600)
async def generate_image_variations(headline: str) -> List[ImageSuggestion]:
    styles = [
        "funny cartoon style with exaggerated expressions",
        "meme-style illustration with bold colors",
        "satirical editorial cartoon style",
        "whimsical digital art with playful elements",
        "modern minimalist illustration"
    ]
    
    tasks = [generate_image_background(headline, style) for style in styles]
    results = await asyncio.gather(*tasks)
    return [r for r in results if r is not None]

async def process_media(file: UploadFile) -> str:
    os.makedirs("media", exist_ok=True)
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = f"media/{unique_filename}"
    
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    if file.content_type.startswith('image/'):
        with Image.open(file_path) as img:
            max_size = (1920, 1080)
            if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
                img.thumbnail(max_size)
            img.save(file_path, optimize=True, quality=85)
    
    return file_path

# API endpoints
@app.get("/")
async def root():
    return {"message": "Welcome to Weird News X Generator API"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.get("/metrics")
async def get_metrics():
    return {
        "rate_limits": {ip: len(timestamps) for ip, timestamps in rate_limit_data.items()},
        "cache_size": {"images": len(image_cache), "news": len(news_cache)}
    }

@app.get("/news/weird")
async def get_weird_news(request: Request):
    try:
        from_date = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
        news = newsapi.get_everything(
            q='weird OR bizarre OR strange OR unusual OR funny OR hilarious',
            from_param=from_date,
            language='en',
            sort_by='relevancy'
        )
        
        if not news['articles']:
            raise HTTPException(status_code=404, detail="No weird news found")
            
        article = news['articles'][0]
        headlines = await generate_funny_variations(article['title'], article['description'])
        wacky_headline = generate_wacky_headline(article['title'], article['description'])
        headlines.insert(0, wacky_headline)
        
        image_suggestions = await generate_image_variations(headlines[0])
        
        return NewsItem(
            title=article['title'],
            description=article['description'],
            url=article['url'],
            image_url=image_suggestions[0].url if image_suggestions else None,
            funny_headline=headlines[0],
            font_suggestions=headlines[1:],
            image_suggestions=image_suggestions
        )
        
    except Exception as e:
        logger.error(f"Error in get_weird_news: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/post-to-x")
async def post_to_x(story: NewsItem, background_tasks: BackgroundTasks):
    """Post a story to X (Twitter) with the generated headline and image"""
    try:
        if not TWITTER_ENABLED:
            return {
                "success": True,
                "message": "Twitter integration is disabled. This is a mock response.",
                "mock_tweet": {
                    "id": "mock_" + str(int(time.time())),
                    "text": story.funny_headline,
                    "created_at": datetime.now().isoformat(),
                    "public_metrics": {
                        "retweet_count": random.randint(0, 100),
                        "reply_count": random.randint(0, 50),
                        "like_count": random.randint(0, 200),
                        "quote_count": random.randint(0, 30)
                    }
                }
            }

        tweet_text = f"{story.funny_headline}\n\nRead more: {story.url}"
        image_response = requests.get(story.image_url)
        media = client.media_upload(filename="generated_image.png", file=image_response.content)
        tweet = client.create_tweet(text=tweet_text, media_ids=[media.media_id])
        story.tweet_id = tweet.data['id']
        return story
    except Exception as e:
        logger.error(f"Error in post_to_x: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/engagement/{tweet_id}")
async def get_engagement(tweet_id: str):
    """Get engagement stats for a tweet"""
    try:
        if not TWITTER_ENABLED:
            return {
                "tweet_id": tweet_id,
                "metrics": {
                    "retweets": random.randint(0, 100),
                    "replies": random.randint(0, 50),
                    "likes": random.randint(0, 200),
                    "quotes": random.randint(0, 30)
                },
                "timestamp": datetime.now().isoformat()
            }

        tweet = client.get_tweet(tweet_id, tweet_fields=['public_metrics'])
        metrics = tweet.data.public_metrics
        return EngagementStats(
            likes=metrics['like_count'],
            retweets=metrics['retweet_count'],
            replies=metrics['reply_count'],
            impressions=metrics['impression_count']
        )
    except Exception as e:
        logger.error(f"Error in get_engagement: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload-media")
async def upload_media(files: List[UploadFile] = File(...)):
    if len(files) > MAX_MEDIA_FILES:
        raise HTTPException(status_code=400, detail="Maximum 4 files allowed")
    
    media_paths = []
    for file in files:
        if not file.content_type.startswith(('image/', 'video/', 'application/gif')):
            raise HTTPException(status_code=400, detail="Invalid file type")
        file_path = await process_media(file)
        media_paths.append(file_path)
    
    return {"media_paths": media_paths}

@app.post("/create-poll")
async def create_poll(poll: Poll):
    if not 2 <= len(poll.options) <= MAX_POLL_OPTIONS:
        raise HTTPException(status_code=400, detail="Polls must have 2-4 options")
    
    if not 1 <= poll.duration_hours <= MAX_POLL_DURATION:
        raise HTTPException(status_code=400, detail="Poll duration must be between 1 and 168 hours")
    
    poll_id = str(uuid.uuid4())
    polls_db[poll_id] = {
        "options": poll.options,
        "votes": [0] * len(poll.options),
        "end_time": datetime.now() + timedelta(hours=poll.duration_hours)
    }
    
    return {"poll_id": poll_id}

@app.get("/poll/{poll_id}")
async def get_poll_results(poll_id: str):
    if poll_id not in polls_db:
        raise HTTPException(status_code=404, detail="Poll not found")
    
    poll = polls_db[poll_id]
    total_votes = sum(poll["votes"])
    
    results = []
    for option, votes in zip(poll["options"], poll["votes"]):
        percentage = (votes / total_votes * 100) if total_votes > 0 else 0
        results.append({
            "option": option,
            "votes": votes,
            "percentage": round(percentage, 1)
        })
    
    return {
        "results": results,
        "total_votes": total_votes,
        "ended": datetime.now() > poll["end_time"]
    }

@app.post("/analytics")
async def get_analytics(request: AnalyticsRequest):
    metrics = []
    current_date = request.start_date
    
    while current_date <= request.end_date:
        metrics.append(PostMetrics(
            post_id=str(uuid.uuid4()),
            impressions=random.randint(1000, 10000),
            likes=random.randint(50, 500),
            retweets=random.randint(10, 100),
            replies=random.randint(5, 50),
            engagement_rate=random.uniform(1.0, 5.0),
            timestamp=current_date
        ))
        current_date += timedelta(days=1)
    
    total_impressions = sum(m.impressions for m in metrics)
    total_engagement = sum(m.likes + m.retweets + m.replies for m in metrics)
    avg_engagement_rate = total_engagement / total_impressions * 100 if total_impressions > 0 else 0
    
    return {
        "metrics": metrics,
        "aggregates": {
            "total_impressions": total_impressions,
            "total_engagement": total_engagement,
            "avg_engagement_rate": round(avg_engagement_rate, 2)
        }
    }

@app.get("/analytics/best-time")
async def get_best_posting_time():
    return {
        "best_times": [
            {"day": "Monday", "time": "10:00", "engagement_rate": 4.2},
            {"day": "Wednesday", "time": "15:00", "engagement_rate": 4.5},
            {"day": "Friday", "time": "12:00", "engagement_rate": 4.8}
        ],
        "worst_times": [
            {"day": "Sunday", "time": "04:00", "engagement_rate": 0.8},
            {"day": "Saturday", "time": "22:00", "engagement_rate": 1.2}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=4,
        log_level="info"
    ) 