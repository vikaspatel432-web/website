// Central content for SP Consultants — sourced from the company business
// portfolio (2025-26). Keeping it here keeps pages consistent and easy to edit.

export const COMPANY = {
  name: 'SP Consultants',
  tagline: 'Transforming Visions Into Reality',
  site: 'www.spconsultants.info',
  email: 'admin@spconsultants.info',
  phones: ['+91 94285 10353'],
}

export const FOUNDERS = [
  {
    name: 'Yogiraj Surti',
    role: 'Co-Founder & Strategic Director',
    email: 'yogiraj@spconsultants.info',
    phone: '+91 94285 10353',
    photo: '/team/yogiraj.jpg',
    bio: 'Yogiraj leads strategy and client partnerships at SP Consultants, helping AEC teams adopt BIM as the single source of truth across design, coordination and construction.',
  },
]

export interface Service {
  id: string
  num: string
  title: string
  short: string
  desc: string
  points: string[]
  icon: string // lucide icon name
}

export const SERVICES: Service[] = [
  {
    id: 'bim-consultancy',
    num: '01',
    title: 'BIM Consultancy',
    short: 'Multi-discipline BIM modelling with live coordination.',
    desc: 'BIM model development across Architectural, Structural and MEPF disciplines with real-time coordination, clash detection and RFI management — turning the model into your project’s single source of truth.',
    points: [
      'Integrated models for all disciplines',
      'Clash detection & coordination',
      'Real-time RFI management',
      'BBS linked to the model + GFC drawings',
      'Automated BOQs & quantity take-off',
      'Management dashboards',
    ],
    icon: 'Boxes',
  },
  {
    id: 'layout-planning',
    num: '02',
    title: '2D & 3D Layout Planning',
    short: 'Precision floor plans, site layouts & visualisations.',
    desc: 'Accurate dimensional floor plans, site documentation and 2D/3D visualisations for residential and commercial projects — ready for permit submission and construction execution.',
    points: [
      'Dimensional floor plans (walls, openings, fixtures)',
      'Site documentation & boundaries',
      'Space optimisation for code & flow',
      'Concept → 2D layouts → 3D models',
    ],
    icon: 'Ruler',
  },
  {
    id: 'walkthroughs',
    num: '03',
    title: '360° Walkthroughs',
    short: 'Immersive progress capture & Reality-vs-BIM.',
    desc: 'Immersive 360° site walks for progress documentation — navigate from the floor plan, time-travel through history and compare site reality side-by-side with the digital twin BIM model.',
    points: [
      'Immersive 360° site walks',
      'Timeline history & time-travel',
      'Side-by-side progress comparison',
      'Reality vs BIM comparison + field notes',
    ],
    icon: 'ScanEye',
  },
  {
    id: 'laser-scanning',
    num: '04',
    title: 'Laser Scanning',
    short: 'Reality capture & scan-to-BIM of existing structures.',
    desc: 'Mapping existing structures with the Leica RTC360 to create accurate models and drawings for renovation and redesign — interior, exterior and drone-based capture.',
    points: [
      '3D point cloud of existing structures',
      '2D CAD layouts from scan data',
      'Point cloud to BIM conversion',
      'Interior / exterior & 3D drone mapping',
    ],
    icon: 'Radar',
  },
  {
    id: 'construction-management',
    num: '05',
    title: 'Construction Management',
    short: 'Planning, scheduling & reporting (P6 / MSP).',
    desc: 'Construction planning, scheduling and progress reporting using Primavera P6 and Microsoft Project, backed by interactive dashboards and delay analysis.',
    points: [
      'Baseline schedules & resource management',
      'Schedule monitoring & control',
      'Delay analysis & EoT claims',
      'DPR / WPR / MPR dashboards',
    ],
    icon: 'CalendarClock',
  },
  {
    id: 'simulations',
    num: '06',
    title: '4D & 5D Simulations',
    short: 'Time + cost linked to the 3D model.',
    desc: 'We link your schedule to the 3D model to unlock the 4th dimension (Time) and the 5th (Cost) — validating sequences, visualising milestones and managing cash flow with precision.',
    points: [
      '4D sequencing & timeline validation',
      '5D cost & budget cash-flow control',
      'What-if scenario planning',
      'Site logistics planning',
    ],
    icon: 'Layers',
  },
  {
    id: 'data-analytics',
    num: '07',
    title: 'Data Analytics',
    short: 'BIM-based intelligence with Power BI & Tableau.',
    desc: 'Visualise complex project data in easy-to-understand formats using Power BI and Tableau — turning BIM and schedule data into intelligence reports that drive decisions.',
    points: [
      'BIM-based intelligence reports',
      'Power BI & Tableau dashboards',
      'Concrete vs steel & consumption metrics',
      'Interactive, floor-wise reporting',
    ],
    icon: 'BarChart3',
  },
]

