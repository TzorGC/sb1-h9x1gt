'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, FileSpreadsheet, FileJson, FilePdf } from 'lucide-react';

const exportOptions = [
  {
    id: 'campaign-metrics',
    label: 'Campaign Metrics',
    description: 'Performance data for all campaigns',
  },
  {
    id: 'engagement-analytics',
    label: 'Engagement Analytics',
    description: 'Detailed engagement metrics and trends',
  },
  {
    id: 'ab-test-results',
    label: 'A/B Test Results',
    description: 'Complete A/B testing data and insights',
  },
];

const formats = [
  { id: 'xlsx', label: 'Excel', icon: FileSpreadsheet },
  { id: 'json', label: 'JSON', icon: FileJson },
  { id: 'pdf', label: 'PDF', icon: FilePdf },
];

export default function DataExport() {
  const [selectedFormat, setSelectedFormat] = useState('xlsx');
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const handleExport = () => {
    // Implementation for export functionality
    console.log('Exporting:', { format: selectedFormat, data: selectedData });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Export Data</h3>
          <p className="text-sm text-muted-foreground">
            Select the data you want to export and choose your preferred format
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">Data Selection</h4>
            <div className="space-y-2">
              {exportOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedData.includes(option.id)}
                    onCheckedChange={(checked) => {
                      setSelectedData(
                        checked
                          ? [...selectedData, option.id]
                          : selectedData.filter((id) => id !== option.id)
                      );
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Export Format</h4>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => {
                  const Icon = format.icon;
                  return (
                    <SelectItem key={format.id} value={format.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{format.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            disabled={selectedData.length === 0}
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Selected Data
          </Button>
        </div>
      </div>
    </Card>
  );
}