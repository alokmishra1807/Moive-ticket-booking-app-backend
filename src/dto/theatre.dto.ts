export interface CreateScreenDTO {
  theatreId: number;
  name: string;
  totalRows: number;
  totalColumns: number;
}

export interface CreateTheatreDTO {
  name: string;
  city: string;
  pin: string;
  address: string;
  screens: CreateScreenDTO[];
}

export type SeatType = 'NORMAL' | 'PREMIUM' | 'RECLINER';

export interface CreateSeatDTO {
  screenId: number;
  rowName: string;
  seatNumber: number;
  seatType: SeatType;
  isActive: boolean;
}