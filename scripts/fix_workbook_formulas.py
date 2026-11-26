"""Repair completion and high-priority-open summary formulas in a copy of the source workbook."""
from openpyxl import load_workbook
from pathlib import Path
import sys
src=Path(sys.argv[1]) if len(sys.argv)>1 else Path('../source/CIO_CTO_CISO_Checklist_original.xlsx')
out=Path(sys.argv[2]) if len(sys.argv)>2 else Path('../deliverables/CIO_CTO_CISO_Checklist_corrected.xlsx')
wb=load_workbook(src)
for ws in wb.worksheets:
    labels={str(ws.cell(r,9).value).strip():r for r in range(1,ws.max_row+1) if ws.cell(r,9).value}
    if not {'Total Items','Completed','% Complete'}.issubset(labels): continue
    rows=[r for r in range(4,ws.max_row+1) if ws.cell(r,3).value]
    if not rows: continue
    first,last=min(rows),max(rows)
    nr=labels.get('N/A')
    denom=f'J{labels["Total Items"]}-J{nr}' if nr else f'J{labels["Total Items"]}'
    ws.cell(labels['% Complete'],10).value=f'=IFERROR(J{labels["Completed"]}/({denom}),0)'
    ws.cell(labels['% Complete'],10).number_format='0%'
    if 'High Priority Open' in labels:
        ws.cell(labels['High Priority Open'],10).value=f'=COUNTIFS(D{first}:D{last},"High",E{first}:E{last},"<>Complete",E{first}:E{last},"<>N/A")'
out.parent.mkdir(parents=True,exist_ok=True); wb.save(out); print(out)
