import type { InvoiceData, LineItem } from '../types/invoice'

export function lineAmount(item: LineItem): number {
  return Math.round(item.quantity * item.rate * 100) / 100
}

export function subtotal(data: InvoiceData): number {
  const raw = data.lineItems.reduce((sum, item) => sum + lineAmount(item), 0)
  return Math.round(raw * 100) / 100
}

export function discountAmount(data: InvoiceData): number {
  const s = subtotal(data)
  const d = (s * data.discountPercent) / 100
  return Math.round(d * 100) / 100
}

/** Subtotal after percent discount; tax is calculated on this amount. */
export function subtotalAfterDiscount(data: InvoiceData): number {
  return Math.round((subtotal(data) - discountAmount(data)) * 100) / 100
}

export function taxAmount(data: InvoiceData): number {
  const base = subtotalAfterDiscount(data)
  const t = (base * data.taxPercent) / 100
  return Math.round(t * 100) / 100
}

export function total(data: InvoiceData): number {
  return Math.round((subtotalAfterDiscount(data) + taxAmount(data)) * 100) / 100
}
