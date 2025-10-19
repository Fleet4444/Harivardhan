export enum View {
  DASHBOARD = 'dashboard',
  MARKETPLACE = 'marketplace',
  COMMUNITY = 'community',
  QUIZ = 'quiz',
  LEADERBOARD = 'leaderboard',
  CERTIFICATES = 'certificates',
  PROFILE = 'profile',
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum VerificationStatus {
  VERIFIED = 'Verified',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  NOT_APPLIED = 'Not Applied',
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  bio: string;
  points: number;
  skills: string[];
  joinDate: string;
  verificationStatus: VerificationStatus;
  rejectionReason?: string;
  achievements: {
    coursesCompleted: number;
    leaderboardRank: number | null;
  }
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CareerSuggestion {
  title: string;
  description: string;
}

export interface RecommendedSkill {
  skill: string;
  reason: string;
}

export interface EthicalTip {
  tip: string;
  explanation: string;
}

export interface CareerQuizResult {
  suggestedCareers: CareerSuggestion[];
  recommendedSkills: RecommendedSkill[];
  ethicalTips: EthicalTip[];
}

export interface Course {
  id: string;
  title: string;
  instructorId: string;
  level: SkillLevel;
  duration: string;
  imageUrl: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
}

export interface CommunityPost {
    id: string;
    authorId: string;
    text: string;
    imageUrl: string;
    likes: number;
}

export interface Product {
    id: string;
    name: string;
    sellerId: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviews: number;
}

export interface LeaderboardEntry {
    rank: number;
    user: User;
    points: number;
}

export interface Certificate {
    id: string;
    courseTitle: string;
    studentName: string;
    instructorName: string;
    completionDate: string;
}