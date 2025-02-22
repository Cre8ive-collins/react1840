import { Modal } from "antd";
import { ReactElement, useState } from "react";
import TaskForm from "./TaskForm";
import { PlusCircleOutlined } from "@ant-design/icons";

type Props = {
    AddButton?: ReactElement; 
    stat ?: 0 | 1 | 2
};

const CreateTask = ({ AddButton, stat }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            {/* Task Creation Modal */}
            <Modal
                destroyOnClose
                footer={null}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
            >
                <TaskForm onTaskCreated={() => setIsModalOpen(false)} stat={stat} />
            </Modal>

            {/* Custom Add Button (if provided) */}
            {AddButton ? <div onClick={() => setIsModalOpen(true)}>{AddButton}</div> : (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-400 text-white font-semibold p-3 rounded-md flex items-center gap-2"
                >
                    <PlusCircleOutlined />
                    Create Task
                </button>
            )}
        </div>
    );
};

export default CreateTask;
