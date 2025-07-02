import os
import yaml
from crewai import Agent, Crew, Task
from dotenv import load_dotenv

load_dotenv()



base_directory = os.path.dirname(os.path.abspath(__file__))


agents_configuration_path = os.path.join(base_directory, "config", "agents.yaml")

tasks_configuration_path = os.path.join(base_directory, "config", "tasks.yaml")


with open(agents_configuration_path, 'r') as file:
    agents_data = yaml.safe_load(file)


with open(tasks_configuration_path, 'r') as file:
    tasks_data = yaml.safe_load(file)

