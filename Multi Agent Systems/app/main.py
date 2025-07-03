from travel_planner_crew import TravelPlannerCrew


# Instance of CrewBase
travel_planner = TravelPlannerCrew()




# Crew method
crew = travel_planner.travel_crew()



# Input variables
city = "Montreal"
days = 6
attractions_per_day = 3
total_attractions = days * attractions_per_day

# Dictionary of inputs
inputs = {
    "city": city,
    "days": days,
    "attractions_per_day": attractions_per_day,
    "total_attractions": total_attractions
}

# Run the crew
result = crew.kickoff(inputs=inputs)

pydantic_output = result.pydantic

# Print Pydantic output if available
if pydantic_output:
    # Convert to dict and print as formatted JSON
    print("\n=== YOUR PERSONALIZED TRAVEL ITINERARY ===\n")
    itinerary_dict = pydantic_output.model_dump()
    print(f"Destination: {itinerary_dict['city']}")
    print(f"Duration: {itinerary_dict['days']} days\n")
    
    for day in itinerary_dict['daily_plans']:
        print(f"--- DAY {day['day_number']} ---")
        for attraction in day['attractions']:
            print(f"• {attraction['name']} ({attraction['category']})")
            print(f"  {attraction['description']}")
            print(f"  Duration: {attraction['estimated_duration']}")
            if attraction['address']:
                print(f"  Address: {attraction['address']}")
            print()
        
        if day['meal_suggestions']:
            print("Meal suggestions:")
            for meal in day['meal_suggestions']:
                print(f"  - {meal}")
        print()
    
    if itinerary_dict.get('overall_tips'):
        print("TRAVEL TIPS:")
        print(itinerary_dict['overall_tips'])
else:
    print("No Pydantic output available.")