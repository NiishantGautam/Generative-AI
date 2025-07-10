import {MCPServer} from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod";

const server = new MCPServer({
    name: "weather-mcp-server",
    version: "1.0.0"
});

