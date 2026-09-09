export interface Role {
  id: string
  org: string
  title: string
  location: string
  period: string
  scope: string
  points: string[]
  stack: string[]
  current?: boolean
}

export const experience: Role[] = [
  {
    id: 'ncat',
    org: 'North Carolina A&T State University',
    title: 'Postdoctoral Fellow, Co-Lead and Co-PI — NASA and NSF funded projects',
    location: 'Greensboro, North Carolina, USA',
    period: 'Jan 2025 — present',
    current: true,
    scope:
      'Leading and conducting research on AI and quantum-inspired methods for satellite-based environmental monitoring on federally funded projects.',
    points: [
      'Co-leading project design and implementation of AI-driven methodologies for remote sensing using satellite imagery.',
      'Co-Investigator on the NASA COMPASS proposal (2026) for AI-driven remote sensing.',
      'Led end-to-end development of multimodal deep learning pipelines for flood mapping across SAR and optical datasets, improving model performance and scalability on GPU clusters.',
      'Designed and deployed CNN, Transformer and GAN pipelines improving PSNR by +2.2 dB — roughly a 40% reduction in reconstruction error — on more than 20,000 multimodal satellite image tiles.',
      'Engineered scalable geospatial ML pipelines and trained models on A4000/A6000 GPU workstations for large-scale satellite data.',
      'Initiated the group’s quantum computing work, exploring spatial feature encoding for next-generation ML systems.',
      'Collaborating with NASA-affiliated teams and interdisciplinary groups while mentoring graduate and undergraduate researchers.',
    ],
    stack: ['PyTorch', 'Sentinel-1', 'Sentinel-2', 'CUDA', 'A4000/A6000', 'A100/H100', 'ArcGIS Pro', 'Google Earth Engine'],
  },
  {
    id: 'chula-phd',
    org: 'Chulalongkorn University',
    title: 'PhD Researcher, Electrical Engineering',
    location: 'Bangkok, Thailand',
    period: 'Aug 2020 — 2024',
    scope:
      'Doctoral research in the Multimedia Data Analytics and Processing unit on deep attention networks for single-image super-resolution, alongside embedded vision and biometrics projects.',
    points: [
      'Developed a real-time deep learning super-resolution algorithm targeting SoC FPGA deployment, under Assoc. Prof. Supavadee Aramvith and Dr. Watchara Ruangsang.',
      'Published three super-resolution architectures — DANS, DHTCUN and XTNSR — as first author.',
      'Built an offline signature verification system using shape dissimilarities, authenticating scanned signatures without specialised hardware.',
      'Implemented contour detection and colour tracking on Raspberry Pi with OpenCV.',
    ],
    stack: ['PyTorch', 'CUDA', 'cuDNN', 'FPGA', 'SoC', 'MATLAB', 'OpenCV', 'Raspberry Pi'],
  },
  {
    id: 'chula-ta',
    org: 'Chulalongkorn University',
    title: 'Teaching Assistant, Faculty of Engineering',
    location: 'Bangkok, Thailand',
    period: 'Aug 2020 — 2024',
    scope:
      'Curriculum development and instruction for computer vision and digital signal processing.',
    points: [
      'Developed electrical engineering curriculum materials for computer vision and digital signal processing.',
      'Delivered lectures and ran labs on image and video processing, pairing theory with practical tooling.',
      'Designed assignments, projects and exams, and gave feedback across the cohort.',
    ],
    stack: ['Computer vision', 'DSP', 'Mentorship'],
  },
  {
    id: 'iitk',
    org: 'Indian Institute of Technology Kanpur',
    title: 'Research Assistant / Intern, Electrical Engineering',
    location: 'Kanpur, India',
    period: 'Jun 2018 — Jun 2019',
    scope:
      'Classical computer vision for motion and event detection, under Prof. K. S. Venkatesh.',
    points: [
      'Built Disruption Detector, a MATLAB motion detection application that flags object disruption for security use.',
      'Applied image acquisition and event detection techniques across the capture-to-decision pipeline.',
    ],
    stack: ['MATLAB', 'Image acquisition', 'Git'],
  },
  {
    id: 'psit',
    org: 'Pranveer Singh Institute of Technology',
    title: 'Undergraduate engineering projects',
    location: 'Uttar Pradesh, India',
    period: 'Aug 2015 — Dec 2018',
    scope:
      'Hardware and software systems, including the final-year project that became an Indian patent filing.',
    points: [
      'Medi-Cart: an RFID and Bluetooth healthcare device automating patient identification and medical records — the basis of the Indian patent filing.',
      'Voice-controlled robotic car on Arduino Atmega 2560.',
      'Transmitter-based aircraft prototype.',
      'School management system in Java with a MySQL backend.',
    ],
    stack: ['C/C++', 'RFID', 'Arduino', 'Java', 'MySQL'],
  },
]

