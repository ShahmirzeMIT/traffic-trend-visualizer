
import { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataCard from '@/components/ui/DataCard';
import StatCard from '@/components/ui/StatCard';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import LineChart from '@/components/charts/LineChart';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ThemeProvider } from '@/hooks/useTheme';
import { AnalyticsProvider } from '@/hooks/useAnalytics';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { Clock, Users, MousePointerClick, ArrowUpRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const DashboardContent = () => {
  const { analytics, isLoading, error } = useAnalytics();
  const { trackEvent } = useGoogleAnalytics();

  useEffect(() => {
    // Track page view
    trackEvent('view', 'dashboard', 'analytics_dashboard');
  }, [trackEvent]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Error loading data</h3>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Visits" 
          value={isLoading ? <Skeleton className="h-8 w-24" /> : analytics.totalVisits.toLocaleString()}
          icon={<ArrowUpRight size={18} />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard 
          title="Unique Users" 
          value={isLoading ? <Skeleton className="h-8 w-24" /> : analytics.totalUsers.toLocaleString()}
          icon={<Users size={18} />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard 
          title="Avg. Session Duration" 
          value={isLoading ? <Skeleton className="h-8 w-24" /> : formatTime(analytics.averageSessionDuration)}
          icon={<Clock size={18} />}
          trend={{ value: 1.7, isPositive: true }}
        />
        <StatCard 
          title="Bounce Rate" 
          value={isLoading ? <Skeleton className="h-8 w-24" /> : `${analytics.bounceRate}%`}
          icon={<MousePointerClick size={18} />}
          trend={{ value: 2.3, isPositive: false }}
        />
      </div>

      {/* Chart Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataCard title="Most Visited Pages">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <BarChart data={analytics.pages.data} />
          )}
        </DataCard>
        <DataCard title="Traffic by Country">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <PieChart data={analytics.countries.data} />
          )}
        </DataCard>
      </div>

      <DataCard title="Daily Traffic Trend">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <LineChart data={analytics.dailyVisits.data} />
        )}
      </DataCard>
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <AnalyticsProvider>
        <DashboardLayout>
          <DashboardContent />
        </DashboardLayout>
      </AnalyticsProvider>
    </ThemeProvider>
  );
};

export default Index;
