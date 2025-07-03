from crewai.tools import BaseTool
from langchain_community.tools import DuckDuckGoSearchResults


class CustomSearchTool(BaseTool):
    """A tool that can search the internet for information"""

    name: str = "DuckDuckGo Search Tool"
    description: str = "Search the web using DuckDuckGo (Free)."

    def _run(self, query: str) -> str:

        duckduckgo_tool = DuckDuckGoSearchResults()

        response = duckduckgo_tool.invoke(query)

        return response