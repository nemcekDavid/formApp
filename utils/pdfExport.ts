// utils/pdfExport.ts
import jsPDF from 'jspdf'

export function exportFormDataToPdf(data: Record<string, string>, filename = 'form.pdf') {
  const doc = new jsPDF()
  let y = 10

  Object.entries(data).forEach(([label, value]) => {
    doc.text(`${label}: ${value}`, 10, y)
    y += 10
  })

  doc.save(filename)
}
