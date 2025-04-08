
import React from "react";
import { useResume } from "@/context/ResumeContext";

const SimpleTemplate: React.FC = () => {
  const { resume } = useResume();
  const { personalInfo, education, experience, skills } = resume;

  return (
    <div className="resume-page p-8 font-sans">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-resume-primary mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-resume-secondary mb-2">{personalInfo.title}</p>
        <div className="text-sm text-gray-600">
          <p>{personalInfo.address}, {personalInfo.city}, {personalInfo.state} {personalInfo.zipCode}</p>
          <p>{personalInfo.phone} | {personalInfo.email}</p>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-300 text-resume-primary">
            Professional Summary
          </h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-300 text-resume-primary">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-sm">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                      exp.isCurrentJob
                        ? "Present"
                        : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    }
                  </span>
                </div>
                <p className="text-sm font-semibold text-resume-secondary">
                  {exp.company}{exp.location && `, ${exp.location}`}
                </p>
                <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-300 text-resume-primary">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
                  <span className="text-sm">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                      edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    }
                  </span>
                </div>
                <p className="text-sm font-semibold text-resume-secondary">
                  {edu.institution}{edu.location && `, ${edu.location}`}
                </p>
                <p className="text-sm mt-1 whitespace-pre-line">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-300 text-resume-primary">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-gray-100 px-3 py-1 rounded text-sm">
                {skill.name}
                {skill.level > 0 && (
                  <span className="ml-1 text-gray-500">
                    {" • "}
                    {["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"][
                      skill.level - 1
                    ]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleTemplate;
