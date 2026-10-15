import {
  FileText,
  Pencil,
  Plus,
  Trash2,
  X,
  ArrowUpRight
} from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  // =========================================================
  // RESUME CARD COLORS
  // =========================================================

  const cardColors = [
    {
      bg: 'bg-purple-50',
      icon: 'text-purple-600'
    },
    {
      bg: 'bg-blue-50',
      icon: 'text-blue-600'
    },
    {
      bg: 'bg-amber-50',
      icon: 'text-amber-600'
    },
    {
      bg: 'bg-rose-50',
      icon: 'text-rose-600'
    },
    {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-600'
    }
  ]

  // =========================================================
  // STATES
  // =========================================================

  const [allResumes, setAllResumes] = useState([])

  const [showCreateResume, setShowCreateResume] =
    useState(false)

  const [title, setTitle] = useState('')

  const [editResumeID, setEditResumeID] =
    useState(null)

  const navigate = useNavigate()

  // =========================================================
  // LOAD ALL RESUMES
  // =========================================================

  const loadAllResumes = async () => {
    try {

      const response = await fetch(
        'http://localhost:5000/api/resumes'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch resumes')
      }

      const data = await response.json()

      setAllResumes(data)

    } catch (error) {

      console.error(
        'Error loading resumes:',
        error
      )

    }
  }

  // =========================================================
  // CREATE RESUME
  // =========================================================

  const createResume = async (event) => {

    event.preventDefault()

    if (!title.trim()) {
      return
    }

    try {

      const response = await fetch(
        'http://localhost:5000/api/resumes',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            title: title.trim()
          })
        }
      )

      if (!response.ok) {
        throw new Error(
          'Failed to create resume'
        )
      }

      const data = await response.json()

      setShowCreateResume(false)

      setTitle('')

      navigate(
        `/app/builder/${data._id}`
      )

    } catch (error) {

      console.error(
        'Error creating resume:',
        error
      )

      alert('Unable to create resume')

    }
  }

  // =========================================================
  // RENAME RESUME
  // =========================================================

  const editTitle = async (event) => {

    event.preventDefault()

    if (!title.trim()) {
      return
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/resumes/${editResumeID}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            title: title.trim()
          })
        }
      )

      if (!response.ok) {
        throw new Error(
          'Failed to update resume'
        )
      }

      const updatedResume =
        await response.json()

      setAllResumes((prev) =>
        prev.map((resume) =>
          resume._id === updatedResume._id
            ? updatedResume
            : resume
        )
      )

      setEditResumeID(null)

      setTitle('')

    } catch (error) {

      console.error(
        'Error updating resume:',
        error
      )

      alert('Unable to rename resume')

    }
  }

  // =========================================================
  // DELETE RESUME
  // =========================================================

  const deleteResume = async (resumeId) => {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this resume?'
      )

    if (!confirmDelete) {
      return
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/resumes/${resumeId}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error(
          'Failed to delete resume'
        )
      }

      setAllResumes((prev) =>
        prev.filter(
          (resume) =>
            resume._id !== resumeId
        )
      )

    } catch (error) {

      console.error(
        'Error deleting resume:',
        error
      )

      alert('Unable to delete resume')

    }
  }

  // =========================================================
  // LOAD RESUMES WHEN DASHBOARD OPENS
  // =========================================================

  useEffect(() => {
    loadAllResumes()
  }, [])

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) {
      return 'Recently'
    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    )
  }

  // =========================================================
  // CLOSE CREATE MODAL
  // =========================================================

  const closeCreateModal = () => {

    setShowCreateResume(false)

    setTitle('')
  }

  // =========================================================
  // CLOSE EDIT MODAL
  // =========================================================

  const closeEditModal = () => {

    setEditResumeID(null)

    setTitle('')
  }

  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="min-h-screen bg-[#f8f9fc]">

      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          py-8
        "
      >

        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            sm:px-8
            py-7
            mb-10
          "
        >

          <div
            className="
              absolute
              -right-20
              -top-20
              w-52
              h-52
              rounded-full
              bg-purple-50
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
            "
          >

            {/* Hero Text */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  rounded-full
                  bg-purple-50
                  border
                  border-purple-100
                  text-xs
                  font-medium
                  text-purple-600
                  mb-4
                "
              >

                <span
                  className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-purple-500
                  "
                />

                Resume Workspace

              </div>

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-semibold
                  tracking-tight
                  text-slate-800
                "
              >

                Build a resume that{' '}

                <span className="text-purple-600">
                  stands out.
                </span>

              </h1>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >

                Create, manage and improve your
                professional resumes from one simple
                workspace.

              </p>

            </div>


            {/* Create Resume Button */}

            <button
              type="button"
              onClick={() =>
                setShowCreateResume(true)
              }
              className="
                shrink-0
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-purple-600
                text-white
                text-sm
                font-medium
                shadow-sm
                hover:bg-purple-700
                transition-colors
              "
            >

              <Plus className="size-4" />

              Create Resume

            </button>

          </div>

        </section>


        {/* =====================================================
            MY RESUMES HEADER
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            mb-6
          "
        >

          <div>

            <h2
              className="
                text-xl
                font-semibold
                text-slate-800
              "
            >

              My Resumes

            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >

              {allResumes.length === 0
                ? 'Create your first resume to get started'
                : `${allResumes.length} ${
                    allResumes.length === 1
                      ? 'resume'
                      : 'resumes'
                  } in your workspace`
              }

            </p>

          </div>


          {/* Resume Count */}

          {allResumes.length > 0 && (

            <div
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-white
                border
                border-slate-200
                text-xs
                text-slate-500
              "
            >

              <FileText className="size-3.5" />

              {allResumes.length}

            </div>

          )}

        </div>


        {/* =====================================================
            RESUME CARDS
        ===================================================== */}

        {allResumes.length > 0 ? (

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-x-5
              gap-y-8
            "
          >

            {allResumes.map(
              (resume, index) => {

                const color =
                  cardColors[
                    index %
                    cardColors.length
                  ]

                return (

                  <div
                    key={resume._id}
                    className="
                      group
                      min-w-0
                    "
                  >

                    {/* =================================================
                        RESUME CARD
                    ================================================= */}

                    <div
                      onClick={() =>
                        navigate(
                          `/app/builder/${resume._id}`
                        )
                      }
                      className="
                        relative
                        h-[220px]
                        w-full
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        cursor-pointer
                        transition-all
                        duration-200
                        hover:-translate-y-1
                        hover:shadow-lg
                        hover:border-slate-300
                      "
                    >

                      {/* =============================================
                          COLORED TOP AREA
                      ============================================= */}

                      <div
                        className={`
                          h-[145px]
                          ${color.bg}
                          flex
                          items-center
                          justify-center
                        `}
                      >

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            shadow-sm
                            transition-transform
                            duration-200
                            group-hover:scale-105
                          "
                        >

                          <FileText
                            className={`
                              size-6
                              ${color.icon}
                            `}
                            strokeWidth={1.7}
                          />

                        </div>

                      </div>


                      {/* =============================================
                          EDIT + DELETE BUTTONS
                      ============================================= */}

                      <div
                        className="
                          absolute
                          top-3
                          right-3
                          flex
                          gap-1
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                          duration-200
                        "
                      >

                        {/* Rename */}

                        <button
                          type="button"
                          onClick={(e) => {

                            e.stopPropagation()

                            setEditResumeID(
                              resume._id
                            )

                            setTitle(
                              resume.title || ''
                            )

                          }}
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            bg-white
                            border
                            border-slate-200
                            text-slate-400
                            hover:text-purple-600
                            hover:border-purple-200
                            transition-colors
                          "
                          title="Rename"
                        >

                          <Pencil className="size-3" />

                        </button>


                        {/* Delete */}

                        <button
                          type="button"
                          onClick={(e) => {

                            e.stopPropagation()

                            deleteResume(
                              resume._id
                            )

                          }}
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            bg-white
                            border
                            border-slate-200
                            text-slate-400
                            hover:text-red-500
                            hover:border-red-200
                            transition-colors
                          "
                          title="Delete"
                        >

                          <Trash2 className="size-3" />

                        </button>

                      </div>


                      {/* =============================================
                          RESUME DETAILS
                      ============================================= */}

                      <div
                        className="
                          px-4
                          py-4
                        "
                      >

                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-slate-700
                            truncate
                          "
                        >

                          {resume.title ||
                            'Untitled Resume'}

                        </h3>

                        <p
                          className="
                            mt-1
                            text-[11px]
                            text-slate-400
                          "
                        >

                          Updated on{' '}

                          {formatDate(
                            resume.updatedAt
                          )}

                        </p>

                      </div>


                      {/* =============================================
                          OPEN RESUME BUTTON
                      ============================================= */}

                      <button
                        type="button"
                        onClick={(e) => {

                          e.stopPropagation()

                          navigate(
                            `/app/builder/${resume._id}`
                          )

                        }}
                        className="
                          absolute
                          bottom-3
                          right-3
                          flex
                          items-center
                          gap-1
                          px-2.5
                          py-1.5
                          rounded-lg
                          bg-slate-900
                          text-white
                          text-[10px]
                          font-medium
                          opacity-0
                          translate-y-1
                          group-hover:opacity-100
                          group-hover:translate-y-0
                          transition-all
                          duration-200
                          hover:bg-purple-600
                        "
                      >

                        Open

                        <ArrowUpRight
                          className="size-3"
                        />

                      </button>

                    </div>


                    {/* =================================================
                        LABEL BELOW CARD
                    ================================================= */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mt-2.5
                        px-1
                      "
                    >

                      <span
                        className="
                          text-[11px]
                          text-slate-400
                        "
                      >

                        Resume

                      </span>

                      <ArrowUpRight
                        className="
                          size-3.5
                          text-slate-300
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                        "
                      />

                    </div>

                  </div>

                )

              }
            )}

          </div>

        ) : (

          /* =====================================================
              EMPTY STATE
          ===================================================== */

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-6
              py-20
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                bg-purple-50
                border
                border-purple-100
              "
            >

              <FileText
                className="
                  size-6
                  text-purple-600
                "
                strokeWidth={1.7}
              />

            </div>


            <h3
              className="
                mt-5
                text-base
                font-semibold
                text-slate-800
              "
            >

              No resumes yet

            </h3>


            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                text-slate-400
              "
            >

              Create your first resume to
              start building your professional
              profile.

            </p>


            <button
              type="button"
              onClick={() =>
                setShowCreateResume(true)
              }
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-purple-600
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                hover:bg-purple-700
                transition-colors
              "
            >

              <Plus className="size-4" />

              Create Resume

            </button>

          </div>

        )}


        {/* =====================================================
            CREATE RESUME MODAL
        ===================================================== */}

        {showCreateResume && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-slate-900/40
              px-4
              backdrop-blur-sm
            "
            onClick={closeCreateModal}
          >

            <form
              onSubmit={createResume}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                relative
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
              "
            >

              {/* Close */}

              <button
                type="button"
                onClick={closeCreateModal}
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-slate-100
                  hover:text-slate-600
                "
              >

                <X className="size-4" />

              </button>


              {/* Icon */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-50
                  border
                  border-purple-100
                "
              >

                <Plus
                  className="
                    size-5
                    text-purple-600
                  "
                />

              </div>


              <h2
                className="
                  mt-5
                  text-lg
                  font-semibold
                  text-slate-800
                "
              >

                Create a new resume

              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >

                Give your resume a name to get started.

              </p>


              {/* Input Label */}

              <label
                className="
                  mt-6
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >

                Resume title

              </label>


              {/* Input */}

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g. Software Developer Resume"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                  focus:border-purple-500
                  focus:ring-4
                  focus:ring-purple-50
                "
                required
                autoFocus
              />


              {/* Create */}

              <button
                type="submit"
                className="
                  mt-5
                  w-full
                  rounded-xl
                  bg-purple-600
                  py-3
                  text-sm
                  font-medium
                  text-white
                  hover:bg-purple-700
                  transition-colors
                "
              >

                Create Resume

              </button>

            </form>

          </div>

        )}


        {/* =====================================================
            RENAME RESUME MODAL
        ===================================================== */}

        {editResumeID && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-slate-900/40
              px-4
              backdrop-blur-sm
            "
            onClick={closeEditModal}
          >

            <form
              onSubmit={editTitle}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                relative
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
              "
            >

              {/* Close */}

              <button
                type="button"
                onClick={closeEditModal}
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-slate-100
                  hover:text-slate-600
                "
              >

                <X className="size-4" />

              </button>


              {/* Icon */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-50
                  border
                  border-purple-100
                "
              >

                <Pencil
                  className="
                    size-5
                    text-purple-600
                  "
                />

              </div>


              <h2
                className="
                  mt-5
                  text-lg
                  font-semibold
                  text-slate-800
                "
              >

                Rename resume

              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >

                Update the name of your resume.

              </p>


              {/* Input Label */}

              <label
                className="
                  mt-6
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >

                Resume title

              </label>


              {/* Input */}

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Resume title"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                  focus:border-purple-500
                  focus:ring-4
                  focus:ring-purple-50
                "
                required
                autoFocus
              />


              {/* Save */}

              <button
                type="submit"
                className="
                  mt-5
                  w-full
                  rounded-xl
                  bg-purple-600
                  py-3
                  text-sm
                  font-medium
                  text-white
                  hover:bg-purple-700
                  transition-colors
                "
              >

                Save Changes

              </button>

            </form>

          </div>

        )}

      </div>

    </div>

  )
}

export default Dashboard