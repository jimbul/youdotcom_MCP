#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { YouApiClient } from "./services/youApiClient.js";
import { randomUUID } from "crypto";

// Get API key from environment variable
const API_KEY = process.env.YOU_API_KEY as string;
if (!API_KEY) {
  console.error("ERROR: YOU_API_KEY environment variable must be set");
  process.exit(1);
}

// Initialize API client
const youClient = new YouApiClient(API_KEY);

// Create MCP server
const server = new McpServer({
  name: "You.com MCP Server",
  version: "1.0.0"
});

// Web Search Tool
server.tool(
  "web_search",
  {
    query: z.string().describe("The search query to send to You.com")
  },
  async ({ query }: { query: string }) => {
    try {
      const results = await youClient.search(query);
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(results, null, 2)
        }]
      };
    } catch (error) {
      console.error("Search error:", error);
      return {
        content: [{ 
          type: "text", 
          text: `Error performing search: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// Smart AI Tool
server.tool(
  "smart_search",
  {
    query: z.string().describe("The query to send to You.com's Smart API"),
    instructions: z.string().optional().describe("Custom instructions for tailoring the response (optional)"),
    conversationId: z.string().optional().describe("A hex UUID to maintain conversation continuity (optional)")
  },
  async ({ query, instructions, conversationId }: { query: string; instructions?: string; conversationId?: string }) => {
    try {
      const result = await youClient.smartSearch(query, instructions, conversationId);
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(result, null, 2)
        }]
      };
    } catch (error) {
      console.error("Smart search error:", error);
      return {
        content: [{ 
          type: "text", 
          text: `Error performing smart search: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// Research Tool
server.tool(
  "research",
  {
    query: z.string().describe("The research query to send to You.com's Research API"),
    instructions: z.string().optional().describe("Custom instructions for tailoring the response (optional)")
  },
  async ({ query, instructions }: { query: string; instructions?: string }) => {
    try {
      const result = await youClient.research(query, instructions);
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(result, null, 2)
        }]
      };
    } catch (error) {
      console.error("Research error:", error);
      return {
        content: [{ 
          type: "text", 
          text: `Error performing research: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// News Tool
server.tool(
  "news_search",
  {
    query: z.string().describe("The news query to send to You.com's News API")
  },
  async ({ query }: { query: string }) => {
    try {
      const results = await youClient.getNews(query);
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(results, null, 2)
        }]
      };
    } catch (error) {
      console.error("News search error:", error);
      return {
        content: [{ 
          type: "text", 
          text: `Error performing news search: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// Start the server
async function startServer() {
  try {
    console.error("Starting You.com MCP server...");
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("You.com MCP server running with stdio transport");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer().catch(console.error);
