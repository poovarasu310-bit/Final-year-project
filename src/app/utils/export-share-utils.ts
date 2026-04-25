import { toast } from 'sonner';

/**
 * Copy text to clipboard with multiple fallback methods
 */
const copyToClipboardFallback = (text: string): boolean => {
  try {
    // Method 1: Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.focus();
    textarea.select();
    
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (err) {
      // execCommand copy failed, silently continue
      successful = false;
    }
    
    document.body.removeChild(textarea);
    return successful;
  } catch (error) {
    // Fallback copy failed silently
    return false;
  }
};

/**
 * Show modal with shareable text when all copy methods fail
 */
const showShareTextModal = (title: string, text: string) => {
  // Create a simple prompt-style modal
  const userAction = window.confirm(
    `${title}\n\n${text}\n\nClick OK to continue.`
  );
};

/**
 * Generate share text based on step and data
 */
export const generateShareText = (stepName: string, data: any): string => {
  let shareText = `I just completed ${stepName} of compound analysis!\n\n`;
  
  if (data) {
    // Add key highlights from the data
    if (data.molecularWeight) {
      shareText += `Molecular Weight: ${data.molecularWeight.toFixed(2)} Da\n`;
    }
    if (data.logP) {
      shareText += `LogP: ${data.logP.toFixed(2)}\n`;
    }
    if (data.violationsCount !== undefined) {
      shareText += `Lipinski Violations: ${data.violationsCount}\n`;
    }
    if (data.activityScore) {
      shareText += `Activity Score: ${data.activityScore.toFixed(2)}\n`;
    }
    if (data.bioavailabilityScore) {
      shareText += `Bioavailability: ${data.bioavailabilityScore.toFixed(2)}\n`;
    }
  }
  
  shareText += '\nCheck out the full medicinal plants compound analysis platform!';
  return shareText;
};

/**
 * Export report in various formats
 */
export const exportReport = (
  data: any,
  title: string,
  format: 'pdf' | 'json' | 'csv',
  contentId?: string
) => {
  try {
    if (format === 'pdf') {
      // Use browser print dialog for PDF export
      window.print();
      toast.success('Opening print dialog', {
        description: 'Select "Save as PDF" in the print dialog'
      });
    } else if (format === 'json') {
      // Export as JSON file
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('JSON file downloaded');
    } else if (format === 'csv') {
      // Export as CSV file
      let csvContent = 'Property,Value\n';
      
      // Convert data object to CSV rows
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          csvContent += `${key},${JSON.stringify(value)}\n`;
        } else {
          csvContent += `${key},${value}\n`;
        }
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('CSV file downloaded');
    }
  } catch (error) {
    toast.error('Export failed', {
      description: 'Please try again or use a different format'
    });
  }
};

/**
 * Share results using Web Share API or fallback to copy link
 */
export const shareResults = async (title: string, text: string, url?: string) => {
  try {
    // Check if Web Share API is available
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: text,
        url: url || window.location.href
      });
      toast.success('Shared successfully');
      return;
    }
  } catch (error) {
    // User cancelled share dialog or share API failed
    if (error instanceof Error && error.name === 'AbortError') {
      return; // User cancelled, don't show error
    }
    // Share API not available, silently continue to fallback
  }

  // Fallback: Try clipboard methods
  const shareText = `${title}\n\n${text}\n\n${url || window.location.href}`;
  
  // Try modern Clipboard API first (if permissions allow)
  try {
    await navigator.clipboard.writeText(shareText);
    toast.success('Share link copied to clipboard', {
      description: 'Paste it anywhere to share your results'
    });
    return;
  } catch (clipboardError) {
    // Clipboard API blocked or not available, use fallback silently
  }

  // Try fallback copy method
  const fallbackSuccess = copyToClipboardFallback(shareText);
  if (fallbackSuccess) {
    toast.success('Share link copied to clipboard', {
      description: 'Paste it anywhere to share your results'
    });
    return;
  }

  // All methods failed - show the text in a dialog
  toast.info('Share text ready', {
    description: 'Select and copy the text below',
    duration: 10000
  });

  // Create a modal to display the share text
  showShareTextModal(title, shareText);
};

/**
 * Save analysis to local storage and show success toast
 */
export const saveAnalysis = (data: any, title: string) => {
  try {
    const savedAnalyses = JSON.parse(localStorage.getItem('saved_analyses') || '[]');
    savedAnalyses.push({
      id: Date.now().toString(),
      title,
      summary: data ? (data.compoundName || data.name || 'Unknown Compound') : 'Analysis',
      dateSaved: new Date().toISOString(),
      data
    });
    localStorage.setItem('saved_analyses', JSON.stringify(savedAnalyses));
    toast.success('Analysis Saved Successfully', {
      description: 'You can access this later from your dashboard.'
    });
  } catch (error) {
    toast.error('Failed to save analysis', {
      description: 'Local storage might be full or disabled.'
    });
  }
};