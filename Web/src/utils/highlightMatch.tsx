import type { ReactNode } from 'react';

export function highlightMatch(text: string, searchText: string): ReactNode {
  if (!searchText.trim()) return text;

  const term = searchText.trim().toLowerCase();
  const lower = text.toLowerCase();
  const index = lower.indexOf(term);

  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + term.length)}</mark>
      {text.slice(index + term.length)}
    </>
  );
}
