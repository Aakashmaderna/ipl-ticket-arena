
import { getTeamById } from './teamData';
import { getVenueById } from './venueData';

export type TicketCategory = 'General' | 'Premium' | 'Executive' | 'VIP';

export interface TicketType {
  id: string;
  name: TicketCategory;
  price: number;
  available: number;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  venueId: string;
  date: string; // ISO string
  time: string;
  tickets: TicketType[];
  isFeatured?: boolean;
  isUpcoming?: boolean;
}

export const ticketCategories: Record<TicketCategory, { minPrice: number; maxPrice: number }> = {
  'General': { minPrice: 800, maxPrice: 1500 },
  'Premium': { minPrice: 1800, maxPrice: 3500 },
  'Executive': { minPrice: 4000, maxPrice: 7000 },
  'VIP': { minPrice: 8000, maxPrice: 15000 }
};

export const matchData: Match[] = [
  {
    id: "m1",
    homeTeamId: "csk",
    awayTeamId: "mi",
    venueId: "chidambaram",
    date: "2025-04-12",
    time: "19:30",
    tickets: [
      { id: "t1", name: "General", price: 1000, available: 5000 },
      { id: "t2", name: "Premium", price: 2500, available: 2000 },
      { id: "t3", name: "Executive", price: 5000, available: 500 },
      { id: "t4", name: "VIP", price: 10000, available: 100 }
    ],
    isFeatured: true,
    isUpcoming: true
  },
  {
    id: "m2",
    homeTeamId: "rcb",
    awayTeamId: "gt",
    venueId: "chinnasw",
    date: "2025-04-13",
    time: "15:30",
    tickets: [
      { id: "t5", name: "General", price: 1200, available: 4500 },
      { id: "t6", name: "Premium", price: 3000, available: 1800 },
      { id: "t7", name: "Executive", price: 6000, available: 400 },
      { id: "t8", name: "VIP", price: 12000, available: 80 }
    ],
    isFeatured: true,
    isUpcoming: true
  },
  {
    id: "m3",
    homeTeamId: "kkr",
    awayTeamId: "dc",
    venueId: "eden",
    date: "2025-04-15",
    time: "19:30",
    tickets: [
      { id: "t9", name: "General", price: 900, available: 6000 },
      { id: "t10", name: "Premium", price: 2200, available: 2500 },
      { id: "t11", name: "Executive", price: 4500, available: 600 },
      { id: "t12", name: "VIP", price: 9000, available: 120 }
    ],
    isUpcoming: true
  },
  {
    id: "m4",
    homeTeamId: "srh",
    awayTeamId: "pbks",
    venueId: "uppal",
    date: "2025-04-17",
    time: "19:30",
    tickets: [
      { id: "t13", name: "General", price: 800, available: 5500 },
      { id: "t14", name: "Premium", price: 2000, available: 2200 },
      { id: "t15", name: "Executive", price: 4200, available: 550 },
      { id: "t16", name: "VIP", price: 8500, available: 90 }
    ],
    isUpcoming: true
  },
  {
    id: "m5",
    homeTeamId: "lsg",
    awayTeamId: "rr",
    venueId: "brabourne",
    date: "2025-04-19",
    time: "15:30",
    tickets: [
      { id: "t17", name: "General", price: 1100, available: 4000 },
      { id: "t18", name: "Premium", price: 2800, available: 1600 },
      { id: "t19", name: "Executive", price: 5500, available: 350 },
      { id: "t20", name: "VIP", price: 11000, available: 70 }
    ],
    isUpcoming: true
  },
  {
    id: "m6",
    homeTeamId: "mi",
    awayTeamId: "rcb",
    venueId: "wankhede",
    date: "2025-04-20",
    time: "19:30",
    tickets: [
      { id: "t21", name: "General", price: 1500, available: 4800 },
      { id: "t22", name: "Premium", price: 3500, available: 2100 },
      { id: "t23", name: "Executive", price: 7000, available: 450 },
      { id: "t24", name: "VIP", price: 15000, available: 95 }
    ],
    isFeatured: true,
    isUpcoming: true
  },
  {
    id: "m7",
    homeTeamId: "dc",
    awayTeamId: "csk",
    venueId: "arun_jaitley",
    date: "2025-04-21",
    time: "19:30",
    tickets: [
      { id: "t25", name: "General", price: 1200, available: 5200 },
      { id: "t26", name: "Premium", price: 2700, available: 1900 },
      { id: "t27", name: "Executive", price: 5200, available: 480 },
      { id: "t28", name: "VIP", price: 9500, available: 110 }
    ],
    isUpcoming: true
  },
  {
    id: "m8",
    homeTeamId: "gt",
    awayTeamId: "kkr",
    venueId: "narendra_modi",
    date: "2025-04-23",
    time: "19:30",
    tickets: [
      { id: "t29", name: "General", price: 900, available: 7000 },
      { id: "t30", name: "Premium", price: 2300, available: 3000 },
      { id: "t31", name: "Executive", price: 4800, available: 700 },
      { id: "t32", name: "VIP", price: 10000, available: 150 }
    ],
    isUpcoming: true
  }
];

export const getMatchById = (id: string): Match | undefined => {
  return matchData.find(match => match.id === id);
};

export const getFormattedMatch = (match: Match) => {
  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);
  const venue = getVenueById(match.venueId);
  
  return {
    ...match,
    homeTeam,
    awayTeam,
    venue
  };
};

export const getFeaturedMatches = () => {
  return matchData
    .filter(match => match.isFeatured)
    .map(getFormattedMatch);
};

export const getUpcomingMatches = () => {
  return matchData
    .filter(match => match.isUpcoming)
    .map(getFormattedMatch);
};
