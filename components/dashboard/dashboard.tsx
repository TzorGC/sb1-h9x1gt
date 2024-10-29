'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import CampaignOverview from './campaign-overview';
import AdvancedAnalytics from './advanced-analytics';
import ContentCalendar from './content-calendar';
import AIRecommendations from './ai-recommendations';
import ABTestDashboard from './ab-testing/ab-test-dashboard';
import ActivityFeed from './collaboration/activity-feed';
import DataExport from './export/data-export';
import BrandSwitcher from './brand-switcher';
import { mockCampaigns, mockPosts, mockAnalytics, mockBrands, mockRecommendations } from '@/lib/mock-data';
import { Moon, Sun, Menu, LayoutDashboard, Calendar, LineChart, Lightbulb, TestTube, Users, Download } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', id: 'overview', icon: LayoutDashboard },
  { name: 'Calendar', id: 'calendar', icon: Calendar },
  { name: 'Analytics', id: 'analytics', icon: LineChart },
  { name: 'AI Insights', id: 'ai-insights', icon: Lightbulb },
  { name: 'A/B Testing', id: 'ab-testing', icon: TestTube },
  { name: 'Team', id: 'team', icon: Users },
  { name: 'Export', id: 'export', icon: Download },
];

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [currentBrand, setCurrentBrand] = useState(mockBrands[0].id);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="px-4 py-2">
        <BrandSwitcher
          brands={mockBrands}
          currentBrand={currentBrand}
          onBrandChange={setCurrentBrand}
        />
      </div>
      <div className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveView(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          );
        })}
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <CampaignOverview campaigns={mockCampaigns} posts={mockPosts} />;
      case 'calendar':
        return <ContentCalendar posts={mockPosts} />;
      case 'analytics':
        return <AdvancedAnalytics data={mockAnalytics} />;
      case 'ai-insights':
        return <AIRecommendations recommendations={mockRecommendations} />;
      case 'ab-testing':
        return <ABTestDashboard campaigns={mockCampaigns} />;
      case 'team':
        return <ActivityFeed />;
      case 'export':
        return <DataExport />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 border-r">
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tight mb-2">Marketing Hub</h1>
            <p className="text-sm text-muted-foreground">Campaign Management</p>
          </div>
          <ScrollArea className="flex-1 px-4">
            <NavContent />
          </ScrollArea>
          <Separator />
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b w-full">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight mb-2">Marketing Hub</h1>
                <p className="text-sm text-muted-foreground">Campaign Management</p>
              </div>
              <ScrollArea className="flex-1 px-4">
                <NavContent />
              </ScrollArea>
              <Separator />
              <div className="p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <BrandSwitcher
            brands={mockBrands}
            currentBrand={currentBrand}
            onBrandChange={setCurrentBrand}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-y-auto p-8",
          "lg:ml-64"
        )}>
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}