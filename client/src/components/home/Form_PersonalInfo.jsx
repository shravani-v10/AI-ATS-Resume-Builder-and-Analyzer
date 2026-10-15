import React from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
  FileText,
  Briefcase
} from 'lucide-react'

const Form_PersonalInfo = ({ data = {}, onChange }) => {

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">

        <div className="flex items-center justify-center size-11 rounded-xl bg-indigo-50 text-indigo-600">
          <FileText className="size-6" />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-slate-800">
            Personal Information
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Add your contact details and professional information.
          </p>

        </div>

      </div>


      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {/* ================= FULL NAME ================= */}

        <div className="md:col-span-2">

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>

          <div className="relative">

            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

            <input
              type="text"
              name="fullName"
              value={data.fullName || ''}
              onChange={onChange}
              placeholder="e.g. John Doe"
              required
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700 placeholder:text-slate-400
              outline-none transition-all
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>


        {/* ================= PROFESSIONAL TITLE ================= */}

        <div className="md:col-span-2">

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Professional Title <span className="text-red-500">*</span>
          </label>

          <div className="relative">

            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

            <input
              type="text"
              name="jobTitle"
              value={data.jobTitle || ''}
              onChange={onChange}
              placeholder="e.g. Full Stack Developer"
              required
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700 placeholder:text-slate-400
              outline-none transition-all
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          <p className="text-xs text-slate-400 mt-2">
            Use a title that best describes your professional role.
          </p>

        </div>


        {/* ================= EMAIL ================= */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>

          <div className="relative">

            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

            <input
              type="email"
              name="email"
              value={data.email || ''}
              onChange={onChange}
              placeholder="john@example.com"
              required
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700 placeholder:text-slate-400
              outline-none transition-all
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>


        {/* ================= PHONE ================= */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone
          </label>

          <div className="relative">

            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

            <input
              type="tel"
              name="phone"
              value={data.phone || ''}
              onChange={onChange}
              placeholder="+91 98765 43210"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700 placeholder:text-slate-400
              outline-none transition-all
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>


        {/* ================= LOCATION ================= */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Location
          </label>

          <div className="relative">

            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

            <input
              type="text"
              name="location"
              value={data.location || ''}
              onChange={onChange}
              placeholder="Mumbai, Maharashtra"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700 placeholder:text-slate-400
              outline-none transition-all
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>


        {/* ================= LINKEDIN ================= */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            LinkedIn
          </label>

          <div className="relative">

            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

            <input
              type="url"
              name="linkedin"
              value={data.linkedin || ''}
              onChange={onChange}
              placeholder="linkedin.com/in/yourname"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700 placeholder:text-slate-400
              outline-none transition-all
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>


        {/* ================= GITHUB ================= */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            GitHub
          </label>

          <div className="relative">

            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

            <input
              type="url"
              name="github"
              value={data.github || ''}
              onChange={onChange}
              placeholder="github.com/yourusername"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700 placeholder:text-slate-400
              outline-none transition-all
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>


        {/* ================= PORTFOLIO ================= */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Portfolio
          </label>

          <div className="relative">

            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

            <input
              type="url"
              name="portfolio"
              value={data.portfolio || ''}
              onChange={onChange}
              placeholder="yourportfolio.com"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700 placeholder:text-slate-400
              outline-none transition-all
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

      </div>


      {/* Tip */}
      <div className="mt-8 p-4 rounded-xl bg-indigo-50 border border-indigo-100">

        <p className="text-sm text-indigo-700">

          <span className="font-semibold">
            Tip:
          </span>{' '}

          Use a professional email address and make sure your contact links
          are up to date.

        </p>

      </div>

    </div>
  )
}

export default Form_PersonalInfo