import { makeAutoObservable } from "mobx";
import axios from "axios";

const API_BASE_URL = "http://localhost:3412/api";

export interface WorkItem {
  _id: string;
  text: string;
  completed: boolean;
}

class WorkStore {
  workList: WorkItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchWorkList();
  }

  async fetchWorkList() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`${API_BASE_URL}/users/works`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.workList = response.data.data || [];
    } catch (error) {
      console.error("Error loading data", error);
    }
  }

  async fetchWorkItemById(id: string): Promise<WorkItem | null> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`${API_BASE_URL}/works/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching work item by ID", error);
      return null;
    }
  }

  async addWork(item: WorkItem) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.post(`${API_BASE_URL}/works`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.workList.push(response.data);
    } catch (error) {
      console.error("Error adding data", error);
    }
  }

  async deleteWork(id: string) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await axios.delete(`${API_BASE_URL}/works/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.workList = this.workList.filter((item) => item._id !== id);
    } catch (error) {
      console.error("Error deleting data", error);
    }
  }

  async completeWork(id: string) {
    try {
      const work = this.workList.find((item) => item._id === id);
      if (work) {
        work.completed = true;
        await axios.put(`${API_BASE_URL}/works/${id}`, { completed: true });
        this.fetchWorkList();
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
  }

  async editWork(id: string, newText: string) {
    try {
      const work = this.workList.find((item) => item._id === id);
      if (work) {
        work.text = newText;
        await axios.put(`${API_BASE_URL}/works/${id}`, { text: newText });
        this.fetchWorkList();
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
  }

  get completedWork() {
    return this.workList.filter((item) => item.completed);
  }

  get ongoingWork() {
    return this.workList.filter((item) => !item.completed);
  }
}

export const workStore = new WorkStore();
