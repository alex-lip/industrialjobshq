import type { LocationPage } from '@/types';

// Static SEO content for location pages
// These are custom landing pages with curated content
export const locationPages: LocationPage[] = [
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
  {
    state: 'Ohio',
    stateAbbr: 'OH',
    city: 'Cincinnati',
    slug: 'ohio/cincinnati',
    metaTitle: 'Industrial Sales Jobs in Cincinnati, Ohio',
    metaDescription:
      'Find industrial sales jobs in Cincinnati, OH. Explore manufacturing and industrial equipment sales opportunities in the Cincinnati tri-state area.',
    heading: 'Industrial Sales Jobs in Cincinnati, Ohio',
    content:
      'Cincinnati is a growing center for manufacturing and industrial commerce. The tri-state region offers diverse opportunities in industrial sales, from precision manufacturing to consumer goods production.',
  },
  {
    state: 'Indiana',
    stateAbbr: 'IN',
    city: 'Indianapolis',
    slug: 'indiana/indianapolis',
    metaTitle: 'Industrial Sales Jobs in Indianapolis, Indiana',
    metaDescription:
      'Find industrial sales jobs in Indianapolis, IN. Browse careers in manufacturing, logistics, and industrial equipment sales in central Indiana.',
    heading: 'Industrial Sales Jobs in Indianapolis, Indiana',
    content:
      'Indianapolis sits at the crossroads of American commerce, making it an ideal location for industrial sales professionals. The region features strong logistics, manufacturing, and pharmaceutical industries.',
  },
];

export function getLocationPage(state: string, city: string): LocationPage | undefined {
  return locationPages.find(
    (page) =>
      page.state.toLowerCase() === state.toLowerCase() &&
      page.city.toLowerCase() === city.toLowerCase()
  );
}
