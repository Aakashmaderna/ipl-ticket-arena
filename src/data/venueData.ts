
export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  image: string;
}

export const venueData: Venue[] = [
  {
    id: "wankhede",
    name: "Wankhede Stadium",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    capacity: 33108,
    image: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644843898_wankhede-stadium.jpg"
  },
  {
    id: "chidambaram",
    name: "MA Chidambaram Stadium",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    capacity: 50000,
    image: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644846280_ma-chidambaram-stadium-chennai.jpg"
  },
  {
    id: "chinnasw",
    name: "M. Chinnaswamy Stadium",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    capacity: 40000,
    image: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644843724_m-chinnaswamy-stadium.jpg"
  },
  {
    id: "narendra_modi",
    name: "Narendra Modi Stadium",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    capacity: 132000,
    image: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644844022_narendra-modi-stadium.jpg"
  },
  {
    id: "eden",
    name: "Eden Gardens",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    capacity: 68000,
    image: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644844207_eden-gardens.jpg"
  },
  {
    id: "arun_jaitley",
    name: "Arun Jaitley Stadium",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    capacity: 41000,
    image: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644845292_arun-jaitley-stadium.jpg"
  },
  {
    id: "uppal",
    name: "Rajiv Gandhi Stadium",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    capacity: 55000,
    image: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644846361_rajiv-gandhi-international-stadium-hyderabad.jpg"
  },
  {
    id: "brabourne",
    name: "Brabourne Stadium",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    capacity: 20000,
    image: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/bcci/images/1644846428_brabourne-stadium-mumbai.jpg"
  }
];

export const getVenueById = (id: string): Venue | undefined => {
  return venueData.find(venue => venue.id === id);
};
