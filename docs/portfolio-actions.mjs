import { createElement } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from '@astryxdesign/core/Button';

for (const group of document.querySelectorAll('[data-astryx-actions]')) {
  const links = [...group.querySelectorAll('a[href]')];
  if (!links.length || group.contains(document.activeElement)) continue;

  const mount = document.createElement('div');
  mount.className = 'astryx-action-group';
  const root = createRoot(mount);
  const buttons = links.map(link => createElement(Button, {
    key: link.href,
    label: link.textContent.trim(),
    href: link.getAttribute('href'),
    target: link.getAttribute('target') || undefined,
    rel: link.getAttribute('rel') || undefined,
    variant: link.classList.contains('is-primary') ? 'primary' : 'secondary',
    className: link.className,
  }));

  // Keep the original anchors available if the enhancement cannot render links.
  flushSync(() => root.render(buttons));
  if (mount.querySelectorAll('a[href]').length === links.length) group.replaceChildren(mount);
  else root.unmount();
}
