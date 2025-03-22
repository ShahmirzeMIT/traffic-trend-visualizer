
import { useState, useEffect } from 'react';
import { Moon, Sun, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/controls/DateRangePicker';
import ExportButton from '@/components/controls/ExportButton';

const Header = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="w-full px-6 py-6 animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-start">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1 animate-slide-down">Dashboard</span>
            <h1 className="text-3xl font-medium tracking-tight animate-slide-up">Analytics Overview</h1>
          </div>
          
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <DateRangePicker />
            <ExportButton />
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full h-9 w-9 transition-all duration-200"
            >
              {darkMode ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
