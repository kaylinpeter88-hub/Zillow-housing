import { Property, AgentInfo } from '../types';

export const FEATURED_PROPERTY: Property = {
  id: '123-maple-street',
  address: '123 Maple Street',
  city: 'Pleasant Valley',
  state: 'CA',
  zip: '94566',
  price: 425000,
  formattedPrice: '$425,000',
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1850,
  yearBuilt: 2021,
  propertyType: 'Single Family Residence',
  status: 'For Sale',
  description:
    'Beautiful modern home featuring an open-concept layout, natural light throughout, modern finishes, and a spacious backyard perfect for entertaining. Move-in ready with stylish updates and premium finishes in a quiet neighborhood.',
  heroImage: '/src/assets/images/property_maple_exterior_1793879932362.jpg',
  images: [
    {
      url: '/src/assets/images/property_maple_exterior_1793879932362.jpg',
      caption: 'Front Exterior with Landscaped Yard & 2-Car Garage',
      tag: 'Exterior',
    },
    {
      url: '/src/assets/images/property_kitchen_quartz_1793879933333.jpg',
      caption: 'Gourmet Kitchen with Quartz Waterfall Countertops & Stainless Appliances',
      tag: 'Kitchen',
    },
    {
      url: '/src/assets/images/property_living_fireplace_1793879934056.jpg',
      caption: 'Spacious Sunlit Living Room with Contemporary Fireplace',
      tag: 'Living Room',
    },
    {
      url: '/src/assets/images/hero_luxury_home_1793879931818.jpg',
      caption: 'Architectural Rear View with Outdoor Entertainment Grounds',
      tag: 'Grounds',
    },
  ],
  amenities: [
    {
      category: 'Interior Highlights',
      items: [
        'Modern kitchen with quartz countertops and stainless steel appliances.',
        'Spacious living room with natural light and fireplace.',
        'Primary suite with walk-in closet and ensuite bathroom.',
        'Energy-efficient HVAC and new luxury vinyl flooring.',
      ],
    },
    {
      category: 'Exterior & Parking',
      items: [
        'Private backyard patio, ideal for outdoor entertaining.',
        'Attached 2-car garage with EV charger readiness.',
        'Fully fenced manicured backyard with drought-tolerant landscaping.',
        'Architectural asphalt shingle roof with high-reflectance underlayment.',
      ],
    },
    {
      category: 'Comfort & Efficiency',
      items: [
        'Smart dual-zone WiFi thermostat system.',
        'Dual-pane Low-E argon insulated windows throughout.',
        'Tankless continuous hot water heater.',
        'High-speed fiber optic broadband ready.',
      ],
    },
  ],
  specs: [
    { label: 'Property Type', value: 'Single Family' },
    { label: 'Bedrooms', value: '3 Beds' },
    { label: 'Bathrooms', value: '2 Full Baths' },
    { label: 'Living Area', value: '1,850 Sq Ft' },
    { label: 'Price / Sq Ft', value: '$229.73 / sq ft' },
    { label: 'Lot Size', value: '6,450 Sq Ft' },
    { label: 'Garage', value: '2-Car Attached (EV Ready)' },
    { label: 'Year Built', value: '2021' },
    { label: 'HOA Dues', value: 'None ($0/mo)' },
    { label: 'MLS ID', value: 'MLS# ZL-9823411' },
  ],
};

export const SARAH_JOHNSON: AgentInfo = {
  name: 'Sarah Johnson',
  title: 'Licensed Real Estate Agent',
  company: 'Zillow Real Estate',
  phone: '(555) 123-4567',
  email: 'kaylinpeter88@gmail.com',
  licenseNumber: 'DRE #02194830',
  image: '/src/assets/images/agent_sarah_johnson_1793879934014.jpg',
  bio: 'With over a decade of dedicated real estate advisory experience, Sarah Johnson brings unmatched local market expertise, fierce client advocacy, and an unwavering commitment to finding families their forever homes. Ranked among the Top 1% of Zillow Premier Agents, Sarah combines data-driven valuation models with genuine white-glove personal service.',
  experienceYears: 12,
  salesVolume: '$48M+',
  closedTransactions: 142,
  rating: 4.98,
  reviewCount: 78,
};

export const REVIEWS = [
  {
    author: 'Michael & Claire Sterling',
    role: 'Homeowners in Maple Glen',
    verified: true,
    content:
      'Sarah guided us through our purchase seamlessly. Her attention to detail, market honesty, and fast communication gave us total confidence from tour to keys.',
    rating: 5,
    date: '2 months ago',
  },
  {
    author: 'Elena Rostova',
    role: 'First-Time Homebuyer',
    verified: true,
    content:
      'As a first-time buyer, I was anxious about the contract and inspections. Sarah explained every single step, negotiated our repair credits, and was always available by phone or WhatsApp.',
    rating: 5,
    date: '3 months ago',
  },
  {
    author: 'Marcus Vance',
    role: 'Relocated Executive',
    verified: true,
    content:
      'Sarah’s knowledge of school districts, upcoming zoning, and true neighborhood value is second to none. She is the gold standard of real estate professionals.',
    rating: 5,
    date: '4 months ago',
  },
];
