import time
from crewai.tools import BaseTool
from langchain_community.tools import DuckDuckGoSearchResults
from langchain_community.utilities import GoogleSerperAPIWrapper

class CustomSearchTool(BaseTool):
    """A tool that can search the internet for information using DuckDuckGo, with Google Serper as fallback."""

    name: str = "Web Search Tool (DuckDuckGo + Serper Fallback)"
    description: str = (
        "Search the web using DuckDuckGo (Free). "
        "If DuckDuckGo fails, falls back to Google Serper."
    )

    def _run(self, query: str) -> str:
        time.sleep(1)  # Add a 2-second delay to avoid rate limiting for each request.
        try:
            duckduckgo_tool = DuckDuckGoSearchResults()
            response = duckduckgo_tool.invoke(query)
            return f"[DuckDuckGo]\n{response}"
        except Exception as e:
            print(f"DuckDuckGo Failed Error: {e}... Trying Serper Search....")
            try:
                serper_tool = GoogleSerperAPIWrapper()
                response = serper_tool.run(query)
                return f"[Serper]\n{response}"
            except Exception as e2:
                print(f"Serper Search Failed Error: {e2}...")
                return "Both DuckDuckGo and Serper failed to retrieve results."