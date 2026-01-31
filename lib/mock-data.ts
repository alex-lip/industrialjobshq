import type { Job, LocationPage } from '@/types';

export const mockJobs: Job[] = [
  {
    id: '1',
    slug: 'senior-industrial-sales-manager-acme-manufacturing',
    title: 'Senior Industrial Sales Manager',
    company: 'Acme Manufacturing',
    companyLogo: '/logos/acme.png',
    location: {
      city: 'Columbus',
      state: 'OH',
    },
    salaryMin: 120000,
    salaryMax: 160000,
    jobType: 'full-time',
    description:
      'Lead our industrial sales team and drive growth in the Midwest region. You will be responsible for developing strategic partnerships with manufacturing companies and expanding our market presence.',
    requirements: [
      '10+ years of industrial sales experience',
      'Proven track record of exceeding sales targets',
      'Experience managing a sales team of 5+',
      'Strong knowledge of manufacturing processes',
      "Bachelor's degree in Business or Engineering",
    ],
    postedDate: '2026-01-28',
    applyUrl: 'https://acme-manufacturing.com/careers/senior-sales-manager',
    territory: 'Midwest (OH, IN, MI, KY)',
    travelPercentage: 40,
    industryVertical: 'Manufacturing Equipment',
  },
  {
    id: '2',
    slug: 'automation-sales-specialist-robotech-solutions',
    title: 'Automation Sales Specialist',
    company: 'RoboTech Solutions',
    companyLogo: '/logos/robotech.png',
    location: {
      city: 'Detroit',
      state: 'MI',
    },
    salaryMin: 95000,
    salaryMax: 130000,
    jobType: 'full-time',
    description:
      'Sell cutting-edge automation and robotics solutions to automotive and manufacturing clients. Join a fast-growing company at the forefront of industrial automation.',
    requirements: [
      '5+ years of technical sales experience',
      'Knowledge of industrial automation systems',
      'Experience with CRM software',
      'Excellent presentation skills',
      'Ability to understand and explain technical concepts',
    ],
    postedDate: '2026-01-30',
    applyUrl: 'https://robotech-solutions.com/jobs/automation-sales',
    territory: 'Michigan & Northern Ohio',
    travelPercentage: 50,
    industryVertical: 'Automation & Robotics',
  },
  {
    id: '3',
    slug: 'territory-sales-rep-industrial-supply-co',
    title: 'Territory Sales Representative',
    company: 'Industrial Supply Co.',
    companyLogo: '/logos/industrial-supply.png',
    location: {
      city: 'Chicago',
      state: 'IL',
    },
    salaryMin: 70000,
    salaryMax: 95000,
    jobType: 'full-time',
    description:
      'Manage and grow sales in the Greater Chicago area. Sell industrial supplies, MRO products, and safety equipment to manufacturing facilities.',
    requirements: [
      '2+ years of outside sales experience',
      "Valid driver's license and reliable transportation",
      'Strong relationship-building skills',
      'Self-motivated with ability to work independently',
      'Experience with industrial or MRO sales preferred',
    ],
    postedDate: '2026-01-25',
    applyUrl: 'https://industrial-supply.com/careers/territory-rep-chicago',
    territory: 'Greater Chicago',
    travelPercentage: 60,
    industryVertical: 'Industrial Supplies & MRO',
  },
  {
    id: '4',
    slug: 'technical-sales-engineer-precision-tools',
    title: 'Technical Sales Engineer',
    company: 'Precision Tools Inc.',
    companyLogo: '/logos/precision-tools.png',
    location: {
      city: 'Cleveland',
      state: 'OH',
    },
    salaryMin: 85000,
    salaryMax: 115000,
    jobType: 'full-time',
    description:
      'Combine your engineering background with sales skills to help customers find the right precision tooling solutions for their manufacturing needs.',
    requirements: [
      'Engineering degree or equivalent technical experience',
      '3+ years in technical sales or applications engineering',
      'Knowledge of CNC machining and tooling',
      'Strong analytical and problem-solving skills',
      'Excellent communication abilities',
    ],
    postedDate: '2026-01-29',
    applyUrl: 'https://precision-tools.com/jobs/sales-engineer',
    travelPercentage: 30,
    industryVertical: 'Precision Tooling',
  },
  {
    id: '5',
    slug: 'regional-sales-director-midwest-packaging',
    title: 'Regional Sales Director',
    company: 'Midwest Packaging Solutions',
    companyLogo: '/logos/midwest-packaging.png',
    location: {
      city: 'Indianapolis',
      state: 'IN',
    },
    salaryMin: 140000,
    salaryMax: 180000,
    jobType: 'full-time',
    description:
      'Lead our regional sales organization and drive revenue growth across the Midwest. Manage a team of 8 sales representatives and develop strategic customer relationships.',
    requirements: [
      '15+ years of B2B sales experience',
      '5+ years of sales leadership experience',
      'Experience in packaging or related industries',
      'Strategic planning and execution skills',
      'MBA preferred',
    ],
    postedDate: '2026-01-20',
    applyUrl: 'https://midwest-packaging.com/careers/regional-director',
    territory: 'Midwest Region',
    travelPercentage: 35,
    industryVertical: 'Packaging & Processing',
  },
  {
    id: '6',
    slug: 'industrial-equipment-sales-contract-heavy-machinery',
    title: 'Industrial Equipment Sales (Contract)',
    company: 'Heavy Machinery Corp',
    companyLogo: '/logos/heavy-machinery.png',
    location: {
      city: 'Pittsburgh',
      state: 'PA',
    },
    salaryMin: 75000,
    salaryMax: 100000,
    jobType: 'contract',
    description:
      '6-month contract position to support a major equipment rollout. Ideal for experienced sales professionals looking for project-based work.',
    requirements: [
      '5+ years of industrial equipment sales',
      'Experience with heavy machinery or construction equipment',
      'Strong negotiation skills',
      'Available for immediate start',
      'Willingness to travel extensively',
    ],
    postedDate: '2026-01-31',
    applyUrl: 'https://heavy-machinery.com/contract-sales',
    travelPercentage: 70,
    industryVertical: 'Heavy Machinery',
  },
];

