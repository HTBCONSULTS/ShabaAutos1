import React from 'react';
import terms from '../content/policies/terms-and-conditions.md?raw';
import privacy from '../content/policies/privacy.md?raw';
import refunds from '../content/policies/refunds-and-cancellations.md?raw';
import dealer from '../content/policies/dealer-membership.md?raw';
import rentals from '../content/policies/rental-terms.md?raw';
import fees from '../content/policies/fees-and-charges.md?raw';
import { ScreenId } from '../types';
import { ContentPageLayout, RouteLink, usePageMetadata } from './ContentPageLayout';

export interface PolicyDocument {
  screen: ScreenId;
  number: string;
  title: string;
  content: string;
}

export const policyDocuments: PolicyDocument[] = [
  { screen: 'policy-terms-and-conditions', number: '1', title: 'Terms & Conditions', content: terms },
  { screen: 'policy-privacy', number: '2', title: 'Privacy Policy', content: privacy },
  { screen: 'policy-refunds-and-cancellations', number: '3', title: 'Refund & Cancellation Policy', content: refunds },
  { screen: 'policy-dealer-membership', number: '4', title: 'Dealer Membership Terms', content: dealer },
  { screen: 'policy-rental-terms', number: '5', title: 'Vehicle Rental Terms', content: rentals },
  { screen: 'policy-fees-and-charges', number: '6', title: 'Fees & Charges Policy', content: fees },
];

interface PolicyDocumentPageProps {
  screen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

function parsePolicyBlocks(content: string) {
  return content.trim().split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean).map((block) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length === 1 && lines[0].startsWith('### ')) return { type: 'subheading', text: lines[0].slice(4) };
    if (lines.length === 1 && lines[0].startsWith('## ')) return { type: 'heading', text: lines[0].slice(3) };
    if (lines.every((line) => line.startsWith('- '))) return { type: 'list', items: lines.map((line) => line.slice(2)) };
    if (lines.every((line) => /^\d+\.\s/.test(line))) return { type: 'ordered-list', items: lines.map((line) => line.replace(/^\d+\.\s/, '')) };
    return { type: 'paragraph', text: lines.join(' ') };
  });
}

export function PolicyMarkdown({ content, headingLevel = 2 }: { content: string; headingLevel?: 2 | 3 }) {
  const SectionHeading = headingLevel === 2 ? 'h2' : 'h3';
  const SubsectionHeading = headingLevel === 2 ? 'h3' : 'h4';
  return (
    <div className="policy-prose">
      {parsePolicyBlocks(content).map((block, index) => {
        if (block.type === 'heading') return <SectionHeading key={index}>{block.text}</SectionHeading>;
        if (block.type === 'subheading') return <SubsectionHeading key={index}>{block.text}</SubsectionHeading>;
        if (block.type === 'list') return <ul key={index}>{block.items?.map((item) => <li key={item}>{item}</li>)}</ul>;
        if (block.type === 'ordered-list') return <ol key={index}>{block.items?.map((item) => <li key={item}>{item}</li>)}</ol>;
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}

export function PolicyDocumentPage({ screen, onNavigate }: PolicyDocumentPageProps) {
  const policy = policyDocuments.find((item) => item.screen === screen);
  usePageMetadata(policy?.title ?? 'Policies & Legal', `${policy?.title ?? 'ShabaAutos policy'} for the ShabaAutos website, marketplace and related services.`);
  if (!policy) return null;

  return (
    <ContentPageLayout
      eyebrow={`Policies & Legal · Section ${policy.number}`}
      title={policy.title}
      intro="These policies govern the use of the ShabaAutos website, marketplace and related services."
      onNavigate={onNavigate}
      backLink={{ screen: 'policies-legal', label: 'Policies & Legal' }}
    >
      <div className="legal-date-notice" role="note">
        <span><strong>Effective Date:</strong> [Insert Date]</span>
        <span><strong>Last Updated:</strong> [Insert Date]</span>
      </div>
      <article className="policy-document" aria-label={policy.title}>
        <PolicyMarkdown content={policy.content} />
      </article>
      <div className="policy-return-row">
        <RouteLink screen="policies-legal" onNavigate={onNavigate} className="content-button content-button-secondary">Back to Policies &amp; Legal</RouteLink>
      </div>
    </ContentPageLayout>
  );
}
