import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Edit, Save, X, AlertCircle, Clock, FileText, Tag } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useAppDispatch } from "@/redux/hook";
import { updateTask } from "@/redux/features/task/taskSlice";
import type { ITask } from "@/types";
import { useEffect, useState } from "react";

interface IProps {
  task: ITask;
}

export function UpdateTaskModal({ task }: IProps) {
  const form = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: new Date(task.dueDate),
    },
  });

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  // Reset form values when task prop changes or dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: new Date(task.dueDate),
      });
    }
  }, [task, open, form]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Format the date to string format
    const formattedData = {
      ...data,
      dueDate: format(data.dueDate, "yyyy-MM-dd"),
    };

    dispatch(updateTask({
      id: task.id,
      updates: formattedData as Partial<Pick<ITask, "title" | "description" | "dueDate" | "priority">>,
    }));
    setOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "low":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0 text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
        >
          <Edit size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Edit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Update Task
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400">
                Modify the task details below
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <FileText className="h-4 w-4" />
                    Task Title
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      value={field.value || ""} 
                      placeholder="Enter task title"
                      className="h-11 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <AlertCircle className="h-4 w-4" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      value={field.value || ""} 
                      placeholder="Enter task description"
                      className="min-h-[100px] border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Priority and Due Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Priority Field */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Tag className="h-4 w-4" />
                      Priority
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low" className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Low Priority
                        </SelectItem>
                        <SelectItem value="medium" className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Medium Priority
                        </SelectItem>
                        <SelectItem value="high" className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          High Priority
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Due Date Field */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Clock className="h-4 w-4" />
                      Due Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-11 pl-3 text-left font-normal border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400",
                              !field.value && "text-slate-500 dark:text-slate-400"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MMM dd, yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            {/* Current Task Info */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Current Task Info
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Status:</span>
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full border",
                    task.isCompleted 
                      ? "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800"
                      : "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800"
                  )}>
                    {task.isCompleted ? "Completed" : "Pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Priority:</span>
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full border capitalize",
                    getPriorityColor(task.priority)
                  )}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <DialogClose asChild>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Update Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
