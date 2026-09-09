/* ── Patents ────────────────────────────────────────────────────────────── */

export interface Patent {
  id: string
  title: string
  inventors: string[]
  jurisdiction: string
  number: string
  numberLabel: string
  filed: string
  status: string
  statusNote: string
  summary: string
  impact: string
  image?: string
  imageAlt?: string
}

export const patents: Patent[] = [
  {
    id: 'safepath',
    title: 'SafePath: Navigate to Safety',
    inventors: ['Tewodros Syum Gebre', 'Jagrati Talreja', 'Leila Hashemi-Beni'],
    jurisdiction: 'United States',
    number: '63/929,945',
    numberLabel: 'US application no.',
    filed: '12 March 2025',
    status: 'Application filed',
    statusNote:
      'A filed US application, not a granted patent. The 63/ series indicates a provisional filing.',
    summary:
      'An approach to emergency evacuation routing that treats hazard conditions as a routing input, so that guidance reflects which roads are actually passable during a flood rather than assuming a static network.',
    impact:
      'Connects the flood-extent modelling in this portfolio to the decision people actually have to make during a disaster: which way to go.',
  },
  {
    id: 'medicart',
    title: 'Medi-Cart: Telemetry using RFID',
    inventors: [
      'Jatin Vasisth',
      'Km Nandani',
      'Harshita Saxena',
      'Jagrati Talreja',
      'Raghvendra Singh',
      'Vivek Kumar',
      'Yogesh Mohan Dubey',
    ],
    jurisdiction: 'India',
    number: '201811037266A',
    numberLabel: 'Indian patent no.',
    filed: '19 October 2018',
    status: 'As recorded on CV',
    statusNote:
      '[VERIFY: the CV records this as an Indian patent number. The trailing “A” in Indian numbering usually denotes a published application — confirm whether it has been granted before describing it as a granted patent.]',
    summary:
      'An RFID and Bluetooth medical device for automating patient identification and medical-records handling in hospital management systems. Developed as the final-year undergraduate project.',
    impact:
      'Selected among the top 100 Engineering & Science projects in Uttar Pradesh in 2019.',
    image: 'media/images/medicart-hardware.webp',
    imageAlt:
      'The Medi-Cart RFID telemetry prototype board, with labelled components on a project poster.',
  },
]

/* ── Impact metrics ─────────────────────────────────────────────────────── */

export interface Stat {
  value: string
  label: string
  source: string
  tone?: 'signal' | 'gold'
}

/** Every figure traces to the résumé, CV or a public repository README. */
export const stats: Stat[] = [
  { value: '5+', label: 'Years in AI and computer vision', source: 'Résumé' },
  { value: '6', label: 'Peer-reviewed papers published', source: 'CV — with DOIs', tone: 'signal' },
  { value: '7', label: 'Further papers accepted', source: 'CV' },
  { value: '2', label: 'Patent filings', source: 'CV', tone: 'gold' },
  { value: '+2.2 dB', label: 'PSNR improvement', source: 'Résumé — ~40% lower reconstruction error', tone: 'signal' },
  { value: '20,000+', label: 'Multimodal satellite tiles processed', source: 'Résumé' },
  { value: '3', label: 'Invited conference talks', source: 'CV — ASPRS, AGU, GIS Day' },
  { value: '5', label: 'Journals and conferences reviewed for', source: 'CV', tone: 'gold' },
]

/* ── Technical capabilities ─────────────────────────────────────────────── */

