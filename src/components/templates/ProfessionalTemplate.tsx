
import React from "react";
import { useResume } from "@/context/ResumeContext";

const ProfessionalTemplate: React.FC = () => {
  const { resume } = useResume();
  const { personalInfo, education, experience, skills } = resume;

  return (
    <div className="resume-page font-sans">
      {/* Header */}
      <div className="bg-resume-primary text-white p-8">
        <h1 className="text-3xl font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl mt-1">{personalInfo.title}</p>
      </div>

      {/* Contact Info */}
      <div className="bg-resume-secondary text-white px-8 py-2 flex flex-wrap text-sm">
        {personalInfo.phone && (
          <div className="mr-4 mb-1">
            Phone: {personalInfo.phone}
          </div>
        )}
        {personalInfo.email && (
          <div className="mr-4 mb-1">
            Email: {personalInfo.email}
          </div>
        )}
        {(personalInfo.city || personalInfo.state) && (
          <div className="mb-1">
            Location: {[personalInfo.city, personalInfo.state].filter(Boolean).join(", ")}
          </div>
        )}
      </div>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-resume-primary border-b border-resume-secondary pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-resume-primary border-b border-resume-secondary pb-1">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap justify-between">
                    <h3 className="font-bold text-resume-primary">
                      {exp.position}
                    </h3>
                    <span className="text-sm">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                        exp.isCurrentJob
                          ? "Present"
                          : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      }
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-resume-secondary mb-1">
                    {exp.company}{exp.location && `, ${exp.location}`}
                  </p>
                  <p className="text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-resume-primary border-b border-resume-secondary pb-1">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap justify-between">
                    <h3 className="font-bold text-resume-primary">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </h3>
                    <span className="text-sm">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                        edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      }
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-resume-secondary mb-1">
                    {edu.institution}{edu.location && `, ${edu.location}`}
                  </p>
                  <p className="text-sm whitespace-pre-line">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 text-resume-primary border-b border-resume-secondary pb-1">
              SKILLS
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center">
                  <div className="mr-2 font-medium">{skill.name}</div>
                  <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-resume-secondary"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
