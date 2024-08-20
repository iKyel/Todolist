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
      const response = await axios.get(`${API_BASE_URL}/works`);
      this.workList = response.data.workItems;
    } catch (error) {
      console.error("Lỗi load dữ liệu", error);
    }
  }

  async addWork(item: WorkItem) {
    try {
      const response = await axios.post(`${API_BASE_URL}/works`, item);
      this.workList.push(response.data);
    } catch (error) {
      console.error("Lỗi thêm dữ liệu", error);
    }
  }

  async deleteWork(id: string) {
    try {
      await axios.delete(`${API_BASE_URL}/works/${id}`);
      this.workList = this.workList.filter((item) => item._id !== id);
    } catch (error) {
      console.error("Lỗi xoá dữ liệu", error);
    }
  }

  async completeWork(id: string) {
    try {
      const work = this.workList.find(item => item._id === id);
      if (work) {
        work.completed = true;
        await axios.put(`${API_BASE_URL}/works/${id}`, work);
      }
    } catch (error) {
      console.error("Lỗi sửa dữ liệu", error);
    }
  }

  async editWork(id: string, newText: string) {
    try {
      const work = this.workList.find(item => item._id === id);
      if (work) {
        work.text = newText;
        await axios.put(`${API_BASE_URL}/works/${id}`, work);
      }
    } catch (error) {
      console.error("Lỗi sửa dữ liệu", error);
    }
  }

  get completedWork() {
    return this.workList.filter(item => item.completed);
  }

  get ongoingWork() {
    return this.workList.filter(item => !item.completed);
  }
}

export const workStore = new WorkStore();
