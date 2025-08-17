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
  Plus
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
