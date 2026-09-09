export interface Figure {
  src: string
  alt: string
  caption: string
}

export interface Metric {
  value: string
  label: string
  note?: string
}

export interface Project {
  id: string
  name: string
  kicker: string
  /** One sentence: what this is and why it matters. */
  proposition: string
  problem: string
  stakes: string
  role: string
  data: string
  method: string[]
  engineering: string
  experiment: string
  metrics: Metric[]
  limitations: string
  stack: string[]
  repo?: string
  paper?: string
  paperLabel?: string
  status: string
  figures: Figure[]
  accent: 'signal' | 'cobalt' | 'violet'
}

/**
 * Technical detail is transcribed from the public repository READMEs and the CV.
 * Quantitative values appear only where the source states them.
 */
export const projects: Project[] = [
  {
    id: 'tcsf',
    name: 'TCSF',
    kicker: 'Tri-level cross-state fusion for SAR–optical flood mapping',
    proposition:
      'A flood segmentation network that keeps radar and optical evidence in separate streams and learns, per pixel, which sensor to believe.',
    problem:
      'Sentinel-1 SAR and Sentinel-2 optical imagery fail in opposite conditions. SAR works day, night and through cloud but carries speckle and complex scattering; optical imagery is spectrally rich but is degraded by cloud, haze and shadow. Concatenating the two lets whichever modality is corrupted drag the prediction down with it.',
    stakes:
      'Flood extent maps are used to route emergency response. A map that silently degrades under cloud is worse than no map, because nothing in the output signals that it should not be trusted.',
    role:
      'Sole author of the architecture, training pipeline and evaluation; designed the reliability estimation and fusion mechanisms and ran the full benchmark and ablation programme.',
    data:
      'SEN1FLOODS11, SEN12MS and DEEPFLOOD. Inputs are Sentinel-1 VV/VH together with all 13 Sentinel-2 spectral bands, co-registered per scene.',
    method: [
      'Modality Reliability Estimation scores how trustworthy each stream is before fusion, rather than assuming both are equally good.',
      'Dual Vision Mamba encoders model long-range spatial context at linear cost, keeping SAR and optical states separate.',
      'Bidirectional Cross-State Fusion lets the two state streams exchange information without collapsing into one representation.',
      'Four fusion stages are linked by three controlled cross-scale state transitions, propagating SAR, optical and fused states through the encoder.',
      'Adaptive Decision Fusion combines the three decoder predictions with learned pixel-wise weights.',
    ],
    engineering:
      'State-space encoders are sensitive to scan order and sequence length, so cross-scale propagation is gated rather than free — an ungated version let one modality dominate the fused state. Training ran on a single NVIDIA RTX A4000 with 16 GB, which set the ceiling on patch size and channel width and forced the parameter budget to be spent deliberately.',
    experiment:
      'Benchmarked against the same backbones across three datasets, with accuracy traded off explicitly against GFLOPs, parameter count and inference latency rather than reported in isolation.',
    metrics: [
      { value: '0.5803', label: 'Macro IoU', note: 'SEN1FLOODS11' },
      { value: '0.5968', label: 'Macro IoU', note: 'DEEPFLOOD' },
      { value: '11.02M', label: 'Trainable parameters' },
      { value: '77.1 ms', label: 'Inference latency', note: 'batch size 1' },
    ],
    limitations:
      'Evaluated on three public flood benchmarks only; generalisation to unseen sensors or regions outside those datasets is untested. Reliability estimation is learned from the training distribution, so an unfamiliar failure mode may be scored as reliable. Results are from a single-GPU training budget.',
    stack: ['PyTorch', 'Vision Mamba', 'Sentinel-1', 'Sentinel-2', 'CUDA', 'NVIDIA RTX A4000'],
    repo: 'https://github.com/JagratiTalreja01/TCSF',
    status: 'Manuscript in preparation — code public',
    figures: [
      {
        src: 'media/research/tcsf-architecture.png',
        alt: 'TCSF network diagram showing dual Vision Mamba encoders, four cross-state fusion stages and adaptive decision fusion.',
        caption: 'TCSF framework: reliability-guided fusion stages linked by controlled cross-scale transitions.',
      },
      {
        src: 'media/research/tcsf-result.png',
        alt: 'Qualitative flood segmentation results comparing SAR input, optical imagery, ground truth and TCSF prediction.',
        caption: 'SAR input, optical imagery, ground truth, prediction and learned reliability maps.',
      },
      {
        src: 'media/research/tcsf-iou-gflops.png',
        alt: 'Scatter plot of segmentation IoU against GFLOPs for TCSF and baseline models.',
        caption: 'Accuracy against computational cost versus the baselines.',
      },
    ],
    accent: 'signal',
  },
  {
    id: 'flora',
    name: 'FLoRA',
    kicker: 'Joint SAR-to-optical reconstruction and flood segmentation',
    proposition:
      'One network that reconstructs a legible optical view from radar and segments the flood at the same time, so the two tasks stop compounding each other’s errors.',
    problem:
      'Translation and segmentation are normally separate models chained together, which means reconstruction error propagates into the flood mask with nothing to correct it. Radar also has no direct spectral analogue, so a translator with no supervision on colour or vegetation drifts toward plausible-looking but hydrologically wrong output.',
    stakes:
      'Responders and analysts read optical imagery. A radar-only product needs interpretation; a reconstructed optical view with a flood mask on top can be acted on directly.',
    role:
      'First author. Designed the fusion-latent representation, the optical-teacher distillation scheme and the multi-task optimisation, and ran training and evaluation.',
    data:
      'SEN1Floods11, SEN12MS and DeepFlood. Sentinel-1 VV/VH inputs with RGB and NDVI cues supervising the teacher.',
    method: [
      'A shared fusion-latent space aligns SAR features with optical priors instead of translating pixel-to-pixel.',
      'Multi-scale windowed cross-attention with FiLM conditioning enforces spectral fidelity and structural consistency.',
      'A lightweight optical teacher driven by RGB and NDVI cues distils supervision into the SAR encoder.',
      'Gradient decoupling stabilises joint optimisation so segmentation does not destabilise reconstruction.',
      'GAN-enhanced reconstruction loss (Charbonnier + SSIM + FFT) combined with Dice and BCE segmentation losses.',
    ],
    engineering:
      'Multi-task training is where this class of model usually breaks: the segmentation gradient is far stronger than the reconstruction gradient and quietly turns the translator into a mask predictor. Gradient decoupling was the fix. The FFT term was added because Charbonnier and SSIM alone let the generator lose high-frequency texture that SSIM does not penalise heavily.',
    experiment:
      'Built on the Pix2pix PyTorch codebase; trained and tested on Ubuntu 20.04.6 with Python 3.10.13 and an NVIDIA RTX A4000 (16 GB), evaluated across all three datasets including noisy and cluttered SAR scenes.',
    metrics: [
      { value: 'TGRS', label: 'IEEE Transactions on Geoscience and Remote Sensing', note: '2026' },
      { value: '3', label: 'Benchmark datasets' },
      { value: '2-in-1', label: 'Translation + segmentation', note: 'single pipeline' },
    ],
    limitations:
      'Reconstructions are perceptually convincing but are a model’s inference, not an observation — they must not be treated as measured optical data. Performance under sensor or seasonal conditions outside the three training datasets is not characterised.',
    stack: ['PyTorch', 'Pix2pix', 'GANs', 'Cross-attention', 'FiLM', 'Sentinel-1', 'NDVI'],
    repo: 'https://github.com/JagratiTalreja01/FLoRA',
    paper: 'https://ieeexplore.ieee.org/abstract/document/11554107',
    paperLabel: 'IEEE TGRS',
    status: 'Published — IEEE TGRS, DOI 10.1109/TGRS.2026.3701300',
    figures: [
      {
        src: 'media/research/flora-architecture.png',
        alt: 'FLoRA architecture diagram showing the fusion-latent space, optical teacher network and dual task heads.',
        caption: 'FLoRA: fusion-latent representation with optical-teacher distillation and two task heads.',
      },
      {
        src: 'media/research/flora-result1.png',
        alt: 'Reconstructed optical patches from SAR input compared against ground-truth optical imagery.',
        caption: 'Reconstructed optical patches against ground truth.',
      },
      {
        src: 'media/research/flora-result2.png',
        alt: 'Further FLoRA reconstruction and flood segmentation result patches.',
        caption: 'Joint reconstruction and flood-extent output on held-out scenes.',
      },
    ],
    accent: 'cobalt',
  },
  {
    id: 'dpoltransgan',
    name: 'D-PolTransGAN',
    kicker: 'Scattering-guided Transformer-GAN for dual-polarization SAR',
    proposition:
      'Translates Sentinel-1 radar into optical-like imagery by treating VV and VH as two physically distinct measurements rather than two input channels.',
    problem:
      'SAR-to-optical translators typically stack polarizations and let the first convolution decide what to do with them. That discards the physics: VV and VH respond differently to surface, double-bounce and volume scattering, and that difference is exactly what distinguishes open water from flooded vegetation.',
    stakes:
      'Cloud cover is correlated with flooding, so the optical image you want is usually the one you cannot have. A faithful translation restores an interpretable view during the event rather than after it.',
    role:
      'First author. Designed the dual-stem generator, the Scattering-Guided Attention Fusion module and the SE-gated skip connections, and ran training and evaluation.',
    data: 'DeepFlood for training, with test evaluation extended to SEN1FLOODS11 and SEN12MS.',
    method: [
      'Independent dual stems process VV and VH so polarization-specific scattering survives early layers.',
      'Scattering-Guided Attention Fusion adaptively combines the two based on their interaction, not a fixed weighting.',
      'A hybrid CNN–Transformer generator inside a GAN balances local texture against global context.',
      'SE-gated skip connections pass useful detail while suppressing SAR-induced artefacts.',
    ],
    engineering:
      'Skip connections in a SAR generator are a liability as much as an asset — they carry speckle straight to the decoder. Gating them with squeeze-and-excitation was what stopped noise being reconstructed as texture. Adversarial training on speckled input is also unstable, which is why convergence is reported alongside quality.',
    experiment:
      'Built on the MT_GAN PyTorch codebase; Ubuntu 20.04.6, Python 3.10.13, NVIDIA RTX A4000 (16 GB). Evaluated with PSNR and LPIPS, plus NDWI comparisons that test whether water indices computed on the translated image still behave correctly.',
    metrics: [
      { value: 'JSTARS', label: 'IEEE J. Selected Topics in Applied Earth Observations', note: '2026' },
      { value: 'VV + VH', label: 'Dual-polarization input' },
      { value: 'PSNR · LPIPS · NDWI', label: 'Evaluation axes' },
    ],
    limitations:
      'Output is synthesised imagery and should support interpretation, not replace measurement. Quality depends on the scattering conditions represented in DeepFlood; unusual terrain or land cover may translate poorly.',
    stack: ['PyTorch', 'GANs', 'Transformers', 'MT_GAN', 'Sentinel-1', 'NVIDIA RTX A4000'],
    repo: 'https://github.com/JagratiTalreja01/D-PolTransGAN',
    paper: 'https://ieeexplore.ieee.org/abstract/document/11512990',
    paperLabel: 'IEEE JSTARS',
    status: 'Published — IEEE JSTARS, DOI 10.1109/JSTARS.2026.3691677',
    figures: [
      {
        src: 'media/research/dpol-generator.png',
        alt: 'D-PolTransGAN generator architecture with dual polarization stems and transformer blocks.',
        caption: 'Generator: dual VV/VH stems feeding a hybrid CNN–Transformer trunk.',
      },
      {
        src: 'media/research/dpol-sgaf.png',
        alt: 'Diagram of the Scattering-Guided Attention Fusion module.',
        caption: 'Scattering-Guided Attention Fusion between the two polarization streams.',
      },
      {
        src: 'media/research/dpol-deepflood.png',
        alt: 'SAR input, translated optical output and ground-truth optical imagery on DeepFlood test scenes.',
        caption: 'DeepFlood test scenes: SAR input, translated output, reference optical.',
      },
    ],
    accent: 'violet',
  },
  {
    id: 'cpf',
    name: 'Cross-Polarization Fusion',
    kicker: 'A drop-in fusion module for dual-polarized flood segmentation',
    proposition:
      'A backbone-agnostic attention module that fuses VV and VH and measurably beats either polarization alone, without meaningfully growing the network.',
    problem:
      'Operational SAR flood mapping usually picks one polarization or concatenates both. Neither models the complementary behaviour that matters in vegetated and urban scenes, where single-polarization methods produce false positives on radar-dark surfaces.',
    stakes:
      'Most of the difficult flood terrain is exactly the mixed land–water and vegetated terrain where single-polarization thresholds break down.',
    role:
      'First author. Designed the bidirectional cross-polarization attention and adaptive recalibration, and ran the paired evaluation across two backbones.',
    data: 'DeepFlood, with cross-event generalisation tests on unseen flood events.',
    method: [
      'Independent feature extraction for the VV and VH channels.',
      'Bidirectional cross-polarization attention models the interaction explicitly rather than stacking or averaging.',
      'Adaptive feature recalibration before the segmentation head.',
      'Deliberately architecture-agnostic: validated on a U-Net with skip connections and on a convolutional autoencoder without them.',
    ],
    engineering:
      'The design constraint was that the module had to be adoptable. It adds negligible depth and parameter count, and it was validated on two structurally different backbones so that a gain could not be attributed to a favourable pairing.',
    experiment:
      'Paired comparison against VV-only and VH-only inputs on identical backbones, reported for both architectures with IoU and F1.',
    metrics: [
      { value: '69.8%', label: 'IoU with U-Net', note: 'vs 66.2% VV-only, 62.5% VH-only' },
      { value: '82.2%', label: 'F1 with U-Net', note: 'vs 79.7% VV-only' },
      { value: '63.2%', label: 'IoU with autoencoder', note: 'vs 60.4% VV-only' },
    ],
    limitations:
      'Gains are consistent but modest, and are demonstrated on DeepFlood; the module improves fusion but does not address SAR speckle or geometric distortion directly.',
    stack: ['PyTorch', 'U-Net', 'Autoencoders', 'Attention', 'Sentinel-1'],
    repo: 'https://github.com/JagratiTalreja01/Cross-Polarization-Fusion',
    paper: 'https://arxiv.org/abs/2605.02153',
    paperLabel: 'Preprint',
    status: 'Accepted — IGARSS 2026',
    figures: [
      {
        src: 'media/research/cpf-architecture.png',
        alt: 'Cross-Polarization Fusion module diagram showing bidirectional attention between VV and VH feature streams.',
        caption: 'Bidirectional cross-polarization attention and recalibration.',
      },
      {
        src: 'media/research/cpf-result.png',
        alt: 'Flood segmentation masks comparing VV-only, VH-only and fused predictions against ground truth.',
        caption: 'VV-only, VH-only and fused predictions against ground truth.',
      },
    ],
    accent: 'signal',
  },
  {
    id: 'sisr',
    name: 'DANS · DHTCUN · XTNSR',
    kicker: 'Three architectures for single-image super-resolution',
    proposition:
      'A doctoral line of work on recovering detail from low-resolution images under a strict compute budget — the foundation the satellite super-resolution work is built on.',
    problem:
      'Attention and transformer super-resolution models get their quality from global context, which is what makes them expensive. The research question was where that cost can be removed without losing the reconstruction it pays for.',
    stakes:
      'Super-resolution is only useful if it can run where the image is captured — on a satellite downlink pipeline, a medical scanner or an embedded device. A model that needs a datacentre solves a different problem.',
    role:
      'First author on all three. PhD research at Chulalongkorn University with Assoc. Prof. Supavadee Aramvith and Prof. Takao Onoye.',
    data: 'DIV2K for training; Set5, Set14, BSD100, Urban100 and Manga109 for benchmarking at ×2, ×4 and ×8.',
    method: [
      'DANS: a U-Net encoder–decoder with non-local sparse attention and inception blocks, using depth-wise separable convolutions to hold cost down.',
      'DHTCUN: Parallel Hybrid Transformer CNN Blocks with Triple Enhanced Spatial Attention in a U-shaped design, using pixel shuffle and skip connections for efficiency.',
      'XTNSR: Local Feature Window Transformers combined with Xception blocks and a patch embedding layer, targeting the grid artefacts and over-smoothing of window-based transformers.',
    ],
    engineering:
      'Each model was built on an established open codebase — EDSR, HNCT and SRFormer respectively — so that reported gains are attributable to the new components rather than to a different training recipe. All three report parameters, multiply-adds, execution time and space complexity next to PSNR, because a super-resolution result without its cost is not a result.',
    experiment:
      'Standard SISR protocol across five benchmarks at multiple scale factors, with complexity and runtime reported alongside PSNR and SSIM.',
    metrics: [
      { value: '3', label: 'Published architectures', note: 'IEEE Access ×2, Complex & Intelligent Systems' },
      { value: '5', label: 'Benchmark datasets' },
      { value: '×2 / ×4 / ×8', label: 'Scale factors evaluated' },
    ],
    limitations:
      'Trained and evaluated on natural-image benchmarks; transferring to satellite imagery required separate work, because SAR and multispectral degradation is not the bicubic downsampling these benchmarks assume.',
    stack: ['PyTorch', 'Transformers', 'Attention', 'DIV2K', 'CUDA', 'cuDNN'],
    repo: 'https://github.com/JagratiTalreja01/DHTCUN',
    paper: 'https://doi.org/10.1007/s40747-024-01760-1',
    paperLabel: 'Springer',
    status: 'Published — IEEE Access (2023, 2024), Complex & Intelligent Systems (2024)',
    figures: [
      {
        src: 'media/research/dhtcun-architecture.png',
        alt: 'DHTCUN U-shaped architecture with parallel hybrid transformer CNN blocks.',
        caption: 'DHTCUN: parallel hybrid Transformer–CNN blocks in a U-shaped network.',
      },
      {
        src: 'media/research/xtnsr-architecture.png',
        alt: 'XTNSR architecture combining local feature window transformers with Xception blocks.',
        caption: 'XTNSR: local feature window transformers with Xception blocks.',
      },
      {
        src: 'media/research/dhtcun-urban.png',
        alt: 'Super-resolution comparison on the Urban100 benchmark at scale factor four.',
        caption: 'Urban100 ×4 reconstruction against competing methods.',
      },
      {
        src: 'media/research/dans-architecture.png',
        alt: 'DANS architecture with non-local sparse attention and inception blocks.',
        caption: 'DANS: non-local sparse attention with inception blocks.',
      },
    ],
    accent: 'cobalt',
  },
  {
    id: 'safepath',
    name: 'SafePath',
    kicker: 'Evacuation routing under active flood conditions',
    proposition:
      'A disaster navigation concept that routes people to safety using conditions on the ground rather than a road network that assumes every road is open.',
    problem:
      'Consumer navigation optimises for travel time on a static network. During a flood the network itself is the variable: roads are submerged, bridges are cut, and the fastest route can be the one that fails.',
    stakes:
      'Evacuation decisions are made in minutes by people without access to hazard data.',
    role:
      'Co-inventor on the filed US application with Tewodros Syum Gebre and Leila Hashemi-Beni.',
    data:
      'Draws on the flood-extent modelling produced by the SAR–optical research on this page.',
    method: [
      'Couples remote-sensing derived flood extent with routing so that hazard is a first-class input.',
      'Filed as a US provisional application; technical detail beyond the public filing is not disclosed here.',
    ],
    engineering:
      'Detail is limited to what the public filing supports — see the patents section for the application record.',
    experiment: 'Not publicly disclosed.',
    metrics: [
      { value: '63/929,945', label: 'US application number' },
      { value: '2025', label: 'Filed', note: '12 March 2025' },
      { value: '3', label: 'Inventors' },
    ],
    limitations:
      'This is a filed application, not a granted patent, and not a shipped product. [VERIFY: add any public prototype or demo link if one exists.]',
    stack: ['Remote sensing', 'Routing', 'Flood modelling'],
    status: 'US provisional application filed — 12 March 2025',
    figures: [],
    accent: 'violet',
  },
]
