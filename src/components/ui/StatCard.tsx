
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: ReactNode; // Changed from 'string | number' to 'ReactNode' to accept Skeleton components
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("card-glass p-5 flex flex-col animate-scale-in", className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-1">
        <span className="text-2xl font-semibold">{value}</span>
      </div>
      {trend && (
        <div className="mt-2 flex items-center">
          <span className={cn(
            "text-xs font-medium",
            trend.isPositive ? "text-green-500" : "text-red-500"
          )}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
