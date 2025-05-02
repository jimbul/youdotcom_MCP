import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { randomUUID } from 'crypto';

interface SearchResult {
  url: string;
  title: string;
  snippet: string;
}

interface SmartResult {
  answer: string;
  results: Array<{
    url: string;
    title: string;
    snippet: string;
  }>;
}

interface ResearchResult {
  answer: string;
  citations: Array<{
    url: string;
    title: string;
    content: string;
  }>;
}

export class YouApiClient {
  private searchClient: AxiosInstance;
  private chatClient: AxiosInstance;

  constructor(apiKey: string) {
    // For search and news APIs
    this.searchClient = axios.create({
      baseURL: 'https://api.ydc-index.io',
      headers: {
        'X-API-Key': apiKey
      }
    });
    
    // For smart and research APIs
    this.chatClient = axios.create({
      baseURL: 'https://chat-api.you.com',
      headers: {
        'X-API-Key': apiKey
      }
    });
  }

  /**
   * Get news results using You.com News API
   */
  async getNews(query: string): Promise<any> {
    try {
      // Following the example exactly
      const params = { query };
      
      // Use the full URL format to match the Python example
      const response = await this.searchClient.get(`/news?query=${encodeURIComponent(query)}`, { params });
      
      // Return the complete response data to match the Python example
      return response.data;
    } catch (error) {
      console.error('Error in You.com news API call:', error);
      throw error;
    }
  }

  /**
   * Perform a web search with You.com Search API
   */
  async search(query: string): Promise<any> {
    try {
      // Following the example exactly
      const params = { query };
      
      // Use the full URL format to match the Python example
      const response = await this.searchClient.get(`/search?query=${encodeURIComponent(query)}`, { params });
      
      // Return the complete response data to match the Python example
      return response.data;
    } catch (error) {
      console.error('Error in You.com search API call:', error);
      throw error;
    }
  }

  /**
   * Get an AI-powered response using You.com Smart API
   */
  async smartSearch(
    query: string, 
    instructions?: string, 
    conversationId?: string
  ): Promise<SmartResult> {
    try {
      const params: Record<string, string> = {
        query: query
      };
      
      if (instructions) {
        params.instructions = instructions;
      }
      
      if (conversationId) {
        params.conversation_id = conversationId;
      }

      const response = await this.chatClient.get('/smart', { params });
      return response.data;
    } catch (error) {
      console.error('Error in You.com smart API call:', error);
      throw error;
    }
  }

  /**
   * Get a citation-backed response using You.com Research API
   */
  async research(
    query: string, 
    instructions?: string
  ): Promise<ResearchResult> {
    try {
      const params: Record<string, string> = {
        query: query
      };
      
      if (instructions) {
        params.instructions = instructions;
      }

      const response = await this.chatClient.get('/research', { params });
      return response.data;
    } catch (error) {
      console.error('Error in You.com research API call:', error);
      throw error;
    }
  }
}
