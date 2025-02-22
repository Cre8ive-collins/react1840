import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../types/global.types";
import { useAllTasks, useUpdateTask } from "../../providers/app_commons";
import CreateTask from "./CreateTask";
import { PlusCircleOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { Spin, Tooltip } from "antd";

const TaskBoard = () => {
    const statusLabels = ["To Do", "In Progress", "Completed"];
    const { data: tasks, isLoading } = useAllTasks();
    const { mutate: updateTaskMutation, isPending } = useUpdateTask();

    // State to store sorting order for each column
    const [sortOrders, setSortOrders] = useState<Record<number, "asc" | "desc">>({});

    // Handle drag start
    const handleDragStart = (event: React.DragEvent, task: Task) => {
        event.dataTransfer.setData("task", JSON.stringify(task));
    };

    // Handle drag over (allow drop)
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    // Handle drop (update task status)
    const handleDrop = (event: React.DragEvent, newStatus: 0 | 1 | 2) => {
        event.preventDefault();
        const taskData = event.dataTransfer.getData("task");
        if (!taskData) return;

        const task: Task = JSON.parse(taskData);
        if (task.status !== newStatus) {
            updateTaskMutation({ ...task, status: newStatus });
        }
    };

    // Toggle sorting order
    const toggleSortOrder = (statusIndex: number) => {
        setSortOrders((prev) => ({
            ...prev,
            [statusIndex]: prev[statusIndex] === "asc" ? "desc" : "asc",
        }));
    };

    if (!isLoading && !tasks?.length) {
        return (
            <div className="w-full flex flex-col h-80 justify-center items-center">
                <h1 className="text-2xl font-bold">No Tasks</h1>
                <p className="text-center">Create a task to get started</p>
            </div>
        )
    }

    return (
        <div className="w-full relative ">
            {isPending && <Spin className="absolute top-0 left-0" />}
            <div className="md:flex gap-4 my-5 md:w-full">
                {statusLabels.map((status, index) => {
                    // Get sorting order
                    const sortOrder = sortOrders[index] || "dec";

                    // Filter and sort tasks by due date
                    const sortedTasks = tasks
                        ?.filter((task) => task.status === index)
                        .sort((a, b) => {
                            const dateA = new Date(a.due_date).getTime();
                            const dateB = new Date(b.due_date).getTime();
                            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
                        });

                    return (
                        <div
                            key={status}
                            className="bg-gray-100 p-4 rounded-md md:w-1/3 w-full min-h-[200px] max-h-[750px] overflow-y-auto mt-5"
                            onDragOver={handleDragOver}
                            onDrop={(event) => handleDrop(event, index as 0 | 1 | 2)}
                        >
                            <div className="flex font-bold text-lg justify-between sticky top-0 bg-gray-100 z-[1000]" >
                                <span>
                                    {status} &nbsp;
                                    <Tooltip title="Sort By Due Date">
                                        <SortDescendingOutlined onClick={() => toggleSortOrder(index)} className="cursor-pointer" />
                                    </Tooltip>
                                </span>
                                <span>
                                    <CreateTask AddButton={<PlusCircleOutlined />} stat={index as 0 | 1 | 2} />
                                </span>
                            </div>
                            {sortedTasks?.map((task) => (
                                <TaskCard key={task.id} task={task} onDragStart={handleDragStart} />
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskBoard;
