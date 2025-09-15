export type Category = "To Do" | "In Progress" | "Review" | "Completed";

export interface Task {
    id: string;
    name: string;
    category: Category;
    startDate: string;
    endDate: string;
}
