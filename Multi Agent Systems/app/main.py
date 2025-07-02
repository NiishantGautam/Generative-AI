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

if pydantic_output:
    print(f"City name: {pydantic_output.city}")
    print(f"Number of days: {pydantic_output.days}")
    print("---------------------")
        
print("Popular attractions are: ")   
for attraction in pydantic_output.daily_plans[0].attractions:
    print({attraction.name})


print("---------")
if pydantic_output.daily_plans[0].meal_suggestions:
    for meal_suggestion in pydantic_output.daily_plans[0].meal_suggestions:
        print(meal_suggestion)
        

    
print("----------------") 
print("\n")
print("Overall Tips: ")   
if pydantic_output.overall_tips:
    print(pydantic_output.overall_tips)