# You.com MCP Server

This MCP (Model Context Protocol) server provides AI assistants with the ability to search the web, get news, and perform research using the You.com API. Feedback welcomed.

## Features

- **Web Search**: Access to You.com's web search functionality
- **Smart Search**: AI-powered answers with citation support
- **Research**: Comprehensive, citation-backed answers for academic queries
- **News Search**: Latest news articles on any topic

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- You.com API key (get one from [api.you.com](https://api.you.com))

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/jimbul/youcom-mcp.git
   cd youcom-mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the example:
   ```
   cp .env.example .env
   ```

4. Add your You.com API key to the `.env` file:
   ```
   YOU_API_KEY=your_actual_api_key_here
   ```

5. Build the project:
   ```
   npm run build
   ```

## Running Locally (Optional)

You can run the server locally for testing:

```
npm start
```

## Setting up with Claude

To use this MCP server with Claude (Anthropic Assistant), you need to configure Claude to use this server:

1. Open the Claude extension settings in VS Code:
   - Click on the Claude icon in the VS Code sidebar
   - Click on the settings icon (⚙️) and select "MCP Settings"

2. Add the following configuration to the `mcpServers` section:

```json
"youcom-mcp": {
  "autoApprove": [],
  "disabled": false,
  "command": "node",
  "args": [
    "/absolute/path/to/your/youcom-mcp/dist/index.js"
  ],
  "env": {
    "YOU_API_KEY": "your_actual_api_key_here"
  },
  "transportType": "stdio"
}
```

**Important Notes:**
- Replace `/absolute/path/to/your/youcom-mcp/dist/index.js` with the actual path on your system
- Replace `your_actual_api_key_here` with your You.com API key

## Usage Examples

Once configured, you can use the MCP tools directly in your conversations with Claude:

### Web Search

```
<use_mcp_tool>
<server_name>youcom-mcp</server_name>
<tool_name>web_search</tool_name>
<arguments>
{
  "query": "latest research on renewable energy"
}
</arguments>
</use_mcp_tool>
```

### Smart Search

```
<use_mcp_tool>
<server_name>youcom-mcp</server_name>
<tool_name>smart_search</tool_name>
<arguments>
{
  "query": "how do quantum computers work",
  "instructions": "explain in simple terms"
}
</arguments>
</use_mcp_tool>
```

### Research

```
<use_mcp_tool>
<server_name>youcom-mcp</server_name>
<tool_name>research</tool_name>
<arguments>
{
  "query": "effects of climate change on ocean ecosystems",
  "instructions": "focus on coral reefs"
}
</arguments>
</use_mcp_tool>
```

### News Search

```
<use_mcp_tool>
<server_name>youcom-mcp</server_name>
<tool_name>news_search</tool_name>
<arguments>
{
  "query": "latest developments in AI"
}
</arguments>
</use_mcp_tool>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgements

This project uses the [You.com API](https://api.you.com) for search functionality.
