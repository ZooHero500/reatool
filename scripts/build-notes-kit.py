"""Build a deterministic, offline practice ZIP from the checked-in fixture and translations."""
from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parent.parent
source = json.loads((root / 'src/i18n/source.json').read_text())
locales = ['en', 'zh-cn', 'zh-tw', 'ja', 'ko', 'ru', 'es', 'fr']
# Reuse the reviewed page copy so the download cannot drift from the tutorial.
ids = ['1cead7a130b2', 'da083d6ff9d3', '67892433da88', '5c6cd300fb86',
       '47c96e05d494', 'ca85ff1971e1', '58de37f8b735', 'a3771a9d49d2']
files = {p.name: p.read_bytes() for p in (root / 'fixtures/notes-example').iterdir() if p.is_file()}
for locale in locales:
    catalog = {k: v['text'] for k, v in source.items()} if locale == 'en' else json.loads((root / f'src/i18n/locales/{locale}.json').read_text())
    title, intro, terminal, success, folder, prompt, failure, fix = [catalog[k] for k in ids]
    route = '' if locale == 'en' else f'{locale}/'
    body = f'# {title}\n\n{intro}\n\nhttps://reatool.dev/{route}install/\n\n{folder}\n\n```text\n{prompt}\n```\n\n{terminal}\n\n```sh\nnode check.cjs\n```\n\n{success}\n\n```csv\n{files["expected.csv"].decode()}```\n\n## {failure}\n\n{fix}\n\nhttps://reatool.dev/{route}first-analysis/\n'
    files[f'README-{locale}.md'] = body.encode()
files['SOURCE.txt'] = ('Official teaching sample: https://rea.tools/examples/notes-example.zip\n'
    'Project: https://github.com/morluto/rea\n'
    'License: MIT, copyright 2026 morluto (see LICENSE).\n'
    'Official files unchanged: package.json, main.js, preload.js, renderer.js, csv.js, index.html.\n'
    'REA Tool additions: check.cjs, expected.csv, translated instructions.\n'
    'The check runs the CSV formatter only; it does not launch Electron or write Downloads/notes.csv.\n').encode()
files['SHA256SUMS.txt'] = ''.join(f'{hashlib.sha256(data).hexdigest()}  {name}\n' for name, data in sorted(files.items())).encode()
with zipfile.ZipFile(root / 'public/downloads/notes-first-practice.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for name, data in sorted(files.items()):
        entry = zipfile.ZipInfo('notes-example/' + name, (2026, 10, 14, 0, 0, 0))
        entry.compress_type = zipfile.ZIP_DEFLATED
        entry.external_attr = 0o100644 << 16
        archive.writestr(entry, data)
print('Built notes-first-practice.zip with eight localized guides.')
