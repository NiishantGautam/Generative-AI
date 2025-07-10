import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: "weather-mcp-server",
  version: "1.0.0",
});

// Define the input schema for the tool.

const GetWeatherInput = z.object({
  city: z.string().describe("The name of the city to get the weather for, e.g., 'Montreal'"),
});

// Define the output schema. This is the contract for what the tool will return.

const GetWeatherOutput = z.object({
  temperature: z.number().describe("The current temperature in Celsius."),
  description: z.string().describe("A human-readable summary of the weather conditions."),
});

server.tool(
  'get-weather',
  'Tool to get the weather for a city',
  {
    input: GetWeatherInput,
    output: GetWeatherOutput,
    handler: async ({ city }) => {
      // 1. Get coordinates for the city
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
      const geoData = await geoResponse.json();

      // 2. Handle city not found by throwing a descriptive error
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City not found: ${city}. Please provide a valid city name.`);
      }

      // 3. Get the weather data using the coordinates
      const { latitude, longitude } = geoData.results[0];
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m`);
      const weatherData = await weatherResponse.json();

      // 4. Parse the complex API response into our simple, clean output object.

      const currentTemperature = weatherData.current.temperature_2m;
      const apparentTemperature = weatherData.current.apparent_temperature;
      const windSpeed = weatherData.current.wind_speed_10m;

      const description = `The current temperature in ${city} is ${currentTemperature}°C (feels like ${apparentTemperature}°C) with wind speeds of ${windSpeed} km/h.`;

      // 5. Return an object that perfectly matches the GetWeatherOutput schema.
      return {
        temperature: currentTemperature,
        description: description,
      };
    },
  }
);

const transport = new StdioServerTransport();
server.connect(transport);

console.log("MCP Weather Server is running and ready for requests...");