export interface SkillGroup {
  name: string
  note: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    name: 'Machine learning and deep learning',
    note: 'Architectures designed and trained end to end.',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'CNNs', 'Vision Transformers', 'GANs', 'Diffusion models', 'Autoencoders', 'State-space models', 'PINNs', 'Transfer learning', 'Attention mechanisms'],
  },
  {
    name: 'Computer vision and image processing',
    note: 'From classical pipelines to learned reconstruction.',
    items: ['Super-resolution', 'Segmentation', 'Classification', 'Regression', 'OpenCV', 'Digital image processing', 'Image and video processing', 'Explainable AI'],
  },
  {
    name: 'Multimodal and generative AI',
    note: 'Fusing sensors that disagree with each other.',
    items: ['SAR–optical translation', 'Cross-modal distillation', 'Cross-attention fusion', 'FiLM conditioning', 'Multi-task learning', 'Reliability-aware fusion'],
  },
  {
    name: 'Remote sensing and geospatial analytics',
    note: 'Acquisition, preprocessing and analysis of Earth observation data.',
    items: ['Sentinel-1', 'Sentinel-2', 'UAV imagery', 'Google Earth Engine', 'Alaska Satellite Facility', 'ArcGIS Pro', 'SNAP', 'Image tiling', 'Geospatial preprocessing', 'NDVI / NDWI'],
  },
  {
    name: 'Quantum and quantum-inspired ML',
    note: 'Current research direction at NC A&T.',
    items: ['Spatial feature encoding', 'Quantum-inspired pipelines for remote sensing'],
  },
  {
    name: 'Data science and analytics',
    note: 'Turning raw observations into evidence.',
    items: ['Data processing', 'Data visualisation', 'Clustering', 'Regression analysis', 'NLP', 'NumPy', 'Pandas', 'Matplotlib'],
  },
  {
    name: 'Research engineering and GPU computing',
    note: 'Training infrastructure and experiment tooling.',
    items: ['CUDA', 'cuDNN', 'NVIDIA A4000 / A6000', 'A100 / H100 clusters', 'Linux', 'WSL', 'Git', 'Anaconda', 'Jupyter', 'Colab'],
  },
  {
    name: 'Programming and software development',
    note: 'Languages used in research and production prototypes.',
    items: ['Python', 'C / C++', 'MATLAB', 'Java', 'SQL', 'NoSQL', 'JavaScript', 'Node.js', 'HTML/CSS', 'Bootstrap'],
  },
  {
    name: 'Embedded systems and hardware',
    note: 'Deploying vision where the data is captured.',
    items: ['FPGA', 'SoC FPGA', 'Raspberry Pi', 'Arduino', 'Microcontrollers', 'RFID'],
  },
  {
    name: 'Research communication and mentorship',
    note: 'Reviewing, teaching and supervising.',
    items: ['Peer review', 'LaTeX / Overleaf', 'Conference speaking', 'Graduate and undergraduate mentorship', 'Curriculum development'],
  },
]

/* ── GitHub repositories ────────────────────────────────────────────────── */

export interface Repo {
  name: string
  url: string
  summary: string
  language: string
  frameworks: string[]
  research: string
  documented: boolean
  publication?: string
}

/**
 * Curated from the public profile at github.com/JagratiTalreja01.
 * Metadata is stored here rather than fetched, so the site needs no token,
 * no backend and no build-time network access.
 */
