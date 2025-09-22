import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Trash2, Check } from 'lucide-react';
import { Task } from './TodoApp';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggle = () => {
    if (!task.completed) {
      setIsCompleting(true);
      setTimeout(() => {
        onToggle(task.id);
        setIsCompleting(false);
      }, 600);
    } else {
      onToggle(task.id);
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Card className={cn(
      "p-4 bg-white/70 backdrop-blur-sm border-warm-orange/20 hover:border-warm-orange/40 transition-all duration-200 hover:shadow-md hover:shadow-warm-orange/10",
      task.completed && "bg-warm-cream/50 border-warm-peach/30",
      isCompleting && "animate-task-complete"
    )}>
      <div className="flex items-center gap-4 group">
        {/* Custom Checkbox with Animation */}
        <div className="relative">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggle}
            className={cn(
              "w-6 h-6 border-2 border-warm-orange data-[state=checked]:bg-warm-orange data-[state=checked]:border-warm-orange transition-all duration-200",
              isCompleting && "scale-110"
            )}
          />
          {(task.completed || isCompleting) && (
            <Check 
              className={cn(
                "w-4 h-4 text-white absolute top-1 left-1 pointer-events-none",
                isCompleting && "animate-checkmark"
              )}
              strokeWidth={3}
            />
          )}
        </div>

        {/* Task Text */}
        <div className="flex-1">
          <p className={cn(
            "text-foreground transition-all duration-300",
            task.completed && "line-through text-warm-brown/50",
            isCompleting && "text-warm-brown/70"
          )}>
            {task.text}
          </p>
          <p className="text-sm text-warm-brown/40 mt-1">
            {task.createdAt.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        {/* Delete Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/10 hover:text-destructive text-warm-brown/40 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Completion Celebration Effect */}
      {isCompleting && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-2xl animate-bounce-in">
            ✅
          </div>
        </div>
      )}
    </Card>
  );
};