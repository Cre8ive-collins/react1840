export interface Task {
    id?: number;
    title: string;
    description: string;
    priority: "low" | "high" | "medium";
    status: 0 | 1 | 2;
    tag: string[];
    due_date: string;
  }
  