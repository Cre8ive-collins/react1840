import React, { useEffect, useState } from "react";
import { Task } from "../../types/global.types";
import { useCreateTask, useUpdateTask } from "../../providers/app_commons";

const TaskForm: React.FC<{ onTaskCreated?: () => void, stat?: 0 | 1 | 2, task?: Task, mode?: "create" | "edit" }> = ({ onTaskCreated, stat, task, mode }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<"low" | "high" | "medium">(task?.priority || "low");
  const [status, setStatus] = useState<0 | 1 | 2>(task?.status || stat || 0);
  const [tag, setTag] = useState(task?.tag.join(",") || "");
  const [dueDate, setDueDate] = useState(task?.due_date || "");
  const { mutate: createTask, isSuccess } = useCreateTask();
  const { mutate: updateTask, isSuccess: isUpdateSuccess } = useUpdateTask()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Omit<Task, "id"> = {
      title,
      description,
      priority,
      status,
      tag: tag.split(",").map((t) => t.trim()),
      due_date: dueDate,
    };
    if (mode === "edit") {
      updateTask({ id: task?.id, ...newTask })
    } else {
      createTask(newTask);
    }

  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      onTaskCreated && onTaskCreated()
    }
  }, [isSuccess, isUpdateSuccess]);

  return (
    <form onSubmit={handleSubmit} className=" max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Create a Task</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="low">Low</option>
        <option value="medium">medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(Number(e.target.value) as any)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value={0}>Pending</option>
        <option value={1}>In Progress</option>
        <option value={2}>Completed</option>
      </select>

      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
