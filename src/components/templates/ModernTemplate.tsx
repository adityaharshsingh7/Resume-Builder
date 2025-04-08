
import React from "react";
import { useResume } from "@/context/ResumeContext";

const ModernTemplate: React.FC = () => {
  const { resume } = useResume();
  const { personalInfo, education, experience, skills } = resume;

  return (
    <div className="resume-page font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="bg-resume-primary text-white w-1/3 absolute left-0 top-0 bottom-0 p-6">
        {/* Profile */}
        <div className="mb-8 text-center">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
            {personalInfo.firstName && personalInfo.firstName.charAt(0)}
            {personalInfo.lastName && personalInfo.lastName.charAt(0)}
          </div>
          <h1 className="text-xl font-bold mb-1">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-sm text-white/80">{personalInfo.title}</p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-white/20 pb-1">
            CONTACT
          </h2>
          <div className="space-y-2 text-sm">
            {personalInfo.phone && (
              <div>
                <div className="font-bold">Phone</div>
                <div>{personalInfo.phone}</div>
              </div>
            )}
            {personalInfo.email && (
              <div>
                <div className="font-bold">Email</div>
                <div className="break-all">{personalInfo.email}</div>
              </div>
            )}
            {(personalInfo.city || personalInfo.state) && (
              <div>
                <div className="font-bold">Location</div>
                <div>{[personalInfo.city, personalInfo.state].filter(Boolean).join(", ")}</div>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-white/20 pb-1">
              SKILLS
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="text-sm mb-1 flex justify-between">
                    <span>{skill.name}</span>
                    <span className="text-xs">
                      {["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"][
                        skill.level - 1
                      ]}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="ml-1/3 w-2/3 absolute right-0 top-0 bottom-0 p-6 overflow-y-auto">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-resume-primary">
              PROFILE
            </h2>
            <p className="text-sm">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-resume-primary">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-resume-primary before:rounded-full">
                  <div className="flex flex-wrap justify-between">
                    <h3 className="font-bold text-resume-primary">
                      {exp.position}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                        exp.isCurrentJob
                          ? "Present"
                          : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      }
                    </span>
                  </div>
                  <p className="text-sm font-medium text-resume-secondary mb-1">
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
          <div>
            <h2 className="text-xl font-bold mb-3 text-resume-primary">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-resume-primary before:rounded-full">
                  <div className="flex flex-wrap justify-between">
                    <h3 className="font-bold text-resume-primary">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                        edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      }
                    </span>
                  </div>
                  <p className="text-sm font-medium text-resume-secondary mb-1">
                    {edu.institution}{edu.location && `, ${edu.location}`}
                  </p>
                  <p className="text-sm whitespace-pre-line">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
