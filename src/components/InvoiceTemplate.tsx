import type { InvoiceData } from '../types/invoice'
import { discountAmount, lineAmount, subtotal, taxAmount, total } from '../utils/invoiceMath'

const currencyFmt = (code: string, value: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: code || 'USD' }).format(value)

interface Props {
  data: InvoiceData
}

export function InvoiceTemplate({ data }: Props) {
  const s = subtotal(data)
  const disc = discountAmount(data)
  const t = taxAmount(data)
  const grand = total(data)

  const Header = ({ variant }: { variant: InvoiceData['templateId'] }) => (
    <header className="invoice-doc__head">
      {variant === 'bold-header' ? (
        <div className="invoice-doc__bar">
          <div className="invoice-doc__bar-left">
            <p className="invoice-doc__eyebrow">Invoice</p>
            <h1 className="invoice-doc__number">{data.invoiceNumber || '—'}</h1>
          </div>
          <div className="invoice-doc__bar-right">
            <p className="invoice-doc__bar-label">Total due</p>
            <p className="invoice-doc__bar-total">{currencyFmt(data.currency, grand)}</p>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </header>
  )

  const Parties = () => (
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
  )

  const ItemsTable = () => (
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
  )

  const Totals = ({ variant }: { variant: InvoiceData['templateId'] }) => (
    <div className={variant === 'modern-sidebar' ? 'invoice-doc__totals invoice-doc__totals--card' : 'invoice-doc__totals'}>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{currencyFmt(data.currency, s)}</dd>
        </div>
        {data.discountPercent > 0 && disc > 0 ? (
          <div>
            <dt>Discount ({data.discountPercent}%)</dt>
            <dd>{currencyFmt(data.currency, -disc)}</dd>
          </div>
        ) : null}
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
  )

  const Notes = () =>
    data.notes.trim() ? (
      <footer className="invoice-doc__notes">
        <h2>Notes</h2>
        <p>{data.notes}</p>
      </footer>
    ) : null

  const variant = data.templateId
  const cls = `invoice-doc invoice-doc--${variant}`

  switch (variant) {
    case 'modern-sidebar':
      return (
        <article className={cls} aria-label="Invoice preview">
          <Header variant={variant} />
          <Parties />
          <div className="invoice-doc__body-grid">
            <div className="invoice-doc__body-main">
              <ItemsTable />
            </div>
            <aside className="invoice-doc__body-aside" aria-label="Totals">
              <Totals variant={variant} />
            </aside>
          </div>
          <Notes />
        </article>
      )
    case 'boxed-sections':
      return (
        <article className={cls} aria-label="Invoice preview">
          <Header variant={variant} />
          <section className="invoice-doc__box">
            <Parties />
          </section>
          <section className="invoice-doc__box invoice-doc__box--items">
            <ItemsTable />
          </section>
          <section className="invoice-doc__box invoice-doc__box--totals">
            <Totals variant={variant} />
          </section>
          {data.notes.trim() ? (
            <section className="invoice-doc__box invoice-doc__box--notes">
              <Notes />
            </section>
          ) : null}
        </article>
      )
    case 'bold-header':
    case 'compact':
    case 'ledger':
    default:
      return (
        <article className={cls} aria-label="Invoice preview">
          <Header variant={variant} />
          <Parties />
          <ItemsTable />
          <Totals variant={variant} />
          <Notes />
        </article>
      )
  }
}
