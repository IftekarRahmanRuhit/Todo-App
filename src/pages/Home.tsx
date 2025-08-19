import { Link } from "react-router";
import { 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  BarChart3,
  ArrowRight,
  Star,
  Bell,
  Plus,
  Calendar,
  Lightbulb,
  Activity,
  Filter,
  CalendarDays,
  CheckCircle,
  AlertTriangle,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTaskModal } from "@/components/TaskCard/AddTaskModal";
import { useAppSelector } from "@/redux/hook";
import { selectTasks } from "@/redux/features/task/taskSlice";

export default function Home() {
  const tasks = useAppSelector(selectTasks);
  
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const pendingTasks = tasks.length - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === "high").length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === "medium").length;
  const lowPriorityTasks = tasks.filter(task => task.priority === "low").length;

  // Calculate upcoming deadlines (due in next 7 days)
  const upcomingDeadlines = tasks
    .filter(task => !task.isCompleted)
    .filter(task => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return dueDate <= nextWeek && dueDate >= today;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  // Calculate overdue tasks
  const overdueTasks = tasks
    .filter(task => !task.isCompleted)
    .filter(task => new Date(task.dueDate) < new Date())
    .length;

  // Calculate completion rate
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Get recent completed tasks (last 5)
  const recentCompleted = tasks
    .filter(task => task.isCompleted)
    .slice(-5)
    .reverse();

  // Daily motivational quote
  const motivationalQuotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The future depends on what you do today. - Mahatma Gandhi",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The way to get started is to quit talking and begin doing. - Walt Disney"
  ];
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const features = [
    {
      icon: Target,
      title: "Smart Task Management",
      description: "Organize tasks with priority levels and due dates for better productivity."
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor your progress and stay on top of deadlines with our intuitive interface."
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Visual insights into your productivity patterns and task completion rates."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy controls."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with team members on shared tasks and projects."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed with instant updates and real-time synchronization."
    }
  ];

  const stats = [
    {
      icon: CheckSquare,
      label: "Total Tasks",
      value: tasks.length,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Target,
      label: "Completed",
      value: completedTasks,
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Clock,
      label: "Pending",
      value: pendingTasks,
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: Bell,
      label: "High Priority",
      value: highPriorityTasks,
      color: "text-red-600 dark:text-red-400"
    }
  ];

  const quickActions = [
    {
      icon: Plus,
      title: "Add New Task",
      description: "Create a new task quickly",
      action: "add",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Calendar,
      title: "View Calendar",
      description: "See your schedule",
      action: "calendar",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Filter,
      title: "Filter Tasks",
      description: "Organize by priority",
      action: "filter",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      icon: BarChart3,
      title: "View Analytics",
      description: "Check your progress",
      action: "analytics",
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  <Star className="h-4 w-4" />
                  <span>Most Popular Todo App</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  Organize Your Life,{" "}
                  <span className="text-blue-600 dark:text-blue-400">One Task at a Time</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  Transform your productivity with our intuitive task management platform. 
                  Stay organized, meet deadlines, and achieve your goals with ease.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <AddTaskModal />
                <Button variant="outline" size="lg" asChild>
                  <Link to="/tasks" className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    View All Tasks
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <CheckSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Today's Tasks
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === "high" ? "bg-red-500" :
                        task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`} />
                      <span className={`flex-1 text-sm ${task.isCompleted ? "line-through text-slate-500" : "text-slate-700 dark:text-slate-300"}`}>
                        {task.title}
                      </span>
                      {task.isCompleted && (
                        <CheckSquare className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                  
                  {tasks.length === 0 && (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No tasks yet. Create your first task!</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Quick Actions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Get things done faster with these quick actions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`${action.color} text-white rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                  <action.icon className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Overview Section */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Your Dashboard Overview
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Stay on top of your tasks and productivity
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Deadlines */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <CalendarDays className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Upcoming Deadlines
                </h3>
              </div>
              
              <div className="space-y-3">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          task.priority === "high" ? "bg-red-500" :
                          task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                        }`} />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{task.title}</span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-500 dark:text-slate-400">
                    <CalendarDays className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No upcoming deadlines</p>
                  </div>
                )}
              </div>
              
              {overdueTasks > 0 && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">{overdueTasks} overdue task(s)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Recent Activity
                </h3>
              </div>
              
              <div className="space-y-3">
                {recentCompleted.length > 0 ? (
                  recentCompleted.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-700 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300 line-through">
                        {task.title}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-500 dark:text-slate-400">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Productivity Insights */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Productivity Insights
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {completionRate}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Completion Rate
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">High Priority</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{highPriorityTasks}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Medium Priority</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{mediumPriorityTasks}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Low Priority</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{lowPriorityTasks}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Lightbulb className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Daily Motivation</h3>
            <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
              "{randomQuote}"
            </p>
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      {recentCompleted.length > 0 && (
        <section className="py-12 bg-white dark:bg-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Recent Achievements
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Celebrate your completed tasks
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCompleted.slice(0, 6).map((task, index) => (
                <div key={task.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      Achievement #{index + 1}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {task.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Task Categories Breakdown */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Task Categories Overview
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Visual breakdown of your task distribution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  High Priority
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                  {highPriorityTasks}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {tasks.length > 0 ? Math.round((highPriorityTasks / tasks.length) * 100) : 0}% of total
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Medium Priority
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                  {mediumPriorityTasks}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {tasks.length > 0 ? Math.round((mediumPriorityTasks / tasks.length) * 100) : 0}% of total
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Low Priority
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {lowPriorityTasks}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {tasks.length > 0 ? Math.round((lowPriorityTasks / tasks.length) * 100) : 0}% of total
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Completed
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {completedTasks}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {completionRate}% completion rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Tips Section */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Productivity Tips
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Boost your productivity with these helpful tips
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Prioritize Wisely
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Focus on high-priority tasks first. Use the Eisenhower Matrix to distinguish between urgent and important tasks.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Time Blocking
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Allocate specific time slots for different tasks. This helps maintain focus and prevents multitasking.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Break It Down
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Break large tasks into smaller, manageable chunks. This makes them less overwhelming and easier to complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Task Templates */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Quick Task Templates
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Use these templates to quickly create common tasks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Daily Review
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Review today's progress and plan tomorrow's tasks
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3 w-3" />
                <span>15 min</span>
                <span>•</span>
                <span>Daily</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Weekly Planning
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Plan your week ahead and set major goals
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3 w-3" />
                <span>30 min</span>
                <span>•</span>
                <span>Weekly</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Goal Setting
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Set SMART goals for the month or quarter
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3 w-3" />
                <span>45 min</span>
                <span>•</span>
                <span>Monthly</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Progress Review
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Review your progress and adjust strategies
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3 w-3" />
                <span>20 min</span>
                <span>•</span>
                <span>Bi-weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Everything You Need to Stay Productive
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Powerful features designed to help you organize, track, and complete tasks efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 animate-gradient"></div>
       
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl animate-pulse delay-1500"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 border border-white/30">
              <Zap className="h-4 w-4" />
              <span>Join 10,000+ Productive Users</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Productivity?
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of users who have already improved their task management 
              and achieved their goals with our powerful platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-4 text-lg font-semibold" asChild>
                <Link to="/tasks" className="flex items-center gap-3">
                  <Plus className="h-6 w-6" />
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white/50 text-white hover:bg-white hover:text-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-4 text-lg font-semibold backdrop-blur-sm" asChild>
                <Link to="/users" className="flex items-center gap-3">
                  <Users className="h-6 w-6" />
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/80">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99%</div>
                <div className="text-white/80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Stats */}
      <section className="py-12 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className={`flex justify-center ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
