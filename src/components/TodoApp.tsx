import React, { useState, useCallback } from 'react';
import { TodoItem } from './TodoItem';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const { toast } = useToast();

  const addTask = useCallback(() => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTasks(prev => [task, ...prev]);
      setNewTask('');
      toast({
        title: "Task added! 🎉",
        description: "Ready to get things done?",
        className: "bg-warm-cream border-warm-orange text-warm-brown",
      });
    }
  }, [newTask, toast]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task removed",
      description: "One less thing to worry about!",
      className: "bg-warm-cream border-warm-peach text-warm-brown",
    });
  }, [toast]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-warm-yellow/20 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-warm-orange to-warm-peach bg-clip-text text-transparent mb-2">
            My Tasks
          </h1>
          <p className="text-warm-brown/70 text-lg">
            Make today amazing, one task at a time ✨
          </p>
          {totalCount > 0 && (
            <div className="mt-4 text-warm-brown/60">
              {completedCount} of {totalCount} tasks completed
            </div>
          )}
        </div>

        {/* Add Task Form */}
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-warm-orange/20 shadow-lg shadow-warm-orange/10">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="What would you like to accomplish today?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-warm-orange/30 focus:border-warm-orange focus:ring-warm-orange/20 bg-white/50 placeholder:text-warm-brown/40"
            />
            <Button
              onClick={addTask}
              disabled={!newTask.trim()}
              className="bg-gradient-to-r from-warm-orange to-warm-peach hover:from-warm-orange/90 hover:to-warm-peach/90 text-white shadow-md hover:shadow-lg transition-all duration-200 px-6"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <Card className="p-12 text-center bg-white/60 backdrop-blur-sm border-warm-orange/20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-warm-brown mb-2">
                Ready to start?
              </h3>
              <p className="text-warm-brown/60">
                Add your first task above and let's make it happen!
              </p>
            </Card>
          ) : (
            tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        {/* Completed Tasks Summary */}
        {completedCount > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-warm-orange/10 rounded-full text-warm-brown/70">
              🎉 Great job! You've completed {completedCount} task{completedCount !== 1 ? 's' : ''} today!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};