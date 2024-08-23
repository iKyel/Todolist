import { makeAutoObservable } from "mobx";
import axios from "axios";

const API_BASE_URL = "http://localhost:3412/api";

export interface User {
  _id?: string;
  fullName: string;
  username: string;
  password: string;
  workItems: string[];
}

class UserStore {
  userList: User[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchUserList();
  }

  async fetchUserList() {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      this.userList = response.data.users;
    } catch (error) {
      console.error("Error loading user data", error);
    }
  }

  async registerUser(user: User) {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, user);
      this.userList.push(response.data);
    } catch (error) {
      console.error("Error adding user", error);
    }
  }

  async loginUser(username: string, password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        username,
        password,
      });
      const { token } = response.data; 
      localStorage.setItem("token", token);
      return token; 
    } catch (error) {
      console.error("Error logging in user", error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      await axios.post(`${API_BASE_URL}/users/logout`);
      localStorage.removeItem("token"); 
    } catch (error) {
      console.error("Error logging out user", error);
    }
  }

  async getCurrentUserProfile() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching current user profile", error);
      throw error;
    }
  }

  async getWorkItem() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${API_BASE_URL}/users/work`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching work items", error);
      throw error;
    }
  }
}

export const userStore = new UserStore();
