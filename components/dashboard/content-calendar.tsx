'use client';

import { Card } from '@/components/ui/card';
import { Post } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Instagram, TikTok } from 'lucide-react';

interface ContentCalendarProps {
  posts: Post[];
}

export default function ContentCalendar({ posts }: ContentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDatePosts = posts.filter(
    (post) =>
      post.scheduledFor && format(new Date(post.scheduledFor), 'yyyy-MM-dd') === format(date!, 'yyyy-MM-dd')
  );

  return (
    <div className="grid gap-4 md:grid-cols-[380px_1fr]">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">
          Scheduled Posts for {date ? format(date, 'MMMM d, yyyy') : 'Selected Date'}
        </h3>
        <div className="space-y-4">
          {selectedDatePosts.length === 0 ? (
            <p className="text-muted-foreground">No posts scheduled for this date.</p>
          ) : (
            selectedDatePosts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 rounded-md overflow-hidden">
                    <img
                      src={post.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.platform === 'instagram' ? (
                        <Instagram className="h-4 w-4" />
                      ) : (
                        <TikTok className="h-4 w-4" />
                      )}
                      <Badge variant="outline">
                        {format(new Date(post.scheduledFor!), 'h:mm a')}
                      </Badge>
                    </div>
                    <p className="text-sm">{post.content}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}