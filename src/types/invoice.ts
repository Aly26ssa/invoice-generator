export type InvoiceTemplateId = 'ledger'

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
]
