'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TabsNavigation from '@/components/tabs-navigation';
import CastSection from '@/components/sections/cast-section';
import ScheduleSection from '@/components/sections/schedule-section';
import GameSection from '@/components/sections/game-section';
import InfoSection from '@/components/sections/info-section';
import type { TabId } from '@/lib/data';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('cast');

  return (
    <div className="flex min-h-screen flex-col pb-24 md:pb-0">
      <Header />
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-10 w-full">
        <div id="cast" className={`tab-content ${activeTab === 'cast' ? 'active' : ''}`}>
          <CastSection />
        </div>
        <div id="schedule" className={`tab-content ${activeTab === 'schedule' ? 'active' : ''}`}>
          <ScheduleSection />
        </div>
        <div id="game" className={`tab-content ${activeTab === 'game' ? 'active' : ''}`}>
          <GameSection />
        </div>
        <div id="info" className={`tab-content ${activeTab === 'info' ? 'active' : ''}`}>
          <InfoSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
