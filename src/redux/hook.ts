import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";


// This hook is used to access the state from the Redux store with proper typing
// It allows components to select parts of the state with type safety
export const useAppSelector = useSelector.withTypes<RootState>();

// This hook is used to access the dispatch function from the Redux store with proper typing
// It allows components to dispatch actions with type safety
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();