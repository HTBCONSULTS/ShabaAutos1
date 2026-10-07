import React from 'react';
import { ArrowRight, FileText, MessageSquareText, Scale, ShieldCheck, RotateCcw, Store, CarFront, CircleDollarSign } from 'lucide-react';
import sharedNotices from '../content/policies/shared-notices.md?raw';
import { ScreenId } from '../types';
import { ContentPageLayout, RouteLink, usePageMetadata } from './ContentPageLayout';
import { PolicyMarkdown } from './PolicyDocumentPage';

interface PoliciesLegalPageProps {
  onNavigate: (screen: ScreenId) => void;
}

const policyLinks = [
  { screen: 'policy-terms-and-conditions', number: '01', title: 'Terms & Conditions', description: 'The general terms governing use of the ShabaAutos website, marketplace and services.', icon: Scale },
  { screen: 'policy-privacy', number: '02', title: 'Privacy Policy', description: 'How personal information may be collected, used, stored and shared.', icon: ShieldCheck },
  { screen: 'policy-refunds-and-cancellations', number: '03', title: 'Refunds & Cancellations', description: 'The source policy on cancellations, deposits and refunds for services.', icon: RotateCcw },
  { screen: 'policy-dealer-membership', number: '04', title: 'Dealer Membership Terms', description: 'Eligibility, membership plans and dealer responsibilities.', icon: Store },
  { screen: 'policy-rental-terms', number: '05', title: 'Vehicle Rental Terms', description: 'The terms for confirmed vehicle rentals and approved drivers.', icon: CarFront },
  { screen: 'policy-fees-and-charges', number: '06', title: 'Fees & Charges Policy', description: 'How applicable charges for marketplace and automotive services are communicated.', icon: CircleDollarSign },
] as const;

export function PoliciesLegalPage({ onNavigate }: PoliciesLegalPageProps) {
  usePageMetadata('Policies & Legal', 'Read the ShabaAutos terms, privacy, refund, dealer membership, vehicle rental and fees policies.');

  return (
    <ContentPageLayout
      eyebrow="Policies & Legal"
      title="Policies & Legal"
      intro="These policies govern the use of the ShabaAutos website, marketplace and related services. ShabaAutos provides services relating to vehicle buying, selling, third-party vehicle listings, rentals, vehicle sourcing and importation, dealer membership and other automotive services."
      onNavigate={onNavigate}
    >
      <div className="legal-date-notice" role="note">
        <span><strong>Effective Date:</strong> [Insert Date]</span>
        <span><strong>Last Updated:</strong> [Insert Date]</span>
      </div>

      <section className="policy-link-grid" aria-label="Individual policies">
        {policyLinks.map(({ screen, number, title, description, icon: Icon }) => (
          <React.Fragment key={screen}>
          <RouteLink screen={screen} onNavigate={onNavigate} className="policy-link-card">
            <div className="policy-link-card-top"><span>{number}</span><Icon size={19} aria-hidden="true" /></div>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="policy-link-card-action">Read policy <ArrowRight size={15} aria-hidden="true" /></span>
          </RouteLink>
          </React.Fragment>
        ))}
      </section>

      <section className="policy-shared-notices" aria-labelledby="shared-notices-heading">
        <div className="policy-shared-heading">
          <div className="policy-document-icon"><FileText size={19} aria-hidden="true" /></div>
          <div><p className="content-eyebrow">Applies across this section</p><h2 id="shared-notices-heading">Customer support and important notices</h2></div>
        </div>
        <PolicyMarkdown content={sharedNotices} headingLevel={3} />
      </section>

      <aside className="legal-help-link">
        <MessageSquareText size={20} aria-hidden="true" />
        <p>For policy questions, use the ShabaAutos contact channels shown on the website.</p>
        <a href="#site-footer" className="content-text-link">View contact details <ArrowRight size={15} aria-hidden="true" /></a>
      </aside>
    </ContentPageLayout>
  );
}
