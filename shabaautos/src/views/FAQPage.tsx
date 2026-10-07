import React, { useMemo, useState } from 'react';
import { ArrowRight, Search, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { faqCategories, faqSourceNotice } from '../content/faq';
import { ScreenId } from '../types';
import { useBusinessContact } from '../hooks/useBusinessContact';
import { ContentPageLayout, RouteLink, usePageMetadata } from './ContentPageLayout';

interface FAQPageProps {
  onNavigate: (screen: ScreenId) => void;
}

function FAQAnswer({ paragraphs }: { paragraphs: string[] }) {
  const output: React.ReactNode[] = [];
  let list: string[] = [];
  const flushList = (key: string) => {
    if (!list.length) return;
    output.push(
      <ul className="faq-answer-list" key={key}>
        {list.map((item, index) => <li key={`${key}-${index}`}>{item}</li>)}
      </ul>,
    );
    list = [];
  };

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.startsWith('- ')) {
      list.push(paragraph.slice(2));
      return;
    }
    flushList(`list-before-${index}`);
    output.push(<p key={`paragraph-${index}`}>{paragraph}</p>);
  });
  flushList('list-final');
  return <div className="faq-answer">{output}</div>;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  usePageMetadata('Frequently Asked Questions', 'Answers about buying, selling, renting and importing vehicles through ShabaAutos.');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All topics');
  const { phone, email } = useBusinessContact();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleCategories = useMemo(() => faqCategories
    .filter((category) => activeCategory === 'All topics' || category.name === activeCategory)
    .map((category) => ({
      ...category,
      questions: category.questions.filter((item) => !normalizedQuery ||
        `${item.question} ${item.answer.join(' ')}`.toLocaleLowerCase().includes(normalizedQuery)),
    }))
    .filter((category) => category.questions.length > 0 || category.note), [activeCategory, normalizedQuery]);
  const visibleCount = visibleCategories.reduce((count, category) => count + category.questions.length, 0);
  const phoneDigits = phone.replace(/\D/g, '');
  const whatsappHref = phoneDigits ? `https://wa.me/${phoneDigits}` : '';

  return (
    <ContentPageLayout
      eyebrow="Customer help"
      title="Frequently Asked Questions"
      intro="Find answers about buying, selling, renting and importing vehicles through ShabaAutos."
      onNavigate={onNavigate}
    >
      <section className="faq-controls" aria-label="Find an answer">
        <label className="faq-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search frequently asked questions</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the questions and answers"
          />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">Clear</button>}
        </label>
        <p className="faq-result-count" aria-live="polite">{visibleCount} {visibleCount === 1 ? 'answer' : 'answers'}</p>
      </section>

      <nav className="faq-category-nav" aria-label="FAQ categories">
        {['All topics', ...faqCategories.map((category) => category.name)].map((name) => (
          <button
            type="button"
            key={name}
            className={activeCategory === name ? 'faq-category-chip is-active' : 'faq-category-chip'}
            aria-pressed={activeCategory === name}
            onClick={() => setActiveCategory(name)}
          >
            {name}
          </button>
        ))}
      </nav>

      <div className="faq-sections">
        {visibleCategories.map((category) => (
          <section className="faq-category" key={category.name} id={`faq-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
            <div className="faq-category-heading">
              <span>{String(faqCategories.findIndex((item) => item.name === category.name) + 1).padStart(2, '0')}</span>
              <h2>{category.name}</h2>
            </div>
            {category.questions.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <span className="faq-toggle-mark" aria-hidden="true" />
                </summary>
                <FAQAnswer paragraphs={item.answer} />
              </details>
            ))}
            {category.note && (
              <div className="faq-still-help">
                {category.note.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <div className="content-cta-row">
                  {email && <a className="content-button content-button-primary" href={`mailto:${email}`}><Mail size={16} aria-hidden="true" />Contact ShabaAutos</a>}
                  {whatsappHref && <a className="content-button content-button-secondary" href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" />WhatsApp support <ExternalLink size={13} aria-hidden="true" /></a>}
                  {!email && !whatsappHref && <a className="content-text-link" href="#site-footer">View contact details in the site footer <ArrowRight size={15} aria-hidden="true" /></a>}
                </div>
              </div>
            )}
          </section>
        ))}
        {visibleCategories.length === 0 && (
          <div className="faq-empty-state" role="status">
            <h2>No matching answers</h2>
            <p>Try another search or choose a different category.</p>
            <button type="button" className="content-button content-button-secondary" onClick={() => { setQuery(''); setActiveCategory('All topics'); }}>Clear filters</button>
          </div>
        )}
      </div>

      <aside className="faq-resource-panel" aria-labelledby="faq-links-heading">
        <div>
          <p className="content-eyebrow">Explore ShabaAutos</p>
          <h2 id="faq-links-heading">Helpful links</h2>
          <p>Go directly to the marketplace services and policy information covered in these answers.</p>
        </div>
        <div className="faq-resource-links">
          <RouteLink screen="buy-cars" onNavigate={onNavigate}>Browse vehicle listings <ArrowRight size={15} aria-hidden="true" /></RouteLink>
          <RouteLink screen="sell-car" onNavigate={onNavigate}>Sell a vehicle <ArrowRight size={15} aria-hidden="true" /></RouteLink>
          <RouteLink screen="rent-car" onNavigate={onNavigate}>Rent a vehicle <ArrowRight size={15} aria-hidden="true" /></RouteLink>
          <RouteLink screen="import-landing" onNavigate={onNavigate}>Vehicle import services <ArrowRight size={15} aria-hidden="true" /></RouteLink>
          <RouteLink screen="policy-dealer-membership" onNavigate={onNavigate}>Dealer Membership Terms <ArrowRight size={15} aria-hidden="true" /></RouteLink>
          <RouteLink screen="policies-legal" onNavigate={onNavigate}>Policies &amp; Legal <ArrowRight size={15} aria-hidden="true" /></RouteLink>
        </div>
      </aside>

      <p className="faq-source-notice">{faqSourceNotice}</p>
    </ContentPageLayout>
  );
}
