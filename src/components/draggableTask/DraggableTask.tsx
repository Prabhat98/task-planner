import React, { FunctionComponent } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "../../models/models";

interface DraggableTaskProps {
    task: Task
}

const DraggableTask: FunctionComponent<DraggableTaskProps> = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`task ${task.category.toLowerCase().replace(" ", "-")}`}
        >
            {task.name}
            <span className="resize-handle left" />
            <span className="resize-handle right" />
        </div>
    );
};

export default DraggableTask;
