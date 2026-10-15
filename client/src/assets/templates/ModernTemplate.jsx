import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {

  // ================= FORMAT DATES =================
  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const [year, month] = dateStr.split("-");

    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // ================= PERSONAL INFO =================
  const personalInfo = data?.personal_info || {};

  // Support both new and old field names
  const fullName =
    personalInfo.fullName ||
    personalInfo.full_name ||
    personalInfo.fullname ||
    "Your Name";

  const jobTitle =
    personalInfo.jobTitle ||
    personalInfo.job_title ||
    "";

  const portfolio =
    personalInfo.portfolio ||
    personalInfo.website ||
    "";


  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-800">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header
        className="px-8 py-8 text-white"
        style={{ backgroundColor: accentColor }}
      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* ================= NAME ================= */}

          <div>

            <h1 className="text-4xl font-bold tracking-tight">
              {fullName}
            </h1>

            {/* JOB TITLE */}

            {jobTitle && (
              <p className="mt-1 text-white/90 text-lg font-medium">
                {jobTitle}
              </p>
            )}

            {/* PROFESSIONAL SUMMARY */}

            {data?.professional_summary && (
              <p className="mt-2 text-white/90 text-sm max-w-xl">
                {data.professional_summary}
              </p>
            )}

          </div>


          {/* ================= CONTACT INFORMATION ================= */}

          <div className="flex flex-col gap-2 text-sm">

            {/* EMAIL */}

            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="size-4" />

                <span className="break-all">
                  {personalInfo.email}
                </span>
              </div>
            )}


            {/* PHONE */}

            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-4" />

                <span>
                  {personalInfo.phone}
                </span>
              </div>
            )}


            {/* LOCATION */}

            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />

                <span>
                  {personalInfo.location}
                </span>
              </div>
            )}

          </div>

        </div>


        {/* ================= SOCIAL LINKS ================= */}

        {(personalInfo.linkedin ||
          personalInfo.github ||
          portfolio) && (

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-4 border-t border-white/30 text-sm">

            {/* LINKEDIN */}

            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">

                <LinkIcon className="size-4" />

                <span className="break-all">
                  {personalInfo.linkedin}
                </span>

              </div>
            )}


            {/* GITHUB */}

            {personalInfo.github && (
              <div className="flex items-center gap-2">

                <LinkIcon className="size-4" />

                <span className="break-all">
                  {personalInfo.github}
                </span>

              </div>
            )}


            {/* PORTFOLIO */}

            {portfolio && (
              <div className="flex items-center gap-2">

                <Globe className="size-4" />

                <span className="break-all">
                  {portfolio}
                </span>

              </div>
            )}

          </div>

        )}

      </header>



      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="grid md:grid-cols-3 gap-8 px-8 py-8">


        {/* ================================================= */}
        {/* LEFT COLUMN */}
        {/* ================================================= */}

        <aside className="md:col-span-1 space-y-7">


          {/* ================= SKILLS ================= */}

          {data?.skills?.length > 0 && (

            <section>

              <h2
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                Skills
              </h2>


              <div className="space-y-2">

                {data.skills.map((skill, index) => (

                  <div
                    key={index}
                    className="text-sm text-gray-700 border-b border-gray-200 pb-2"
                  >
                    {skill}
                  </div>

                ))}

              </div>

            </section>

          )}



          {/* ================= EDUCATION ================= */}

          {data?.education?.length > 0 && (

            <section>

              <h2
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                Education
              </h2>


              <div className="space-y-5">

                {data.education.map((edu, index) => (

                  <div key={index}>

                    {/* DEGREE */}

                    <h3 className="font-semibold text-gray-900 text-sm">

                      {edu.degree}

                      {edu.field && ` in ${edu.field}`}

                    </h3>


                    {/* INSTITUTION */}

                    <p className="text-sm text-gray-600 mt-1">
                      {edu.institution}
                    </p>


                    {/* GPA */}

                    {edu.gpa && (
                      <p className="text-xs text-gray-500 mt-1">
                        GPA: {edu.gpa}
                      </p>
                    )}


                    {/* GRADUATION DATE */}

                    {edu.graduation_date && (
                      <p
                        className="text-xs mt-1 font-medium"
                        style={{ color: accentColor }}
                      >
                        {formatDate(edu.graduation_date)}
                      </p>
                    )}

                  </div>

                ))}

              </div>

            </section>

          )}

        </aside>



        {/* ================================================= */}
        {/* RIGHT COLUMN */}
        {/* ================================================= */}

        <main className="md:col-span-2 space-y-8">


          {/* ================= PROFESSIONAL SUMMARY ================= */}

          {data?.professional_summary && (

            <section>

              <h2
                className="text-lg font-bold uppercase tracking-wide mb-3"
                style={{ color: accentColor }}
              >
                Professional Summary
              </h2>

              <p className="text-gray-700 leading-relaxed text-sm">
                {data.professional_summary}
              </p>

            </section>

          )}



          {/* ================= EXPERIENCE ================= */}

          {data?.experience?.length > 0 && (

            <section>

              <h2
                className="text-lg font-bold uppercase tracking-wide mb-5"
                style={{ color: accentColor }}
              >
                Experience
              </h2>


              <div className="space-y-6">

                {data.experience.map((exp, index) => (

                  <div
                    key={index}
                    className="relative pl-5 border-l-2"
                    style={{ borderColor: accentColor }}
                  >

                    {/* POSITION */}

                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>


                    {/* COMPANY */}

                    <p className="text-sm font-medium text-gray-700">
                      {exp.company}
                    </p>


                    {/* DATE */}

                    <p
                      className="text-xs mt-1 font-medium"
                      style={{ color: accentColor }}
                    >

                      {formatDate(exp.start_date)}

                      {exp.start_date && " - "}

                      {exp.is_current
                        ? "Present"
                        : formatDate(exp.end_date)
                      }

                    </p>


                    {/* DESCRIPTION */}

                    {exp.description && (

                      <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>

                    )}

                  </div>

                ))}

              </div>

            </section>

          )}



          {/* ================= PROJECTS ================= */}

          {data?.projects?.length > 0 && (

            <section>

              <h2
                className="text-lg font-bold uppercase tracking-wide mb-5"
                style={{ color: accentColor }}
              >
                Projects
              </h2>


              <div className="space-y-5">

                {data.projects.map((project, index) => (

                  <div key={index}>

                    {/* PROJECT NAME */}

                    <h3 className="font-semibold text-gray-900">
                      {project.name}
                    </h3>


                    {/* PROJECT DESCRIPTION */}

                    {project.description && (

                      <p className="text-sm text-gray-700 mt-1 leading-relaxed whitespace-pre-line">
                        {project.description}
                      </p>

                    )}


                    {/* TECHNOLOGIES */}

                    {project.technologies && (

                      <p className="text-sm text-gray-600 mt-2">

                        <span className="font-semibold text-gray-800">
                          Technologies:
                        </span>{" "}

                        {project.technologies}

                      </p>

                    )}


                    {/* PROJECT LINK */}

                    {project.link && (

                      <p className="text-sm mt-1">

                        <span className="font-semibold text-gray-800">
                          Project Link:
                        </span>{" "}

                        <span
                          className="break-all"
                          style={{ color: accentColor }}
                        >
                          {project.link}
                        </span>

                      </p>

                    )}

                  </div>

                ))}

              </div>

            </section>

          )}

        </main>

      </div>

    </div>
  );
};

export default ModernTemplate;