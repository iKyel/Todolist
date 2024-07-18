import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { WorkItem } from "./WorkItem";

const CreateWork = () => {
  const storageWork = JSON.parse(localStorage.getItem("workList") || "[]");

  const [workText, setWorkText] = useState<string>("");
  const [workList, setWorkList] = useState<WorkItem[]>(storageWork);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newId = workList.length > 0 ? Math.max(...workList.map(item => item.id)) + 1 : 1;
    const newWorkItem: WorkItem = { id: newId, text: workText, completed: false };
    const newWorkList = [...workList, newWorkItem];
    localStorage.setItem("workList", JSON.stringify(newWorkList));
    setWorkList(newWorkList);
    setWorkText(""); // Clear 
  };

  return (
    <>
      <form className="create-work-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="task-input"
          placeholder="Thêm công việc mới"
          value={workText}
          onChange={(e) => setWorkText(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit} className="submit-button">
          Thêm
        </button>
        <Link to="/list">
          <button className="button-list">Xem danh sách!</button>
        </Link>
      </form>
    </>
  );
};

export default CreateWork;