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

print(result)