export interface Degree {
  id: string
  qualification: string
  institution: string
  location: string
  period: string
  detail: string
  honours: string[]
}

export const education: Degree[] = [
  {
    id: 'phd',
    qualification: 'PhD (5-year integrated) in Data Science & Artificial Intelligence',
    institution: 'Chulalongkorn University',
    location: 'Bangkok, Thailand',
    period: '2019 — 2024',
    detail:
      'Multimedia Data Analytics and Processing unit, Department of Electrical Engineering. Thesis: Single Image Super-Resolution using Deep Attention Networks.',
    honours: [
      'Second Century Fund (C2F) scholarship, first PhD cohort, 2019',
      'Overseas Research Experience Scholarship for Graduate Students, FY 2024',
      '90th Anniversary of Chulalongkorn University Scholarship, Ratchadapisek Somphot Endowment Fund',
    ],
  },
  {
    id: 'btech',
    qualification: 'B.Tech in Electronics & Communication Engineering',
    institution: 'Dr. A. P. J. Abdul Kalam Technical University',
    location: 'Lucknow, India',
    period: '2015 — 2019',
    detail: 'Final-year project: Medi-Cart — Telemetry using RFID, which resulted in an Indian patent filing.',
    honours: [
      'Gold Medal for excellence in institutional academia, 80.93%',
      'Selected among the top 100 Engineering & Science projects in Uttar Pradesh, 2019',
      'University Scholarship for 4 years',
      'State Government Scholarship for 4 years',
    ],
  },
]

export interface Engagement {
  role: 'Speaker' | 'Host' | 'Reviewer'
  title: string
  detail: string
  date: string
  upcoming?: boolean
}

export const engagements: Engagement[] = [
  {
    role: 'Speaker',
    title: 'American Society for Photogrammetry and Remote Sensing (ASPRS)',
    detail: 'Annual conference',
    date: '15–19 February 2026',
  },
  {
    role: 'Speaker',
    title: 'American Geophysical Union (AGU)',
    detail: 'Fall meeting',
    date: '15–19 December 2025',
  },
  {
    role: 'Speaker',
    title: 'GIS Day',
    detail: 'Geographic Information Systems Day',
    date: '19 November 2025',
  },
  {
    role: 'Host',
    title: 'Robotics Competition for Managing Climate Change for a Better World',
    detail: 'IEEE Region 10 Thailand Section, Chulalongkorn University',
    date: '9–11 December 2023',
  },
  {
    role: 'Host',
    title: 'IEEE EMBS Mini-Symposium on Biomedical Engineering',
    detail: 'Chulalongkorn University',
    date: '28 November 2023',
  },
  {
    role: 'Host',
    title: 'IEEE CASS Day, Thailand Chapter',
    detail: 'IEEE Circuits and Systems Society',
    date: '6 December 2023',
  },
  {
    role: 'Host',
    title: 'R10 Robotics Competition for Healthcare',
    detail: 'IEEE Region 10 Thailand Section, Chulalongkorn University',
    date: '18–19 December 2022',
  },
]

export const reviewService = [
  'IEEE Access',
  'IEEE Signal Processing Society',
  'Springer',
  'PeerJ',
  'IEMECON — International Conference on the Internet of Everything, Microwave, Embedded, Communication and Networks',
]
