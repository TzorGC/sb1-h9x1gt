export type Campaign = {
  id: string;
  title: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  platform: 'instagram' | 'tiktok' | 'all';
  scheduledDate?: string;
  brand?: string;
  metrics: {
    reach: number;
    engagement: number;
    roi: number;
    conversionRate: number;
    sentiment: number;
  };
  aiInsights?: {
    performancePrediction: number;
    recommendedActions: string[];
    audienceMatch: number;
  };
  abTest?: {
    variant: string;
    controlGroup: string;
    testGroup: string;
    significance: number;
  };
};

export type AnalyticsData = {
  reach: number[];
  engagement: number[];
  roi: number[];
  dates: string[];
  predictions: {
    reach: number[];
    engagement: number[];
    roi: number[];
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  demographics: {
    age: Record<string, number>;
    gender: Record<string, number>;
    location: Record<string, number>;
  };
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  campaigns: string[];
  metrics: {
    totalReach: number;
    avgEngagement: number;
    roi: number;
  };
};

export type AIRecommendation = {
  type: 'content' | 'timing' | 'audience' | 'budget';
  confidence: number;
  suggestion: string;
  impact: {
    metric: string;
    prediction: number;
  };
  reasoning: string;
};