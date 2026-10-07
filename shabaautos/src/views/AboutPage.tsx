import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ScreenId } from '../types';
import { ContentPageLayout, RouteLink, usePageMetadata } from './ContentPageLayout';

interface AboutPageProps {
  onNavigate: (screen: ScreenId) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  usePageMetadata('About ShabaAutos', 'Learn about ShabaAutos, an automotive marketplace helping customers buy, sell, rent and import quality vehicles.');

  return (
    <ContentPageLayout
      eyebrow="About ShabaAutos"
      title="About ShabaAutos"
      intro="ShabaAutos is a trusted automotive marketplace helping customers buy, sell, rent and import quality vehicles with greater confidence and convenience."
      onNavigate={onNavigate}
    >
      <section className="about-copy-panel" aria-label="About ShabaAutos">
        <div className="about-copy-accent" aria-hidden="true" />
        <div>
          <p>We connect buyers with vehicle owners, dealers and automotive partners while providing practical support across vehicle sales, rentals, third-party listings and import services.</p>
          <p>Our goal is simple: to make finding, selling and accessing the right vehicle easier, safer and more transparent.</p>
          <p className="about-signoff"><strong>ShabaAutos®</strong><span>Drive a Better Tomorrow.</span></p>
        </div>
      </section>
      <div className="content-cta-row">
        <RouteLink screen="buy-cars" onNavigate={onNavigate} className="content-button content-button-primary">
          Browse available vehicles <ArrowRight size={16} aria-hidden="true" />
        </RouteLink>
        <RouteLink screen="faq" onNavigate={onNavigate} className="content-button content-button-secondary">Frequently Asked Questions</RouteLink>
      </div>
    </ContentPageLayout>
  );
}
