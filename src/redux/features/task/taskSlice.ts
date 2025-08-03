import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState{
    tasks: ITask[];
    filter: "All" | "High" | "Medium" | "Low";
}


const initialState : InitialState = {
  tasks: [
    {
      id: "asdfghjklsasfasdsaaavgvvs",
      title: "Initialize Frontend",
      description: "Create Home Page and Routing",
      dueDate: "2025-08-25",
      isCompleted: false,
      priority: "High",
    },
    {
      id: "asdfghjklsasfassdasdasad",
      title: "Init Github Repository",
      description: "Create Stage Branch",
      dueDate: "2025-08-25",
      isCompleted: false,
      priority: "Medium",
    },
    {
    id: "create-Api",
    title: "Build REST API",
    description: "Setup Express server and basic routes",
    dueDate: "2025-08-28",
    isCompleted: false,
    priority: "High",
  },
  {
    id: "Auth-system",
    title: "Implement Authentication",
    description: "Add JWT-based login and registration",
    dueDate: "2025-08-30",
    isCompleted: false,
    priority: "High",
  },
  {
    id: "DB-schema",
    title: "Design Database Schema",
    description: "Create schema for Users and Tasks in MongoDB",
    dueDate: "2025-08-27",
    isCompleted: true,
    priority: "Medium",
  },
  ],
  filter : "All", 
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const selectTasks = (state:RootState) => {
    return state.todo.tasks
};
export const selectFilter = (state:RootState) => {
    return state.todo.filter
};

export default taskSlice.reducer;
