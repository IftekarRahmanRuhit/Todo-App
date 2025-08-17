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
import { CalendarIcon, Plus, Save, X, AlertCircle, Clock, FileText, Tag } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useAppDispatch } from "@/redux/hook";
import { addTask } from "@/redux/features/task/taskSlice";
import type { ITask } from "@/types";
import { useState } from "react";

export function AddTaskModal() {
  const form = useForm();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Format the date to string format if it exists
    const formattedData = {
      ...data,
      dueDate: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : "",
    };

    dispatch(addTask(formattedData as ITask));
    setOpen(false);
    form.reset(); // Reset form after submission
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Plus className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Create New Task
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400">
                Fill in the details below to create a new task
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

            {/* Task Creation Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Tips for Better Task Management
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• Use clear, descriptive titles</li>
                <li>• Set realistic due dates</li>
                <li>• Choose appropriate priority levels</li>
                <li>• Add detailed descriptions for complex tasks</li>
              </ul>
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
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