export const repos: Repo[] = [
  {
    name: 'TCSF',
    url: 'https://github.com/JagratiTalreja01/TCSF',
    summary:
      'Tri-level cross-state fusion network with Vision Mamba encoders and adaptive reliability learning for SAR–optical flood mapping.',
    language: 'Python',
    frameworks: ['PyTorch', 'Vision Mamba'],
    research: 'Flood segmentation across SEN1FLOODS11, SEN12MS and DEEPFLOOD.',
    documented: true,
    publication: 'Manuscript in preparation',
  },
  {
    name: 'FLoRA',
    url: 'https://github.com/JagratiTalreja01/FLoRA',
    summary:
      'Multi-task architecture for SAR–optical fusion that reconstructs optical imagery and segments flood area in one pipeline.',
    language: 'Python',
    frameworks: ['PyTorch', 'Pix2pix'],
    research: 'Cross-modal multi-task distillation for flood mapping.',
    documented: true,
    publication: 'IEEE TGRS, 2026',
  },
  {
    name: 'D-PolTransGAN',
    url: 'https://github.com/JagratiTalreja01/D-PolTransGAN',
    summary:
      'Dual-polarization SAR to optical translation using local cross-attention fusion and a Transformer generator inside a GAN.',
    language: 'Python',
    frameworks: ['PyTorch', 'MT_GAN'],
    research: 'Scattering-guided translation for flood assessment.',
    documented: true,
    publication: 'IEEE JSTARS, 2026',
  },
  {
    name: 'Cross-Polarization-Fusion',
    url: 'https://github.com/JagratiTalreja01/Cross-Polarization-Fusion',
    summary:
      'Attention-driven fusion of Sentinel-1 VV and VH bands, evaluated on both U-Net and autoencoder backbones.',
    language: 'Python',
    frameworks: ['PyTorch', 'U-Net'],
    research: 'Improved flood delineation in vegetated and urban scenes.',
    documented: true,
    publication: 'IGARSS 2026 (accepted)',
  },
  {
    name: 'DHTCUN',
    url: 'https://github.com/JagratiTalreja01/DHTCUN',
    summary:
      'Deep hybrid Transformer–CNN U-network for single-image super-resolution with triple enhanced spatial attention.',
    language: 'Python',
    frameworks: ['PyTorch', 'HNCT'],
    research: 'PhD super-resolution line of work.',
    documented: true,
    publication: 'IEEE Access, 2024',
  },
  {
    name: 'DANS',
    url: 'https://github.com/JagratiTalreja01/DANS',
    summary:
      'Deep attention network for single-image super-resolution using non-local sparse attention and inception blocks.',
    language: 'Python',
    frameworks: ['PyTorch', 'EDSR'],
    research: 'PhD super-resolution line of work.',
    documented: true,
    publication: 'IEEE Access, 2023',
  },
  {
    name: 'XTNSR',
    url: 'https://github.com/JagratiTalreja01/XTNSR',
    summary:
      'Xception-based transformer network for single-image super-resolution, with pseudocode and benchmark figures.',
    language: 'Python',
    frameworks: ['PyTorch', 'SRFormer'],
    research: 'PhD super-resolution line of work.',
    documented: true,
    publication: 'Complex & Intelligent Systems, 2024',
  },
  {
    name: 'Super-Resolution-SRCNN',
    url: 'https://github.com/JagratiTalreja01/Super-Resolution-SRCNN-',
    summary:
      'SRCNN implementation in notebook form — the classical baseline the later architectures are measured against.',
    language: 'Jupyter Notebook',
    frameworks: ['Keras'],
    research: 'Baseline reference for the super-resolution work.',
    documented: false,
  },
]

/* ── Beyond the models ──────────────────────────────────────────────────── */

export interface Adventure {
  id: string
  title: string
  caption: string
  media: string
  poster?: string
  type: 'image' | 'video'
  alt: string
  span?: 'wide' | 'tall'
}

/**
 * Captions describe only what is visible or what the source material stated.
 * Locations and dates are left as [ADD ...] where nothing confirmed them —
 * fill those in rather than letting the site guess.
 */
export const adventures: Adventure[] = [
  {
    id: 'skydive',
    title: 'Skydiving',
    caption: 'Freefall. A fairly convincing argument that risk tolerance is trainable.',
    media: 'media/videos/skydiving.mp4',
    poster: 'media/posters/skydiving.webp',
    type: 'video',
    alt: 'Skydiving in freefall above cloud, filmed from the jumper\u2019s own camera.',
    span: 'tall',
  },
  {
    id: 'overlook',
    title: 'Ridge at sunset',
    caption: 'A ridgeline overlook at last light. [ADD LOCATION]',
    media: 'media/images/adventure-overlook.webp',
    type: 'image',
    alt: 'Sitting on a rock outcrop above a forested valley as the sun sets behind distant hills.',
    span: 'wide',
  },
  {
    id: 'jetski',
    title: 'On the water',
    caption: 'Jet skiing offshore. [ADD LOCATION]',
    media: 'media/videos/jetski.mp4',
    poster: 'media/posters/jetski.webp',
    type: 'video',
    alt: 'Riding a jet ski across open water with boats moored in the distance.',
  },
  {
    id: 'motorcycle',
    title: 'Two wheels',
    caption: 'Licensed to ride in India and Thailand, and to drive in all three countries I have lived in.',
    media: 'media/images/adventure-motorcycle.webp',
    type: 'image',
    alt: 'Seated on a motorcycle on a road with green hills behind.',
  },
  {
    id: 'mountain',
    title: 'Valley viewpoint',
    caption: 'A viewing platform above forested hills. [ADD LOCATION]',
    media: 'media/images/adventure-mountain.webp',
    type: 'image',
    alt: 'Standing at a wooden railing overlooking a green mountain valley under cloud.',
  },
  {
    id: 'cube',
    title: 'Rubik\u2019s cube',
    caption: 'Solved between experiments. Pattern recognition is a transferable skill.',
    media: 'media/videos/cube.mp4',
    poster: 'media/posters/cube.webp',
    type: 'video',
    alt: 'Hands turning and solving a Rubik\u2019s cube.',
  },
  {
    id: 'gym',
    title: 'Training',
    caption: 'Strength work, most days.',
    media: 'media/videos/gym.mp4',
    poster: 'media/posters/gym.webp',
    type: 'video',
    alt: 'Using a leg press machine in a gym.',
  },
  {
    id: 'park',
    title: 'Fountains',
    caption: 'A lakeside park in the hills. [ADD LOCATION]',
    media: 'media/images/adventure-park.webp',
    type: 'image',
    alt: 'Standing on a rock beside a lake with tall fountains playing behind.',
  },
]

