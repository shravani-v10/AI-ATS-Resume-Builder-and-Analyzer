import {
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";

const Form_Skills = ({ data = [], onChange }) => {

  const addSkill = () => {
    onChange([...data, ""]);
  };

  const removeSkill = (index) => {
    const updatedSkills = data.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };

  const updateSkill = (index, value) => {
    const updatedSkills = [...data];
    updatedSkills[index] = value;
    onChange(updatedSkills);
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="size-5 text-purple-500" />

          <h2 className="text-xl font-semibold text-gray-800">
            Skills
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          Add the technical and professional skills you want to highlight
          on your resume.
        </p>
      </div>

      {/* Skills List */}
      <div className="space-y-3">

        {data.length > 0 ? (
          data.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >

              {/* Skill Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    updateSkill(index, e.target.value)
                  }
                  placeholder="Example: JavaScript"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="p-3 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                title="Remove skill"
              >
                <Trash2 className="size-5" />
              </button>

            </div>
          ))
        ) : (
          <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Sparkles className="size-8 text-gray-300 mx-auto mb-3" />

            <p className="text-sm text-gray-500">
              No skills added yet.
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Click "Add Skill" to add your first skill.
            </p>
          </div>
        )}

      </div>

      {/* Add Skill Button */}
      <button
        type="button"
        onClick={addSkill}
        className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-purple-300 text-purple-600 text-sm font-medium hover:bg-purple-50 transition-all"
      >
        <Plus className="size-4" />
        Add Skill
      </button>

    </div>
  );
};

export default Form_Skills;