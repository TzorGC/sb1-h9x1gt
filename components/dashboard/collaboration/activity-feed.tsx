'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Share2, Edit } from 'lucide-react';

type Activity = {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'comment' | 'like' | 'share' | 'edit';
};

const activities: Activity[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      initials: 'SC',
    },
    action: 'commented on',
    target: 'Summer Campaign Analytics',
    timestamp: '5m ago',
    type: 'comment',
  },
  {
    id: '2',
    user: {
      name: 'Alex Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      initials: 'AK',
    },
    action: 'liked',
    target: 'Q2 Performance Report',
    timestamp: '15m ago',
    type: 'like',
  },
];

const iconMap = {
  comment: MessageSquare,
  like: ThumbsUp,
  share: Share2,
  edit: Edit,
};

export default function ActivityFeed() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">Recent Activity</h3>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type];
            return (
              <div key={activity.id} className="flex gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-muted-foreground">{activity.action}</span>
                    <span className="font-medium">{activity.target}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4" />
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}