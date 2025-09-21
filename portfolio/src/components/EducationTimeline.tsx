import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

export function EducationTimeline() {
  const education = [
    {
      title: "MÁSTER EN DIRECCIÓN Y GESTIÓN DE PROYECTOS SOFTWARE",
      institution: "Universidad Politécnica de Madrid - ETSII",
      date: "Octubre 2022 - Julio 2024",
    },
    {
      title: "ERASMUS +",
      institution: "Tallina Tehnikaülikool (TalTech) - Tallin/Estonia",
      date: "Enero 2022 - Junio 2022",
    },
    {
      title: "DOBLE GRADO EN INGENIERÍA DE SOFTWARE Y TECNOLOGÍA PARA LA SOCIEDAD DE LA INFORMACIÓN",
      institution: "Universidad Politécnica de Madrid - ETSISI",
      date: "Septiembre 2017 - Junio 2023",
    },
    {
      title: "GRADO SUPERIOR DE ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS Y REDES",
      institution: "IES Europa, Rivas – Vaciamadrid",
      date: "Septiembre 2014 - Junio 2016",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto py-12">
      <div className="space-y-4">
        {education.map((item, i) => (
          <div key={i} className="group relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg p-6 mb-8">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white group-hover:bg-gradient-to-b from-blue-500 via-purple-600 to-pink-500 transition-all duration-300"></div>
            <div className="pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>

              <p className="flex items-center gap-2 text-primary font-medium italic mb-1">
                <HiOutlineLocationMarker className="w-5 h-5" />
                {item.institution}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <HiOutlineCalendar className="w-5 h-5" />
                {item.date}
              </p>

              {item.extra && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.extra}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
