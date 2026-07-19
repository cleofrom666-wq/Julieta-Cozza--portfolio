// ------------------------------------------------------------------
// Contenido del sitio en dos idiomas (es/en).
// Todo texto visible para el visitante vive acá como { es, en }.
//
// TODO marca los lugares donde falta info real tuya:
//  - image: reemplazar por la ruta a tu imagen/frame real (ej: "/img/demo-reel.jpg")
//  - año / título exactos de las piezas artísticas y de las 4 bodas
//  - herramientas de IA usadas
// ------------------------------------------------------------------

export const categories = [
   {
    id: 'demoreel',
    label: { es: 'Reel', en: 'Reel' },
    intro: {
      es: '',
      en: '',
    },
    image: '/media/thumbnails/demo-reel.png',
    projects: [
      { title: 'Demo Reel', year: '2025', image: 'youtube:FqrZoPeFWQo', note: '/media/demo reel.mp4/' },
    ],
  },
  {
    id: 'video-ia',
    label: { es: 'IA', en: 'AI' },
    // Bucket 3: esta sección lleva una línea de intro (enfoque + herramientas)
    intro: {
      es: 'Explorando la intersección entre video, edición e IAs generativas.',
      en: 'Exploring the intersection of filmmaking, editing and generative AI.',
    }, 
    image: '/media/media/images/ia.jpeg', 
     //TODO: imagen/frame representativo de tu Demo Reel o AI-Assisted Work
    projects: [
      { title: { es: 'They trained you well', en: 'They trained you well' },  
      description: { 
        es: 'Concepto de anuncio creado utilizando herramientas de IA. Esta pieza breve explora, desde un tono documental y humorístico, la relación entre los humanos y sus gatos. El proyecto fue desarrollado desde el guion hasta la edición final utilizando IA generativa para las imágenes y animaciones, combinado con edición, diseño sonoro y dirección de voz en off.', 
        en: 'Concept ad created using AI tools. This short piece explores a humorous documentary-style perspective on the relationship between humans and their cats. The project was developed from script to final edit using generative AI for visuals and animation, combined with traditional editing, sound design, and voice-over direction.'
      }, 
      year: 2025, image: 'https://youtu.be/aHTA958EVgw' },

      { title: { es: 'Experimental work', en: 'Experimental work' }, 
      description: { 
        es: 'Diseño, generación e integración de un avatar digital con IA para ThAing Desarrollos Inmobiliarios. El personaje fue creado a partir de referencias del cliente e incorporado mediante composición digital en un video existente, combinando imagen real y contenido generado por IA',
        en: 'Design, generation, and integration of an AI-powered digital avatar for ThAing Real Estate Developments. Created from client-provided references, the avatar was seamlessly composited into existing footage, blending live-action video with AI-generated content.'
      }, 
        year: 2026, image: 'https://youtu.be/tDFcKO3Isjk'},

      { title: { es: 'thaing.ai', en: 'thaing.ai' }, 
      description: { 
        es: 'Concepto de anuncio creado utilizando herramientas de IA. Esta pieza breve explora, desde un tono documental y humorístico, la relación entre los humanos y sus gatos. El proyecto fue desarrollado desde el guion hasta la edición final utilizando IA generativa para las imágenes y animaciones, combinado con edición, diseño sonoro y dirección de voz en off.', 
        en: 'Concept ad created using AI tools. This short piece explores a humorous documentary-style perspective on the relationship between humans and their cats. The project was developed from script to final edit using generative AI for visuals and animation, combined with traditional editing, sound design, and voice-over direction.'
      },  
      year: 2026, image: 'https://youtu.be/hbc7DCrC4Ys' },
    ],
  },
  
  {
    id: 'social-media',
    label: { es: 'Redes sociales', en: 'Social Media' },
    intro: {
      es: 'Edición de video para redes sociales.',
      en: 'Video editing for social media.',
    },
    image: '/media/media/images/social.png', // TODO: frame de un reel
    projects: [
      // TODO: separar en piezas si querés mostrar más de una
      { title: '', image: '/media/social media/VERTICALES_1.mp4', poster:'/media/thumbnails/VERTICALES_1.jpg' },
      { title: '', image: '/media/social media/2 SCENES CONCEPT.mp4', orientation:'vertical', poster:'/media/thumbnails/2 SCENES CONCEPT-poster.jpg' },
      { title: '', image: '/media/social media/ZARA FOREST.mp4', orientation:'vertical', poster:'/media/thumbnails/ZARA FOREST.jpg' },
      { title: '', image: '/media/social media/CROQUE MADAME.mp4', orientation:'vertical', poster:'/media/thumbnails/CROQUE MADAME-poster.jpg'},
      { title: '', image: '/media/social media/ELEGANT MIX LE MISTRAL.mp4', orientation:'vertical', poster:'/media/thumbnails/ELEGANT MIX LE MISTRAL.jpg' },
      { title: '',  image: '/media/social media/Magret de Canard.mp4', orientation:'vertical', poster:'/media/thumbnails/Magret de Canard.jpg' },
    ],
  },{
    id: 'bodas',
    label: { es: 'Bodas', en: 'Weddings' },
    // Bucket 3: intro genérica, sin nombre de empresa explícito
    intro: {
      es: 'Edición y color para estudio de wedding films.',
      en: 'Editing and color grading for a wedding film studio.',
    },
    image: '/media/media/images/bodas.png', // TODO: frame de alguna boda
    projects: [
      // TODO: título/año real de cada boda
      { title: { es: 'Niamh & Will', en: 'Niamh & Will' }, year: 2026, image: 'https://youtu.be/S-oea8bBw0Q', poster:'/media/thumbnails/Niamh & Will Montage Video.jpg' },
      { title: { es: 'Jessica & Ben', en: 'Jessica & Ben' }, year: 2026, image: 'https://youtu.be/wbNS39m94_A', poster:'/media/thumbnails/Jessica & Ben.png' },
      { title: { es: 'Rama & Elie', en: 'Rama & Elie' }, year: 2026, image: 'https://youtu.be/Qm46n-EqXoE', orientation:'horizontal', poster:'/media/thumbnails/Rama + Elie-poster.jpg' },
      { title: { es: 'Jess & Neal', en: 'Jess & Neal' }, year: 2026, image: 'https://youtu.be/4aAmt070APo', poster:'/media/thumbnails/Jess & Neal Montage video.jpg' },
      /* { title: { es: 'Niamh & Will', en: 'Niamh & Will' }, year: 2026, image: '/media/bodas/NIamh & Will Teaser.mp4', orientation:'vertical', poster:'/media/thumbnails/NIamh & Will Teaser.jpg' }, */
    ],
  },
  {
    id: 'videoclips',
    label: { es: 'Videoclips', en: 'Music Videos' },
    intro: null, // Bucket 3: sin intro en esta sección
    image: '/media/media/images/videoclips.png', 
    projects: [
      // Bucket 3: en esta sección solo se muestra el año (sin título) —
      // "note" tiene el nombre real para que sepas cuál es cuál mientras cargás años.
      { title: 'First Time Last Time/ RUM FOR BREAKFAST', year: '2023', image: 'https://youtu.be/-TLvPe6mJyk?si=T7UljjLnpsXTu0_i', note: 'First Time Last Time.mp4', poster:'/media/thumbnails/Rum For Breakfast.jpg' },
      { title: 'Hacia el sur - Anecoicos', year: '2020', image: 'https://youtu.be/hqkthNHL4HQ?si=bOz_FlDauiH_Goha', note: 'Hacia el Sur - Anecoicos', poster:'/media/thumbnails/Hacia El Sur Hd.png' },
      { title: "bichitxs", year: '2025', image: 'https://youtu.be/dpVP_cmOkDM', note: 'bichitxs', poster:'/media/thumbnails/bichitosv2-poster.jpg' },
      { title: 'Lot 7', year: '2025', image: 'https://youtu.be/aQEesAVKBCk', note: 'LOT 7.mp4', poster:'/media/thumbnails/Fashonmp4.jpg' },
      { title: "Tan Roja - Zoe Nisenson", year: '2025', image: 'https://youtu.be/KoBhiXGTlYs?si=d2MIbxNuNnX7m30g', note: 'Tan Roja.mp4', poster:'/media/thumbnails/TAN ROJA.png' },
    ],
  },
   /* {
    id: 'fotografia',
    label: { es: 'Fotografía', en: 'Photography' },
    intro: {
      es: '',
      en: '',
    },
    image: null, // TODO: frame de un reel
    projects: [
      { title: null, year: '', image: null, note: 'glaswen en lalalá' },
      { title: null, year: '', image: null, note: 'ST' },
      { title: null, year: '', image: null, note: 'TRIGAL' },
    ],
  }, */

 
]

export const site = {
  name: 'Julieta Cozza',
  tagline: {
    es: 'editora de video · filmmaker',
    en: 'video editor · filmmaker',
  },
  backToHome: { es: '← inicio', en: '← home' },
  // Bucket "about": bio corta pendiente de tu versión final — esto es un
  // placeholder editorial breve para que la sección tenga voz propia.
  // Reemplazar por tu bio real cuando la tengas.
  about: {
    es: 'Edito y dirijo imagen en movimiento — bodas, música, marcas y piezas propias hechas con inteligencia artificial. Cada corte busca lo mismo: que el ritmo cuente la historia antes que la palabra.',
    en: 'I edit and direct moving image — weddings, music, brands and personal work made with artificial intelligence. Every cut chases the same thing: rhythm telling the story before the words do.',
  },
  location: { es: 'Buenos Aires, Argentina', en: 'Buenos Aires, Argentina' },
}

export const contact = {
  whatsapp: 'https://wa.me/541165123544', // tomado de tu CV — confirmame si es el número correcto
  email: 'julietacozza@gmail.com', // tomado de tu CV
  cvPdf: '/cv-julieta-cozza.pdf', // TODO: pausado (Bucket 6) hasta actualizar el contenido del CV
}
