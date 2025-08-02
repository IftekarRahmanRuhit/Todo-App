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
      id: "asdfghjklsasfas",
      title: "Initialize Frontend",
      description: "Create Home Page and Routing",
      dueDate: "2025-08-25",
      isCompleted: false,
      priority: "High",
    },
    {
      id: "asdfghjklsasfas",
      title: "Init Github Repository",
      description: "Create Stage Branch",
      dueDate: "2025-08-25",
      isCompleted: false,
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
