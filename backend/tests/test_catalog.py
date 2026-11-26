import json
from pathlib import Path

def test_catalog_has_expected_sections_and_controls():
    root=Path(__file__).resolve().parents[2]
    data=json.loads((root/"data/control_catalog.json").read_text())
    assert len(data["sections"]) == 11
    assert sum(len(s["items"]) for s in data["sections"]) == 169
