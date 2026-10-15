import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload,
  FileText,
  X,
  Briefcase,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

import { extractTextFromPDF } from '../services/pdfParser'

const ResumeAnalyzer = () => {
  const navigate = useNavigate()

  // =========================================================
  // STATE
  // =========================================================

  const [selectedFile, setSelectedFile] = useState(null)

  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [analysisStatus, setAnalysisStatus] = useState(
    'Reading your resume...'
  )

  const [analysis, setAnalysis] = useState(null)
  const [showCompleteModal, setShowCompleteModal] = useState(false)

  // =========================================================
  // FILE SELECT
  // =========================================================

  const handleFileSelect = (file) => {
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF resume.')
      return
    }

    setSelectedFile(file)
  }

  // =========================================================
  // FILE INPUT
  // =========================================================

  const handleFileInput = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      handleFileSelect(file)
    }

    event.target.value = ''
  }

  // =========================================================
  // DRAG & DROP
  // =========================================================

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files?.[0]

    if (file) {
      handleFileSelect(file)
    }
  }

  // =========================================================
  // REMOVE FILE
  // =========================================================

  const removeFile = () => {
    setSelectedFile(null)
  }

  // =========================================================
  // FORMAT FILE SIZE
  // =========================================================

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB'

    const kb = bytes / 1024

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`
    }

    const mb = kb / 1024

    return `${mb.toFixed(2)} MB`
  }

  // =========================================================
  // ANALYZE RESUME
  // =========================================================

  const handleAnalyze = async () => {
    if (!jobTitle.trim()) {
      alert('Please enter the job title.')
      return
    }

    if (!jobDescription.trim()) {
      alert('Please enter the job description.')
      return
    }

    if (!selectedFile) {
      alert('Please upload your resume.')
      return
    }

    try {
      setIsAnalyzing(true)
      setShowCompleteModal(false)
      setAnalysisStatus('Reading your resume...')

      // -----------------------------------------------------
      // Extract text from PDF
      // -----------------------------------------------------

      const resumeText = await extractTextFromPDF(selectedFile)

      if (!resumeText || !resumeText.trim()) {
        throw new Error(
          'Could not extract text from the uploaded resume.'
        )
      }

      console.log('=================================')
      console.log('Extracted Resume Text:')
      console.log(resumeText)
      console.log('=================================')

      // -----------------------------------------------------
      // Update scanning status
      // -----------------------------------------------------

      setAnalysisStatus('Matching job requirements...')

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      )

      setAnalysisStatus('Generating AI insights...')

      console.log('Sending resume to AI analyzer...')

      // -----------------------------------------------------
      // Send data to backend
      // -----------------------------------------------------

      const response = await fetch(
        'http://localhost:5000/api/analyzer/analyze',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            resumeText,
            jobTitle,
            companyName,
            jobDescription,
          }),
        }
      )

      const data = await response.json()

      // -----------------------------------------------------
      // Handle backend error
      // -----------------------------------------------------

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to analyze the resume.'
        )
      }

      // -----------------------------------------------------
      // Validate response
      // -----------------------------------------------------

      if (!data.success || !data.analysis) {
        throw new Error(
          'Invalid analysis response received from server.'
        )
      }

      // -----------------------------------------------------
      // Store analysis
      // -----------------------------------------------------

      console.log('========== AI ANALYSIS ==========')
      console.log(data)
      console.log('=================================')

      setAnalysis(data.analysis)

      setAnalysisStatus('Analysis complete!')

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      )

      setIsAnalyzing(false)
      setShowCompleteModal(true)

    } catch (error) {
      console.error('Analysis error:', error)

      setIsAnalyzing(false)

      alert(
        error.message || 'Failed to analyze resume.'
      )
    }
  }

  // =========================================================
  // VIEW RESULTS
  // =========================================================

  const handleViewResults = () => {
    if (!analysis) {
      return
    }

    navigate('/app/analyze/results', {
      state: {
        analysis,
        jobTitle,
        companyName,
      },
    })
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">

        <div className="flex items-center gap-2 text-purple-600 mb-3">
          <Sparkles size={18} />

          <span className="text-sm font-semibold">
            AI-Powered Resume Analysis
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Analyze Your Resume
        </h1>

        <p className="text-slate-500 mt-2 max-w-2xl">
          Upload your resume and compare it against a job
          description to discover your ATS compatibility and
          areas for improvement.
        </p>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="max-w-5xl mx-auto px-6 pb-16">

        {/* ===================================================
            JOB DETAILS
        =================================================== */}

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 mb-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">

              <Briefcase
                size={22}
                className="text-purple-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Job Details
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Enter the details of the position you're applying for
              </p>

            </div>

          </div>


          {/* Job Title + Company */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

            {/* Job Title */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Job Title
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <div className="relative">

                <Briefcase
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={jobTitle}
                  onChange={(event) =>
                    setJobTitle(event.target.value)
                  }
                  placeholder="e.g. UX Designer"
                  className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition text-slate-800"
                />

              </div>

            </div>


            {/* Company */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Company Name
                <span className="text-slate-400 ml-1">
                  (Optional)
                </span>
              </label>

              <div className="relative">

                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={companyName}
                  onChange={(event) =>
                    setCompanyName(event.target.value)
                  }
                  placeholder="e.g. S&P Global"
                  className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition text-slate-800"
                />

              </div>

            </div>

          </div>


          {/* Job Description */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">

              Job Description

              <span className="text-red-500 ml-1">
                *
              </span>

            </label>

            <textarea
              value={jobDescription}
              onChange={(event) =>
                setJobDescription(event.target.value)
              }
              placeholder="Paste the job description here..."
              rows={9}
              className="w-full px-4 py-3.5 border border-slate-200 rounded-xl outline-none resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition text-slate-800 leading-6"
            />

            <p className="text-xs text-slate-400 mt-2">
              The job description helps our AI compare your
              resume with the requirements of the position.
            </p>

          </div>

        </section>


        {/* ===================================================
            UPLOAD RESUME
        =================================================== */}

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 mb-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">

              <FileText
                size={22}
                className="text-purple-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Upload Resume
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Upload your resume in PDF format
              </p>

            </div>

          </div>


          {/* =================================================
              NO FILE
          ================================================= */}

          {!selectedFile && (

            <div
              onClick={() => {
                document
                  .getElementById('resume-file-input')
                  ?.click()
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
                isDragging
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-slate-200 hover:border-purple-400 hover:bg-slate-50'
              }`}
            >

              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center mb-5">

                <Upload
                  size={28}
                  className="text-purple-600"
                />

              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Drop your resume here
              </h3>

              <p className="text-slate-500 mt-2">
                or click to browse from your computer
              </p>

              <p className="text-xs text-slate-400 mt-4">
                PDF files only
              </p>

              <input
                id="resume-file-input"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileInput}
                className="hidden"
              />

            </div>

          )}


          {/* =================================================
              FILE SELECTED
          ================================================= */}

          {selectedFile && (

            <div className="border border-purple-100 bg-purple-50 rounded-2xl p-5">

              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-4 min-w-0">

                  <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center">

                    <FileText
                      size={23}
                      className="text-purple-600"
                    />

                  </div>

                  <div className="min-w-0">

                    <h3 className="font-semibold text-slate-900 truncate">
                      {selectedFile.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {formatFileSize(selectedFile.size)}
                    </p>

                  </div>

                </div>


                <button
                  onClick={removeFile}
                  className="w-9 h-9 shrink-0 rounded-lg bg-white hover:bg-red-50 flex items-center justify-center transition"
                  title="Remove file"
                >

                  <X
                    size={18}
                    className="text-slate-500 hover:text-red-500"
                  />

                </button>

              </div>


              <div className="flex items-center gap-2 mt-4 text-sm text-green-600 font-medium">

                <CheckCircle2 size={17} />

                Resume ready for analysis

              </div>

            </div>

          )}

        </section>


        {/* ===================================================
            ANALYZE BUTTON
        =================================================== */}

        <div className="flex justify-end">

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition shadow-sm ${
              isAnalyzing
                ? 'bg-purple-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >

            <Sparkles size={18} />

            {isAnalyzing
              ? 'Analyzing Resume...'
              : 'Analyze Resume'}

            {!isAnalyzing && (
              <ArrowRight size={18} />
            )}

          </button>

        </div>

      </main>


      {/* =====================================================
          SCANNING ANIMATION
      ===================================================== */}

      {isAnalyzing && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">

            {/* PDF */}

            <div className="relative w-24 h-28 mx-auto mb-7">

              <div className="absolute inset-0 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center">

                <FileText
                  size={42}
                  className="text-purple-600"
                />

              </div>


              {/* Scanning line */}

              <div className="absolute left-2 right-2 h-1 bg-purple-500 rounded-full shadow-lg animate-bounce top-5" />

            </div>


            <h2 className="text-2xl font-bold text-slate-900">
              Analyzing Your Resume
            </h2>

            <p className="text-slate-500 mt-3">
              Our AI is comparing your resume with the
              selected job requirements.
            </p>


            {/* Status */}

            <div className="mt-7 flex items-center justify-center gap-2">

              <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />

              <p className="text-sm font-medium text-purple-600">
                {analysisStatus}
              </p>

            </div>


            {/* Dots */}

            <div className="flex justify-center gap-2 mt-6">

              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />

              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

              <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" />

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          ANALYSIS COMPLETE MODAL
      ===================================================== */}

      {showCompleteModal && analysis && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">

            {/* Success */}

            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-6">

              <CheckCircle2
                size={34}
                className="text-purple-600"
              />

            </div>


            <h2 className="text-2xl font-bold text-slate-900">
              Analysis Complete
            </h2>

            <p className="text-slate-500 mt-3 leading-6">

              Your resume has been successfully analyzed
              against the selected job requirements.

            </p>


            {/* Score */}

            <div className="grid grid-cols-2 gap-3 mt-7">

              <div className="bg-slate-50 rounded-2xl p-4">

                <p className="text-xs font-medium text-slate-400">
                  ATS Score
                </p>

                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {Number(analysis.atsScore || 0)}
                </p>

              </div>


              <div className="bg-slate-50 rounded-2xl p-4">

                <p className="text-xs font-medium text-slate-400">
                  Keyword Match
                </p>

                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {Number(analysis.keywordMatch || 0)}%
                </p>

              </div>

            </div>


            {/* View Results */}

            <button
              onClick={handleViewResults}
              className="w-full mt-7 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl transition"
            >

              View Results

              <ArrowRight size={18} />

            </button>


            {/* Close */}

            <button
              onClick={() => setShowCompleteModal(false)}
              className="mt-5 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default ResumeAnalyzer