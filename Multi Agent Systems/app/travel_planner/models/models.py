from typing import List, Optional
from pydantic import BaseModel, Field


class Attraction(BaseModel):
    """Model for a tourist attraction"""
    name: str = Field(description="Name of the attraction")
    description: str = Field(description="Brief description of the attraction")
    category: str = Field(description="Category like 'Museum', 'Historical Site', etc.")
    estimated_duration: str = Field(description="How long to spend here (e.g., '2 hours')")
    address: Optional[str] = Field(description="Physical address", default=None)


class DailyPlan(BaseModel):
    """Model for a single day in the itinerary"""
    day_number: int = Field(description="Day number in the itinerary")
    attractions: List[Attraction] = Field(description="List of attractions to visit")
    meal_suggestions: Optional[List[str]] = Field(description="Suggested places to eat", default=None)


class TravelItinerary(BaseModel):
    """Model for a complete travel itinerary"""
    city: str = Field(description="City to visit")
    days: int = Field(description="Number of days in the itinerary")
    daily_plans: List[DailyPlan] = Field(description="Plan for each day")
    overall_tips: Optional[str] = Field(description="General travel tips for this destination", default=None)