"use client";

import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar1Icon, Clock, Tag, PlusCircle, CheckCircle2, Filter, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  category?: string;
}

const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: "task1",
      text: "Complete dashboard layout",
      completed: false,
      dueDate: "2023-10-15",
      priority: "high",
      category: "Design"
    },
    {
      id: "task2",
      text: "Fix responsive issues on mobile view",
      completed: false,
      dueDate: "2023-10-16",
      priority: "medium",
      category: "Bug Fix"
    },
    {
      id: "task3",
      text: "Implement dark mode toggle",
      completed: false,
      priority: "low",
      category: "Feature"
    },
    {
      id: "task4",
      text: "Add user authentication",
      completed: false,
      dueDate: "2023-10-20",
      priority: "high",
      category: "Security"
    },
    {
      id: "task5",
      text: "Create data visualization components",
      completed: false,
      priority: "medium",
      category: "Design"
    },
    {
      id: "task6",
      text: "Write unit tests for components",
      completed: false,
      dueDate: "2023-10-18",
      priority: "medium",
      category: "Testing"
    },
    {
      id: "task7",
      text: "Optimize performance",
      completed: false,
      priority: "low",
      category: "Optimization"
    },
    {
      id: "task8",
      text: "Deploy to staging environment",
      completed: false,
      dueDate: "2023-10-25",
      priority: "high",
      category: "DevOps"
    },
  ]);

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return !todo.completed;
    if (activeTab === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const progressPercentage = (completedCount / todos.length) * 100;

  return (
    <div className="p-6 bg-white dark:bg-gray-950 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Task Manager</h1>
        <Button size="sm" variant="outline" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{completedCount} of {todos.length} tasks</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Date picker */}
      <div className="mb-6">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Calendar1Icon className="h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <ScrollArea className="max-h-[400px] overflow-y-auto pr-2">
            <div className="flex flex-col gap-3">
              {filteredTodos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">No tasks found</p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <Card
                    key={todo.id}
                    className={`p-4 hover:bg-muted/30 transition-all border-l-4 ${
                      todo.completed
                        ? "border-l-green-500 bg-green-50/50 dark:bg-green-950/10"
                        : todo.priority === "high"
                          ? "border-l-red-500"
                          : todo.priority === "medium"
                            ? "border-l-yellow-500"
                            : "border-l-blue-500"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id={todo.id}
                        checked={todo.completed}
                        onCheckedChange={() => handleToggleTodo(todo.id)}
                        className="mt-1"
                      />
                      <div className="flex flex-col gap-1 flex-grow">
                        <div className="flex items-start justify-between">
                          <label
                            htmlFor={todo.id}
                            className={`text-sm font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {todo.text}
                          </label>
                          {todo.priority && (
                            <Badge variant="outline" className={`ml-2 ${
                              todo.priority === "high"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : todo.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}>
                              {todo.priority}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1">
                          {todo.category && (
                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                              <Tag className="h-3 w-3" />
                              <span>{todo.category}</span>
                            </div>
                          )}
                          {todo.dueDate && (
                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Due: {todo.dueDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <ScrollArea className="max-h-[400px] overflow-y-auto pr-2">
            <div className="flex flex-col gap-3">
              {filteredTodos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">No active tasks</p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <Card
                    key={todo.id}
                    className={`p-4 hover:bg-muted/30 transition-all border-l-4 ${
                      todo.priority === "high"
                        ? "border-l-red-500"
                        : todo.priority === "medium"
                          ? "border-l-yellow-500"
                          : "border-l-blue-500"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id={todo.id}
                        checked={todo.completed}
                        onCheckedChange={() => handleToggleTodo(todo.id)}
                        className="mt-1"
                      />
                      <div className="flex flex-col gap-1 flex-grow">
                        <div className="flex items-start justify-between">
                          <label
                            htmlFor={todo.id}
                            className="text-sm font-medium"
                          >
                            {todo.text}
                          </label>
                          {todo.priority && (
                            <Badge variant="outline" className={`ml-2 ${
                              todo.priority === "high"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : todo.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}>
                              {todo.priority}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1">
                          {todo.category && (
                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                              <Tag className="h-3 w-3" />
                              <span>{todo.category}</span>
                            </div>
                          )}
                          {todo.dueDate && (
                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Due: {todo.dueDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <ScrollArea className="max-h-[400px] overflow-y-auto pr-2">
            <div className="flex flex-col gap-3">
              {filteredTodos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">No completed tasks</p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <Card
                    key={todo.id}
                    className="p-4 hover:bg-muted/30 transition-all border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/10"
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id={todo.id}
                        checked={todo.completed}
                        onCheckedChange={() => handleToggleTodo(todo.id)}
                        className="mt-1"
                      />
                      <div className="flex flex-col gap-1 flex-grow">
                        <div className="flex items-start justify-between">
                          <label
                            htmlFor={todo.id}
                            className="text-sm font-medium line-through text-muted-foreground"
                          >
                            {todo.text}
                          </label>
                          {todo.priority && (
                            <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              {todo.priority}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1">
                          {todo.category && (
                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                              <Tag className="h-3 w-3" />
                              <span>{todo.category}</span>
                            </div>
                          )}
                          {todo.dueDate && (
                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Due: {todo.dueDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TodoList;
