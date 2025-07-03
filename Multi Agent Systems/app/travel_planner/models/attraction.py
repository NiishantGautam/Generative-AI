from typing import Optional
from pydantic import BaseModel, Field


class Attraction(BaseModel):
    """Model for a tourist attraction"""
    
    name: str = Field(description="Name of the attraction")
    description: str = Field(description="Brief description of the attraction")
    category: str = Field(description="Category like 'Museum', 'Historical Site', etc.")
    estimated_duration: str = Field(description="How long to spend here (e.g., '2 hours')")
    address: Optional[str] = Field(description="Physical address", default=None) 