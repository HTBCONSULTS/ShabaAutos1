import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, FileText, LoaderCircle, LogOut, RefreshCw, ShieldCheck } from 'lucide-react';

export type TermsGateStatus = 'required' | 'loading' | 'error';

interface TermsAcceptanceGateProps {
  status: TermsGateStatus;
  onAccept: () => Promise<{ success: boolean; error?: string }>;
  onRetry: () => Promise<boolean>;
  onSignOut: () => Promise<void>;
}

export const TermsAcceptanceGate: React.FC<TermsAcceptanceGateProps> = ({
  status,
  onAccept,
  onRetry,
  onSignOut,
}) => {
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleAccept = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checked || busy) return;

    setBusy(true);
    setError('');
    try {
      const result = await onAccept();
      if (!result.success) setError(result.error || 'We could not save your acceptance. Please try again.');
    } catch (acceptError) {
      setError(acceptError instanceof Error ? acceptError.message : 'We could not save your acceptance. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleRetry = async () => {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const refreshed = await onRetry();
      if (!refreshed) setError('We still cannot verify your account. Please try again in a moment.');
    } catch {
      setError('We still cannot verify your account. Please try again in a moment.');
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await onSignOut();
    } finally {
      setBusy(false);
    }
  };

  const isLoading = status === 'loading';
  const isError = status === 'error';

  return (
    <main className="terms-gate-page" aria-labelledby="terms-gate-title" aria-busy={busy || isLoading}>
      <section className="terms-gate-card">
        <div className="terms-gate-mark" aria-hidden="true">
          {isLoading ? <LoaderCircle className="terms-gate-spinner" /> : isError ? <RefreshCw /> : <ShieldCheck />}
        </div>
        <p className="terms-gate-eyebrow">{isLoading ? 'ACCOUNT CHECK' : isError ? 'ACCOUNT ACCESS' : 'ONE LAST STEP'}</p>
        <h1 id="terms-gate-title">
          {isLoading
            ? 'Checking your account…'
            : isError
              ? 'We could not verify your account'
              : 'Review and accept our Terms & Conditions'}
        </h1>
        <p className="terms-gate-copy">
          {isLoading
            ? 'Please wait while we confirm your account status.'
            : isError
              ? 'We need to confirm your account status before continuing. Retry the check or sign out and come back later.'
              : 'Before you continue to ShabaAutos, please review and accept the Terms & Conditions for using the marketplace.'}
        </p>

        {status === 'required' && (
          <form className="terms-gate-form" onSubmit={handleAccept}>
            <a
              className="terms-gate-document-link"
              href="/policies-legal/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText aria-hidden="true" />
              <span>Read the full Terms &amp; Conditions</span>
              <ArrowRight className="terms-gate-link-arrow" aria-hidden="true" />
            </a>

            <label className="terms-gate-agreement">
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                required
              />
              <span>I have read and agree to the ShabaAutos Terms &amp; Conditions.</span>
            </label>

            {error && <p className="terms-gate-error" role="alert">{error}</p>}

            <button className="terms-gate-primary" type="submit" disabled={!checked || busy}>
              {busy ? <LoaderCircle className="terms-gate-spinner" aria-hidden="true" /> : <CheckCircle2 aria-hidden="true" />}
              {busy ? 'Saving acceptance…' : 'Accept terms and continue'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <>
            {error && <p className="terms-gate-error" role="alert">{error}</p>}
            <button className="terms-gate-primary" type="button" onClick={handleRetry} disabled={busy}>
              {busy ? <LoaderCircle className="terms-gate-spinner" aria-hidden="true" /> : <RefreshCw aria-hidden="true" />}
              {busy ? 'Checking…' : 'Try again'}
            </button>
          </>
        )}

        {status !== 'loading' && (
          <button className="terms-gate-signout" type="button" onClick={handleSignOut} disabled={busy}>
            <LogOut aria-hidden="true" />
            Sign out
          </button>
        )}
      </section>
    </main>
  );
};
