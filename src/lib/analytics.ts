type EventName = 'copy_success' | 'client_select' | 'os_select' | 'sample_download' | 'case_preview' | 'case_filter' | 'case_source' | 'case_tutorial' | 'guide_open';

/** Fixed editorial IDs only: never send clipboard contents, local paths or input. */
export function track(name: EventName, data: {item: string; client?: string; os?: string}) {
  if (location.hostname !== 'reatool.dev') return;
  const umami = (window as Window & {umami?: {track: (name: string, data: Record<string, string>) => Promise<unknown> | void}}).umami;
  try {
    const result = umami?.track(name, {
      ...data,
      locale: document.documentElement.dataset.locale || 'en',
      page: location.pathname.replace(/^\/(zh-cn|zh-tw|ja|ko|ru|es|fr)(?=\/)/, ''),
    });
    // An unavailable tracker must never break the action being measured.
    if (result) Promise.resolve(result).catch(() => {});
  } catch { /* Tracking is optional. */ }
}
