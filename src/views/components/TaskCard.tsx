import { useState } from "react";
import { Task } from "../../types/global.types";
import { Modal } from "antd";
import StatusTag from "./StatusTag";
import PriorityTag from "./PriorityTag";
import { Popconfirm } from 'antd';
import { useDeleteTask } from "../../providers/app_commons";
import TaskForm from "./TaskForm";

const TaskCard = ({ task, onDragStart }: { task: Task; onDragStart: (event: React.DragEvent, task: Task) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { mutate: handleDelete } = useDeleteTask()

    return (
        <div className=" w-full">
            <Modal open={openEdit} onCancel={() => setOpenEdit(false)} destroyOnClose footer={null}>
                <TaskForm onTaskCreated={() => {
                    setOpenEdit(false)
                    setIsModalOpen(false)}
                } task={task} mode={"edit"} />
            </Modal>
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} destroyOnClose footer={null}>
                <h3 className="font-bold text-lg capitalize">{task.title}</h3>
                <div className="flex mt-5">
                    <div className="w-1/2">
                        <span className="text-gray-60 font-semibold0">Due Date:</span> &nbsp;
                        <span>{task.due_date}</span>
                    </div>

                </div>
                <div className="flex mt-5">
                    <div className="w-1/2">
                        <span className="text-gray-600 font-semibold">Priority:</span> &nbsp;
                        <PriorityTag priority={task.priority} />
                    </div>
                    <div className="w-1/2 ">
                        <span className="text-gray-600 font-semibold">Status:</span> &nbsp;
                        <StatusTag status={task.status} />
                    </div>
                </div>

                <div className="flex mt-5">
                    <div className="w-full">
                        <span className="text-gray-600 font-semibold">Description:</span> &nbsp;
                        <span>{task.description}</span>
                    </div>

                </div>
                <div className="flex mt-5 gap-4">
                    <div className="w-1/2 text-white bg-blue-400 p-3 font-semibold text-center rounded-md cursoir-pointer" onClick={() => setOpenEdit(true)}>Edit</div>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(task.id as number)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div className="w-1/2 text-white bg-red-400 p-3 font-semibold text-center rounded-md cursoir-pointer">Delete</div>
                    </Popconfirm>
                </div>
            </Modal>
            <div
                onClick={() => setIsModalOpen(true)}
                draggable
                onDragStart={(event) => onDragStart(event, task)}
                className="bg-white p-4 rounded-md mt-3 cursor-grab shadow hover:shadow-md transition-transform duration-200 hover:scale-105"
            >
                <div className="font-bold text-lg capitalize mb-3">{task.title}</div>
                <div className=" mb-4">
                    <span className=" font-semibold">Due Date:</span> &nbsp;
                    <span className="">{ task.due_date}</span>
                </div>
                <PriorityTag priority={task.priority} />
            </div>
        </div>
    );
};

export default TaskCard;
