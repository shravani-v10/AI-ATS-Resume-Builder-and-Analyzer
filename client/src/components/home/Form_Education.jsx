import {
  GraduationCap,
  Building2,
  Calendar,
  BookOpen,
  Award,
  Plus,
  Trash2,
} from "lucide-react";


const Form_Education = ({ data = [], onChange }) => {

  // Add new education
  const addEducation = () => {

    const newEducation = {
      degree: "",
      field: "",
      institution: "",
      start_date: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };


  // Remove education
  const removeEducation = (index) => {

    const updatedEducation = data.filter(
      (_, i) => i !== index
    );

    onChange(updatedEducation);
  };


  // Update education field
  const updateEducation = (index, field, value) => {

    const updatedEducation = data.map((education, i) => {

      if (i !== index) {
        return education;
      }

      return {
        ...education,
        [field]: value,
      };

    });

    onChange(updatedEducation);
  };


  return (
    <div className="space-y-6">


      {/* ================= HEADER ================= */}

      <div>

        <h2 className="text-xl font-semibold text-gray-800">
          Education
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add your educational qualifications and academic details.
        </p>

      </div>



      {/* ================= EDUCATION LIST ================= */}

{data.map((education, index) => (

  <div
    key={index}
    className="border border-gray-200 rounded-xl p-5 bg-gray-50/50"
  >

    {/* ================= CARD HEADER ================= */}

    <div className="flex items-center justify-between mb-5">

      <div className="flex items-center gap-2">

        <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
          <GraduationCap className="size-5" />
        </div>

        <h3 className="font-semibold text-gray-800">
          {index === 0
            ? "Highest Degree"
            : index === 1
            ? "12th / Higher Secondary"
            : index === 2
            ? "10th / Secondary"
            : `Education ${index + 1}`}
        </h3>

      </div>

      <button
        type="button"
        onClick={() => removeEducation(index)}
        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
        title="Remove education"
      >
        <Trash2 className="size-4" />
      </button>

    </div>


    {/* ================= DEGREE ================= */}

    <div className="mb-4">

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {index === 0
          ? "Degree"
          : index === 1
          ? "Class / Qualification"
          : index === 2
          ? "Class / Qualification"
          : "Degree"}
      </label>

      <div className="relative">

        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

        <input
          type="text"
          value={education.degree}
          onChange={(e) =>
            updateEducation(
              index,
              "degree",
              e.target.value
            )
          }
          placeholder={
            index === 0
              ? "e.g. B.Sc. Computer Science"
              : index === 1
              ? "e.g. 12th / HSC"
              : index === 2
              ? "e.g. 10th / SSC"
              : "e.g. B.Sc. Computer Science"
          }
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />

      </div>

    </div>


    {/* ================= FIELD OF STUDY ================= */}

    <div className="mb-4">

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {index === 0
          ? "Field of Study"
          : "Stream / Field"}
      </label>

      <div className="relative">

        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

        <input
          type="text"
          value={education.field}
          onChange={(e) =>
            updateEducation(
              index,
              "field",
              e.target.value
            )
          }
          placeholder={
            index === 0
              ? "e.g. Computer Science"
              : index === 1
              ? "e.g. Science / Commerce / Arts"
              : index === 2
              ? "e.g. General"
              : "e.g. Computer Science"
          }
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />

      </div>

    </div>


    {/* ================= INSTITUTION ================= */}

    <div className="mb-4">

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {index === 0
          ? "Institution / College"
          : index === 1
          ? "School / Junior College"
          : index === 2
          ? "School"
          : "Institution"}
      </label>

      <div className="relative">

        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

        <input
          type="text"
          value={education.institution}
          onChange={(e) =>
            updateEducation(
              index,
              "institution",
              e.target.value
            )
          }
          placeholder={
            index === 0
              ? "e.g. XYZ College of Science"
              : index === 1
              ? "e.g. XYZ Junior College"
              : index === 2
              ? "e.g. XYZ High School"
              : "e.g. XYZ College"
          }
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />

      </div>

    </div>


    {/* ================= DATES ================= */}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

      {/* ---------- START DATE ---------- */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          {index === 0 ? "Start Date" : "Start Date"}
        </label>

        <div className="relative">

          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />

          <input
            type="month"
            value={education.start_date}
            onChange={(e) =>
              updateEducation(
                index,
                "start_date",
                e.target.value
              )
            }
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />

        </div>

      </div>


      {/* ---------- GRADUATION DATE ---------- */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          {index === 0
            ? "Graduation Date"
            : index === 1
            ? "Passing Date"
            : index === 2
            ? "Passing Date"
            : "Graduation Date"}
        </label>

        <div className="relative">

          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />

          <input
            type="month"
            value={education.graduation_date}
            onChange={(e) =>
              updateEducation(
                index,
                "graduation_date",
                e.target.value
              )
            }
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />

        </div>

      </div>

    </div>


    {/* ================= GPA / PERCENTAGE ================= */}

    <div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {index === 0
          ? "GPA / CGPA / Percentage"
          : "Percentage"}
      </label>

      <div className="relative">

        <Award className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

        <input
          type="text"
          value={education.gpa}
          onChange={(e) =>
            updateEducation(
              index,
              "gpa",
              e.target.value
            )
          }
          placeholder={
            index === 0
              ? "e.g. 8.5 CGPA or 85%"
              : "e.g. 85%"
          }
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />

      </div>

    </div>

  </div>

))}
```




      {/* ================= ADD EDUCATION ================= */}

      <button
        type="button"
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-purple-300 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all"
      >

        <Plus className="size-4" />

        Add Education

      </button>



      {/* ================= EMPTY STATE ================= */}

      {data.length === 0 && (

        <div className="text-center py-6">

          <GraduationCap className="size-9 mx-auto text-gray-300 mb-2" />

          <p className="text-sm text-gray-500">
            No education added yet.
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Add your degree, college, and academic details.
          </p>

        </div>

      )}

    </div>
  );
};


export default Form_Education;