// User & Authentication Types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
  preferences?: UserPreferences;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: Address;
  emergencyContact?: EmergencyContact;
  loyaltyPoints: number;
  walletBalance: number;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: NotificationPreferences;
  travelPreferences: TravelPreferences;
  accessibility: AccessibilityPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  bookingUpdates: boolean;
  promotions: boolean;
  emergencyAlerts: boolean;
}

export interface TravelPreferences {
  preferredModes: TransportMode[];
  maxWalkingDistance: number; // in meters
  avoidTolls: boolean;
  preferAC: boolean;
  seatPreference: 'window' | 'aisle' | 'any';
}

export interface AccessibilityPreferences {
  wheelchairAccessible: boolean;
  audioGuidance: boolean;
  highContrast: boolean;
  largeText: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  coordinates?: GeoCoordinates;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export type UserRole = 'user' | 'driver' | 'admin' | 'super_admin';

// Transport Types
export type TransportMode = 'bus' | 'metro' | 'train' | 'auto' | 'cab' | 'erickshaw' | 'walking';

export interface TransportOption {
  id: string;
  mode: TransportMode;
  operator: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: number;
  amenities: string[];
  rating: number;
  isActive: boolean;
  location?: GeoCoordinates;
}

export interface Route {
  id: string;
  name: string;
  from: Location;
  to: Location;
  distance: number; // km
  estimatedDuration: number; // minutes
  fare: FareBreakdown;
  stops: Stop[];
  transportModes: TransportMode[];
  operatorId: string;
  schedule: Schedule[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  name: string;
  type: 'city' | 'village' | 'bus_stop' | 'metro_station' | 'railway_station' | 'airport' | 'landmark';
  address: string;
  coordinates: GeoCoordinates;
  state: string;
  district: string;
  pincode?: string;
  facilities?: string[];
  isActive: boolean;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface Stop {
  id: string;
  locationId: string;
  locationName: string;
  sequence: number;
  arrivalTime?: string;
  departureTime?: string;
  isBoarding: boolean;
  isAlighting: boolean;
  fareFromStart: number;
  coordinates: GeoCoordinates;
}

export interface Schedule {
  id: string;
  routeId: string;
  transportId: string;
  days: number[]; // 0-6 (Sun-Sat)
  departureTime: string;
  arrivalTime: string;
  frequency: 'daily' | 'weekdays' | 'weekends' | 'custom';
  validFrom: Date;
  validTo?: Date;
  isActive: boolean;
}

export interface FareBreakdown {
  baseFare: number;
  tax: number;
  convenienceFee: number;
  discount: number;
  total: number;
  currency: string;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  routeId: string;
  scheduleId: string;
  transportId: string;
  passengers: Passenger[];
  seats: Seat[];
  fare: FareBreakdown;
  payment: Payment;
  status: BookingStatus;
  bookingDate: Date;
  travelDate: Date;
  pnr: string;
  qrCode: string;
  cancellation?: CancellationDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNumber?: string;
  idProof?: IdProof;
  isPrimary: boolean;
}

export interface IdProof {
  type: 'aadhaar' | 'pan' | 'passport' | 'driving_license' | 'voter_id';
  number: string;
}

export interface Seat {
  number: string;
  deck: 'lower' | 'upper';
  type: 'window' | 'aisle' | 'sleeper' | 'seater';
  fare: number;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  gatewayResponse?: Record<string, unknown>;
  paidAt?: Date;
  refundedAt?: Date;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface CancellationDetails {
  cancelledAt: Date;
  reason: string;
  refundAmount: number;
  refundStatus: PaymentStatus;
  cancelledBy: 'user' | 'operator' | 'system';
}

// Tracking Types
export interface LiveTracking {
  bookingId: string;
  transportId: string;
  currentLocation: GeoCoordinates;
  currentSpeed: number; // km/h
  heading: number; // degrees
  nextStop: Stop;
  etaToNextStop: number; // minutes
  etaToDestination: number; // minutes
  distanceCovered: number; // km
  distanceRemaining: number; // km
  status: TrackingStatus;
  lastUpdated: Date;
  trafficStatus: TrafficStatus;
  delays: Delay[];
}

export type TrackingStatus = 'not_started' | 'in_progress' | 'delayed' | 'arrived' | 'cancelled';

export interface TrafficStatus {
  level: 'light' | 'moderate' | 'heavy' | 'severe';
  description: string;
  delayMinutes: number;
}

export interface Delay {
  stopId: string;
  stopName: string;
  scheduledTime: string;
  estimatedTime: string;
  delayMinutes: number;
  reason: string;
}

// AI Types
export interface AIRecommendation {
  type: 'route' | 'booking' | 'travel' | 'hotel' | 'emergency';
  title: string;
  description: string;
  confidence: number; // 0-1
  data: Record<string, unknown>;
  action?: AIAction;
}

export interface AIAction {
  label: string;
  type: 'navigate' | 'book' | 'call' | 'chat' | 'external';
  payload: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface VoiceCommand {
  transcript: string;
  intent: string;
  entities: Record<string, unknown>;
  confidence: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  sentAt: Date;
  readAt?: Date;
  actionUrl?: string;
}

// Analytics Types
export interface AnalyticsEvent {
  eventName: string;
  userId?: string;
  properties: Record<string, unknown>;
  timestamp: Date;
  sessionId: string;
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  onTimePerformance: number;
  popularRoutes: RouteMetric[];
  revenueByMode: Record<TransportMode, number>;
  bookingsByDate: DateMetric[];
}

export interface RouteMetric {
  routeId: string;
  routeName: string;
  bookings: number;
  revenue: number;
  occupancyRate: number;
}

export interface DateMetric {
  date: string;
  bookings: number;
  revenue: number;
  users: number;
}

// Admin Types
export interface Bus {
  id: string;
  operatorId: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: number;
  amenities: string[];
  registrationNumber: string;
  insuranceExpiry: Date;
  fitnessExpiry: Date;
  permitExpiry: Date;
  gpsDeviceId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Driver {
  id: string;
  userId: string;
  operatorId: string;
  licenseNumber: string;
  licenseExpiry: Date;
  badgeNumber: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
  isActive: boolean;
  assignedBusId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Operator {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  gstNumber: string;
  licenseNumber: string;
  rating: number;
  totalBuses: number;
  totalRoutes: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Wallet Types
export interface Wallet {
  userId: string;
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
  updatedAt: Date;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  referenceId?: string;
  referenceType?: 'booking' | 'refund' | 'reward' | 'topup' | 'withdrawal';
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

// Rewards Types
export interface Reward {
  id: string;
  userId: string;
  type: 'points' | 'cashback' | 'discount' | 'free_ride';
  value: number;
  description: string;
  source: 'booking' | 'referral' | 'promotion' | 'loyalty' | 'achievement';
  isRedeemed: boolean;
  expiresAt?: Date;
  createdAt: Date;
  redeemedAt?: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: ApiMeta;
}

// Form Types
export interface JourneySearchForm {
  from: string;
  to: string;
  date: string;
  passengers: number;
  transportModes: TransportMode[];
  preferences: RoutePreference[];
}

export type RoutePreference = 'fastest' | 'cheapest' | 'least_walking' | 'safest' | 'accessible';

export interface BookingForm {
  routeId: string;
  scheduleId: string;
  passengers: PassengerForm[];
  seats: string[];
  paymentMethod: PaymentMethod;
  applyWallet: boolean;
  promoCode?: string;
}

export interface PassengerForm {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatPreference: 'window' | 'aisle' | 'any';
  idProofType?: IdProof['type'];
  idProofNumber?: string;
}

// Map Types
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapMarker {
  id: string;
  position: GeoCoordinates;
  type: 'bus' | 'stop' | 'user' | 'destination' | 'emergency';
  label: string;
  data?: Record<string, unknown>;
}

export interface RouteGeometry {
  coordinates: GeoCoordinates[];
  distance: number;
  duration: number;
  instructions: NavigationInstruction[];
}

export interface NavigationInstruction {
  step: number;
  instruction: string;
  distance: number;
  duration: number;
  maneuver: string;
  coordinates: GeoCoordinates;
}

// Error Boundary Types
export interface ErrorInfo {
  componentStack: string;
  error: Error;
  errorBoundary: string;
  timestamp: Date;
}