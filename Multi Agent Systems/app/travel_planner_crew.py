import os
import yaml
from crewai import Agent, Task, Crew, Process
from crewai.project import CrewBase, agent, crew, task
from dotenv import load_dotenv
from models import TravelItinerary
from custom_search_tool import CustomSearchTool
from crewai_tools import ScrapeWebsiteTool


load_dotenv()

@CrewBase
class TravelPlannerCrew:
    """ A crew for planning a travel itinerary """

    base_directory = os.path.dirname(os.path.abspath(__file__))

    agents_configuration_path = os.path.join(base_directory, "config", "agents.yaml")

    tasks_configuration_path = os.path.join(base_directory, "config", "tasks.yaml")


    def __init__(self):

        with open(self.agents_configuration_path, 'r') as file:
            self.agents_data = yaml.safe_load(file)
      
        with open(self.tasks_configuration_path, 'r') as file:
            self.tasks_data = yaml.safe_load(file)

        # Add the scrape website tool instance
        self.scrape_website_tool = ScrapeWebsiteTool()

        # Add the custom search tool instace
        self.search_tool = CustomSearchTool()

    
    @agent
    def researcher(self) -> Agent:
        """ A researcher agent that can research the internet for information """

        return Agent(
            config=self.agents_data["researcher"],
            tools=[self.search_tool, self.scrape_website_tool]
        )
    
    @agent
    def planner(self) -> Agent:
        """ A planner agent that can plan the travel itinerary """

        return Agent(
            config=self.agents_data["planner"]
        )
    
    @task
    def research_task(self) -> Task:
        """ A task for researching the internet for information about the travel itinerary """

        return Task(
            config=self.tasks_data["research_task"],
            agent=self.researcher()
        )
    
    @task
    def planning_task(self) -> Task:
        """ A task for planning the travel itinerary """

        return Task(
            config=self.tasks_data["planning_task"],
            agent=self.planner(),
            output_pydantic=TravelItinerary
        )
    
    @crew
    def travel_crew(self) -> Crew:
        """ A crew for planning a travel itinerary """

        return Crew(
            agents = self.agents,
            tasks = self.tasks,
            process = Process.sequential,
            verbose = True
        )
    
   