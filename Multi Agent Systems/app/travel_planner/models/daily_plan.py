from typing import List, Optional
from pydantic import BaseModel, Field
from .attraction import Attraction


class DailyPlan(BaseModel):
    """Model for a single day in the itinerary"""
    day_number: int = Field(description="Day number in the itinerary")
    attractions: List[Attraction] = Field(description="List of attractions to visit")
    meal_suggestions: Optional[List[str]] = Field(description="Suggested places to eat", default=None) 