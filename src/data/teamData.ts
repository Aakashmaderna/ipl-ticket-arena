
export interface Team {
  id: string;
  name: string;
  shortName: string;
  abbr: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
}

export const teamData: Team[] = [
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "Chennai",
    abbr: "CSK",
    primaryColor: "#FFFF00",
    secondaryColor: "#0080C8",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png"
  },
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "Mumbai",
    abbr: "MI",
    primaryColor: "#004BA0",
    secondaryColor: "#D1AB3E",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png"
  },
  {
    id: "rcb",
    name: "Royal Challengers Bangalore",
    shortName: "Bangalore",
    abbr: "RCB",
    primaryColor: "#EC1C24",
    secondaryColor: "#000000",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png"
  },
  {
    id: "gt",
    name: "Gujarat Titans",
    shortName: "Gujarat",
    abbr: "GT",
    primaryColor: "#1C1C1C",
    secondaryColor: "#0085CA",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GTmedium.png"
  },
  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    shortName: "Hyderabad",
    abbr: "SRH",
    primaryColor: "#F7A721",
    secondaryColor: "#F05323",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png"
  },
  {
    id: "rr",
    name: "Rajasthan Royals",
    shortName: "Rajasthan",
    abbr: "RR",
    primaryColor: "#254AA5",
    secondaryColor: "#EB5E88",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png"
  },
  {
    id: "lsg",
    name: "Lucknow Super Giants",
    shortName: "Lucknow",
    abbr: "LSG",
    primaryColor: "#A72056",
    secondaryColor: "#FFCC00",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSGmedium.png"
  },
  {
    id: "dc",
    name: "Delhi Capitals",
    shortName: "Delhi",
    abbr: "DC",
    primaryColor: "#0078BC",
    secondaryColor: "#EF1C25",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png"
  },
  {
    id: "pbks",
    name: "Punjab Kings",
    shortName: "Punjab",
    abbr: "PBKS",
    primaryColor: "#ED1B24",
    secondaryColor: "#A3A3A3",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png"
  },
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "Kolkata",
    abbr: "KKR",
    primaryColor: "#3A225D",
    secondaryColor: "#D4AF37",
    logo: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png"
  }
];

export const getTeamById = (id: string): Team | undefined => {
  return teamData.find(team => team.id === id);
};
