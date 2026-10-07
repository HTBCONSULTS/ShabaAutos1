import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Home } from 'lucide-react';
import { ScreenId } from '../types';
import { pathForScreen } from '../utils/contentRoutes';

export function usePageMetadata(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | ShabaAutos`;

    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdDescriptionTag = !descriptionTag;
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.appendChild(descriptionTag);
    }
    const previousDescription = descriptionTag.content;
    descriptionTag.content = description;

    return () => {
      document.title = previousTitle;
      if (descriptionTag) {
        if (createdDescriptionTag) descriptionTag.remove();
        else descriptionTag.content = previousDescription;
      }
    };
  }, [title, description]);
}

interface RouteLinkProps {
  screen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function RouteLink({ screen, onNavigate, className, children, ariaLabel }: RouteLinkProps) {
  const href = pathForScreen(screen);
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onNavigate(screen);
      }}
    >
      {children}
    </a>
  );
}

interface ContentPageLayoutProps {
  eyebrow: string;
  title: string;
  intro: string;
  onNavigate: (screen: ScreenId) => void;
  backLink?: { screen: ScreenId; label: string };
  pageClassName?: string;
  children: React.ReactNode;
}

export function ContentPageLayout({ eyebrow, title, intro, onNavigate, backLink, pageClassName, children }: ContentPageLayoutProps) {
  return (
    <div className={`content-page${pageClassName ? ` ${pageClassName}` : ''}`}>
      <section className="content-page-hero">
        <div className="content-page-wrap">
          <nav className="content-breadcrumbs" aria-label="Breadcrumb">
            <RouteLink screen="home" onNavigate={onNavigate} className="content-breadcrumb-home">
              <Home size={14} aria-hidden="true" /> <span>Home</span>
            </RouteLink>
            {backLink && (
              <>
                <span className="content-breadcrumb-separator" aria-hidden="true">/</span>
                <RouteLink screen={backLink.screen} onNavigate={onNavigate} className="content-breadcrumb-back">
                  <ArrowLeft size={13} aria-hidden="true" /> <span>{backLink.label}</span>
                </RouteLink>
              </>
            )}
          </nav>
          <p className="content-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="content-intro">{intro}</p>
        </div>
      </section>
      <div className="content-page-wrap content-page-body">{children}</div>
      <div className="content-page-wrap content-back-home">
        <RouteLink screen="home" onNavigate={onNavigate} className="content-text-link">
          Return to ShabaAutos <ArrowUpRight size={15} aria-hidden="true" />
        </RouteLink>
      </div>
    </div>
  );
}
