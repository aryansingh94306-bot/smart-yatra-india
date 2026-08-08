export const APP_CONFIG = {
  name: 'SmartYatra India',
  tagline: 'One Platform. Every Journey.',
  developer: 'Aryan Singh',
  hackathon: 'Smart India Hackathon 2026',
  version: '1.0.0',
};

export const TRANSPORT_MODES = [
  { id: 'bus', label: 'Bus', icon: '🚌', color: 'orange' },
  { id: 'metro', label: 'Metro', icon: '🚇', color: 'blue' },
  { id: 'train', label: 'Train', icon: '🚂', color: 'green' },
  { id: 'auto', label: 'Auto', icon: '🛺', color: 'yellow' },
  { id: 'cab', label: 'Cab', icon: '🚗', color: 'purple' },
  { id: 'erickshaw', label: 'E-Rickshaw', icon: '🛺', color: 'pink' },
  { id: 'walking', label: 'Walking', icon: '🚶', color: 'gray' },
];

export const ROUTE_PREFERENCES = [
  { id: 'fastest', label: 'Fastest Route', icon: '⚡', description: 'Minimum travel time' },
  { id: 'cheapest', label: 'Cheapest Route', icon: '💰', description: 'Lowest fare' },
  { id: 'least_walking', label: 'Least Walking', icon: '🚶', description: 'Minimal walking distance' },
  { id: 'safest', label: 'Safest Route', icon: '🛡️', description: 'Well-lit, busy roads' },
  { id: 'accessible', label: 'Accessibility Friendly', icon: '♿', description: 'Wheelchair accessible' },
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const MAJOR_CITIES = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lng: 72.8311 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673 },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558 },
];

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  REFUNDED: 'refunded',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const USER_ROLES = {
  USER: 'user',
  DRIVER: 'driver',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_CANCELLED: 'booking_cancelled',
  BUS_ARRIVING: 'bus_arriving',
  DELAY_ALERT: 'delay_alert',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  PROMOTIONAL: 'promotional',
  EMERGENCY: 'emergency',
};

export const EMERGENCY_CONTACTS = [
  { name: 'Police', number: '100', icon: '🚔' },
  { name: 'Ambulance', number: '108', icon: '🚑' },
  { name: 'Fire', number: '101', icon: '🚒' },
  { name: 'Women Helpline', number: '1091', icon: '👩' },
  { name: 'Child Helpline', number: '1098', icon: '👶' },
  { name: 'Tourist Helpline', number: '1363', icon: '🧳' },
];