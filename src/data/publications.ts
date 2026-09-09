export type PubStatus = 'published' | 'accepted' | 'under-review'
export type PubType = 'journal' | 'conference' | 'book-chapter'

export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: number | null
  type: PubType
  status: PubStatus
  doi?: string
  url?: string
  code?: string
  topics: string[]
  featured?: boolean
  abstract?: string
}

/** Author string used to bold her name in the UI. */
export const SELF = 'J. Talreja'

/**
 * Every record below is transcribed from the CV publication list.
 * status is transcribed exactly — nothing under review is shown as published.
 */
export const publications: Publication[] = [
  {
    id: 'flora',
    title:
      'FLoRA: Fusion-Latent for Optical Reconstruction and Flood Area Segmentation via Cross-Modal Multi-Task Distillation Network',
    authors: ['J. Talreja', 'T. S. Gebre', 'L. H. Beni'],
    venue: 'IEEE Transactions on Geoscience and Remote Sensing',
    year: 2026,
    type: 'journal',
    status: 'published',
    doi: '10.1109/TGRS.2026.3701300',
    url: 'https://ieeexplore.ieee.org/abstract/document/11554107',
    code: 'https://github.com/JagratiTalreja01/FLoRA',
    topics: ['Multimodal AI', 'Flood intelligence', 'Remote sensing'],
    featured: true,
    abstract:
      'A unified cross-modal framework that jointly performs SAR-to-optical translation and flood-region segmentation. Sentinel-1 VV/VH features are aligned with optical priors through a fusion-latent space; a lightweight optical teacher driven by RGB and NDVI cues supervises the SAR encoder, while multi-scale windowed cross-attention and FiLM conditioning enforce spectral and structural consistency.',
  },
  {
    id: 'dpoltransgan',
    title:
      'DPolTransGAN: Scattering Guided Hybrid Transformer-GAN for SAR-Optical Image Translation using Dual Polarization SAR',
    authors: ['J. Talreja', 'T. S. Gebre', 'L. H. Beni'],
    venue:
      'IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing',
    year: 2026,
    type: 'journal',
    status: 'published',
    doi: '10.1109/JSTARS.2026.3691677',
    url: 'https://ieeexplore.ieee.org/abstract/document/11512990',
    code: 'https://github.com/JagratiTalreja01/D-PolTransGAN',
    topics: ['Generative models', 'Remote sensing', 'Multimodal AI'],
    featured: true,
    abstract:
      'A dual-band SAR-to-optical translation framework for flood assessment. Independent stems process Sentinel-1 VV and VH polarizations before Scattering-Guided Attention Fusion exploits their complementary scattering behaviour; CNN backbones and Transformer modules are combined inside a GAN with SE-gated skip connections.',
  },
  {
    id: 'dans',
    title: 'DANS: Deep Attention Network for Single-Image Super-Resolution',
    authors: ['J. Talreja', 'S. Aramvith', 'T. Onoye'],
    venue: 'IEEE Access',
    year: 2023,
    type: 'journal',
    status: 'published',
    doi: '10.1109/ACCESS.2023.3302692',
    url: 'https://ieeexplore.ieee.org/document/10210219',
    code: 'https://github.com/JagratiTalreja01/DANS',
    topics: ['Super-resolution', 'Computer vision'],
    featured: true,
    abstract:
      'A U-Net style encoder-decoder for single-image super-resolution combining non-local sparse attention with inception blocks, using depth-wise separable convolutions and skip connections to keep computational cost down.',
  },
  {
    id: 'dhtcun',
    title:
      'DHTCUN: Deep Hybrid Transformer CNN U Network for Single-Image Super-Resolution',
    authors: ['J. Talreja', 'S. Aramvith', 'T. Onoye'],
    venue: 'IEEE Access',
    year: 2024,
    type: 'journal',
    status: 'published',
    doi: '10.1109/ACCESS.2024.3450300',
    url: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10648606',
    code: 'https://github.com/JagratiTalreja01/DHTCUN',
    topics: ['Super-resolution', 'Computer vision'],
    featured: true,
    abstract:
      'A U-shaped hybrid architecture built from Parallel Hybrid Transformer CNN Blocks and a Triple Enhanced Spatial Attention mechanism, trading global context modelling against the computational budget of a lightweight super-resolution network.',
  },
  {
    id: 'xtnsr',
    title:
      'XTNSR: Xception-Based Transformer Network for Single-Image Super-Resolution',
    authors: ['J. Talreja', 'S. Aramvith', 'T. Onoye'],
    venue: 'Complex & Intelligent Systems (Springer)',
    year: 2024,
    type: 'journal',
    status: 'published',
    doi: '10.1007/s40747-024-01760-1',
    url: 'https://link.springer.com/article/10.1007/s40747-024-01760-1',
    code: 'https://github.com/JagratiTalreja01/XTNSR',
    topics: ['Super-resolution', 'Computer vision'],
    featured: true,
    abstract:
      'Combines Local Feature Window Transformers with Xception blocks and a patch embedding layer, targeting the grid artefacts and over-smoothing that affect window-based super-resolution transformers.',
  },
  {
    id: 'metaheuristic-material',
    title:
      'Advanced Computational Techniques: Bridging Metaheuristic Optimization and Deep Learning for Material Design through Image Enhancement',
    authors: ['J. Talreja', 'D. Chauhan'],
    venue: 'Elsevier Series in Mechanics of Advanced Materials',
    year: null,
    type: 'book-chapter',
    status: 'published',
    doi: '10.1016/B978-0-443-29162-3.00007-1',
    url: 'https://doi.org/10.1016/B978-0-443-29162-3.00007-1',
    topics: ['Computer vision'],
  },
  {
    id: 'sarganet',
    title:
      'SARGANet: A GAN-U-Net Hybrid Framework for Super-Resolution of Sentinel-1 SAR Imagery',
    authors: ['J. Talreja', 'L. H. Beni'],
    venue: 'Earth Science Informatics',
    year: 2026,
    type: 'journal',
    status: 'accepted',
    topics: ['Super-resolution', 'Remote sensing', 'Generative models'],
    featured: true,
    abstract:
      'A GAN and U-Net hybrid for super-resolving Sentinel-1 SAR imagery. [VERIFY: no public repository or DOI supplied yet.]',
  },
  {
    id: 'cpf',
    title:
      'Cross-Polarization Fusion of VV and VH SAR Observations for Improved Flood Mapping',
    authors: ['J. Talreja', 'T. S. Gebre', 'L. H. Beni'],
    venue: 'IEEE International Geoscience and Remote Sensing Symposium (IGARSS)',
    year: 2026,
    type: 'conference',
    status: 'accepted',
    url: 'https://arxiv.org/abs/2605.02153',
    code: 'https://github.com/JagratiTalreja01/Cross-Polarization-Fusion',
    topics: ['Flood intelligence', 'Remote sensing'],
    featured: true,
    abstract:
      'An attention-based fusion of Sentinel-1 VV and VH polarizations for flood segmentation. The module is backbone-agnostic and is evaluated with both a U-Net and a convolutional autoencoder.',
  },
  {
    id: 'radar-pgdl',
    title:
      'Advanced Flood Prediction with Physics-Guided Deep Learning: Combining UNet, FNO, and SAR/Optical Imagery',
    authors: ['T. S. Gebre', 'J. Talreja', 'L. H. Beni'],
    venue: 'IEEE Radar Conference',
    year: 2026,
    type: 'conference',
    status: 'accepted',
    topics: ['Flood intelligence', 'Multimodal AI'],
  },
  {
    id: 'isprs-damage',
    title:
      'Multi-Modal Attention for Automated Disaster Damage Assessment Using Remote Sensing Imagery and Deep Learning',
    authors: ['T. S. Gebre', 'J. Talreja', 'L. H. Beni'],
    venue:
      'International Society for Photogrammetry and Remote Sensing (ISPRS)',
    year: 2026,
    type: 'conference',
    status: 'accepted',
    topics: ['Multimodal AI', 'Remote sensing'],
  },
  {
    id: 'igarss-piml',
    title: 'Physics-Informed Machine Learning for Short-Term Flood Prediction',
    authors: ['T. S. Gebre', 'J. Talreja', 'L. H. Beni'],
    venue: 'IEEE International Geoscience and Remote Sensing Symposium (IGARSS)',
    year: 2026,
    type: 'conference',
    status: 'accepted',
    topics: ['Flood intelligence'],
  },
  {
    id: 'motion-survey',
    title: 'A Survey on Motion Estimation Techniques',
    authors: ['J. Talreja', 'M. Gupta'],
    venue:
      'Digital Signal Processing, Computer Vision and Image Processing — Wiley-Scrivener (John Wiley & Sons)',
    year: 2024,
    type: 'book-chapter',
    status: 'accepted',
    code: 'https://github.com/JagratiTalreja01/A-SURVEY-ON-MOTION-ESTIMATION-TECHNIQUES',
    topics: ['Computer vision'],
  },
  {
    id: 'edge-survey',
    title:
      'Combined Edge Detection using Wavelet Transform and Signal Readjustment: A Survey',
    authors: ['J. Talreja', 'M. Gupta'],
    venue:
      'Digital Signal Processing, Computer Vision and Image Processing — Wiley-Scrivener (John Wiley & Sons)',
    year: 2024,
    type: 'book-chapter',
    status: 'accepted',
    code: 'https://github.com/JagratiTalreja01/Combined-Edge-Detection-using-Wavelet-Transform',
    topics: ['Computer vision'],
  },
  {
    id: 'quantum-encoding',
    title:
      'Spatially-Aware Quantum Encoding for Flood Patch Classification in Multi-Modal Remote Sensing',
    authors: ['J. Talreja', 'T. S. Gebre', 'L. H. Beni'],
    venue: '[VERIFY TARGET VENUE]',
    year: null,
    type: 'journal',
    status: 'under-review',
    topics: ['Quantum machine learning', 'Multimodal AI', 'Flood intelligence'],
  },
  {
    id: 'stcn-sr',
    title:
      'STCN-SR: A Spatial Transformer-CNN Framework for Enhancing Sentinel-2 Imagery',
    authors: ['J. Talreja', 'L. H. Beni'],
    venue: '[VERIFY TARGET VENUE]',
    year: null,
    type: 'journal',
    status: 'under-review',
    topics: ['Super-resolution', 'Remote sensing'],
  },
  {
    id: 'material-review',
    title:
      'Deep Learning-Based Image Enhancement for Material Imagery: A Comprehensive Review',
    authors: [
      'J. Talreja',
      'L. H. Beni',
      'D. Chauhan',
      'M. Ashfaq',
      'N. Talreja',
      'H. Singh',
    ],
    venue: '[VERIFY TARGET VENUE]',
    year: null,
    type: 'journal',
    status: 'under-review',
    topics: ['Computer vision'],
  },
]

export const pubTopics = [
  'Remote sensing',
  'Super-resolution',
  'Flood intelligence',
  'Multimodal AI',
  'Quantum machine learning',
  'Generative models',
  'Computer vision',
]

export function bibtex(p: Publication): string {
  const key = `talreja${p.year ?? 'nd'}${p.id.replace(/[^a-z0-9]/gi, '')}`
  const entry = p.type === 'journal' ? 'article' : p.type === 'conference' ? 'inproceedings' : 'incollection'
  const field = p.type === 'journal' ? 'journal' : 'booktitle'
  const lines = [
    `@${entry}{${key},`,
    `  title   = {${p.title}},`,
    `  author  = {${p.authors.join(' and ')}},`,
    `  ${field} = {${p.venue}},`,
  ]
  if (p.year) lines.push(`  year    = {${p.year}},`)
  if (p.doi) lines.push(`  doi     = {${p.doi}},`)
  if (p.status !== 'published') lines.push(`  note    = {${p.status === 'accepted' ? 'Accepted for publication' : 'Under review'}},`)
  lines.push('}')
  return lines.join('\n')
}
