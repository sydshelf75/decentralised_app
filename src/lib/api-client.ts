
import axios from "axios";

class ApiClient {
  private static instance: ApiClient;
  private baseUrl = "/api";

  private constructor() {}

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Communities
  public async getCommunities() {
    const response = await axios.get(`${this.baseUrl}/communities`);
    return response.data;
  }

  public async getCommunityById(id: string) {
    const response = await axios.get(`${this.baseUrl}/communities/${id}`);
    return response.data;
  }

  public async createCommunity(data: any) {
    const response = await axios.post(`${this.baseUrl}/communities`, data);
    return response.data;
  }

  public async getCommunityMembers(id: string) {
    const response = await axios.get(
      `${this.baseUrl}/communities/${id}/members`
    );
    return response.data;
  }

  public async joinCommunity(id: string, userId: string) {
    const response = await axios.post(
      `${this.baseUrl}/communities/${id}/members`,
      { userId }
    );
    return response.data;
  }

  // Knowledge Posts
  public async getKnowledgePosts() {
    const response = await axios.get(`${this.baseUrl}/knowledge-posts`);
    return response.data;
  }

  public async getKnowledgePostById(id: string) {
    const response = await axios.get(`${this.baseUrl}/knowledge-posts/${id}`);
    return response.data;
  }

  public async createKnowledgePost(data: any) {
    const response = await axios.post(`${this.baseUrl}/knowledge-posts`, data);
    return response.data;
  }

  public async getKnowledgePostAnswers(id: string) {
    const response = await axios.get(
      `${this.baseUrl}/knowledge-posts/${id}/answers`
    );
    return response.data;
  }

  public async addKnowledgePostAnswer(id: string, data: any) {
    const response = await axios.post(
      `${this.baseUrl}/knowledge-posts/${id}/answers`,
      data
    );
    return response.data;
  }

  public async getKnowledgePostTags(id: string) {
    const response = await axios.get(
      `${this.baseUrl}/knowledge-posts/${id}/tags`
    );
    return response.data;
  }

  public async addKnowledgePostTag(id: string, tagId: string) {
    const response = await axios.post(
      `${this.baseUrl}/knowledge-posts/${id}/tags`,
      { tagId }
    );
    return response.data;
  }

  // Tags
  public async getTags() {
    const response = await axios.get(`${this.baseUrl}/tags`);
    return response.data;
  }

  public async getTagById(id: string) {
    const response = await axios.get(`${this.baseUrl}/tags/${id}`);
    return response.data;
  }

  public async createTag(data: any) {
    const response = await axios.post(`${this.baseUrl}/tags`, data);
    return response.data;
  }

  // Users
  public async getUsers() {
    const response = await axios.get(`${this.baseUrl}/users`);
    return response.data;
  }

  public async getUserById(id: string) {
    const response = await axios.get(`${this.baseUrl}/users/${id}`);
    return response.data;
  }

  public async createUser(data: any) {
    const response = await axios.post(`${this.baseUrl}/users`, data);
    return response.data;
  }
}

export const apiClient = ApiClient.getInstance();
