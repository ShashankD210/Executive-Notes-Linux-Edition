import json, pathlib, collections
p=pathlib.Path(__file__).resolve().parents[1]/"data/control_catalog.json"
d=json.loads(p.read_text()); items=[(s,i) for s in d['sections'] for i in s['items']]
ids=[i['id'] for _,i in items]
assert len(d['sections'])==11, len(d['sections'])
assert len(items)==169, len(items)
assert len(ids)==len(set(ids)), 'duplicate IDs'
for s,i in items:
    assert i.get('priority') in {'High','Medium','Low'}, (s['name'],i.get('id'))
    assert i.get('item'), (s['name'],i.get('id'))
print(f'PASS: {len(d["sections"])} domains, {len(items)} controls, unique IDs')
for s in d['sections']: print(f'{s["name"]}: {len(s["items"])}')
