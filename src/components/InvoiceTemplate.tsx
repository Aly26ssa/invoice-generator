import type { InvoiceData } from '../types/invoice'
import { lineAmount, subtotal, taxAmount, total } from '../utils/invoiceMath'

const currencyFmt = (code: string, value: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: code || 'USD' }).format(value)

interface Props {
  data: InvoiceData
}

/** Single shipped style: Ledger — editorial header, structured grid. */
export function InvoiceTemplate({ data }: Props) {
  const s = subtotal(data)
  const t = taxAmount(data)
  const grand = total(data)

  return (
    <article className="invoice-doc invoice-doc--ledger" aria-label="Invoice preview">
      <header className="invoice-doc__head">
        <div>
          <p className="invoice-doc__eyebrow">Invoice</p>
          <h1 className="invoice-doc__number">{data.invoiceNumber || '—'}</h1>
        </div>
        <dl className="invoice-doc__meta">
          <div>
            <dt>Issued</dt>
            <dd>{data.issueDate || '—'}</dd>
          </div>
          <div>
            <dt>Due</dt>
            <dd>{data.dueDate || '—'}</dd>
          </div>
        </dl>
      </header>

      <div className="invoice-doc__parties">
        <section>
          <h2>From</h2>
          <p className="invoice-doc__strong">{data.fromName || 'Your business'}</p>
          <p className="invoice-doc__muted">{data.fromAddress || 'Address'}</p>
          <p className="invoice-doc__muted">{data.fromEmail || 'email@example.com'}</p>
        </section>
        <section>
          <h2>Bill to</h2>
          <p className="invoice-doc__strong">{data.toName || 'Client name'}</p>
          <p className="invoice-doc__muted">{data.toAddress || 'Client address'}</p>
        </section>
      </div>

      <table className="invoice-doc__table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col" className="num">
              Qty
            </th>
            <th scope="col" className="num">
              Rate
            </th>
            <th scope="col" className="num">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.lineItems.map((row) => (
            <tr key={row.id}>
              <td>{row.description || 'Item'}</td>
              <td className="num">{row.quantity}</td>
              <td className="num">{currencyFmt(data.currency, row.rate)}</td>
              <td className="num">{currencyFmt(data.currency, lineAmount(row))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-doc__totals">
        <dl>
          <div>
            <dt>Subtotal</dt>
            <dd>{currencyFmt(data.currency, s)}</dd>
          </div>
          <div>
            <dt>Tax ({data.taxPercent}%)</dt>
            <dd>{currencyFmt(data.currency, t)}</dd>
          </div>
          <div className="invoice-doc__grand">
            <dt>Total</dt>
            <dd>{currencyFmt(data.currency, grand)}</dd>
          </div>
        </dl>
      </div>

      {data.notes.trim() ? (
        <footer className="invoice-doc__notes">
          <h2>Notes</h2>
          <p>{data.notes}</p>
        </footer>
      ) : null}
    </article>
  )
}
