import { useMemo, useRef, useState } from 'react'
import { ExportBar } from './components/ExportBar'
import { InvoiceEditor } from './components/InvoiceEditor'
import { InvoiceTemplate } from './components/InvoiceTemplate'
import { ThemeToggle } from './components/ThemeToggle'
import { TEMPLATE_OPTIONS, type InvoiceData } from './types/invoice'
import './App.css'

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function initialData(): InvoiceData {
  return {
    templateId: 'ledger',
    invoiceNumber: 'INV-1001',
    issueDate: todayISO(),
    dueDate: todayISO(),
    currency: 'USD',
    fromName: '',
    fromAddress: '',
    fromEmail: '',
    toName: '',
    toAddress: '',
    taxPercent: 0,
    discountPercent: 0,
    notes: '',
    lineItems: [
      { id: crypto.randomUUID(), description: 'Design consultation', quantity: 4, rate: 125 },
      { id: crypto.randomUUID(), description: 'Implementation', quantity: 10, rate: 95 },
    ],
  }
}

export default function App() {
  const [data, setData] = useState<InvoiceData>(initialData)
  const captureRef = useRef<HTMLDivElement>(null)

  const preview = useMemo(() => {
    switch (data.templateId) {
      case 'ledger':
      default:
        return <InvoiceTemplate data={data} />
    }
  }, [data])

  return (
    <div className="app-shell">
      <header className="app-header no-print">
        <div className="app-header__intro">
          <h1 className="app-title">Invoice generator</h1>
          <p className="app-tagline">Edit details, pick your preferred template, then export.</p>
        </div>
        <div className="app-header__toolbar">
          <label className="app-header__template">
            <span>Templates</span>
            <select
              id="app-header-template"
              value={data.templateId}
              onChange={(e) =>
                setData((d) => ({ ...d, templateId: e.target.value as InvoiceData['templateId'] }))
              }
            >
              {TEMPLATE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <ThemeToggle />
        </div>
      </header>

      <div className="app-grid">
        <section className="app-panel app-panel--editor no-print" aria-label="Invoice fields">
          <InvoiceEditor data={data} setData={setData} />
        </section>

        <section className="app-panel app-panel--preview" aria-label="Preview and export">
          <ExportBar data={data} printTargetRef={captureRef} />
          <div className="preview-stage">
            <div id="invoice-capture-root" ref={captureRef} className="preview-sheet">
              {preview}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
