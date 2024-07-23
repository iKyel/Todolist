import { makeAutoObservable } from "mobx";

export interface WorkItem {
  id: number;
  text: string;
  completed: boolean;
}

class WorkStore {
  workList: WorkItem[] = JSON.parse(localStorage.getItem("workList") || "[]");
  
  constructor() {
    makeAutoObservable(this);
  }

  addWork(item: WorkItem) {
    this.workList.push(item);
    this.updateLocalStorage();
  }

  deleteWork(id: number) {
    this.workList = this.workList.filter((item) => item.id !== id);
    this.updateLocalStorage()
  }

  completeWork(id: number) {
    const work = this.workList.find(item => item.id === id)
    if(work) {
        work.completed = true;
        this.updateLocalStorage();
    }
  }

  editWork(id: number, newText: string) {
    const work = this.workList.find(item => item.id === id)
    if(work) {
        work.text = newText;
        this.updateLocalStorage()
    }
  }

  get completedWork() {
    return this.workList.filter(item => item.completed);
  }

  get ongoingWork() {
    return this.workList.filter(item => !item.completed);
  }

  updateLocalStorage() {
    localStorage.setItem("workList", JSON.stringify(this.workList));
  }
}

export const workStore = new WorkStore();
