import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User
} from 'lucide-react'

import ResumePreview from '../components/home/ResumePreview'
import Form_PersonalInfo from '../components/home/Form_PersonalInfo'
import Form_Experience from '../components/home/Form_Experience'
import Form_Education from '../components/home/Form_Education'
import Form_Projects from '../components/home/Form_Projects'
import Form_Skills from '../components/home/Form_Skills'
import TemplateSelector from '../components/home/TemplateSelector'


const ResumeBuilder = () => {

  const resumeRef = useRef(null)

  // Get resume ID from URL
  const { resumeId } = useParams()


  // =========================================================
  // RESUME DATA
  // =========================================================

  const [resumeData, setResumeData] = useState(null)

  const [loading, setLoading] = useState(true)


  // =========================================================
  // LOAD RESUME FROM BACKEND
  // =========================================================

  useEffect(() => {

    const loadResume = async () => {

      try {

        setLoading(true)

        const response = await fetch(
          `http://localhost:5000/api/resumes/${resumeId}`
        )


        if (!response.ok) {
          throw new Error('Failed to load resume')
        }


        const data = await response.json()

        setResumeData(data)


      } catch (error) {

        console.error('Error loading resume:', error)

        alert('Unable to load resume')

      } finally {

        setLoading(false)

      }

    }


    if (resumeId) {
      loadResume()
    }

  }, [resumeId])


  // =========================================================
  // CURRENT ACTIVE SECTION
  // =========================================================

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)


  // =========================================================
  // SECTIONS
  // =========================================================

  const sections = [
    {
      id: 'personal',
      name: 'Personal Info',
      icon: User
    },
    {
      id: 'summary',
      name: 'Summary',
      icon: FileText
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: Briefcase
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: FolderIcon
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: Sparkles
    }
  ]


  // Current section
  const activeSection = sections[activeSectionIndex]


  // =========================================================
  // CHANGE BROWSER TITLE
  // =========================================================

  useEffect(() => {

    if (resumeData?.title) {

      document.title = resumeData.title

    }

  }, [resumeData?.title])


  // =========================================================
  // HANDLE PERSONAL INFORMATION CHANGES
  // =========================================================

  const handlePersonalInfoChange = (e) => {

    const { name, value } = e.target


    setResumeData(prev => ({

      ...prev,

      personal_info: {

        ...prev.personal_info,

        [name]: value

      }

    }))

  }


  // =========================================================
  // HANDLE EXPERIENCE CHANGES
  // =========================================================

  const handleExperienceChange = (experience) => {

    setResumeData(prev => ({

      ...prev,

      experience: experience

    }))

  }


  // =========================================================
  // HANDLE EDUCATION CHANGES
  // =========================================================

  const handleEducationChange = (education) => {

    setResumeData(prev => ({

      ...prev,

      education: education

    }))

  }


  // =========================================================
  // HANDLE TEMPLATE CHANGE
  // =========================================================

  const handleTemplateChange = (template) => {

    setResumeData(prev => ({

      ...prev,

      template: template

    }))

  }


  // =========================================================
  // HANDLE ACCENT COLOR CHANGE
  // =========================================================

  const handleAccentColorChange = (color) => {

    setResumeData(prev => ({

      ...prev,

      accent_color: color

    }))

  }


  // =========================================================
  // SAVE RESUME
  // =========================================================

  const handleSaveChanges = async () => {

  if (!resumeData) return

  try {

    const response = await fetch(
      `http://localhost:5000/api/resumes/${resumeData._id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(resumeData)
      }
    )


    if (!response.ok) {
      throw new Error('Failed to save resume')
    }


    const updatedResume = await response.json()


    // Update frontend with the latest data
    setResumeData(updatedResume)


    alert('Resume saved successfully!')


  } catch (error) {

    console.error('Error saving resume:', error)

    alert('Unable to save resume')

  }

}


  // =========================================================
  // DOWNLOAD RESUME AS PDF
  // =========================================================

  const handleDownloadPDF = async () => {

    const element = resumeRef.current


    if (!element) return


    try {

      const canvas = await html2canvas(element, {

        scale: 2,

        useCORS: true,

        backgroundColor: '#ffffff'

      })


      const imgData = canvas.toDataURL(
        'image/jpeg',
        0.98
      )


      const pdf = new jsPDF({

        unit: 'mm',

        format: 'a4',

        orientation: 'portrait'

      })


      const pageWidth =
        pdf.internal.pageSize.getWidth()

      const pageHeight =
        pdf.internal.pageSize.getHeight()


      const imgWidth = pageWidth

      const imgHeight =
        (canvas.height * imgWidth) /
        canvas.width


      let heightLeft = imgHeight

      let position = 0


      pdf.addImage(

        imgData,

        'JPEG',

        0,

        position,

        imgWidth,

        imgHeight

      )


      heightLeft -= pageHeight


      while (heightLeft > 0) {

        position = heightLeft - imgHeight


        pdf.addPage()


        pdf.addImage(

          imgData,

          'JPEG',

          0,

          position,

          imgWidth,

          imgHeight

        )


        heightLeft -= pageHeight

      }


      pdf.save(
        `${resumeData.title || 'Resume'}.pdf`
      )


    } catch (error) {

      console.error(
        'PDF generation failed:',
        error
      )

      alert(
        'Unable to generate PDF. Please check the browser console.'
      )

    }

  }


  // =========================================================
  // PREVIOUS SECTION
  // =========================================================

  const handlePrevious = () => {

    setActiveSectionIndex(prevIndex =>

      Math.max(
        prevIndex - 1,
        0
      )

    )

  }


  // =========================================================
  // NEXT SECTION
  // =========================================================

  const handleNext = () => {

    setActiveSectionIndex(prevIndex =>

      Math.min(
        prevIndex + 1,
        sections.length - 1
      )

    )

  }


  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <p className="text-lg font-medium text-slate-700">

            Loading Resume...

          </p>

          <p className="text-sm text-slate-500 mt-2">

            Please wait

          </p>

        </div>

      </div>

    )

  }


  // =========================================================
  // RESUME NOT FOUND
  // =========================================================

  if (!resumeData) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <p className="text-lg font-medium text-red-500">

            Resume not found

          </p>


          <Link
            to="/app"
            className="inline-flex items-center gap-2 mt-4 text-sm text-purple-600 hover:text-purple-700"
          >

            <ArrowLeftIcon className="size-4" />

            Back to Dashboard

          </Link>

        </div>

      </div>

    )

  }


  // =========================================================
  // MAIN UI
  // =========================================================

  return (

    <div className="min-h-screen bg-slate-100">


      {/* ================= BACK TO DASHBOARD ================= */}

      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between w-full">

        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all"
        >

          <ArrowLeftIcon className="size-4" />

          Back to Dashboard

        </Link>


        {/* ================= DOWNLOAD BUTTON ================= */}

        <button
          type="button"
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-green-50 text-green-600 border border-green-200 rounded-md text-xs font-medium hover:bg-green-100 transition-all"
        >

          Download

        </button>

      </div>



      {/* ================= MAIN CONTENT ================= */}

      <div className="max-w-7xl mx-auto px-4 pb-8">

        <div className="grid lg:grid-cols-12 gap-8">


          {/* ================= LEFT SIDE - FORM ================= */}

          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">

            <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-6">


              {/* ================= PROGRESS BAR ================= */}

              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />


              <hr
                className="absolute top-0 left-0 h-1 bg-purple-500 border-none transition-all duration-500"
                style={{
                  width: `${
                    activeSectionIndex * 100 /
                    (sections.length - 1)
                  }%`
                }}
              />



              {/* ================= NAVIGATION ================= */}

              <div className="w-full mb-6 border-b border-gray-300 py-1">

                <div className="flex items-center justify-between w-full">


                  {/* ---------- PREVIOUS ---------- */}

                  <div>

                    {activeSectionIndex !== 0 && (

                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      >

                        <ChevronLeft className="size-4" />

                        Previous

                      </button>

                    )}

                  </div>



                  {/* ---------- TEMPLATE + ACCENT ---------- */}

                  <TemplateSelector

                    template={resumeData.template}

                    accentColor={resumeData.accent_color}

                    onTemplateChange={
                      handleTemplateChange
                    }

                    onColorChange={
                      handleAccentColorChange
                    }

                  />



                  {/* ---------- NEXT ---------- */}

                  <div>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={
                        activeSectionIndex ===
                        sections.length - 1
                      }
                      className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                        activeSectionIndex === sections.length - 1
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >

                      Next

                      <ChevronRight className="size-4" />

                    </button>

                  </div>

                </div>

              </div>



              {/* ================= ACTIVE SECTION ================= */}

              <div className="space-y-6">


                {/* ================= PERSONAL INFO ================= */}

                {activeSection.id === 'personal' && (

                  <Form_PersonalInfo

                    data={resumeData.personal_info}

                    onChange={
                      handlePersonalInfoChange
                    }

                  />

                )}



                {/* ================= SUMMARY ================= */}

                {activeSection.id === 'summary' && (

                  <div className="p-6">

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">

                      Professional Summary

                    </h2>


                    <p className="text-sm text-gray-500 mb-5">

                      Write a short summary about yourself and your career.

                    </p>


                    <textarea
                      rows="8"
                      value={
                        resumeData.professional_summary
                      }

                      onChange={(e) =>

                        setResumeData(prev => ({

                          ...prev,

                          professional_summary:
                            e.target.value

                        }))

                      }

                      placeholder="Example: Motivated B.Sc. Computer Science student with an interest in web development, AI and software engineering..."

                      className="w-full border border-gray-300 rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-purple-400 resize-none"

                    />

                  </div>

                )}



                {/* ================= EXPERIENCE ================= */}

                {activeSection.id === 'experience' && (

                  <Form_Experience

                    data={resumeData.experience}

                    onChange={
                      handleExperienceChange
                    }

                  />

                )}



                {/* ================= EDUCATION ================= */}

                {activeSection.id === 'education' && (

                  <Form_Education

                    data={resumeData.education}

                    onChange={
                      handleEducationChange
                    }

                  />

                )}



                {/* ================= PROJECTS ================= */}

                {activeSection.id === 'projects' && (

                  <Form_Projects

                    data={resumeData.projects}

                    onChange={(projects) =>

                      setResumeData(prev => ({

                        ...prev,

                        projects: projects

                      }))

                    }

                  />

                )}



                {/* ================= SKILLS ================= */}

                {activeSection.id === 'skills' && (

                  <Form_Skills

                    data={resumeData.skills}

                    onChange={(skills) =>

                      setResumeData(prev => ({

                        ...prev,

                        skills

                      }))

                    }

                  />

                )}

              </div>



              {/* ================= SAVE CHANGES ================= */}

              <div className="mt-4">

                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-green-50 text-green-600 border border-green-200 rounded-md text-xs font-medium hover:bg-green-100 transition-all"
                >

                  Save Changes

                </button>

              </div>

            </div>

          </div>



          {/* ================= RIGHT SIDE - RESUME PREVIEW ================= */}

          <div className="lg:col-span-7">

            <div ref={resumeRef}>

              <ResumePreview

                data={resumeData}

                template={resumeData.template}

                accentColor={
                  resumeData.accent_color
                }

              />

            </div>

          </div>


        </div>

      </div>

    </div>

  )

}


export default ResumeBuilder