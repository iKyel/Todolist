import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const WorkList = () => {
  const storageWork = JSON.parse(localStorage.getItem("workList") || "[]");
  const [workList, setWorkList] = useState<string[]>(storageWork);
  return (
    <>
      <div className="work-list">
        <div className="on-going">
          Danh sách công việc đang tiến hành
          <ul>
            {workList.map((workItem, index) => (
              <li key={index}>{workItem}</li>
            ))}
          </ul>
        </div>

        <div className="completed">Danh sách công việc đã hoàn thành</div>
        <Link to="/create">
          <button className="button-create">Tạo công việc mới</button>
        </Link>
      </div>
    </>
  );
};

export default WorkList;
