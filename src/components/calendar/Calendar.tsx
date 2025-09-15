import React, { FunctionComponent, useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import { Task, Category } from "../../models/models";
import TaskModal from "../modal/TaskModal";
import {
    DndContext,
    DragEndEvent,
} from "@dnd-kit/core";

import DraggableTask from "../draggableTask/DraggableTask"
import "./calendar.scss";

const Calendar: FunctionComponent = () => {
    const currentMonth = new Date(2025, 7, 1);
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start, end });

    const [tasks, setTasks] = useState<Task[]>([]);
    const [dragStart, setDragStart] = useState<Date | null>(null);
    const [dragEnd, setDragEnd] = useState<Date | null>(null);
    const [showModal, setShowModal] = useState(false);

    const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const handleMouseDown = (day: Date) => {
        setDragStart(day);
        setDragEnd(day);
    };

    const handleMouseEnter = (day: Date) => {
        if (dragStart) {
            setDragEnd(day);
        }
    };

    const handleMouseUp = () => {
        if (dragStart && dragEnd) {
            setShowModal(true);
        }
    };

    const saveTask = (name: string, category: Category) => {
        if (dragStart && dragEnd) {
            const task: Task = {
                id: Date.now().toString(),
                name,
                category,
                startDate: dragStart < dragEnd ? dragStart.toISOString() : dragEnd.toISOString(),
                endDate: dragStart > dragEnd ? dragStart.toISOString() : dragEnd.toISOString(),
            };
            setTasks([...tasks, task]);
        }
        setShowModal(false);
        setDragStart(null);
        setDragEnd(null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const dayString = over.id as string;
        const dayDate = new Date(dayString);

        setTasks((prev) =>
            prev.map((t) =>
                t.id === active.id
                    ? {
                        ...t,
                        startDate: dayDate.toISOString(),
                        endDate: dayDate.toISOString(),
                    }
                    : t
            )
        );
    };

    const getGridDay = (day: Date) => {
        const isSelected =
            dragStart &&
            dragEnd &&
            day >= (dragStart < dragEnd ? dragStart : dragEnd) &&
            day <= (dragStart > dragEnd ? dragStart : dragEnd);

        const dayTasks = tasks.filter(
            (t) => day >= new Date(t.startDate) && day <= new Date(t.endDate)
        );

        return (
            <div
                key={day.toString()}
                className={`calendar-block day ${isSelected ? "selected" : ""}`}
                onMouseDown={() => handleMouseDown(day)}
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseUp={handleMouseUp}
            >
                <span className="date">{format(day, "d")}</span>
                {dayTasks.map((t) => (
                    // <div key={t.id} className={`task ${t.category.toLowerCase().replace(" ", "-")}`}>
                    //     {t.name}
                    // </div>
                    <DraggableTask key={t.id} task={t} />
                ))}
            </div>
        )
    }

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                {weekDays.map((day) => (
                    <div key={day} className="calendar-block header">
                        {day}
                    </div>
                ))}
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <div className="calendar-grid">
                    {days.map((day) => (
                        getGridDay(day)
                    ))}
                </div>
            </DndContext>
            {
                showModal && (
                    <TaskModal
                        onSave={saveTask}
                        onCancel={() => {
                            setShowModal(false);
                            setDragStart(null);
                            setDragEnd(null);
                        }}
                    />
                )
            }
        </div >
    )
}

export default Calendar;
