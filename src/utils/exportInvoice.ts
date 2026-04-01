import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import type { InvoiceData } from '../types/invoice'
import { lineAmount, subtotal, taxAmount, total } from './invoiceMath'

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportJson(data: InvoiceData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  downloadBlob(`invoice-${data.invoiceNumber || 'draft'}.json`, blob)
}

export function exportCsv(data: InvoiceData) {
  const rows: string[][] = [
    ['Invoice', data.invoiceNumber],
    ['Issue date', data.issueDate],
    ['Due date', data.dueDate],
    ['Currency', data.currency],
    [],
    ['Description', 'Qty', 'Rate', 'Amount'],
    ...data.lineItems.map((item) => [
      item.description.replace(/"/g, '""'),
      String(item.quantity),
      String(item.rate),
      String(lineAmount(item)),
    ]),
    [],
    ['Subtotal', '', '', String(subtotal(data))],
    [`Tax (${data.taxPercent}%)`, '', '', String(taxAmount(data))],
    ['Total', '', '', String(total(data))],
  ]
  const body = rows
    .map((r) => r.map((cell) => (cell.includes(',') || cell.includes('\n') ? `"${cell}"` : cell)).join(','))
    .join('\n')
  const blob = new Blob([body], { type: 'text/csv;charset=utf-8' })
  downloadBlob(`invoice-${data.invoiceNumber || 'draft'}.csv`, blob)
}

export async function exportPdfFromElement(el: HTMLElement, filenameBase: string) {
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  })
  const imgData = canvas.toDataURL('image/png')
  const pdfW = 210
  const pdfH = (canvas.height * pdfW) / canvas.width
  const pdf = new jsPDF({
    orientation: pdfH > 297 ? 'portrait' : 'portrait',
    unit: 'mm',
    format: [pdfW, Math.max(pdfH, 297)],
  })
  pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH)
  pdf.save(`${filenameBase}.pdf`)
}

export async function exportPngFromElement(el: HTMLElement, filenameBase: string) {
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  })
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(`${filenameBase}.png`, blob)
  }, 'image/png')
}

export function printInvoice() {
  window.print()
}
