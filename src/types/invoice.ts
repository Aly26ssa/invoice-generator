export type InvoiceTemplateId =
  | 'ledger'
  | 'modern-sidebar'
  | 'bold-header'
  | 'compact'
  | 'boxed-sections'

export interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
}

export interface InvoiceData {
  templateId: InvoiceTemplateId
  invoiceNumber: string
  issueDate: string
  dueDate: string
  currency: string
  fromName: string
  fromAddress: string
  fromEmail: string
  toName: string
  toAddress: string
  taxPercent: number
  discountPercent: number
  notes: string
  lineItems: LineItem[]
}

export const TEMPLATE_OPTIONS: { id: InvoiceTemplateId; label: string; hint: string }[] = [
  {
    id: 'ledger',
    label: 'Ledger',
    hint: 'Clean two-column layout with a strong header band',
  },
  {
    id: 'modern-sidebar',
    label: 'Modern sidebar totals',
    hint: 'Line items on the left with totals in a right-hand summary card',
  },
  {
    id: 'bold-header',
    label: 'Bold header bar',
    hint: 'High-contrast header bar and prominent total due',
  },
  {
    id: 'compact',
    label: 'Compact',
    hint: 'Tighter spacing for invoices with many line items',
  },
  {
    id: 'boxed-sections',
    label: 'Boxed sections',
    hint: 'Parties, items, totals, and notes in clearly separated cards',
  },
]
