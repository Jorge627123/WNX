# Weird News X Generator

A full-stack application that generates viral, funny headlines from weird news stories and posts them to X (Twitter).

## Project Structure

```
weird_news_x/
├── backend/           # FastAPI backend
│   ├── main.py       # Main application code
│   ├── requirements.txt
│   ├── setup.bat     # Windows setup script
│   ├── run.bat       # Windows run script
│   └── README.md
├── frontend/         # React frontend
│   └── src/
│       └── App.js
└── README.md
```

## Quick Start (Windows)

1. Install Python 3.8 or later from https://www.python.org/downloads/
   - Make sure to check "Add Python to PATH" during installation
   - Restart your computer after installation

2. Clone or download the repository to your computer

3. Set up the backend:
   - Navigate to the backend folder
   - Double-click `setup.bat` to run the setup script
   - Wait for the installation to complete

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Edit `.env` with your API keys:
     - NEWS_API_KEY (from https://newsapi.org)
     - OPENAI_API_KEY (from https://platform.openai.com)
     - Twitter keys are optional (set TWITTER_ENABLED=false)

5. Run the application:
   - Double-click `run.bat` in the backend folder
   - The application will start at http://localhost:8000

## Manual Setup

If you prefer to set up manually:

1. Create and activate virtual environment:
```bash
python -m venv venv
venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Download spaCy model:
```bash
python -m spacy download en_core_web_sm
```

4. Run the application:
```bash
python main.py
```

## Features

- AI-generated funny headlines
- Dynamic emoji combinations
- Image generation
- X (Twitter) integration (optional)
- Engagement tracking
- Media upload support
- Poll creation
- Analytics dashboard

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project as you wish. 