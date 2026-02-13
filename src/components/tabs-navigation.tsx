'use client';

import { tabs, type TabId } from '@/lib/data';
import { cn } from '@/lib/utils';

type TabsNavigationProps = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
};

export default function TabsNavigation({ activeTab, setActiveTab }: TabsNavigationProps) {
  return (
    <>
      {/* Sticky nav for desktop */}
      <nav className="sticky top-0 z-40 bg-card border-b-4 border-foreground hidden md:flex shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 py-4 px-4 text-xl font-headline transition-all duration-200 ease-in-out',
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground scale-105 shadow-inner'
                : 'hover:bg-primary/10',
              tab.id === 'game' && activeTab !== tab.id && 'text-primary'
            )}
          >
            {tab.name}
          </button>
        ))}
      </nav>
      {/* Fixed bottom nav for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t-4 border-foreground flex md:hidden shadow-lg">
         {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-label={tab.name}
            className={cn(
              'flex-1 flex flex-col items-center justify-center py-2 text-xs font-headline transition-all duration-200 ease-in-out',
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground',
              tab.id === 'game' && activeTab !== tab.id && 'text-primary'
            )}
          >
            <tab.icon className="w-6 h-6 mb-1" />
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
