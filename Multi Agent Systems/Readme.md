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

Before running your Quebec & Montreal travel planner, set up your agents:

1. **Agents Configuration**: Edit `app/config/agents.yaml` to define travel planning agents (e.g., Quebec City specialist, Montreal expert, itinerary coordinator)
2. **Tasks Configuration**: Edit `app/config/tasks.yaml` to define travel planning workflows (research attractions, create itineraries, suggest activities)

## How to Run

Get ready to plan your Quebec adventure! 🚀

```bash
cd app
python main.py
```

The system will ask you:
- How many days you have for your trip
- Whether you prefer Quebec City, Montreal, or both
- Your interests (history, food, culture, etc.)

Then sit back and let the agents create your perfect itinerary!

## Development

### Adding a new dependency

Whenever you need to add a package, do:

```bash
# 1) Install the package
pip install <package-name>

# 2) Update requirements.txt
pip freeze > requirements.txt
```

## Project Structure

```
app/
├── main.py                        # Main application file
└── travel_planner/
    ├── travel_planner_crew.py     # Main travel planner logic
    ├── models/
    │   ├── daily_plan.py          # Daily planning model
    │   ├── travel_itinerary.py    # Itinerary model
    │   └── attraction.py          # Attraction model
    ├── tools/
    │   └── custom_search_tool.py  # Custom search tool
    └── config/
        ├── tasks.yaml             # Task configurations
        └── agents.yaml            # Agent configurations
