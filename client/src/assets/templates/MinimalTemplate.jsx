import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

const MinimalTemplate = ({ data, accentColor }) => {

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
    <div className="w-full max-w-4xl mx-auto bg-white p-10 text-gray-800">

      {/* ================= HEADER ================= */}

      <header className="mb-8">

        {/* NAME */}

        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          {fullName}
        </h1>


        {/* JOB TITLE */}

        {jobTitle && (
          <p className="mt-1 text-lg font-medium text-gray-600">
            {jobTitle}
          </p>
        )}


        {/* ACCENT LINE */}

        <div
          className="h-1 w-16 mt-3 mb-4"
          style={{ backgroundColor: accentColor }}
        />


        {/* CONTACT INFORMATION */}

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">

          {/* EMAIL */}

          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="size-4" />

              <span className="break-all">
                {personalInfo.email}
              </span>
            </div>
          )}


          {/* PHONE */}

          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="size-4" />

              <span>
                {personalInfo.phone}
              </span>
            </div>
          )}


          {/* LOCATION */}

          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4" />

              <span>
                {personalInfo.location}
              </span>
            </div>
          )}


          {/* LINKEDIN */}

          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">

              <LinkIcon className="size-4" />

              <span className="break-all">
                {personalInfo.linkedin}
              </span>

            </div>
          )}


          {/* GITHUB */}

          {personalInfo.github && (
            <div className="flex items-center gap-1.5">

              <LinkIcon className="size-4" />

              <span className="break-all">
                {personalInfo.github}
              </span>

            </div>
          )}


          {/* PORTFOLIO */}

          {portfolio && (
            <div className="flex items-center gap-1.5">

              <Globe className="size-4" />

              <span className="break-all">
                {portfolio}
              </span>

            </div>
          )}

        </div>

      </header>


      {/* ================= SUMMARY ================= */}

      {data?.professional_summary && (
        <section className="mb-8">

          <h2
            className="text-sm font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: accentColor }}
          >
            Profile
          </h2>

          <p className="text-sm text-gray-700 leading-6">
            {data.professional_summary}
          </p>

        </section>
      )}


      {/* ================= EXPERIENCE ================= */}

      {data?.experience?.length > 0 && (
        <section className="mb-8">

          <h2
            className="text-sm font-bold uppercase tracking-[0.2em] mb-5"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-6">

            {data.experience.map((exp, index) => (

              <div key={index}>

                <div className="flex justify-between items-start gap-4">

                  <div>

                    {/* POSITION */}

                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>


                    {/* COMPANY */}

                    <p className="text-sm text-gray-600 mt-0.5">
                      {exp.company}
                    </p>

                  </div>


                  {/* DATE */}

                  <p className="text-xs text-gray-500 whitespace-nowrap">

                    {formatDate(exp.start_date)}

                    {exp.start_date && " – "}

                    {exp.is_current
                      ? "Present"
                      : formatDate(exp.end_date)}

                  </p>

                </div>


                {/* DESCRIPTION */}

                {exp.description && (
                  <p className="text-sm text-gray-700 leading-6 mt-2 whitespace-pre-line">
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
        <section className="mb-8">

          <h2
            className="text-sm font-bold uppercase tracking-[0.2em] mb-5"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-5">

            {data.education.map((edu, index) => (

              <div
                key={index}
                className="flex justify-between items-start gap-4"
              >

                <div>

                  {/* DEGREE */}

                  <h3 className="font-semibold text-gray-900">

                    {edu.degree}

                    {edu.field && ` in ${edu.field}`}

                  </h3>


                  {/* INSTITUTION */}

                  <p className="text-sm text-gray-600 mt-0.5">
                    {edu.institution}
                  </p>


                  {/* GPA */}

                  {edu.gpa && (
                    <p className="text-xs text-gray-500 mt-1">
                      GPA: {edu.gpa}
                    </p>
                  )}

                </div>


                {/* GRADUATION DATE */}

                <p className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(edu.graduation_date)}
                </p>

              </div>

            ))}

          </div>

        </section>
      )}


      {/* ================= PROJECTS ================= */}

      {data?.projects?.length > 0 && (
        <section className="mb-8">

          <h2
            className="text-sm font-bold uppercase tracking-[0.2em] mb-5"
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
                  <p className="text-sm text-gray-700 leading-6 mt-1 whitespace-pre-line">
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
        <section className="mb-4">

          <h2
            className="text-sm font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-x-5 gap-y-2">

            {data.skills.map((skill, index) => (

              <span
                key={index}
                className="text-sm text-gray-700"
              >
                {skill}
              </span>

            ))}

          </div>

        </section>
      )}

    </div>
  );
};

export default MinimalTemplate;