import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {

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

  // Support both old and new field names
  const fullName =
    personalInfo.fullName ||
    personalInfo.full_name ||
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
    <div className="w-full max-w-4xl mx-auto bg-white p-8 text-gray-800 leading-relaxed">

      {/* ================= HEADER ================= */}

      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >

        {/* NAME */}
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: accentColor }}
        >
          {fullName}
        </h1>

        {/* JOB TITLE */}
        {jobTitle && (
          <p className="text-lg font-medium text-gray-600 mb-3">
            {jobTitle}
          </p>
        )}

        {/* CONTACT INFORMATION */}

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-600">

          {/* EMAIL */}
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}

          {/* PHONE */}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}

          {/* LOCATION */}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}

          {/* LINKEDIN */}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <LinkIcon className="size-4" />

              <span className="break-all">
                {personalInfo.linkedin}
              </span>
            </div>
          )}

          {/* GITHUB */}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <LinkIcon className="size-4" />

              <span className="break-all">
                {personalInfo.github}
              </span>
            </div>
          )}

          {/* PORTFOLIO */}
          {portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />

              <span className="break-all">
                {portfolio}
              </span>
            </div>
          )}

        </div>

      </header>


      {/* ================= PROFESSIONAL SUMMARY ================= */}

      {data?.professional_summary && (
        <section className="mb-7">

          <h2
            className="text-lg font-bold mb-3 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {data.professional_summary}
          </p>

        </section>
      )}


      {/* ================= EXPERIENCE ================= */}

      {data?.experience?.length > 0 && (
        <section className="mb-7">

          <h2
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Professional Experience
          </h2>

          <div className="space-y-5">

            {data.experience.map((exp, index) => (

              <div
                key={index}
                className="border-l-2 pl-4"
                style={{ borderColor: accentColor }}
              >

                <div className="flex justify-between gap-4">

                  <div>

                    {/* JOB POSITION */}
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>

                    {/* COMPANY */}
                    <p className="font-medium text-gray-700">
                      {exp.company}
                    </p>

                  </div>


                  {/* EXPERIENCE DATES */}

                  <div className="text-sm text-gray-600 text-right whitespace-nowrap">

                    {formatDate(exp.start_date)}

                    {exp.start_date && " - "}

                    {exp.is_current
                      ? "Present"
                      : formatDate(exp.end_date)
                    }

                  </div>

                </div>


                {/* EXPERIENCE DESCRIPTION */}

                {exp.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}

              </div>

            ))}

          </div>

        </section>
      )}


      {/* ================= EDUCATION ================= */}

      {data?.education?.length > 0 && (
        <section className="mb-7">

          <h2
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-4">

            {data.education.map((edu, index) => (

              <div
                key={index}
                className="flex justify-between gap-4"
              >

                <div>

                  {/* DEGREE */}
                  <h3 className="font-semibold text-gray-900">

                    {edu.degree}

                    {edu.field && ` in ${edu.field}`}

                  </h3>

                  {/* INSTITUTION */}
                  <p className="text-gray-700">
                    {edu.institution}
                  </p>

                  {/* GPA */}
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">
                      GPA: {edu.gpa}
                    </p>
                  )}

                </div>


                {/* GRADUATION DATE */}

                <div className="text-sm text-gray-600 whitespace-nowrap">

                  {formatDate(edu.graduation_date)}

                </div>

              </div>

            ))}

          </div>

        </section>
      )}


      {/* ================= PROJECTS ================= */}

      {data?.projects?.length > 0 && (
        <section className="mb-7">

          <h2
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-4">

            {data.projects.map((project, index) => (

              <div
                key={index}
                className="border-l-2 pl-4"
                style={{ borderColor: accentColor }}
              >

                {/* PROJECT NAME */}

                <h3 className="font-semibold text-gray-900">
                  {project.name}
                </h3>


                {/* PROJECT DESCRIPTION */}

                {project.description && (
                  <p className="text-gray-700 mt-1 whitespace-pre-line">
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


      {/* ================= SKILLS ================= */}

      {data?.skills?.length > 0 && (
        <section className="mb-7">

          <h2
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-x-6 gap-y-2">

            {data.skills.map((skill, index) => (

              <span
                key={index}
                className="text-gray-700"
              >
                • {skill}
              </span>

            ))}

          </div>

        </section>
      )}

    </div>
  );
};

export default ClassicTemplate;