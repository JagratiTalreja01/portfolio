/**
 * Core identity, links and headline copy.
 * Everything here is sourced from the résumé / CV / public repositories.
 * Placeholders in [BRACKETS] must be filled in or the related UI hides itself.
 */

export const profile = {
  name: 'Dr. Jagrati Talreja',
  shortName: 'Jagrati Talreja',
  role: 'AI Research Scientist & Machine Learning Engineer',
  specialties: [
    'Computer vision',
    'Multimodal AI',
    'Geospatial intelligence',
    'Remote sensing',
    'Generative models',
    'Quantum machine learning',
  ],
  statement:
    'I build multimodal AI systems that turn satellite, visual and scientific data into actionable intelligence.',
  location: 'Greensboro, North Carolina, USA',
  availability:
    'Open to AI research scientist, applied scientist, machine learning engineer and data science roles.',

  links: {
    email: 'talrejajagrati02@gmail.com',
    academicEmail: 'jtalreja@ncat.edu',
    github: 'https://github.com/JagratiTalreja01',
    linkedin: 'https://www.linkedin.com/in/dr-jagrati-talreja-phd-113054136',
    wix: 'https://talrejajagrati01.wixsite.com/tj01',
    // Fill these in and the icons appear automatically.
    scholar: '[ADD GOOGLE SCHOLAR URL]',
    orcid: '[ADD ORCID URL]',
  },

  // Files live in /public/docs — replace them with your own exports any time.
  documents: {
    resume: 'docs/Jagrati-Talreja-Resume.pdf',
    cv: 'docs/Jagrati-Talreja-CV.pdf',
  },

  seo: {
    title: 'Dr. Jagrati Talreja | AI Research Scientist & Machine Learning Engineer',
    description:
      'Portfolio of Dr. Jagrati Talreja, an AI research scientist and machine learning engineer specializing in computer vision, multimodal AI, remote sensing, geospatial intelligence and quantum machine learning.',
    // Set this to your final Pages URL for canonical + Open Graph tags.
    siteUrl: 'https://JagratiTalreja01.github.io/portfolio/',
  },
} as const

/** Two-to-three paragraph executive profile. Wording tracks the CV. */
export const about = {
  lead:
    'I am a postdoctoral fellow and co-lead on NASA- and NSF-funded projects at North Carolina A&T State University, where I build AI and quantum-inspired methods for satellite-based environmental monitoring.',
  paragraphs: [
    'My work sits between two hard problems: satellite sensors disagree with each other, and the moments you most need them are the moments they fail. Radar sees through cloud but arrives speckled and geometrically strange; optical imagery is legible but blinded by exactly the weather that causes a flood. I design models that hold both signals at once — SAR–optical translation, cross-polarization fusion, reliability-weighted segmentation — so that a usable flood map still exists when one sensor is unreliable.',
    'Over five years I have taken this from formulation to working system: preparing and tiling multimodal satellite data, designing CNN, Transformer, GAN and state-space architectures, training them on GPU clusters, running the ablations that decide whether a component earns its parameters, and publishing the result. My PhD at Chulalongkorn University covered the adjacent problem — recovering detail in single images with deep attention networks — which is where the super-resolution work in this portfolio comes from.',
    'Alongside the research I co-lead project design, mentor graduate and undergraduate researchers, review for IEEE and Springer venues, and translate results for audiences who do not read remote-sensing papers. Every model here has a repository behind it, and every number on this page comes from an experiment I ran.',
  ],
  capabilities: [
    'Research formulation and experimental design',
    'Multimodal data preparation and geospatial pipelines',
    'Model architecture and loss design',
    'Multi-GPU training and evaluation',
    'Ablation, benchmarking and error analysis',
    'Research-to-prototype engineering',
    'Scientific writing and peer review',
    'Mentorship and research leadership',
  ],
} as const
