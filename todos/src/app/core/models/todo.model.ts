import { Types } from "src/app/shared/components/todo-card/todo-card.component";

export interface ITodo {
    id?: number;
    title: string;
    description: string;
    status: Types;
    created_at?: string;
    updated_at?: string;
}