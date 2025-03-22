
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnalyticsData, getMockAnalyticsData } from '@/data/mockData';

interface AnalyticsContextType {
  analytics: AnalyticsData;
  isLoading: boolean;
  error: Error | null;
  refreshData: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({} as AnalyticsData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = getMockAnalyticsData();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching analytics data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return (
    <AnalyticsContext.Provider value={{ analytics, isLoading, error, refreshData }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
