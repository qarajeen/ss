
export type ServiceType = 'photography' | 'videography' | '360tours' | 'postproduction' | 'timelapse';

export interface QuoteFormData {
  serviceType?: ServiceType;
  serviceSubtype?: string;
  duration?: string;
  eventDate?: string;
  location?: string;
  venue?: string;
  deliveryTime?: string;
  budget?: string;
  style?: string;
  selectedAddons?: string[];
  additionalHoursCount?: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  company?: string;
  hearAbout?: string;
  additionalNotes?: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface PricingDetails {
  base: PriceRange;
  addons: PriceRange;
  rush: PriceRange | null;
  total: PriceRange;
}