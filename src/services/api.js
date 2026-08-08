// API Service Layer - Centralized API communication
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const AI_API_BASE_URL = import.meta.env.VITE_AI_API_BASE_URL || 'https://openrouter.ai/api/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  skipAuth?: boolean;
  skipErrorToast?: boolean;
}

class ApiService {
  private baseURL: string;
  private aiBaseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.aiBaseURL = AI_API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  private buildAIUrl(endpoint: string): string {
    return `${this.aiBaseURL}${endpoint}`;
  }

  private async getAuthToken(): Promise<string | null> {
    // Get token from Firebase auth
    const { auth } = await import('../services/firebase');
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, skipAuth, skipErrorToast, headers, ...fetchOptions } = options;
    
    const url = this.buildUrl(endpoint, params);
    const token = skipAuth ? null : await this.getAuthToken();
    
    const requestHeaders: HeadersInit = {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: requestHeaders,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.message || `HTTP error! status: ${response.status}`);
        (error as any).status = response.status;
        (error as any).data = data;
        throw error;
      }

      return data;
    } catch (error) {
      if (!skipErrorToast) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        toast.error(message);
      }
      throw error;
    }
  }

  private async aiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { headers, ...fetchOptions } = options;
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    const requestHeaders: HeadersInit = {
      ...this.defaultHeaders,
      ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
      'HTTP-Referer': window.location.origin,
      'X-Title': 'SmartYatra India',
      ...headers,
    };

    try {
      const response = await fetch(this.buildAIUrl(endpoint), {
        ...fetchOptions,
        headers: requestHeaders,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.error?.message || `AI API error! status: ${response.status}`);
        (error as any).status = response.status;
        (error as any).data = data;
        throw error;
      }

      return data;
    } catch (error) {
      if (!options.skipErrorToast) {
        const message = error instanceof Error ? error.message : 'AI request failed';
        toast.error(message);
      }
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, string>, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET', params });
  }

  // POST request
  async post<T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
  }

  // PUT request
  async put<T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
  }

  // PATCH request
  async patch<T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) });
  }

  // DELETE request
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // AI Chat Completion
  async chatCompletion(messages: Array<{ role: string; content: string }>, options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
  }) {
    return this.aiRequest('/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: options?.model || 'openai/gpt-4o-mini',
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2000,
        stream: options?.stream ?? false,
      }),
    });
  }

  // AI Streaming Chat
  async *streamChatCompletion(messages: Array<{ role: string; content: string }>, options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }): AsyncGenerator<string> {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    const response = await fetch(this.buildAIUrl('/chat/completions'), {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'SmartYatra India',
      },
      body: JSON.stringify({
        model: options?.model || 'openai/gpt-4o-mini',
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2000,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Stream failed');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) yield content;
            } catch {
              // Ignore parse errors
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

// Singleton instance
export const api = new ApiService();

// API Endpoints
export const endpoints = {
  // Auth
  auth: {
    me: '/auth/me',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },

  // Users
  users: {
    list: '/users',
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    profile: '/users/profile',
    preferences: '/users/preferences',
    wallet: '/users/wallet',
    addWalletBalance: '/users/wallet/add',
    transactions: '/users/transactions',
    savedPlaces: '/users/saved-places',
    addSavedPlace: '/users/saved-places',
    removeSavedPlace: (id: string) => `/users/saved-places/${id}`,
    notifications: '/users/notifications',
    markNotificationRead: (id: string) => `/users/notifications/${id}/read`,
    markAllNotificationsRead: '/users/notifications/read-all',
  },

  // Bookings
  bookings: {
    list: '/bookings',
    create: '/bookings',
    get: (id: string) => `/bookings/${id}`,
    cancel: (id: string) => `/bookings/${id}/cancel`,
    ticket: (id: string) => `/bookings/${id}/ticket`,
    pdf: (id: string) => `/bookings/${id}/pdf`,
    invoice: (id: string) => `/bookings/${id}/invoice`,
    upcoming: '/bookings/upcoming',
    history: '/bookings/history',
  },

  // Routes
  routes: {
    list: '/routes',
    search: '/routes/search',
    get: (id: string) => `/routes/${id}`,
    schedules: (id: string) => `/routes/${id}/schedules`,
    nearby: '/routes/nearby',
    popular: '/routes/popular',
    fare: '/routes/fare',
  },

  // Buses
  buses: {
    list: '/buses',
    get: (id: string) => `/buses/${id}`,
    liveTracking: (id: string) => `/buses/${id}/tracking`,
    nearby: '/buses/nearby',
    seats: (id: string) => `/buses/${id}/seats`,
    schedule: (id: string) => `/buses/${id}/schedule`,
  },

  // Drivers
  drivers: {
    list: '/drivers',
    get: (id: string) => `/drivers/${id}`,
    location: (id: string) => `/drivers/${id}/location`,
    trips: (id: string) => `/drivers/${id}/trips`,
    earnings: (id: string) => `/drivers/${id}/earnings`,
  },

  // Payments
  payments: {
    createOrder: '/payments/create-order',
    verify: '/payments/verify',
    refund: '/payments/refund',
    methods: '/payments/methods',
    wallet: '/payments/wallet',
    addWalletMoney: '/payments/wallet/add',
  },

  // AI
  ai: {
    chat: '/ai/chat',
    journeyPlan: '/ai/journey-plan',
    recommendations: '/ai/recommendations',
    voiceSearch: '/ai/voice-search',
    nearbyPlaces: '/ai/nearby-places',
    emergency: '/ai/emergency',
    hotels: '/ai/hotels',
    weather: '/ai/weather',
    delayPrediction: '/ai/delay-prediction',
  },

  // Notifications
  notifications: {
    send: '/notifications/send',
    broadcast: '/notifications/broadcast',
    templates: '/notifications/templates',
  },

  // Analytics
  analytics: {
    dashboard: '/analytics/dashboard',
    events: '/analytics/events',
    track: '/analytics/track',
    reports: '/analytics/reports',
  },

  // Admin
  admin: {
    users: '/admin/users',
    drivers: '/admin/drivers',
    buses: '/admin/buses',
    routes: '/admin/routes',
    bookings: '/admin/bookings',
    payments: '/admin/payments',
    revenue: '/admin/revenue',
    analytics: '/admin/analytics',
  },

  // Emergency
  emergency: {
    contacts: '/emergency/contacts',
    sos: '/emergency/sos',
    nearby: '/emergency/nearby',
  },

  // Maps
  maps: {
    geocode: '/maps/geocode',
    reverseGeocode: '/maps/reverse-geocode',
    directions: '/maps/directions',
    nearbyPlaces: '/maps/nearby-places',
    traffic: '/maps/traffic',
  },
};

export default api;