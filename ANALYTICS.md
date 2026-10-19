# Key actions in Umami

Site: https://analysis.zoohero.me/websites/8bfccc0f-352c-431f-85b9-166b4eefe796

Tracking runs only on `reatool.dev`. The script domain allowlist also excludes localhost and Pages previews from pageviews. Tracking failures never block copying, navigation or dialogs. No distinct user ID is assigned.

| Event | Meaning | `item` |
| --- | --- | --- |
| `copy_success` | Clipboard write resolved successfully | `setup-prompt`, `setup-command`, `runtime-check`, `doctor-command`, `repair-plan`, `connection-check`, `first-analysis-prompt`, `practice-check`; other blocks use `prompt` or `command` |
| `client_select` | Client selection clicked | `codex`, `claude_code`, `cursor`, `interactive` |
| `os_select` | Shell instructions selected, not detected visitor OS | `windows`, `unix` |
| `sample_download` | Download link clicked; not proof the file finished downloading | `notes-kit`, `notes-upstream` |
| `case_preview` | Preview dialog opened, including direct case links | Case ID |
| `case_filter` | Category selected | Category ID |
| `case_source` | Original source link clicked | Case ID |
| `case_tutorial` | Case's related tutorial clicked | Case ID |
| `guide_open` | Internal installation, first-analysis or tutorial link clicked | Language-neutral route |
| `practice_start` | First-exercise CTA clicked after setup copy or beside the connection check | `home-setup-prompt`, `install-setup-prompt`, `install-setup-command`, `install-connection-check`, `install-connection-section` |

Every event includes `locale` (site language) and `page` (language-neutral route). Copies on the installation page also include `client` and `os`, reflecting the current selectors. Custom data never includes clipboard text, local file paths, user-entered content or full external URLs. Umami still collects its normal pageview metadata; the custom fields do not replace that.

Start with Events, filter `copy_success` + `item=setup-prompt` or `setup-command`, then break down by locale/client/os. Compare downloads and first-analysis prompt copies by locale. Use case IDs to prioritize follow-up tutorials. A copy is intent to start, not a successful installation; a download click is not a finished exercise. Read the new event baseline from the deployment onward. Historical pageview ratios are not a user-level conversion funnel.

Reference: https://docs.umami.is/docs/tracker-functions

From the 2026-10-19 onboarding update, `practice_start` identifies the installation-to-practice entry point. The same navigation also emits the existing `guide_open` event; these are two views of one click, not two conversions. Compare this intent with `sample_download` (`notes-kit`) and `copy_success` (`first-analysis-prompt`) by locale. Neither the CTA nor a copied prompt confirms installation, a live REA connection or completion of the exercise.
