import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";


const Form_Experience = ({ data = [], onChange }) => {

  // Add new experience
  const addExperience = () => {

    const newExperience = {
      position: "",
      company: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
    };

    onChange([...data, newExperience]);
  };


  // Remove experience
  const removeExperience = (index) => {

    const updatedExperience = data.filter(
      (_, i) => i !== index
    );

    onChange(updatedExperience);
  };


  // Update experience field
  const updateExperience = (index, field, value) => {

    const updatedExperience = data.map((experience, i) => {

      if (i !== index) {
        return experience;
      }

      return {
        ...experience,
        [field]: value,
      };

    });

    onChange(updatedExperience);
  };


  return (
    <div className="space-y-6">


      {/* ================= HEADER ================= */}

      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Work Experience
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add your internships, jobs, and other relevant work experience.
        </p>
      </div>



      {/* ================= EXPERIENCE LIST ================= */}

      {data.map((experience, index) => (

        <div
          key={index}
          className="border border-gray-200 rounded-xl p-5 bg-gray-50/50"
        >


          {/* ---------- EXPERIENCE HEADER ---------- */}

          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-2">

              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <Briefcase className="size-5" />
              </div>

              <h3 className="font-semibold text-gray-800">
                Experience {index + 1}
              </h3>

            </div>


            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
              title="Remove experience"
            >
              <Trash2 className="size-4" />
            </button>

          </div>



          {/* ================= POSITION ================= */}

          <div className="mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Position
            </label>

            <div className="relative">

              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <input
                type="text"
                value={experience.position}
                onChange={(e) =>
                  updateExperience(
                    index,
                    "position",
                    e.target.value
                  )
                }
                placeholder="e.g. Software Developer Intern"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />

            </div>

          </div>



          {/* ================= COMPANY ================= */}

          <div className="mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company / Organization
            </label>

            <div className="relative">

              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <input
                type="text"
                value={experience.company}
                onChange={(e) =>
                  updateExperience(
                    index,
                    "company",
                    e.target.value
                  )
                }
                placeholder="e.g. ABC Technologies"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />

            </div>

          </div>



          {/* ================= DATES ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">


            {/* ---------- START DATE ---------- */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>

              <div className="relative">

                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />

                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "start_date",
                      e.target.value
                    )
                  }
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />

              </div>

            </div>



            {/* ---------- END DATE ---------- */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>

              <div className="relative">

                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />

                <input
                  type="month"
                  value={experience.end_date}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "end_date",
                      e.target.value
                    )
                  }
                  className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent ${
                    experience.is_current
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />

              </div>

            </div>

          </div>



          {/* ================= CURRENTLY WORKING ================= */}

          <div className="mb-4">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                checked={experience.is_current}
                onChange={(e) =>
                  updateExperience(
                    index,
                    "is_current",
                    e.target.checked
                  )
                }
                className="size-4 accent-purple-600"
              />

              <span className="text-sm text-gray-700">
                I currently work here
              </span>

            </label>

          </div>



          {/* ================= DESCRIPTION ================= */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <div className="relative">

              <FileText className="absolute left-3 top-3 size-4 text-gray-400" />

              <textarea
                rows="5"
                value={experience.description}
                onChange={(e) =>
                  updateExperience(
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe your responsibilities, achievements, technologies used, etc."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
              />

            </div>

            <p className="text-xs text-gray-400 mt-1">
              Tip: Mention your responsibilities and measurable achievements.
            </p>

          </div>

        </div>

      ))}



      {/* ================= ADD EXPERIENCE ================= */}

      <button
        type="button"
        onClick={addExperience}
        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-purple-300 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all"
      >

        <Plus className="size-4" />

        Add Experience

      </button>



      {/* ================= EMPTY STATE ================= */}

      {data.length === 0 && (

        <div className="text-center py-6">

          <Briefcase className="size-9 mx-auto text-gray-300 mb-2" />

          <p className="text-sm text-gray-500">
            No work experience added yet.
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Add an internship, job, or other relevant experience.
          </p>

        </div>

      )}

    </div>
  );
};


export default Form_Experience;