/* ── Photo story: research and conference life ──────────────────────────── */

export interface Frame {
  src: string
  alt: string
  caption: string
  year?: string
}

export const researchLife: Frame[] = [
  {
    src: 'media/images/talk-igarss.webp',
    alt: 'Presenting at a conference podium beside a slide titled Cross-Polarization Fusion of VV and VH SAR Observations for Improved Flood Mapping.',
    caption: 'Presenting Cross-Polarization Fusion \u2014 VV and VH SAR observations for improved flood mapping.',
  },
  {
    src: 'media/images/talk-superres.webp',
    alt: 'Conference session with a presentation slide reading Super-Resolution satellite images.',
    caption: 'Speaking on super-resolution for satellite imagery.',
  },
  {
    src: 'media/images/talk-podium.webp',
    alt: 'Speaking at a lectern beside a large screen showing satellite imagery.',
    caption: 'At the lectern with satellite imagery on screen.',
  },
  {
    src: 'media/images/gisday-booth.webp',
    alt: 'Standing with colleagues behind a North Carolina A and T State University exhibition table at GIS Day.',
    caption: 'GIS Day with the NC A&T Department of Built Environment.',
  },
  {
    src: 'media/images/award.webp',
    alt: 'Standing with two colleagues at a conference, holding a recognition.',
    caption: 'At a conference with colleagues. [ADD EVENT AND RECOGNITION NAME]',
  },
  {
    src: 'media/images/lab-ncat.webp',
    alt: 'Research group photographed in a laboratory with wall-mounted display screens at North Carolina A and T.',
    caption: 'The research group at NC A&T.',
  },
  {
    src: 'media/images/ieee-group.webp',
    alt: 'Group photograph in front of an IEEE conference step-and-repeat backdrop.',
    caption: 'IEEE conference.',
  },
  {
    src: 'media/images/lab-chula.webp',
    alt: 'Standing in a laboratory among benches of electronic test equipment and monitors.',
    caption: 'Laboratory work during the PhD.',
  },
  {
    src: 'media/images/chula-poster.webp',
    alt: 'Standing with colleagues in front of research posters at the CUEE-MDAP research unit.',
    caption: 'Poster session, Multimedia Data Analytics and Processing unit.',
  },
  {
    src: 'media/images/graduation.webp',
    alt: 'Wearing academic regalia beside a Faculty of Electrical Engineering sign at Chulalongkorn University.',
    caption: 'PhD, Chulalongkorn University.',
    year: '2024',
  },
  {
    src: 'media/images/chula-engineering.webp',
    alt: 'Group photograph on the steps beneath the Chula Engineering sign.',
    caption: 'Chula Engineering.',
  },
  {
    src: 'media/images/aircraft-prototype.webp',
    alt: 'Holding a fixed-wing model aircraft prototype on a sports field before launch.',
    caption: 'Undergraduate aircraft prototype, before a test launch.',
  },
]
