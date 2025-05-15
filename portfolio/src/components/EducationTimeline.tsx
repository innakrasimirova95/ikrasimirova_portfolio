import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

export function EducationTimeline() {
  const education = [
    {
      title: "MÁSTER EN DIRECCIÓN Y GESTIÓN DE PROYECTOS SOFTWARE",
      institution: "Universidad Politécnica de Madrid - ETSII",
      date: "Octubre 2022 - Julio 2024",
      extra: "ERASMUS + Tallina Tehnikaülikool (TalTech) - Tallin/Estonia (Enero 2022 - Junio 2022)",
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
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="relative border-l-4 border-gradient-to-b from-blue-500 via-purple-600 to-pink-500 ml-6">
        {education.map((item, i) => (
          <div key={i} className="mb-12 ml-8 relative">
            {/* Circulo decorativo */}
            <span className="absolute -left-10 top-2 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 border-2 border-white dark:border-gray-900"></span>
            
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
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
        ))}
      </div>
    </section>
  );
}
