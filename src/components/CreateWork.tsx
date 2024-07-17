import React, { useState, FC } from 'react';

// Define the props type
interface CreateWorkProps {
  addTask: (task: string) => void;
}

const CreateWork: FC<CreateWorkProps> = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) return;
    addTask(task);
    setTask('');
  };

  return (
    <form className="create-work-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Thêm công việc mới"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      {/* Rest of your component */}
    </form>
  );
};

export default CreateWork;