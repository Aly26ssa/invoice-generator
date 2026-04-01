import { useId } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { InvoiceData, LineItem } from '../types/invoice'
import { subtotal, taxAmount, total } from '../utils/invoiceMath'

function newLine(): LineItem {
  return { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 }
}

interface Props {
  data: InvoiceData
  setData: Dispatch<SetStateAction<InvoiceData>>
}

export function InvoiceEditor({ data, setData }: Props) {
  const baseId = useId()

  const updateLine = (id: string, patch: Partial<LineItem>) => {
    setData((d) => ({
      ...d,
      lineItems: d.lineItems.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    }))
  }

  const addLine = () => {
    setData((d) => ({ ...d, lineItems: [...d.lineItems, newLine()] }))
  }

  const removeLine = (id: string) => {
    setData((d) => ({
      ...d,
      lineItems: d.lineItems.length > 1 ? d.lineItems.filter((r) => r.id !== id) : d.lineItems,
    }))
  }

  return (
    <div className="editor">
      <fieldset className="editor__fieldset card-enter">
        <legend>Invoice</legend>
        <div className="editor__grid">
          <label className="field">
            <span>Number</span>
            <input
              value={data.invoiceNumber}
              onChange={(e) => setData((d) => ({ ...d, invoiceNumber: e.target.value }))}
              autoComplete="off"
            />
          </label>
          <label className="field">
            <span>Issue date</span>
            <input
              type="date"
              value={data.issueDate}
              onChange={(e) => setData((d) => ({ ...d, issueDate: e.target.value }))}
            />
          </label>
          <label className="field">
            <span>Due date</span>
            <input
              type="date"
              value={data.dueDate}
              onChange={(e) => setData((d) => ({ ...d, dueDate: e.target.value }))}
            />
          </label>
          <label className="field">
            <span>Currency</span>
            <select
              value={data.currency}
              onChange={(e) => setData((d) => ({ ...d, currency: e.target.value }))}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </label>
          <label className="field">
            <span>Tax %</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={data.taxPercent}
              onChange={(e) => setData((d) => ({ ...d, taxPercent: Number(e.target.value) || 0 }))}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="editor__fieldset card-enter card-enter--delay-1">
        <legend>Parties</legend>
        <div className="editor__grid editor__grid--two">
          <label className="field">
            <span>Your name / company</span>
            <input
              value={data.fromName}
              onChange={(e) => setData((d) => ({ ...d, fromName: e.target.value }))}
            />
          </label>
          <label className="field">
            <span>Client name</span>
            <input
              value={data.toName}
              onChange={(e) => setData((d) => ({ ...d, toName: e.target.value }))}
            />
          </label>
          <label className="field field--full">
            <span>Your address</span>
            <textarea
              rows={2}
              value={data.fromAddress}
              onChange={(e) => setData((d) => ({ ...d, fromAddress: e.target.value }))}
            />
          </label>
          <label className="field field--full">
            <span>Client address</span>
            <textarea
              rows={2}
              value={data.toAddress}
              onChange={(e) => setData((d) => ({ ...d, toAddress: e.target.value }))}
            />
          </label>
          <label className="field">
            <span>Your email</span>
            <input
              type="email"
              value={data.fromEmail}
              onChange={(e) => setData((d) => ({ ...d, fromEmail: e.target.value }))}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="editor__fieldset card-enter card-enter--delay-2">
        <legend>Line items</legend>
        <div className="line-items" role="list">
          {data.lineItems.map((row, index) => (
            <div key={row.id} className="line-item" role="listitem" style={{ animationDelay: `${index * 40}ms` }}>
              <label className="field">
                <span className="sr-only">Description</span>
                <input
                  placeholder="Description"
                  value={row.description}
                  onChange={(e) => updateLine(row.id, { description: e.target.value })}
                  aria-label={`Line ${index + 1} description`}
                />
              </label>
              <label className="field field--narrow">
                <span className="sr-only">Quantity</span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={row.quantity}
                  onChange={(e) => updateLine(row.id, { quantity: Number(e.target.value) || 0 })}
                  aria-label={`Line ${index + 1} quantity`}
                />
              </label>
              <label className="field field--narrow">
                <span className="sr-only">Rate</span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={row.rate}
                  onChange={(e) => updateLine(row.id, { rate: Number(e.target.value) || 0 })}
                  aria-label={`Line ${index + 1} rate`}
                />
              </label>
              <button
                type="button"
                className="btn-icon line-item__remove"
                onClick={() => removeLine(row.id)}
                disabled={data.lineItems.length <= 1}
                aria-label={`Remove line ${index + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="btn-secondary add-line-btn" onClick={addLine}>
          Add line
        </button>
        <p className="editor__summary" aria-live="polite">
          Subtotal {data.currency} {subtotal(data).toFixed(2)} · Tax {taxAmount(data).toFixed(2)} · Total{' '}
          <strong>{total(data).toFixed(2)}</strong>
        </p>
      </fieldset>

      <details className="editor__details card-enter card-enter--delay-3">
        <summary>Notes &amp; template</summary>
        <div className="editor__details-body">
          <label className="field field--full">
            <span>Notes (optional)</span>
            <textarea
              rows={3}
              value={data.notes}
              onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))}
            />
          </label>
          <label className="field field--full">
            <span>Template</span>
            <select
              id={`${baseId}-template`}
              value={data.templateId}
              onChange={(e) =>
                setData((d) => ({ ...d, templateId: e.target.value as InvoiceData['templateId'] }))
              }
            >
              <option value="ledger">Ledger</option>
            </select>
            <span className="field__hint">Single layout today; more styles can be added later.</span>
          </label>
        </div>
      </details>
    </div>
  )
}
