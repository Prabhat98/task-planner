import React, { useState, FunctionComponent } from "react";
import { Category } from "../../models/models"
import "./taskModal.scss"

interface TaskModalProps {
    onSave: (name: string, category: Category) => void;
    onCancel: () => void;
}

const TaskModal: FunctionComponent<TaskModalProps> = ({ onSave, onCancel }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState<Category>("To Do");

    return (
        <div className="modal">
            <h3>Create Task</h3>
            <div className="modal-fields">
                <input
                    type="text"
                    placeholder="Task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                </select>
                <button onClick={() => onSave(name, category)}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default TaskModal;