import {
  FolderKanban,
  FileText,
  Code2,
  Link as LinkIcon,
  Plus,
  Trash2,
} from "lucide-react";

const Form_Projects = ({ data = [], onChange }) => {
  // ================= ADD PROJECT =================
  const addProject = () => {
    const newProject = {
      name: "",
      description: "",
      technologies: "",
      link: "",
    };

    onChange([...data, newProject]);
  };

  // ================= REMOVE PROJECT =================
  const removeProject = (index) => {
    const updatedProjects = data.filter((_, i) => i !== index);
    onChange(updatedProjects);
  };

  // ================= UPDATE PROJECT =================
  const updateProject = (index, field, value) => {
    const updatedProjects = data.map((project, i) => {
      if (i !== index) return project;

      return {
        ...project,
        [field]: value,
      };
    });

    onChange(updatedProjects);
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Projects
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add your academic, personal, or professional projects.
        </p>
      </div>

      {/* ================= PROJECT CARDS ================= */}
      {data.map((project, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-5 bg-gray-50/50"
        >

          {/* ================= CARD HEADER ================= */}
          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-2">

              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <FolderKanban className="size-5" />
              </div>

              <h3 className="font-semibold text-gray-800">
                Project {index + 1}
              </h3>

            </div>

            <button
              type="button"
              onClick={() => removeProject(index)}
              className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
              title="Remove project"
            >
              <Trash2 className="size-4" />
            </button>

          </div>

          {/* ================= PROJECT NAME ================= */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>

            <div className="relative">

              <FolderKanban className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
                placeholder="e.g. AI ATS Resume Analyzer"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />

            </div>

          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>

            <div className="relative">

              <FileText className="absolute left-3 top-3 size-4 text-gray-400" />

              <textarea
                rows="5"
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                placeholder="Describe the project, its purpose, your contribution, and key features..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
              />

            </div>

            <p className="text-xs text-gray-400 mt-1">
              Mention what you built, your role, and important features.
            </p>

          </div>

          {/* ================= TECHNOLOGIES ================= */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies / Skills Used
            </label>

            <div className="relative">

              <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <input
                type="text"
                value={project.technologies}
                onChange={(e) =>
                  updateProject(index, "technologies", e.target.value)
                }
                placeholder="e.g. React, Node.js, MongoDB, Gemini AI"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />

            </div>

            <p className="text-xs text-gray-400 mt-1">
              Separate multiple technologies with commas.
            </p>

          </div>

          {/* ================= PROJECT LINK ================= */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Link
            </label>

            <div className="relative">

              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <input
                type="url"
                value={project.link}
                onChange={(e) =>
                  updateProject(index, "link", e.target.value)
                }
                placeholder="https://github.com/username/project"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />

            </div>

          </div>


        </div>
      ))}

      {/* ================= ADD PROJECT BUTTON ================= */}
      <button
        type="button"
        onClick={addProject}
        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-purple-300 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all"
      >
        <Plus className="size-4" />
        Add Project
      </button>

      {/* ================= EMPTY STATE ================= */}
      {data.length === 0 && (
        <div className="text-center py-6">

          <FolderKanban className="size-9 mx-auto text-gray-300 mb-2" />

          <p className="text-sm text-gray-500">
            No projects added yet.
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Add academic, personal, or professional projects.
          </p>

        </div>
      )}

    </div>
  );
};

export default Form_Projects;