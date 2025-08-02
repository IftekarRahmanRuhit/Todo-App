import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [
    {
      id: "asdfghjklsasfas",
      title: "Initialize Frontend",
      description: "Create Home Page and Routing",
      dueDate: "2025-08-25",
      isCompleted: false,
      priority: "High",
    },
  ],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
