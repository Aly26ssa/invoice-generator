import { useState } from 'react'
import type { RefObject } from 'react'
import type { InvoiceData } from '../types/invoice'
import { exportCsv, exportJson, exportPdfFromElement, exportPngFromElement, printInvoice } from '../utils/exportInvoice'

interface Props {
  data: InvoiceData
  printTargetRef: RefObject<HTMLElement | null>
}

export function ExportBar({ data, printTargetRef }: Props) {
  const [busy, setBusy] = useState<string | null>(null)
  const base = `invoice-${(data.invoiceNumber || 'draft').replace(/[^\w.-]+/g, '_')}`

  const run = async (key: string, fn: () => void | Promise<void>) => {
    setBusy(key)
    try {
      await fn()
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="export-bar no-print">
      <p className="export-bar__label">Export</p>
      <div className="export-bar__actions">
        <button
          type="button"
          className="export-btn"
          disabled={!!busy}
          onClick={() =>
            run('pdf', () => {
              if (!printTargetRef.current) return
              return exportPdfFromElement(printTargetRef.current, base)
            })
          }
        >
          {busy === 'pdf' ? 'PDF…' : 'PDF'}
        </button>
        <button
          type="button"
          className="export-btn"
          disabled={!!busy}
          onClick={() =>
            run('png', () => {
              if (!printTargetRef.current) return
              return exportPngFromElement(printTargetRef.current, base)
            })
          }
        >
          {busy === 'png' ? 'PNG…' : 'PNG'}
        </button>
        <button type="button" className="export-btn" onClick={() => exportJson(data)}>
          JSON
        </button>
        <button type="button" className="export-btn" onClick={() => exportCsv(data)}>
          CSV
        </button>
        <button type="button" className="export-btn export-btn--accent" onClick={() => printInvoice()}>
          Print
        </button>
      </div>
    </div>
  )
}
