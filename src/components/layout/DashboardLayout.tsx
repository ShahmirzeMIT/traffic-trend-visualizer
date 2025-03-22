
import { ReactNode } from 'react';
import Header from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-6 pb-8 pt-2">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      <footer className="px-6 py-4 border-t border-border">
        <div className="container mx-auto">
          <div className="text-sm text-muted-foreground text-center">
            Analytics Dashboard &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
