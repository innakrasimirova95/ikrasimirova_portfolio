import React from "react";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import { SectionTitle } from "./ui/SectionTitle";
import { useLanguage, useDictionary } from "@/context/LanguageContext";

export const EducationTimeline = React.forwardRef<HTMLElement>((props, ref) => {
  const { t } = useLanguage();
  const dictionary = useDictionary();

  const educationData = dictionary.education.degrees;

  return (
    <section id="educacion" ref={ref}>
      <SectionTitle>{t("education.title")}</SectionTitle>
      <div className="space-y-4">
        {educationData.map((item, i) => (
          <div
            key={i}
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
            ></div>

            <div className="pl-6">
              <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>

              <p className="flex items-center gap-2 text-primary font-medium italic mb-1">
                <HiOutlineLocationMarker className="w-5 h-5" />
                {item.institution}
              </p>

              <p className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                <HiOutlineCalendar className="w-5 h-5" />
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

EducationTimeline.displayName = "EducationTimeline";
