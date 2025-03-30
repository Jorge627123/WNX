# Weird News X Generator API

A FastAPI-based service that generates viral, funny headlines from weird news stories and posts them to X (Twitter).

## Features

- AI-generated funny headlines from news stories
- Dynamic emoji combinations and reactions
- Image generation for headlines
- X (Twitter) integration for posting
- Engagement tracking and analytics
- Media upload support
- Poll creation and management
- Rate limiting and caching

## Prerequisites

- Python 3.8+
- X (Twitter) API credentials
- OpenAI API key
- NewsAPI key

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
NEWS_API_KEY=your_news_api_key
OPENAI_API_KEY=your_openai_api_key
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weird_news_x.git
cd weird_news_x/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Download the spaCy model:
```bash
python -m spacy download en_core_web_sm
```

## Running the API

Start the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Main Endpoints

- `GET /news/weird`: Get a weird news story with funny headlines
- `POST /post-to-x`: Post a story to X (Twitter)
- `GET /engagement/{tweet_id}`: Get engagement stats for a tweet
- `POST /upload-media`: Upload media files
- `POST /create-poll`: Create a poll
- `GET /poll/{poll_id}`: Get poll results
- `POST /analytics`: Get analytics data
- `GET /analytics/best-time`: Get best posting times

## Development

The API uses:
- FastAPI for the web framework
- OpenAI for headline generation
- spaCy for text processing
- Tweepy for X (Twitter) integration
- NewsAPI for news fetching
- Pillow for image processing

## License

MIT License - feel free to use this project as you wish. 