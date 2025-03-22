export interface AnalyticsData {
  totalVisits: number;
  totalUsers: number;
  averageSessionDuration: number;
  bounceRate: number;
  pages: {
    data: {
      labels: string[];
      values: number[];
    };
    trend: number;
  };
  countries: {
    data: {
      labels: string[];
      values: number[];
    };
    trend: number;
  };
  dailyVisits: {
    data: {
      labels: string[];
      values: number[];
    };
    trend: number;
  };
}

export const getMockAnalyticsData = (): AnalyticsData => {
  return {
    totalVisits: 87429,
    totalUsers: 24853,
    averageSessionDuration: 265, // in seconds
    bounceRate: 32.4, // percentage
    pages: {
      data: {
        labels: [
          '/home',
          '/products',
          '/pricing',
          '/blog',
          '/about',
          '/contact',
          '/login',
          '/signup',
        ],
        values: [34521, 21389, 18732, 15678, 12563, 8742, 7891, 6432],
      },
      trend: 12.5,
    },
    countries: {
      data: {
        labels: [
          'United States',
          'India',
          'United Kingdom',
          'Germany',
          'Canada',
          'France',
          'Australia',
          'Japan',
        ],
        values: [42567, 18943, 12354, 8765, 7842, 6543, 5421, 4982],
      },
      trend: 8.2,
    },
    dailyVisits: {
      data: {
        labels: generatePastDays(14), // Last 14 days
        values: generateRandomVisits(14, 1500, 3000),
      },
      trend: 4.8,
    },
  };
};

// Helper function to generate array of past dates
function generatePastDays(days: number): string[] {
  const result = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    result.push(formatDate(pastDate));
  }
  
  return result;
}

// Format date as 'MMM DD'
function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

// Generate random visit numbers
function generateRandomVisits(count: number, min: number, max: number): number[] {
  const result = [];
  let prevValue = Math.floor(Math.random() * (max - min) + min);
  
  for (let i = 0; i < count; i++) {
    // Ensure values are somewhat related to previous value (for more realistic data)
    const change = Math.floor(Math.random() * 400) - 200; // Random change between -200 and +200
    let newValue = prevValue + change;
    
    // Keep within boundaries
    newValue = Math.max(min, Math.min(max, newValue));
    
    result.push(newValue);
    prevValue = newValue;
  }
  
  return result;
}
