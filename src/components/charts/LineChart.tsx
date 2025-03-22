
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '@/hooks/useTheme';

Chart.register(...registerables);

interface LineChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const LineChart = ({ data }: LineChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Daily Visits',
            data: data.values,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: isDarkMode ? '#1e293b' : '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointHoverBorderColor: isDarkMode ? '#1e293b' : '#ffffff',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            titleColor: isDarkMode ? '#fff' : '#111',
            bodyColor: isDarkMode ? '#fff' : '#111',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            bodyFont: {
              family: "'SF Pro Display', sans-serif",
            },
            titleFont: {
              family: "'SF Pro Display', sans-serif",
              weight: '500',
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: isDarkMode ? '#94a3b8' : '#64748b',
              font: {
                family: "'SF Pro Display', sans-serif",
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              precision: 0,
              color: isDarkMode ? '#94a3b8' : '#64748b',
              font: {
                family: "'SF Pro Display', sans-serif",
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, isDarkMode]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
