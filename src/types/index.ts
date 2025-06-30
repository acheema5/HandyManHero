export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  userType: 'customer' | 'professional' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends User {
  userType: 'customer';
  address: string;
  jobs: Job[];
}

export interface Professional extends User {
  userType: 'professional';
  businessName: string;
  licenseNumber: string;
  insuranceNumber: string;
  serviceCategories: ServiceCategory[];
  isApproved: boolean;
  rating: number;
  totalReviews: number;
  completedJobs: Job[];
  earnings: number;
}

export interface Job {
  id: string;
  customerId: string;
  professionalId?: string;
  serviceCategory: ServiceCategory;
  description: string;
  photos: string[];
  address: string;
  preferredDate: Date;
  status: JobStatus;
  finalPrice?: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  rating?: number;
  review?: string;
}

export type ServiceCategory = 'HVAC' | 'Gutter Cleaning' | 'Plumbing' | 'Electrical' | 'General Handyman';

export type JobStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface Message {
  id: string;
  jobId: string;
  senderId: string;
  senderType: 'customer' | 'professional';
  content: string;
  timestamp: Date;
}

export interface Payment {
  id: string;
  jobId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  stripePaymentIntentId?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'job_accepted' | 'job_completed' | 'payment_received' | 'new_message';
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  isLoading: boolean;
  error: string | null;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  jobs: JobState;
  chat: ChatState;
} 