import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Palette,
  Check,
  ChevronDown,
} from "lucide-react";

const TemplateSelector = ({
  template,
  accentColor,
  onTemplateChange,
  onColorChange,
}) => {
  const [openMenu, setOpenMenu] = useState(null);

  const selectorRef = useRef(null);

  // =========================
  // TEMPLATE OPTIONS
  // =========================

  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "A clean, traditional resume design.",
    },
    {
      id: "modern",
      name: "Modern",
      description: "A sleek design with a modern feel.",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "A simple design focused on your content.",
    },
  ];

  // =========================
  // ACCENT COLORS
  // =========================

  const colors = [
    {
      name: "Blue",
      value: "#3B82F6",
    },
    {
      name: "Indigo",
      value: "#6366F1",
    },
    {
      name: "Purple",
      value: "#8B5CF6",
    },
    {
      name: "Green",
      value: "#10B981",
    },
    {
      name: "Red",
      value: "#EF4444",
    },
    {
      name: "Orange",
      value: "#F97316",
    },
    {
      name: "Teal",
      value: "#14B8A6",
    },
    {
      name: "Pink",
      value: "#EC4899",
    },
    {
      name: "Gray",
      value: "#6B7280",
    },
    {
      name: "Black",
      value: "#1F2937",
    },
  ];

  // =========================
  // CLOSE DROPDOWN
  // WHEN CLICKING OUTSIDE
  // =========================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // TEMPLATE CLICK
  // =========================

  const handleTemplateClick = (templateId) => {
    onTemplateChange(templateId);
    setOpenMenu(null);
  };

  // =========================
  // COLOR CLICK
  // =========================

  const handleColorClick = (color) => {
    onColorChange(color);
    setOpenMenu(null);
  };

  

  return (
    <div
      ref={selectorRef}
      className="relative w-full"
    >

      {/* ================================= */}
      {/* TOP BUTTONS */}
      {/* ================================= */}

      <div className="flex items-center gap-2 border-b border-gray-200 pb-3">

        {/* ================= TEMPLATE BUTTON ================= */}

        <button
          type="button"
          onClick={() =>
            setOpenMenu(
              openMenu === "template"
                ? null
                : "template"
            )
          }
          className={`flex items-center gap-2 px-3 py-2
            rounded-lg text-sm font-medium transition-all
            border
            ${
              openMenu === "template"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
        >

          <FileText className="size-4" />

          <span>Template</span>

          <ChevronDown
            className={`size-3.5 transition-transform ${
              openMenu === "template"
                ? "rotate-180"
                : ""
            }`}
          />

        </button>


        {/* ================= ACCENT BUTTON ================= */}

        <button
          type="button"
          onClick={() =>
            setOpenMenu(
              openMenu === "accent"
                ? null
                : "accent"
            )
          }
          className={`flex items-center gap-2 px-3 py-2
            rounded-lg text-sm font-medium transition-all
            border
            ${
              openMenu === "accent"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
        >

          <Palette className="size-4" />

          <span>Accent</span>

          {/* Selected Color Circle */}

          <span
            className="size-3.5 rounded-full border border-gray-300"
            style={{
              backgroundColor: accentColor,
            }}
          />

        </button>

      </div>


      {/* ================================= */}
      {/* TEMPLATE DROPDOWN */}
      {/* ================================= */}

      {openMenu === "template" && (

        <div
          className="absolute z-50 left-0 top-14
          w-72 bg-white border border-gray-200
          rounded-xl shadow-xl overflow-hidden"
        >

          {/* Dropdown Header */}

          <div className="px-4 py-3 border-b border-gray-100">

            <h3 className="text-sm font-semibold text-gray-800">
              Choose Template
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Select a layout for your resume.
            </p>

          </div>


          {/* Template List */}

          <div className="p-2">

            {templates.map((item) => (

              <button
                type="button"
                key={item.id}
                onClick={() =>
                  handleTemplateClick(item.id)
                }
                className={`w-full text-left p-3
                  rounded-lg transition-all
                  flex items-start justify-between
                  ${
                    template === item.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
              >

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>

                </div>


                {/* Selected Check */}

                {template === item.id && (

                  <div className="flex items-center justify-center
                    size-5 rounded-full bg-blue-500 text-white">

                    <Check className="size-3.5" />

                  </div>

                )}

              </button>

            ))}

          </div>

        </div>

      )}


      {/* ================================= */}
      {/* ACCENT COLOR DROPDOWN */}
      {/* ================================= */}

      {openMenu === "accent" && (

        <div
          className="absolute z-50 left-24 top-14
          w-64 bg-white border border-gray-200
          rounded-xl shadow-xl p-4"
        >

          {/* Dropdown Header */}

          <div className="mb-4">

            <h3 className="text-sm font-semibold text-gray-800">
              Accent Color
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Choose a color for your resume.
            </p>

          </div>


          {/* Color Grid */}

          <div className="grid grid-cols-4 gap-4">

            {colors.map((color) => (

              <button
                type="button"
                key={color.value}
                onClick={() =>
                  handleColorClick(color.value)
                }
                className="flex flex-col items-center
                  gap-1.5 group"
                title={color.name}
              >

                {/* Color Circle */}

                <div
                  className={`relative size-10 rounded-full
                    border-2 transition-all
                    group-hover:scale-110
                    ${
                      accentColor === color.value
                        ? "border-gray-700"
                        : "border-transparent"
                    }`}
                  style={{
                    backgroundColor: color.value,
                  }}
                >

                  {/* Selected Check */}

                  {accentColor === color.value && (

                    <div
                      className="absolute inset-0
                      flex items-center justify-center"
                    >

                      <Check
                        className="size-5 text-white"
                        strokeWidth={3}
                      />

                    </div>

                  )}

                </div>


                {/* Color Name */}

                <span className="text-[11px] text-gray-600">
                  {color.name}
                </span>

              </button>

            ))}

          </div>

        </div>

      )}

    </div>
  );
};

export default TemplateSelector;