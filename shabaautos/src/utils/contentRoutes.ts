import { ScreenId } from '../types';

export const contentRoutes = {
  home: '/',
  about: '/about',
  faq: '/faq',
  'policies-legal': '/policies-legal',
  'policy-terms-and-conditions': '/policies-legal/terms-and-conditions',
  'policy-privacy': '/policies-legal/privacy',
  'policy-refunds-and-cancellations': '/policies-legal/refunds-and-cancellations',
  'policy-dealer-membership': '/policies-legal/dealer-membership',
  'policy-rental-terms': '/policies-legal/rental-terms',
  'policy-fees-and-charges': '/policies-legal/fees-and-charges',
} satisfies Partial<Record<ScreenId, string>>;

const screenByPath = new Map<string, ScreenId>(
  Object.entries(contentRoutes).map(([screen, path]) => [path, screen as ScreenId]),
);

export function screenForPath(pathname: string): ScreenId | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return screenByPath.get(normalized);
}

export function pathForScreen(screen: ScreenId): string {
  return contentRoutes[screen] ?? '/';
}
