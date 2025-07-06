# Multi Agent System

🏰 **Born from wanderlust!** After an amazing trip to Quebec City and Montreal, I was inspired to create this intelligent travel planning agent system. This fun project helps travelers discover the best must-visit places in these beautiful Canadian cities based on how many days they have to explore.

The system uses multiple AI agents working together to create personalized itineraries - because planning the perfect Quebec adventure should be as exciting as the trip itself! 🍁



## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## Setup

### 1. Create and activate the virtual environment 

```bash
python3 -m venv .env
source .env/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

## Configuration

### OpenAI API Key Setup

**⚠️ IMPORTANT:** This application requires an OpenAI API key to function. The system will automatically check for the API key and provide helpful error messages if it's missing. Also if the duck duck go search is missing please use the  SERPER_API_KEY

You can set up your OpenAI API key by exporting it as an environment variable:

For macOS/Linux:
```bash
export OPENAI_API_KEY='your-api-key-here'
export  SERPER_API_KEY='your-api-key-here'
```

For Windows (Command Prompt):
```cmd
set OPENAI_API_KEY=your-api-key-here
```

For Windows (PowerShell):
```powershell
$env:OPENAI_API_KEY='your-api-key-here'
```

Create a .env file in the same directory as your main.py:
OPENAI_API_KEY=your-actual-api-key-here

### Features:
- ✅ **Automatic API Key Validation**: The app checks for your API key on startup
- ✅ **Clear Error Messages**: Get specific instructions if the API key is missing
- ✅ **Frontend Warnings**: The web interface will show setup instructions if needed
- ✅ **Real-time Status**: Check API key status via the `/api-status` endpoint

## How to Run

1. Start the Flask development server:
```bash
cd app
python main.py
```

2. Open your web browser and navigate to:
```
http://localhost:8000
```
```


```

## Project Structure

```
app/
├── main.py                        # Main application file
└── travel_planner/
    ├── travel_planner_crew.py     # Main travel planner logic
    ├── models/                     # Data models
    │   ├── daily_plan.py          
    │   ├── travel_itinerary.py    
    │   └── attraction.py          
    ├── tools/                      
    │   └── custom_search_tool.py  # Custom search tool
    └── config/                     # Configuration files 
        ├── tasks.yaml             # Task configurations
        └── agents.yaml            # Agent configurations
├── static/                        # Static files (CSS, JS)
│   └── js/
│       └── travel-planner.js  
└── templates/
    └── index.html