import React from 'react';
import { FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import { SectionTitle } from './ui/SectionTitle';
import { useLanguage, useDictionary } from "@/context/LanguageContext";

const ExperienceComponent = React.forwardRef<HTMLElement>((props, ref) => {
  const { t } = useLanguage();
  const dictionary = useDictionary();

  const experienceData = dictionary.experience.roles;

  return (
    <section id="experience" ref={ref} className="scroll-mt-24 py-16">
      <SectionTitle>{t("experience.title")}</SectionTitle>

      <div className="space-y-4">
        {experienceData.map((exp, index) => (
          <div
            key={index}
            className="
              group relative transition-all duration-300 ease-in-out transform
              hover:scale-105 active:scale-105
              hover:shadow-lg active:shadow-lg
              p-6 mb-8
            "
          >
            <div
              className="
                absolute left-0 top-0 bottom-0 w-1 bg-white
                group-hover:bg-gradient-to-b group-active:bg-gradient-to-b
                from-blue-500 via-purple-600 to-pink-500
                transition-all duration-300
              "
            />

            <div className="pl-6">
              <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {exp.role}
              </h3>

              <p className="flex items-center gap-2 text-primary font-medium italic mb-1">
                <FaBuilding className="w-4 h-4" /> {exp.company}
              </p>

              <p className="flex items-center gap-2 text-xs sm:text-sm text-foreground mb-2">
                <FaCalendarAlt className="w-4 h-4" /> {exp.period}
              </p>

              <p className="text-xs sm:text-base text-foreground">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

ExperienceComponent.displayName = "Experience";

export const Experience = ExperienceComponent;
