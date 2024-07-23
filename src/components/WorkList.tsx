// Old Code

/*
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WorkItem } from "./WorkItem";

const WorkList = () => {
  const storageWork = JSON.parse(localStorage.getItem("workList") || "[]");
  const [workList, setWorkList] = useState<WorkItem[]>(
    storageWork.filter((item: WorkItem) => !item.completed)
  );
  const [completedWork, setCompletedWork] = useState<WorkItem[]>(
    storageWork.filter((item: WorkItem) => item.completed)
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newText, setNewText] = useState<string>("");

  const handleComplete = (id: number) => {
    const updatedWorkList = workList
      .map((item) => {
        if (item.id === id) {
          item.completed = true;
        }
        return item;
      })
      .filter((item) => !item.completed);
    const updatedCompletedWork = [
      ...completedWork,
      ...workList.filter((item) => item.id === id),
    ];
    setWorkList(updatedWorkList);
    setCompletedWork(updatedCompletedWork);
    localStorage.setItem(
      "workList",
      JSON.stringify([...updatedWorkList, ...updatedCompletedWork])
    );
  };

  const handleDelete = (id: number) => {
    const updatedWorkList = workList.filter((item) => item.id !== id);
    const updatedCompletedWork = completedWork.filter((item) => item.id !== id);
    setWorkList(updatedWorkList);
    setCompletedWork(updatedCompletedWork);
    localStorage.setItem(
      "workList",
      JSON.stringify([...updatedWorkList, ...updatedCompletedWork])
    );
  };

  const handleEdit = (id: number, newText: string) => {
    const updatedWorkList = workList.map((item) => {
      if (item.id === id) {
        item.text = newText;
      }
      return item;
    });
    setWorkList(updatedWorkList);
    localStorage.setItem(
      "workList",
      JSON.stringify([...updatedWorkList, ...completedWork])
    );
  };

  return (
    <>
      <div className="work-list">
        <div className="on-going">
          Danh sách công việc đang tiến hành
          <ul>
            {workList.map((workItem) => (
              <li key={workItem.id}>
                {editingId === workItem.id ? (
                  <>
                    <input
                      type="text"
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        handleEdit(workItem.id, newText);
                        setEditingId(null);
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {workItem.text}
                    <button onClick={() => handleComplete(workItem.id)}>
                      Complete
                    </button>
                    <button onClick={() => handleDelete(workItem.id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(workItem.id);
                        setNewText(workItem.text);
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="completed">
          Danh sách công việc đã hoàn thành
          <ul>
            {completedWork.map((workItem) => (
              <li key={workItem.id}>
                {workItem.text}{" "}
                <button onClick={() => handleDelete(workItem.id)}>
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
};

export default WorkList;
*/

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WorkContext } from "./WorkContext";
import { observer } from "mobx-react-lite";

const WorkList = observer(() => {
  const navigate = useNavigate();
  const workStore = useContext(WorkContext);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newText, setNewText] = useState<string>("");

  const handleComplete = (id: number) => {
    workStore.completeWork(id);
  };

  const handleDelete = (id: number) => {
    workStore.deleteWork(id);
  };

  const handleEdit = (workItemId: number) => {
    navigate("/create", { state: { editingWorkId: workItemId } });
  };

  return (
    <>
      <div className="work-list">
        <div className="on-going">
          Danh sách công việc đang tiến hành
          <ul>
            {workStore.ongoingWork.map((workItem) => (
              <li key={workItem.id}>
                  <>
                    {workItem.text}
                    <button onClick={() => handleComplete(workItem.id)}>
                      Complete
                    </button>
                    <button onClick={() => handleDelete(workItem.id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        handleEdit(workItem.id)
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
              <li key={workItem.id}>
                {workItem.text}
                <button onClick={() => handleDelete(workItem.id)}>
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
