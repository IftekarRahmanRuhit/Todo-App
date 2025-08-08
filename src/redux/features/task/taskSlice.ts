import type { RootState } from "@/redux/store";
import type { ITask } from "../../../types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

// Defining the shape of the slice state
interface InitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

// Initial state for the slice
const initialState: InitialState = {
  tasks: [
    {
      id: "asdfghjklsasfas",
      title: "Initialize Frontend",
      description: "Create Home Page and Routing",
      dueDate: "2025-08-25",
      isCompleted: false,
      priority: "high",
    },
  ],
  filter: "all",
};

// Defining the shape of form data (without id and isCompleted)
type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
  return {
    id: nanoid(), // Auto-generate a unique task ID
    isCompleted: false, // New tasks are incomplete by default
    ...taskData, // Spread the rest of the form values
  };
};

// Creating the Redux slice
export const taskSlice = createSlice({
  name: "task",
  initialState, 
  reducers: {
    // Reducer to add a new task to the list
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const taskData = createTask(action.payload);
      state.tasks.push(taskData);
    },

    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateFilter: (
      state,
      action: PayloadAction<"all" | "low" | "medium" | "high">
    ) => {
      state.filter = action.payload;
    },
  },
});

// Selector to get all tasks from the Redux state
export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;

  if (filter === "low") {
    return state.todo.tasks.filter((task) => task.priority === "low");
  } else if (filter === "medium") {
    return state.todo.tasks.filter((task) => task.priority === "medium");
  } else if (filter === "high") {
    return state.todo.tasks.filter((task) => task.priority === "high");
  } else {
    return state.todo.tasks;
  }
};



// Selector to get the current filter
export const selectFilter = (state: RootState) => {
  return state.todo.filter; 
};

// Exporting the action(s) so components can dispatch them
export const { addTask, toggleCompleteState, deleteTask, updateFilter } =
  taskSlice.actions;

// Exporting the reducer so it can be added to the store
export default taskSlice.reducer;
