'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Campaign, Post } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Instagram, TikTok, Plus, TrendingUp, Users, DollarSign } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CampaignOverviewProps {
  campaigns: Campaign[];
  posts: Post[];
}

export default function CampaignOverview({ campaigns, posts }: CampaignOverviewProps) {
  const stats = [
    {
      title: 'Active Campaigns',
      value: campaigns.filter((c) => c.status === 'active').length,
      icon: TrendingUp,
      trend: '+12.3%',
      trendUp: true,
    },
    {
      title: 'Total Reach',
      value: campaigns.reduce((acc, c) => acc + c.metrics.reach, 0).toLocaleString(),
      icon: Users,
      trend: '+8.7%',
      trendUp: true,
    },
    {
      title: 'Avg. Engagement Rate',
      value: `${(
        campaigns.reduce((acc, c) => acc + c.metrics.engagement, 0) / campaigns.length
      ).toFixed(1)}%`,
      icon: TrendingUp,
      trend: '-2.1%',
      trendUp: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaign Overview</h2>
          <p className="text-muted-foreground">
            Track and manage your marketing campaigns
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            {/* Campaign creation form would go here */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <Badge variant={stat.trendUp ? 'default' : 'destructive'} className="ml-auto">
                {stat.trend}
              </Badge>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</h3>
            <div className="text-3xl font-bold">{stat.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reach</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{campaign.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {campaign.platform === 'instagram' && <Instagram className="h-4 w-4" />}
                      {campaign.platform === 'tiktok' && <TikTok className="h-4 w-4" />}
                      {campaign.platform === 'all' && (
                        <>
                          <Instagram className="h-4 w-4" />
                          <TikTok className="h-4 w-4" />
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === 'active'
                          ? 'default'
                          : campaign.status === 'completed'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.metrics.reach.toLocaleString()}</TableCell>
                  <TableCell>{campaign.metrics.engagement}%</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      {campaign.metrics.roi}x
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
}