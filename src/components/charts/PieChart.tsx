
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '@/hooks/useTheme';

Chart.register(...registerables);

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const PieChart = ({ data }: PieChartProps) => {
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

    // Colors for pie segments (soft pastel colors)
    const colors = [
      'rgba(59, 130, 246, 0.8)', // blue
      'rgba(16, 185, 129, 0.8)', // green
      'rgba(249, 115, 22, 0.8)', // orange
      'rgba(139, 92, 246, 0.8)', // purple
      'rgba(236, 72, 153, 0.8)', // pink
      'rgba(14, 165, 233, 0.8)', // light blue
      'rgba(245, 158, 11, 0.8)', // amber
      'rgba(168, 85, 247, 0.8)', // violet
    ];

    const hoverColors = [
      'rgba(59, 130, 246, 1)', // blue
      'rgba(16, 185, 129, 1)', // green
      'rgba(249, 115, 22, 1)', // orange
      'rgba(139, 92, 246, 1)', // purple
      'rgba(236, 72, 153, 1)', // pink
      'rgba(14, 165, 233, 1)', // light blue
      'rgba(245, 158, 11, 1)', // amber
      'rgba(168, 85, 247, 1)', // violet
    ];

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: colors.slice(0, data.values.length),
            hoverBackgroundColor: hoverColors.slice(0, data.values.length),
            borderWidth: 2,
            borderColor: isDarkMode ? 'rgba(30, 41, 59, 1)' : 'rgba(255, 255, 255, 1)',
            hoverBorderColor: isDarkMode ? 'rgba(30, 41, 59, 1)' : 'rgba(255, 255, 255, 1)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        radius: '90%',
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: 'easeOutQuart',
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              color: isDarkMode ? '#e2e8f0' : '#334155',
              font: {
                family: "'SF Pro Display', sans-serif",
                size: 12,
              },
            },
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
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw;
                const total = context.dataset.data.reduce((acc: number, data: number) => acc + data, 0);
                const percentage = Math.round((value as number / total) * 100);
                return `${label}: ${percentage}% (${value})`;
              }
            },
            bodyFont: {
              family: "'SF Pro Display', sans-serif",
            },
            titleFont: {
              family: "'SF Pro Display', sans-serif",
              weight: '500',
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

export default PieChart;
