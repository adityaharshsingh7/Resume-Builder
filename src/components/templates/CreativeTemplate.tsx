
import React from "react";
import { useResume } from "@/context/ResumeContext";

const CreativeTemplate: React.FC = () => {
  const { resume } = useResume();
  const { personalInfo, education, experience, skills } = resume;

  return (
    <div className="resume-page font-sans">
      {/* Header */}
      <div className="bg-resume-accent p-8 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-resume-accent opacity-60 clip-path-diagonal"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-1">
            {personalInfo.firstName} <span className="text-resume-light">{personalInfo.lastName}</span>
          </h1>
          <p className="text-xl text-white/90">{personalInfo.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 p-8">
        {/* Left Column */}
        <div className="col-span-4">
          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-resume-accent relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-resume-accent">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {personalInfo.phone && (
                <div className="flex">
                  <div className="font-bold w-20">Phone:</div>
                  <div>{personalInfo.phone}</div>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex">
                  <div className="font-bold w-20">Email:</div>
                  <div className="break-all">{personalInfo.email}</div>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex">
                  <div className="font-bold w-20">Address:</div>
                  <div>
                    {personalInfo.address}, {personalInfo.city}, {personalInfo.state} {personalInfo.zipCode}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-resume-accent relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-resume-accent">
                SKILLS
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="p-2 bg-gray-50 rounded-md shadow-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-resume-accent/20 rounded-full text-resume-accent">
                        {["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"][
                          skill.level - 1
                        ]}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-resume-accent"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-resume-accent relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-resume-accent">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="p-2">
                    <div className="font-bold">{edu.institution}</div>
                    <div className="text-sm font-medium text-resume-accent mb-1">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                        edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      }
                    </div>
                    <p className="text-xs whitespace-pre-line">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-8">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-resume-accent relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-resume-accent">
                ABOUT ME
              </h2>
              <p className="text-sm whitespace-pre-line">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-resume-accent relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-resume-accent">
                WORK EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-3 border-l-4 border-resume-accent bg-gray-50">
                    <div className="flex flex-wrap justify-between">
                      <h3 className="font-bold">
                        {exp.position}
                      </h3>
                      <span className="text-xs px-2 py-0.5 bg-resume-accent/20 rounded-full text-resume-accent">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                          exp.isCurrentJob
                            ? "Present"
                            : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        }
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-2">
                      {exp.company}{exp.location && `, ${exp.location}`}
                    </p>
                    <p className="text-sm whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .clip-path-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default CreativeTemplate;