export const mockLocationPages: LocationPage[] = [
  {
    state: 'Ohio',
    stateAbbr: 'OH',
    city: 'Columbus',
    slug: 'ohio/columbus',
    metaTitle: 'Industrial Sales Jobs in Columbus, Ohio',
    metaDescription:
      'Find industrial sales jobs in Columbus, OH. Browse opportunities in manufacturing, automation, and industrial equipment sales in the Columbus area.',
    heading: 'Industrial Sales Jobs in Columbus, Ohio',
    content:
      'Columbus is a thriving hub for industrial sales professionals. With its central location and strong manufacturing base, the Columbus area offers excellent opportunities in industrial equipment, automation, and B2B sales.',
  },
  {
    state: 'Michigan',
    stateAbbr: 'MI',
    city: 'Detroit',
    slug: 'michigan/detroit',
    metaTitle: 'Industrial Sales Jobs in Detroit, Michigan',
    metaDescription:
      'Find industrial sales jobs in Detroit, MI. Explore careers in automotive, manufacturing, and industrial automation sales in the Detroit metro area.',
    heading: 'Industrial Sales Jobs in Detroit, Michigan',
    content:
      'Detroit remains the heart of American manufacturing. Industrial sales professionals in Detroit enjoy access to major automotive manufacturers, tier-one suppliers, and a robust industrial automation sector.',
  },
  {
    state: 'Illinois',
    stateAbbr: 'IL',
    city: 'Chicago',
    slug: 'illinois/chicago',
    metaTitle: 'Industrial Sales Jobs in Chicago, Illinois',
    metaDescription:
      'Find industrial sales jobs in Chicago, IL. Discover opportunities in manufacturing sales, industrial equipment, and B2B sales across the Chicago metropolitan area.',
    heading: 'Industrial Sales Jobs in Chicago, Illinois',
    content:
      'Chicago is a major industrial and logistics hub with diverse opportunities in industrial sales. From manufacturing equipment to industrial supplies, the Chicago area offers roles across all sectors of industrial sales.',
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return mockJobs.find((job) => job.slug === slug);
}

export function getJobsByLocation(city: string, state: string): Job[] {
  return mockJobs.filter(
    (job) =>
      job.location.city.toLowerCase() === city.toLowerCase() &&
      job.location.state.toLowerCase() === state.toLowerCase()
  );
}

export function getLocationPage(state: string, city: string): LocationPage | undefined {
  return mockLocationPages.find(
    (page) =>
      page.state.toLowerCase() === state.toLowerCase() &&
      page.city.toLowerCase() === city.toLowerCase()
  );
}
