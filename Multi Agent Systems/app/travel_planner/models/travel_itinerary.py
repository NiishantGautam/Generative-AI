from typing import List, Optional
from pydantic import BaseModel, Field
from .daily_plan import DailyPlan


class TravelItinerary(BaseModel):
    """Model for a complete travel itinerary"""
    city: str = Field(description="City to visit")
    days: int = Field(description="Number of days in the itinerary")
    daily_plans: List[DailyPlan] = Field(description="Plan for each day")
    overall_tips: Optional[str] = Field(description="General travel tips for this destination", default=None) 