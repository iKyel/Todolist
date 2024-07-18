import React, { useState, FC } from "react";
import { Link } from "react-router-dom";

interface WorkListProps {
  /*...*/
}

const CreateWork: FC<WorkListProps> = () => {
  const storageWork = JSON.parse(localStorage.getItem("workList") || "[]");

  const [work, setWork] = useState<string>("");
  const [workList, setWorkList] = useState<string[]>(storageWork);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWorkList((prev) => {
      const newWork = [...prev, work];
      const jsonWorkList = JSON.stringify(newWork);
      localStorage.setItem("workList", jsonWorkList);
      return newWork;
    });
    setWork(""); // Clear input after adding
  };
  return (
    <>
      <form className="create-work-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="task-input"
          placeholder="Thêm công việc mới"
          value={work}
          onChange={(e) => setWork(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit} className="submit-button">
          Thêm
        </button>
        {/* Rest of your component */}
        <Link to="/list">
          <button className="button-list">Xem danh sách!</button>
        </Link>
      </form>
    </>
  );
};

export default CreateWork;
