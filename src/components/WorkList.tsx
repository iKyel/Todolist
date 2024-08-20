import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WorkContext } from "./WorkContext";
import { observer } from "mobx-react-lite";

const WorkList = observer(() => {
  const navigate = useNavigate();
  const workStore = useContext(WorkContext);
  const [editingId, setEditingId] = useState<string>("");
  const [newText, setNewText] = useState<string>("");

  const handleComplete = async (id: string) => {
    await workStore.completeWork(id);
  };

  const handleDelete = async (id: string) => {
    await workStore.deleteWork(id);
  };

  const handleEdit = (workItemId: string) => {
    navigate("/create", { state: { editingWorkId: workItemId } });
  };

  const handleSaveEdit = async (id: string) => {
    await workStore.editWork(id, newText);
    setEditingId("");
  };

  return (
    <>
      <div className="work-list">
        <div className="on-going">
          Danh sách công việc đang tiến hành
          <ul>
            {workStore.ongoingWork.map((workItem) => (
              <li key={workItem._id}>
                  <>
                    {workItem.text}
                    <button onClick={() => handleComplete(workItem._id)}>
                      Complete
                    </button>
                    <button onClick={() => handleDelete(workItem._id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        handleEdit(workItem._id)
                      }}
                    >
                      Edit
                    </button>
                  </>
              </li>
            ))}
          </ul>
        </div>

        <div className="completed">
          Danh sách công việc đã hoàn thành
          <ul>
            {workStore.completedWork.map((workItem) => (
              <li key={workItem._id}>
                {workItem.text}
                <button onClick={() => handleDelete(workItem._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/create">
          <button className="button-create">Tạo công việc mới</button>
        </Link>
      </div>
    </>
  );
});

export default WorkList;