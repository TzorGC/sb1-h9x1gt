import { Campaign, Post, AnalyticsData } from './types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Collection Launch',
    status: 'active',
    platform: 'all',
    scheduledDate: '2024-04-15',
    metrics: {
      reach: 50000,
      engagement: 15.7,
      roi: 3.2,
    },
  },
  {
    id: '2',
    title: 'Influencer Partnership',
    status: 'scheduled',
    platform: 'instagram',
    scheduledDate: '2024-04-20',
    metrics: {
      reach: 25000,
      engagement: 12.3,
      roi: 2.8,
    },
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    campaignId: '1',
    content: 'Introducing our new summer collection! 🌞 #SummerVibes',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    platform: 'instagram',
    status: 'published',
    scheduledFor: '2024-04-15T10:00:00Z',
    metrics: {
      likes: 1200,
      comments: 45,
      shares: 78,
    },
  },
  {
    id: '2',
    campaignId: '1',
    content: 'Behind the scenes of our summer shoot! ✨',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    platform: 'tiktok',
    status: 'scheduled',
    scheduledFor: '2024-04-16T15:00:00Z',
    metrics: {
      likes: 800,
      comments: 32,
      shares: 56,
    },
  },
];

export const mockAnalytics: AnalyticsData = {
  reach: [12000, 15000, 18000, 22000, 25000, 28000, 30000],
  engagement: [8.5, 9.2, 10.1, 12.3, 11.8, 13.2, 14.5],
  roi: [2.1, 2.3, 2.5, 2.8, 3.0, 3.2, 3.5],
  dates: [
    '2024-04-01',
    '2024-04-02',
    '2024-04-03',
    '2024-04-04',
    '2024-04-05',
    '2024-04-06',
    '2024-04-07',
  ],
};