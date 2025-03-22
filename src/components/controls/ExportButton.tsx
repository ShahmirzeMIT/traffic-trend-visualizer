
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useToast } from '@/components/ui/use-toast';

const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { analytics } = useAnalytics();
  const { toast } = useToast();

  const exportToCSV = () => {
    setIsExporting(true);
    
    try {
      // Export pages data
      const pagesData = analytics.pages.data;
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Headers
      csvContent += "Page,Visits\n";
      
      // Data rows
      pagesData.labels.forEach((label, index) => {
        csvContent += `${label},${pagesData.values[index]}\n`;
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "analytics_export.csv");
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export successful",
        description: "Your analytics data has been exported as CSV",
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={exportToCSV} 
      disabled={isExporting}
      className="rounded-full h-9 px-4 flex items-center transition-all duration-200"
    >
      <Download size={18} className="mr-2" />
      <span>Export CSV</span>
    </Button>
  );
};

export default ExportButton;
