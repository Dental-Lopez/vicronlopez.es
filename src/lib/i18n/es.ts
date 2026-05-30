import type { Dictionary } from './en';

export const es: Dictionary = {
  site: {
    name: 'Vicron Lopez',
    description: 'Encontrá tu vehículo ideal — alquilá con confianza.',
  },
  nav: {
    home: 'Inicio',
    inventory: 'Inventario',
    rental: 'Alquiler',
    about: 'Nosotros',
    contact: 'Contacto',
    overview: 'Inicio',
    forRent: 'Alquiler',
    locations: 'Ubicaciones',
    reviews: 'Reseñas',
    services: 'Servicios',
    signIn: 'Ingresar',
    phone: '+34 600 123 456',
    callAria: 'Llamanos al +34 600 123 456',
    // Nueva estructura de navegación unificada
    links: {
      inventory: '/vehiculos/',
      contact: '/contacto/',
      about: '/sobre-nosotros/',
      sitemap: '/mapa-del-sitio/',
      privacy: '/legal/privacidad/',
      terms: '/legal/terminos/',
      cookies: '/legal/cookies/',
    },
    slugs: {
      vehicles: 'vehiculos',
      contact: 'contacto',
      about: 'sobre-nosotros',
      sitemap: 'mapa-del-sitio',
      privacy: 'privacidad',
      terms: 'terminos',
      cookies: 'cookies',
    }
  },
  sitemap: {
    title: 'Mapa del Sitio',
    subtitle: 'Explorá todas las secciones de nuestra plataforma y encontrá lo que necesitás.',
    sections: {
      main: 'Navegación Principal',
      inventory: 'Inventario y Categorías',
      legal: 'Legal y Privacidad',
      support: 'Contacto y Soporte'
    }
  },
  common: {
    learnMore: 'Ver más',
    contactUs: 'Contactanos',
    viewAll: 'Ver todos',
    loading: 'Cargando…',
    error: 'Algo salió mal.',
    backToTop: 'Volver arriba',
  },
  hero: {
    headline: 'Redefiniendo la Movilidad.',
    subheadline:
      'Experimentá la cúspide de la ingeniería y el diseño automotriz. Ya sea para una escapada de fin de semana o para un alquiler a largo plazo, Vicron Lopez te ofrece rendimiento y lujo incomparables.',
    rent: 'Alquilar',
    searchPlaceholder: 'Buscá marca, modelo o tipo…',
    filterLabel: 'Filtrar',
    getStarted: 'Comenzar',
  },
  filters: {
    all: 'Todos',
    forRent: 'En Alquiler',
    electric: 'Eléctrico',
    suv: 'SUV',
    luxury: 'Lujo',
    budget: 'Menos de $150/día',
    clearFilters: 'Limpiar filtros',
    brand: 'Marca',
    category: 'Categoría',
    priceRange: 'Rango de precio',
    searchLabel: 'Buscar vehículos',
    noResults: 'Ningún vehículo coincide con tus filtros.',
    noResultsHint: 'Intentá ajustar o limpiar los filtros.',
    filterBy: 'Filtrar por',
    title: 'Filtros',
    clearAll: 'Limpiar todo',
    allBrands: 'Todas las marcas',
    allCategories: 'Todas las categorías',
    maxPrice: 'Precio máx. ($/día)',
    anyPrice: 'Cualquier precio',
  },
  vehicles: {
    featuredInventory: 'Inventario Destacado',
    viewAll: 'Ver Todos',
    perDay: '/ día',
    acceleration: '0–100 km/h',
    range: 'Autonomía',
    seats: 'Asientos',
    drivetrain: 'Tracción',
    fuel: 'Combustible',
    year: 'Año',
    available: 'Disponible',
    unavailable: 'No disponible',
    bookNow: 'Reservar ahora',
    allVehicles: 'Todos los Vehículos',
    forRentHeadline: 'Vehículos en Alquiler',
    forRentSubline: 'Vehículos premium disponibles para alquiler a corto o largo plazo.',
    allVehiclesSubline: 'Explorá nuestra colección completa de alquiler.',
  },
  features: {
    precisionTitle: 'Ingeniería de Precisión',
    precisionBody:
      'Cada vehículo de nuestra flota representa la cúspide de la perfección mecánica, rigurosamente mantenido para un rendimiento impecable.',
    flexibleTitle: 'Alquiler Flexible',
    flexibleBody:
      'Elegí entre emociones a corto plazo o planes a largo plazo. Nuestras opciones de alquiler personalizadas se adaptan a tus demandas de estilo de vida.',
    networkTitle: 'Red Global',
    networkBody:
      'Accedé a nuestra colección exclusiva en los principales centros internacionales. Movilidad sin límites, donde sea que te lleve tu viaje.',
    sectionTitle: 'Por qué Vicron Lopez',
  },
  footer: {
    copyright: '© 2024 Vicron Lopez. Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    cookies: 'Configuración de Cookies',
    contact: 'Contacto',
    company: 'Compañía',
    sitemap: 'Mapa del sitio',
    phone: '+34 600 123 456',
    email: 'info@vicronlopez.es',
  },
  theme: {
    toggleLight: 'Cambiar a modo claro',
    toggleDark: 'Cambiar a modo oscuro',
  },
  contact: {
    title: 'Contactanos',
    subtitle: '¿Tenés alguna pregunta o estás listo para encontrar tu próximo alquiler? Nos encantaría saber de vos.',
    name: 'Nombre Completo',
    namePlaceholder: 'Tu nombre completo',
    email: 'Correo Electrónico',
    emailPlaceholder: 'tu@correo.com',
    phone: 'Teléfono (opcional)',
    phonePlaceholder: '+54 (11) 0000-0000',
    message: 'Mensaje',
    messagePlaceholder: 'Contanos cómo podemos ayudarte…',
    submit: 'Enviar Mensaje',
    sending: 'Enviando…',
    successTitle: '¡Mensaje enviado!',
    successBody: 'Te responderemos dentro de las 24 horas.',
    errorGeneric: 'Por favor corregí los errores indicados.',
    required: 'Este campo es obligatorio.',
    invalidEmail: 'Ingresá un correo electrónico válido.',
    minMessage: 'El mensaje debe tener al menos 10 caracteres.',
    backHome: 'Volver al inicio',
    headline: 'Contáctanos',
    directionsCta: 'Cómo llegar',
    viewOnMaps: 'Ver en Maps',
    hoursLabel: 'Lun–Sáb, 9:00–19:00',
    mapTitle: 'Ubicación de Vicron Lopez en Ourense',
    emailLabel: 'info@vicronlopez.es',
  },
  vehicleDetail: {
    backToInventory: 'Volver al Inventario',
    specifications: 'Especificaciones',
    availability: 'Disponible',
    unavailable: 'No disponible',
    forRent: 'En Alquiler',
    bookVehicle: 'Reservar Este Vehículo',
    rentPrice: 'Precio de Alquiler',
    perDay: '/ día',
    viewAll: 'Ver Todo el Inventario',
  },
  categories: {
    'electric-sedan': 'Sedán Eléctrico',
    'sports-coupe': 'Coupe Deportivo',
    'luxury-suv': 'SUV de Lujo',
    suv: 'SUV',
    sedan: 'Sedán',
    convertible: 'Convertible',
    truck: 'Camioneta',
  },
  about: {
    title: 'Nosotros',
    subtitle: 'Nuestra historia, nuestra misión, nuestra pasión por la movilidad.',
    missionTitle: 'Nuestra Misión',
    missionBody:
      'Redefinir la movilidad automotriz conectando a las personas con vehículos excepcionales para alquilar — desde una escapada de fin de semana hasta un viaje a largo plazo.',
    valuesTitle: 'Nuestros Valores',
    value1Title: 'Excelencia',
    value1Body:
      'Cada vehículo de nuestra flota es inspeccionado y mantenido rigurosamente bajo los más altos estándares.',
    value2Title: 'Transparencia',
    value2Body:
      'Precios claros, asesoramiento honesto y procesos directos — sin cargos ocultos.',
    value3Title: 'El Cliente Primero',
    value3Body:
      'Tu satisfacción impulsa todo lo que hacemos. Estamos aquí antes, durante y después de cada alquiler.',
    stat1Value: '+10',
    stat1Label: 'Años de experiencia',
    stat2Value: '+200',
    stat2Label: 'Vehículos en flota',
    stat3Value: '+5.000',
    stat3Label: 'Clientes satisfechos',
    stat4Value: '4,9★',
    stat4Label: 'Valoración media',
    commitmentTitle: 'Nuestro Compromiso con Vos',
    commitmentBody:
      'Desde la primera consulta hasta la entrega final, respaldamos cada vehículo, cada alquiler, siempre.',
    commitmentCta: 'Contactanos',
    timelineTitle: 'La Trayectoria',
    timeline: [
      { year: '2015', title: 'Los Comienzos', body: 'Fundada con la visión de unir la precisión del software con la ingeniería automotriz.' },
      { year: '2018', title: 'Primer Prototipo', body: 'Se presenta el concepto V1 Alpha, demostrando capacidades autónomas.' },
      { year: '2021', title: 'Expansión Global', body: 'Las operaciones se expanden a Europa y Asia, estableciendo un lenguaje de diseño global.' },
      { year: '2024', title: 'La Era Aura', body: 'Lanzamiento de nuestra plataforma de movilidad insignia, redefiniendo el transporte de lujo.' },
    ],
    teamTitle: 'Liderazgo',
    roles: [
      'Directora Ejecutiva',
      'Director de Tecnología',
      'Director de Diseño',
      'Directora de Operaciones',
    ],
  },
  legal: {
    privacyTitle: 'Política de Privacidad',
    privacyLastUpdated: 'Última actualización: enero de 2025',
    termsTitle: 'Términos de Servicio',
    termsLastUpdated: 'Última actualización: enero de 2025',
    cookiesTitle: 'Configuración de Cookies',
    cookiesLastUpdated: 'Última actualización: enero de 2025',
    privacy: {
      sections: [
        {
          title: 'Responsable del Tratamiento',
          content: 'Vicron Lopez, con domicilio en Ourense, Galicia, España, es el responsable del tratamiento de los datos personales que el usuario facilite a través de este sitio web.',
        },
        {
          title: 'Datos Recogidos',
          content: 'Recogemos datos de identificación (nombre, correo electrónico, teléfono), datos de navegación (cookies técnicas) y datos relativos a los vehículos de interés del usuario.',
        },
        {
          title: 'Finalidad del Tratamiento',
          content: 'Los datos se utilizan para gestionar solicitudes de alquiler de vehículos, responder consultas, enviar comunicaciones comerciales (con consentimiento) y cumplir obligaciones legales.',
        },
        {
          title: 'Base de Legitimación',
          content: 'El tratamiento se basa en la ejecución de un contrato, el consentimiento del usuario y el cumplimiento de obligaciones legales según el Reglamento General de Protección de Datos (RGPD).',
        },
        {
          title: 'Destinatarios',
          content: 'No cedemos datos a terceros salvo obligación legal. Podemos compartir datos con proveedores de servicios tecnológicos bajo acuerdos de confidencialidad.',
        },
        {
          title: 'Derechos del Usuario',
          content: 'Podés ejercer tus derechos de acceso, rectificación, supresión, oposición y portabilidad enviando un correo a: privacidad@vicronlopez.es.',
        },
        {
          title: 'Conservación',
          content: 'Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para atender posibles responsabilidades legales.',
        }
      ]
    },
    terms: {
      sections: [
        {
          title: 'Aceptación',
          content: 'Al utilizar este sitio web y contratar nuestros servicios, aceptás los presentes Términos de Servicio en su totalidad. Si no estás de acuerdo, te pedimos que no utilices nuestros servicios.',
        },
        {
          title: 'Uso del Servicio',
          content: 'Este sitio web está destinado a la búsqueda y alquiler de vehículos. El usuario se compromete a no usar la plataforma para fines ilícitos o contrarios a estos términos.',
        },
        {
          title: 'Reservas y Contratos',
          content: 'Todas las reservas están sujetas a disponibilidad. Vicron Lopez se reserva el derecho de cancelar reservas en casos de fuerza mayor o error en los datos publicados.',
        },
        {
          title: 'Precios',
          content: 'Los precios mostrados incluyen IVA salvo indicación contraria. Vicron Lopez se reserva el derecho de modificar precios sin previo aviso. El precio confirmado al momento de la reserva es vinculante.',
        },
        {
          title: 'Responsabilidad',
          content: 'Vicron Lopez no será responsable de daños indirectos o consecuenciales derivados del uso de los vehículos o del sitio web, salvo en los casos previstos por la ley.',
        },
        {
          title: 'Ley Aplicable',
          content: 'Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Ourense, España.',
        }
      ]
    },
    cookies: {
      banner: 'Utilizamos cookies para mejorar tu experiencia y analizar el tráfico.',
      accept: 'Aceptar',
      settings: 'Configurar',
      intro: 'Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y ofrecer contenido personalizado. Podés gestionar tus preferencias a continuación.',
      essential: {
        title: 'Cookies Esenciales',
        description: 'Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.',
      },
      analytics: {
        title: 'Cookies Analíticas',
        description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio.',
      },
      marketing: {
        title: 'Cookies de Marketing',
        description: 'Se utilizan para ofrecer anuncios relevantes y realizar un seguimiento del rendimiento de las campañas.',
      },
      save: 'Guardar Preferencias',
      rejectAll: 'Rechazar No Esenciales',
      requiredBadge: 'Requerido',
      success: 'Tus preferencias de cookies han sido guardadas.',
      policySections: [
        {
          title: '¿Qué son las Cookies?',
          content: 'Las cookies son pequeños archivos de texto que los sitios web depositan en tu dispositivo para recordar tus preferencias y mejorar tu experiencia de navegación.',
        },
        {
          title: 'Cookies que Utilizamos',
          content: 'Usamos cookies técnicas necesarias para el funcionamiento del sitio (sesión, autenticación) y cookies analíticas para entender cómo los usuarios interactúan con el sitio (Google Analytics, con consentimiento).',
        },
        {
          title: 'Cookies de Terceros',
          content: 'Algunos de nuestros servicios (mapas, análisis) pueden instalar cookies de terceros. Consultá la política de cookies de Google para más información.',
        },
        {
          title: 'Cómo Gestionar tus Cookies',
          content: 'Podés configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que desactivar ciertas cookies puede afectar al funcionamiento del sitio. Opciones: Chrome > Configuración > Privacidad, Firefox > Opciones > Privacidad.',
        },
        {
          title: 'Actualizaciones',
          content: 'Esta política puede actualizarse periódicamente. Te notificaremos cualquier cambio significativo a través de este sitio web.',
        }
      ]
    },
    pwa: {
      title: 'Accede a Lujo...',
      description: 'Instala nuestro catálogo de propiedades premium para navegar sin conexión.',
      install: 'Instalar',
    },
    backToMain: 'Volver al Inicio',
  },
  services: {
    title: 'Nuestros Servicios',
    subtitle: 'Todo lo que necesitás, desde el primer vistazo hasta la entrega final.',
    rentalTitle: 'Alquiler de Vehículos',
    rentalBody: 'Alquileres a corto y largo plazo con seguro completo, asistencia 24/7 y precios transparentes.',
    deliveryTitle: 'Entrega de Vehículos',
    deliveryBody: 'Entrega y recogida de tu alquiler a domicilio, donde y cuando mejor te convenga.',
    maintenanceTitle: 'Mantenimiento y Servicio',
    maintenanceBody: 'Equipo interno para servicios programados, inspecciones y reparaciones bajo un mismo techo.',
    insuranceTitle: 'Seguro y Cobertura',
    insuranceBody: 'Planes integrales desde cobertura básica hasta protección completa, adaptados a cada presupuesto.',
  },
  reviews: {
    title: '¿Qué Dicen Nuestros Clientes?',
    subtitle: 'Experiencias reales de personas que eligen Vicron Lopez.',
    review1Name: 'Carlos M.',
    review1Role: 'Empresario',
    review1Body: 'Alquilé un Range Rover para un evento. Impecable de principio a fin — servicio de primera clase.',
    review2Name: 'Ana García',
    review2Role: 'Viajera Frecuente',
    review2Body: 'Uso Vicron Lopez tres veces al año. Los vehículos siempre impecables y el equipo realmente se preocupa.',
    review3Name: 'Marco S.',
    review3Role: 'Entusiasta Automotriz',
    review3Body: 'Alquilé un Porsche 911 a través de Vicron Lopez. Precios transparentes, vehículo impecable. Lo recomiendo.',
  },
  landingContact: {
    title: '¿Listo para Empezar?',
    subtitle: 'Ya sea que quieras alquilar o simplemente tengas una pregunta — estamos para vos.',
    cta: 'Contactanos',
    ctaPhone: 'Llamanos',
  },
  whatsapp: {
    label: 'Chateá con nosotros por WhatsApp',
  },
};
