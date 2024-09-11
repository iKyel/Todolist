import { makeAutoObservable } from "mobx";
import axios from "axios";


const API_BASE_URL = "http://localhost:3412/api";

export interface WorkItem {
  _id: string;
  text: string;
  image: string | File | null;
  completed: boolean;
}

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không có token!");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

class WorkStore {
  workList: WorkItem[] = [];
  constructor() {
    makeAutoObservable(this);
    this.fetchWorkList();
  }

  async fetchWorkList() {
    try {
      const response = await axios.get(`${API_BASE_URL}/works/`, getToken());

      console.log(response.data.workItems);
      this.workList = response.data.workItems || [];
    } catch (error) {
      console.error("Error loading data", error);
    }
  }

  async addWork(item: WorkItem, imageFile: File | null) {
    try {
      const formData = new FormData();
      formData.append("text", item.text);
      formData.append("completed", String(item.completed));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.post(`${API_BASE_URL}/works/add`, formData, {
        headers: {
          ...getToken().headers, 
          "Content-Type": "multipart/form-data", 
        },
      });

      this.workList.push(response.data);
    } catch (error) {
      console.error("Error adding data", error);
    }
  }

  async deleteWork(id: string) {
    try {
      await axios.delete(`${API_BASE_URL}/works/${id}`, getToken());
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
        await axios.put(
          `${API_BASE_URL}/works/${id}`,
          { completed: true },
          getToken()
        );
        this.fetchWorkList();
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
  }

  async editWork(id: string, newText: string, newImageFile: File | null) {
    try {
      const formData = new FormData();
      formData.append("text", newText);
      if (newImageFile) {
        formData.append("image", newImageFile);
      }

      const work = this.workList.find((item) => item._id === id);
      if (work) {
        await axios.put(`${API_BASE_URL}/works/${id}`, formData, {
          headers: {
            ...getToken().headers, 
            "Content-Type": "multipart/form-data", 
          },
        });
        this.fetchWorkList(); // Refresh list after update
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