export const STATS = [
  { value: 7, suffix: '', label: 'Integrated service lines' },
  { value: 5, suffix: 'D', label: 'BIM dimensions (3D·4D·5D)' },
  { value: 360, suffix: '°', label: 'Site walk documentation' },
  { value: 100, suffix: '%', label: 'Single source of truth' },
]

// Tools/software we work with. `file` points at an optional logo asset in
// /public/logos/. If the file is missing, the strip falls back to the name —
// drop the official logos into public/logos/ to light them up automatically.
export const TOOLS: { name: string; file: string }[] = [
  { name: 'Revit', file: '/logos/revit.png' },
  { name: 'Navisworks', file: '/logos/navisworks.png' },
  { name: 'Civil 3D', file: '/logos/civil3d.png' },
  { name: 'Tekla', file: '/logos/tekla.png' },
  { name: 'Solibri', file: '/logos/solibri.png' },
  { name: 'Synchro', file: '/logos/synchro.png' },
  { name: 'Matterport', file: '/logos/matterport.png' },
  { name: 'DroneDeploy', file: '/logos/dronedeploy.png' },
  { name: 'MS Project', file: '/logos/ms-project.png' },
  { name: 'SketchUp', file: '/logos/sketchup.png' },
  { name: 'Speckle', file: '/logos/speckle.png' },
  { name: 'Power BI', file: '/logos/power-bi.png' },
  { name: 'Tableau', file: '/logos/tableau.png' },
  { name: 'OpenSpace', file: '/logos/openspace.png' },
  { name: 'PIX4D', file: '/logos/pix4d.png' },
  { name: 'Primavera P6', file: '/logos/primavera.png' },
]

export const TECH_WE_MASTER = [
  { title: 'BIM Model Development', text: 'Architectural, Structural, MEPF & integrated models for complete project visualisation.' },
  { title: 'Planning, Scheduling & TIA', text: 'Integrating all construction phases and assessing the impact of delays on completion.' },
  { title: 'BIM Clash Detection', text: 'Clash-free models by coordinating with design teams and updating BIM data.' },
  { title: '4D & 5D Simulation', text: 'Prioritising time and schedule alongside dynamic cost estimates and budgets.' },
  { title: 'Reality Capture', text: '360° site walks and drone mapping to capture spaces for digital review.' },
  { title: 'Data Analytics', text: 'Complex datasets in clear formats using Power BI and Tableau.' },
]

export const PROJECTS = [
  {
    sector: 'Sports & Venues',
    title: 'Stadium Documentation',
    text: 'Large-scale laser scanning and point-cloud generation for stadium infrastructure, with BIM models at accurate measurements.',
    tags: ['Laser Scanning', 'Point Cloud', 'Scan-to-BIM'],
    image: '/projects/stadium.webp',
  },
  {
    sector: 'Hospitality',
    title: 'Hotel Interiors — Scan to 2D',
    text: 'High-overlap interior scanning across floors, converted into precise, verified 2D floor layouts for planning and design.',
    tags: ['Interior Scanning', '2D Layouts', 'BIM'],
    image: '/projects/scan-2d.webp',
  },
  {
    sector: 'Commercial',
    title: 'Integrated BIM Delivery',
    text: 'Multi-discipline BIM with live clash detection, automated BOQs and GFC drawings delivered through an online collaboration platform.',
    tags: ['BIM Consultancy', 'Clash Detection', 'BOQ'],
    image: '/projects/integrated-bim.webp',
  },
  {
    sector: 'Infrastructure',
    title: '4D / 5D Programme Control',
    text: 'Schedule linked to the model for 4D sequencing and 5D cost control, with dashboards for real-time progress monitoring.',
    tags: ['4D/5D', 'Primavera P6', 'Dashboards'],
    image: '/projects/4d-5d.webp',
  },
]

export const PLATFORM_FEATURES = [
  { icon: 'Share2', title: 'Single Source of Truth', text: 'The BIM model becomes the central hub all stakeholders work from.' },
  { icon: 'MessagesSquare', title: 'Integrated RFIs', text: 'Raise and resolve RFIs against model objects for streamlined communication.' },
  { icon: 'PenTool', title: 'In-built Markups', text: 'Mark up the model to run effective design reviews and meetings.' },
  { icon: 'FileStack', title: 'GFC Drawings', text: 'Good-For-Construction drawings generated directly from the model.' },
  { icon: 'Table2', title: 'Interactive BBS & BOQ', text: 'Floor-wise bar bending schedules and automated quantity take-off.' },
  { icon: 'LayoutDashboard', title: 'Live Dashboards', text: 'Management dashboards for project oversight and tracking.' },
  { icon: 'Link2', title: 'Accessible Anywhere', text: 'Open via a simple link on any device — no complex training.' },
  { icon: 'GitCompareArrows', title: 'Reality vs BIM', text: 'Compare 360° site progress against the model over time.' },
]
