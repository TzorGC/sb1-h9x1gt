'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Campaign } from '@/lib/types';
import { BarChart, ChevronRight, Users } from 'lucide-react';

interface ABTestDashboardProps {
  campaigns: Campaign[];
}

export default function ABTestDashboard({ campaigns }: ABTestDashboardProps) {
  const activeCampaigns = campaigns.filter(c => c.abTest);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">A/B Testing</h2>
          <p className="text-muted-foreground">
            Optimize your campaigns with data-driven decisions
          </p>
        </div>
        <Button>
          <BarChart className="mr-2 h-4 w-4" />
          New Test
        </Button>
      </div>

      <div className="grid gap-4">
        {activeCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">{campaign.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Testing: {campaign.abTest?.variant}
                </p>
              </div>
              <Badge variant={campaign.abTest?.significance > 95 ? 'default' : 'outline'}>
                {campaign.abTest?.significance}% Confidence
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Control Group</span>
                    </div>
                    <span className="text-sm font-medium">
                      {campaign.abTest?.controlGroup}%
                    </span>
                  </div>
                  <Progress value={parseFloat(campaign.abTest?.controlGroup || '0')} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Test Group</span>
                    </div>
                    <span className="text-sm font-medium">
                      {campaign.abTest?.testGroup}%
                    </span>
                  </div>
                  <Progress value={parseFloat(campaign.abTest?.testGroup || '0')} />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Insights</h4>
                <ul className="text-sm space-y-1">
                  <li className="text-muted-foreground">
                    • Test group shows {parseFloat(campaign.abTest?.testGroup || '0') - 
                      parseFloat(campaign.abTest?.controlGroup || '0')}% improvement
                  </li>
                  <li className="text-muted-foreground">
                    • {campaign.abTest?.significance}% statistical significance achieved
                  </li>
                </ul>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View Detailed Results <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}