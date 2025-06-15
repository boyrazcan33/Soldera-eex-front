export interface Auction {
  id: number;
  auctionDate: string;
  productionMonth: string;
  reservePrice: number;
  createdAt: string;
  regions: AuctionRegion[];
  technologies: AuctionTechnology[];
}

export interface AuctionRegion {
  id: number;
  regionName: string;
  volumeOffered: number;
  volumeAllocated: number;
  weightedAvgPrice: number;
  createdAt: string;
}

export interface AuctionTechnology {
  id: number;
  technologyType: string;
  volumeOffered: number;
  volumeAllocated: number;
  weightedAvgPrice: number;
  createdAt: string;
}

export interface Stats {
  totalAuctions: number;
  latestAuctionDate?: string;
  latestProductionMonth?: string;
  regionsCount?: number;
  technologiesCount?: number;
}