import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WorkItem } from "./WorkStore";
import { WorkContext } from "./WorkContext";

const CreateWork = () => {
  const [workText, setWorkText] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const workStore = useContext(WorkContext);

  const location = useLocation();
  const navigate = useNavigate();

  const editingWorkId = location.state?.editingWorkId;

  useEffect(() => {
    if (editingWorkId) {
      const editingWork = workStore.workList.find(
        (work) => work._id === editingWorkId
      );
      if (editingWork) {
        setWorkText(editingWork.text);
      }
    }
  }, [editingWorkId, workStore.workList]);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Tạo URL tạm thời để hiển thị ảnh đã chọn
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!workText.trim()) return;

    if (editingWorkId) {
      await workStore.editWork(editingWorkId, workText, imageFile);
    } else {
      const newWorkItem: WorkItem = {
        _id: editingWorkId,
        text: workText,
        image: imageFile,
        completed: false,
      };
      await workStore.addWork(newWorkItem, imageFile);
    }
    setWorkText("");
    setImageFile(null);
    setImagePreviewUrl(null); // Reset preview ảnh
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
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {imagePreviewUrl && (
          <div className="image-preview">
            <img src={imagePreviewUrl} alt="Ảnh đã chọn" />
          </div>
        )}
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
