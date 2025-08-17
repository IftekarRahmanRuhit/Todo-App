import { AddTaskModal } from "@/components/TaskCard/AddTaskModal";
import TaskCard from "@/components/TaskCard/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectTasks, updateFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CheckSquare, Filter } from "lucide-react";

export default function Tasks() {
  // const tasks = useAppSelector((state) => state.todo.tasks);// we can use this to access the tasks directly
  // but using the selector function is a better practice for reusability and separation of concerns
  const tasks = useAppSelector(selectTasks); // using the selector function to access the tasks

  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CheckSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Task Management
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 ml-11">
            Organize and track your tasks efficiently
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Task Count */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Tasks:
              </span>
              <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
                {tasks.length}
              </span>
            </div>

            {/* Filter and Add Task */}
            <div className="flex items-center gap-3">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-700">
                    <TabsTrigger 
                      onClick={() => dispatch(updateFilter("all"))} 
                      value="all"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger 
                      onClick={() => dispatch(updateFilter("low"))} 
                      value="low"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
                    >
                      Low
                    </TabsTrigger>
                    <TabsTrigger 
                      onClick={() => dispatch(updateFilter("medium"))} 
                      value="medium"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
                    >
                      Medium
                    </TabsTrigger>
                    <TabsTrigger 
                      onClick={() => dispatch(updateFilter("high"))} 
                      value="high"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
                    >
                      High
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Add Task Button */}
              <div className="flex items-center gap-2">
                <AddTaskModal />
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List Section */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <CheckSquare className="h-12 w-12 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No tasks found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {tasks.length === 0 
                  ? "Get started by creating your first task" 
                  : "No tasks match the current filter"
                }
              </p>
              <AddTaskModal />
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
