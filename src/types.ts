/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'requester' | 'companion' | 'both' | 'none';

export type KYCStatus = 'pending' | 'verified' | 'rejected' | 'not_started';

export interface User {
  id: string;
  phone?: string;
  phoneVerified?: boolean;
  fullName: string;
  email: string;
  role: UserRole;
  kycStatus: KYCStatus;
  ratingAvg: number;
  ratingCount: number;
  avatarUrl?: string;
  bio?: string;
  languages?: string[];
  createdAt: string;
}

export interface CaretakingProfile {
  id: string;
  requesterId: string;
  fullName: string;
  birthDate: string;
  relationship: string;
  specialNeeds?: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
}

export type TripStatus = 'open' | 'matched' | 'completed' | 'cancelled';

export interface Trip {
  id: string;
  requesterId: string;
  caretakingProfileId: string;
  originAirport: string; // IATA code
  destinationAirport: string; // IATA code
  flightDate: string;
  flightDateEnd?: string | null;
  isDateRange?: boolean;
  flightNumber?: string;
  careRequirements: {
    sideBySide: boolean;
    assistMeal: boolean;
    assistToilet: boolean;
    assistImmigration: boolean;
    handoffAtDestination: boolean;
  };
  specialInstructions?: string;
  budgetMin: number;
  budgetMax: number;
  status: TripStatus;
  createdAt: string;
}

export type MatchStatus = 'pending' | 'confirmed' | 'completed' | 'disputed';

export interface Match {
  id: string;
  tripId: string;
  companionId: string;
  agreedFee: number;
  status: MatchStatus;
  depositPaidAt?: string;
  balancePaidAt?: string;
  checkInAt?: string;
  handoffAt?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  matchId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}
