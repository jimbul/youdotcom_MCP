//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const web_searchEval: EvalFunction = {
    name: "web_search Tool Evaluation",
    description: "Evaluates the web_search tool's functionality",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Search for the top 3 coffee shops in Seattle.");
        return JSON.parse(result);
    }
};

const smart_searchEval: EvalFunction = {
    name: 'smart_searchEval',
    description: 'Evaluates the smart_search tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Which courses are recommended for learning TypeScript with a focus on advanced topics?");
        return JSON.parse(result);
    }
};

const researchToolEvaluation: EvalFunction = {
    name: "researchToolEvaluation",
    description: "Evaluates the research tool with a query to You.com's Research API",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please research the latest breakthroughs in quantum computing and provide reliable sources.");
        return JSON.parse(result);
    }
};

const newsSearchEval: EvalFunction = {
    name: 'news_search Evaluation',
    description: 'Evaluates the news_search tool by requesting the latest news about a given topic',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Find the most recent news on space exploration advancements");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [web_searchEval, smart_searchEval, researchToolEvaluation, newsSearchEval]
};
  
export default config;
  
export const evals = [web_searchEval, smart_searchEval, researchToolEvaluation, newsSearchEval];