import {track} from '../lib/analytics';

document.addEventListener('click', event => {
  const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const name = link.dataset.track;
  if (name === 'practice_start') track('practice_start', {item: link.dataset.trackItem || 'install'});
  if (name === 'sample_download' || name === 'case_source' || name === 'case_tutorial') {
    track(name, {item: link.dataset.trackItem || 'notes-kit'});
    return;
  }
  const url = new URL(link.href);
  if (url.origin !== location.origin) return;
  const route = url.pathname.replace(/^\/(zh-cn|zh-tw|ja|ko|ru|es|fr)(?=\/)/, '');
  if (route === '/install/' || route === '/first-analysis/' || route.startsWith('/tutorials/')) {
    track('guide_open', {item: route});
  }
});
