'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AIRecommendation } from '@/lib/types';
import { Lightbulb, Clock, Users, DollarSign, ArrowRight } from 'lucide-react';

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

const typeIcons = {
  content: Lightbulb,
  timing: Clock,
  audience: Users,
  budget: DollarSign,
};

export default function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">AI Recommendations</h3>
          <p className="text-sm text-muted-foreground">
            Smart insights to optimize your campaigns
          </p>
        </div>
        <Badge variant="secondary">AI-Powered</Badge>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = typeIcons[rec.type];
            return (
              <Card key={index} className="p-4 hover:bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{rec.type.charAt(0).toUpperCase() + rec.type.slice(1)} Optimization</h4>
                      <Badge variant="outline">{rec.confidence}% Confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.suggestion}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Expected Impact: </span>
                        <span className="font-medium">{rec.impact.metric}: +{rec.impact.prediction}%</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Apply <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}