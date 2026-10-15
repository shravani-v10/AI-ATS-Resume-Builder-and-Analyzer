import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Target,
  FileText,
  Wrench,
  Lightbulb,
} from 'lucide-react'

const ATSResults = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    analysis,
    jobTitle,
    companyName,
  } = location.state || {}

  // ---------------------------------------------------------
  // If user opens the page directly without analysis data
  // ---------------------------------------------------------
  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center mb-5">
            <FileText className="text-purple-600" size={30} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            No Analysis Found
          </h1>

          <p className="text-slate-500 mt-3 leading-6">
            Please analyze your resume first to view the ATS results.
          </p>

          <button
            onClick={() => navigate('/app/analyze')}
            className="mt-7 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Analyze Resume
          </button>
        </div>
      </div>
    )
  }

  const atsScore = Number(analysis.atsScore || 0)
  const keywordMatch = Number(analysis.keywordMatch || 0)

  // ---------------------------------------------------------
  // ATS status
  // ---------------------------------------------------------
  const isATSReady = atsScore >= 75 && keywordMatch >= 60

  const statusTitle = isATSReady
    ? 'Your resume is ATS-friendly'
    : 'Your resume needs ATS improvement'

  const statusDescription = isATSReady
    ? 'Your resume has a good level of compatibility with the selected job. Review the recommendations below to make further improvements.'
    : 'Your resume has several opportunities for improvement. Creating an ATS-optimized version can help improve its structure, keyword relevance, and job alignment.'

  // ---------------------------------------------------------
  // Create ATS Resume
  // ---------------------------------------------------------
  const handleCreateATSResume = () => {
    navigate('/app')
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          TOP BAR
      ===================================================== */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5">

          <button
            onClick={() => navigate('/app/analyze')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition text-sm font-medium"
          >
            <ArrowLeft size={17} />
            Back to Analyzer
          </button>

        </div>
      </div>


      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-2 text-purple-600 mb-3">
            <Sparkles size={19} />
            <span className="font-semibold text-sm">
              AI Resume Analysis
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            ATS Resume Results
          </h1>

          <p className="text-slate-500 mt-2">
            {jobTitle || 'Selected Job'}
            {companyName ? ` • ${companyName}` : ''}
          </p>

        </div>


        {/* =====================================================
            SCORE CARDS
        ===================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* ATS Score */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                <Target className="text-purple-600" size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  ATS Score
                </p>

                <h2 className="text-lg font-bold text-slate-900">
                  Overall Compatibility
                </h2>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <span className="text-6xl font-bold text-purple-600">
                {atsScore}
              </span>

              <span className="text-slate-400 text-xl mb-2">
                /100
              </span>
            </div>

            <div className="mt-5 h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all"
                style={{
                  width: `${Math.min(atsScore, 100)}%`,
                }}
              />
            </div>

          </div>


          {/* Keyword Match */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                <FileText className="text-blue-600" size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Keyword Match
                </p>

                <h2 className="text-lg font-bold text-slate-900">
                  Job Relevance
                </h2>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <span className="text-6xl font-bold text-blue-600">
                {keywordMatch}%
              </span>
            </div>

            <div className="mt-5 h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{
                  width: `${Math.min(keywordMatch, 100)}%`,
                }}
              />
            </div>

          </div>

        </div>


        {/* =====================================================
            ATS STATUS / CTA
        ===================================================== */}
        <div
          className={`rounded-3xl border p-7 mb-8 ${
            isATSReady
              ? 'bg-white border-slate-200'
              : 'bg-purple-50 border-purple-200'
          }`}
        >

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex gap-4">

              <div
                className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${
                  isATSReady
                    ? 'bg-green-100'
                    : 'bg-purple-100'
                }`}
              >
                {isATSReady ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={25}
                  />
                ) : (
                  <AlertTriangle
                    className="text-purple-600"
                    size={25}
                  />
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {statusTitle}
                </h2>

                <p className="text-slate-600 mt-2 max-w-2xl leading-6">
                  {statusDescription}
                </p>
              </div>

            </div>


            {!isATSReady && (
              <button
                onClick={handleCreateATSResume}
                className="shrink-0 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-sm"
              >
                Create ATS Resume
                <ArrowRight size={18} />
              </button>
            )}

          </div>

        </div>


        {/* =====================================================
            SUMMARY
        ===================================================== */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 mb-8">

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <FileText size={20} className="text-slate-700" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Overall Assessment
            </h2>
          </div>

          <p className="text-slate-600 leading-7">
            {analysis.summary || 'No summary was provided.'}
          </p>

        </section>


        {/* =====================================================
            STRENGTHS + WEAKNESSES
        ===================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Strengths */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2
                  className="text-green-600"
                  size={20}
                />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Strengths
              </h2>
            </div>

            <div className="space-y-4">
              {(analysis.strengths || []).map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 text-slate-600"
                >
                  <CheckCircle2
                    size={18}
                    className="text-green-500 shrink-0 mt-0.5"
                  />

                  <p className="leading-6">
                    {item}
                  </p>
                </div>
              ))}

              {(!analysis.strengths ||
                analysis.strengths.length === 0) && (
                <p className="text-slate-400">
                  No strengths found.
                </p>
              )}
            </div>

          </section>


          {/* Weaknesses */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <XCircle
                  className="text-red-500"
                  size={20}
                />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Areas to Improve
              </h2>
            </div>

            <div className="space-y-4">
              {(analysis.weaknesses || []).map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 text-slate-600"
                >
                  <XCircle
                    size={18}
                    className="text-red-400 shrink-0 mt-0.5"
                  />

                  <p className="leading-6">
                    {item}
                  </p>
                </div>
              ))}

              {(!analysis.weaknesses ||
                analysis.weaknesses.length === 0) && (
                <p className="text-slate-400">
                  No major weaknesses found.
                </p>
              )}
            </div>

          </section>

        </div>


        {/* =====================================================
            KEYWORDS
        ===================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Matched Keywords */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-5">
              <CheckCircle2
                className="text-green-600"
                size={21}
              />

              <h2 className="text-xl font-bold text-slate-900">
                Matched Keywords
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(analysis.matchedKeywords || []).map(
                (keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-green-50 border border-green-100 text-green-700 rounded-lg text-sm font-medium"
                  >
                    {keyword}
                  </span>
                )
              )}
            </div>

          </section>


          {/* Missing Keywords */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle
                className="text-orange-500"
                size={21}
              />

              <h2 className="text-xl font-bold text-slate-900">
                Missing Keywords
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(analysis.missingKeywords || []).map(
                (keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-orange-50 border border-orange-100 text-orange-700 rounded-lg text-sm font-medium"
                  >
                    {keyword}
                  </span>
                )
              )}
            </div>

          </section>

        </div>


        {/* =====================================================
            SKILLS
        ===================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Matched Skills */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-5">
              <CheckCircle2
                className="text-green-600"
                size={21}
              />

              <h2 className="text-xl font-bold text-slate-900">
                Matched Skills
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(analysis.matchedSkills || []).map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

          </section>


          {/* Missing Skills */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-5">
              <Wrench
                className="text-purple-600"
                size={21}
              />

              <h2 className="text-xl font-bold text-slate-900">
                Missing Skills
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(analysis.missingSkills || []).map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-purple-50 border border-purple-100 text-purple-700 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

          </section>

        </div>


        {/* =====================================================
            FORMATTING ISSUES
        ===================================================== */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 mb-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <AlertTriangle
                className="text-orange-600"
                size={20}
              />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Formatting Issues
            </h2>
          </div>

          <div className="space-y-4">

            {(analysis.formattingIssues || []).map(
              (issue, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-orange-50 rounded-xl"
                >
                  <AlertTriangle
                    size={18}
                    className="text-orange-500 shrink-0 mt-0.5"
                  />

                  <p className="text-slate-700 leading-6">
                    {issue}
                  </p>
                </div>
              )
            )}

            {(!analysis.formattingIssues ||
              analysis.formattingIssues.length === 0) && (
              <p className="text-slate-500">
                No major formatting issues were detected.
              </p>
            )}

          </div>

        </section>


        {/* =====================================================
            AI SUGGESTIONS
        ===================================================== */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 mb-10">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Lightbulb
                className="text-purple-600"
                size={20}
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                AI Recommendations
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Suggestions based on this job and your resume
              </p>
            </div>

          </div>

          <div className="space-y-4">

            {(analysis.suggestions || []).map(
              (suggestion, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-slate-50 rounded-xl"
                >

                  <div className="w-8 h-8 shrink-0 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  <p className="text-slate-700 leading-6">
                    {suggestion}
                  </p>

                </div>
              )
            )}

            {(!analysis.suggestions ||
              analysis.suggestions.length === 0) && (
              <p className="text-slate-500">
                No additional recommendations were provided.
              </p>
            )}

          </div>

        </section>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}
        {!isATSReady && (
          <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white text-center mb-10">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-600 flex items-center justify-center mb-5">
              <Sparkles size={26} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to improve your resume?
            </h2>

            <p className="text-slate-300 mt-3 max-w-xl mx-auto leading-6">
              Use ResumePilot to create a cleaner, ATS-friendly resume
              based on your professional information.
            </p>

            <button
              onClick={handleCreateATSResume}
              className="mt-6 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-7 py-3.5 rounded-xl font-semibold transition"
            >
              Create ATS Resume
              <ArrowRight size={18} />
            </button>

          </div>
        )}

      </main>

    </div>
  )
}

export default ATSResults