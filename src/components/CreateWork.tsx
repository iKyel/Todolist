import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WorkItem } from "./WorkStore";
import { WorkContext } from "./WorkContext";

const CreateWork = () => {
  const [workText, setWorkText] = useState<string>("");
  const workStore = useContext(WorkContext);

  const location = useLocation();
  const navigate = useNavigate();

  const editingWorkId = location.state?.editingWorkId;

  useEffect(() => {
    if (editingWorkId) {
      const editingWork = workStore.workList.find(work => work._id === editingWorkId);
      if (editingWork) {
        setWorkText(editingWork.text);
      }
    }
  }, [editingWorkId, workStore.workList]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!workText.trim()) return;

    if (editingWorkId) {
      await workStore.editWork(editingWorkId, workText);
    } else {
      const newWorkItem: WorkItem = {
        _id: editingWorkId,
        text: workText,
        completed: false
      };
      await workStore.addWork(newWorkItem);
    }
    setWorkText("");
    navigate("/list");
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
          {editingWorkId ? "Cập nhật" : "Thêm"}
        </button>
        <Link to="/list">
          <button className="button-list">Xem danh sách!</button>
        </Link>
      </form>
    </>
  );
};

export default CreateWork;
