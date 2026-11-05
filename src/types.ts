export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  formattedPrice: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
  status: 'For Sale' | 'Pending' | 'Open House Soon';
  description: string;
  heroImage: string;
  images: {
    url: string;
    caption: string;
    tag: string;
  }[];
  amenities: {
    category: string;
    items: string[];
  }[];
  specs: {
    label: string;
    value: string;
  }[];
}

export interface AgentInfo {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  licenseNumber: string;
  image: string;
  bio: string;
  experienceYears: number;
  salesVolume: string;
  closedTransactions: number;
  rating: number;
  reviewCount: number;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyAddress: string;
  recipientEmail: string;
  status: 'delivered' | 'read' | 'replied';
  createdAt: string;
  source: 'contact_form' | 'open_house_rsvp' | 'tour_schedule';
}

export interface SiteSettings {
  openHouseDate: string;
  openHouseTime: string;
  openHouseStatus: string;
  whatsappPhone: string;
  agentPhone: string;
  agentEmail: string;
  featuredPrice: string;
  propertyAddress: string;
}
