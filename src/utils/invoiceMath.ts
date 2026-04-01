import type { InvoiceData, LineItem } from '../types/invoice'

export function lineAmount(item: LineItem): number {
  return Math.round(item.quantity * item.rate * 100) / 100
}

export function subtotal(data: InvoiceData): number {
  const raw = data.lineItems.reduce((sum, item) => sum + lineAmount(item), 0)
  return Math.round(raw * 100) / 100
}

export function taxAmount(data: InvoiceData): number {
  const s = subtotal(data)
  const t = (s * data.taxPercent) / 100
  return Math.round(t * 100) / 100
}

export function total(data: InvoiceData): number {
  return Math.round((subtotal(data) + taxAmount(data)) * 100) / 100
}
