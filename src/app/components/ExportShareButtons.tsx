import React, { useState } from 'react';
import { Download, Share2, FileText, FileJson, FileSpreadsheet, BookmarkPlus } from 'lucide-react';
import { exportReport, shareResults, generateShareText } from '../utils/export-share-utils';

interface ExportShareButtonsProps {
  data: any;
  stepName: string;
  stepTitle: string;
  contentId?: string;
  showFormatSelector?: boolean;
}

export function ExportShareButtons({
  data,
  stepName,
  stepTitle,
  contentId,
  showFormatSelector = false
}: ExportShareButtonsProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: 'pdf' | 'json' | 'csv') => {
    exportReport(data, stepTitle, format, contentId);
    setShowExportMenu(false);
  };

  const handleShare = () => {
    const shareText = generateShareText(stepName, data);
    shareResults(stepTitle, shareText);
  };

  const handleSave = () => {
    import('../utils/export-share-utils').then((m) => {
      m.saveAnalysis(data, stepTitle || stepName);
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Save Button */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
      >
        <BookmarkPlus className="w-4 h-4" />
        Save
      </button>

      {/* Export Report Button */}
      <div className="relative">
        {showFormatSelector ? (
          <>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>

            {/* Export Format Dropdown */}
            {showExportMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-red-500" />
                    <span>Export as PDF</span>
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileJson className="w-4 h-4 text-blue-500" />
                    <span>Export as JSON</span>
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-green-500" />
                    <span>Export as CSV</span>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        )}
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
}
