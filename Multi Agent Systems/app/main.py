import os
import yaml
import json
from crewai import Agent, Crew, Task, Process
from dotenv import load_dotenv

load_dotenv()



base_directory = os.path.dirname(os.path.abspath(__file__))


agents_configuration_path = os.path.join(base_directory, "config", "agents.yaml")

tasks_configuration_path = os.path.join(base_directory, "config", "tasks.yaml")


with open(agents_configuration_path, 'r') as file:
    agents_data = yaml.safe_load(file)


with open(tasks_configuration_path, 'r') as file:
    tasks_data = yaml.safe_load(file)


researcher = Agent(
    config= agents_data["researcher"]
)

planner = Agent(
    config= agents_data["planner"]
)

research_task = Task(
    config= tasks_data["research_task"],
    agent=researcher
)

planning_task = Task(
    config= tasks_data["planning_task"],
    agent=planner,
    context=[research_task]
)

crew = Crew(
    agents=[researcher, planner],
    tasks=[research_task, planning_task],
    process=Process.sequential
)

city = "Montreal"
days = 6
attractions_per_day = 3
total_attractions = days * attractions_per_day


inputs = {
    "city": city,
    "days": days,
    "attractions_per_day": attractions_per_day,
    "total_attractions": total_attractions
}


result = crew.kickoff(inputs=inputs)

print(result)