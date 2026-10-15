import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer()

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise

    let fullText = ''

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber)

      const textContent = await page.getTextContent()

      const pageText = textContent.items
        .map((item) => item.str)
        .join(' ')

      fullText += pageText + '\n'
    }

    return fullText.trim()
  } catch (error) {
    console.error('PDF text extraction error:', error)

    throw new Error('Unable to read the PDF.')
  }
}