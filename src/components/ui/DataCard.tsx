
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DataCard = ({ title, children, className }: DataCardProps) => {
  return (
    <div className={cn("card-glass p-6 animate-scale-in", className)}>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="chart-container">
        {children}
      </div>
    </div>
  );
};

export default DataCard;
