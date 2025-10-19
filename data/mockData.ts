import { User, Course, SkillLevel, CommunityPost, Product, LeaderboardEntry, Certificate, VerificationStatus } from '../types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alex Doe',
    avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe',
    email: 'alex.doe@example.com',
    bio: 'Lifelong learner and aspiring artisan. Passionate about sustainable crafts and community building.',
    points: 4950,
    skills: ['Pottery', 'Woodworking', 'Digital Marketing'],
    joinDate: '2023-05-12',
    verificationStatus: VerificationStatus.PENDING,
    achievements: { coursesCompleted: 2, leaderboardRank: 3 }
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    avatarUrl: 'https://i.pravatar.cc/150?u=janesmith',
    email: 'jane.smith@example.com',
    bio: 'Pottery enthusiast and small business owner.',
    points: 4500,
    skills: ['Pottery', 'Glazing'],
    joinDate: '2023-02-20',
    verificationStatus: VerificationStatus.VERIFIED,
    achievements: { coursesCompleted: 1, leaderboardRank: 4 }
  },
  {
    id: 'user-3',
    name: 'Sam Wilson',
    avatarUrl: 'https://i.pravatar.cc/150?u=samwilson',
    email: 'sam.wilson@example.com',
    bio: 'Master craftsman specializing in custom furniture.',
    points: 5820,
    skills: ['Woodworking', 'Joinery', 'Finishing'],
    joinDate: '2022-11-01',
    verificationStatus: VerificationStatus.VERIFIED,
    achievements: { coursesCompleted: 4, leaderboardRank: 1 }
  },
  {
    id: 'user-4',
    name: 'Priya Sharma',
    avatarUrl: 'https://i.pravatar.cc/150?u=priyasharma',
    email: 'priya.sharma@example.com',
    bio: 'Digital marketer helping artisans grow their online presence.',
    points: 3800,
    skills: ['SEO', 'Social Media', 'E-commerce'],
    joinDate: '2023-08-01',
    verificationStatus: VerificationStatus.VERIFIED,
    achievements: { coursesCompleted: 1, leaderboardRank: 5 }
  },
  {
      id: 'user-5',
      name: 'Maria Garcia',
      avatarUrl: 'https://i.pravatar.cc/150?u=mariagarcia',
      email: 'maria.garcia@example.com',
      bio: 'Renowned pottery artist and instructor with over 15 years of experience.',
      points: 3200,
      skills: ['Pottery', 'Sculpture', 'Teaching'],
      joinDate: '2021-03-15',
      verificationStatus: VerificationStatus.VERIFIED,
      achievements: { coursesCompleted: 10, leaderboardRank: 8 }
  },
  {
      id: 'user-6',
      name: 'David Chen',
      avatarUrl: 'https://i.pravatar.cc/150?u=davidchen',
      email: 'david.chen@example.com',
      bio: 'Woodworking expert known for intricate and modern designs.',
      points: 4100,
      skills: ['Woodworking', 'Furniture Design'],
      joinDate: '2022-01-10',
      verificationStatus: VerificationStatus.VERIFIED,
      achievements: { coursesCompleted: 6, leaderboardRank: 6 }
  },
  {
      id: 'user-7',
      name: 'Ben Carter',
      avatarUrl: 'https://i.pravatar.cc/150?u=bencarter',
      email: 'ben.carter@example.com',
      bio: 'Urban beekeeper and advocate for sustainable city living.',
      points: 2900,
      skills: ['Beekeeping', 'Gardening'],
      joinDate: '2023-09-05',
      verificationStatus: VerificationStatus.REJECTED,
      rejectionReason: 'Incomplete application. Please provide proof of apiary registration.',
      achievements: { coursesCompleted: 1, leaderboardRank: 12 }
  },
   {
      id: 'user-8',
      name: 'Chloe Dubois',
      avatarUrl: 'https://i.pravatar.cc/150?u=chloedubois',
      email: 'chloe.dubois@example.com',
      bio: 'Passionate baker and sourdough perfectionist.',
      points: 5100,
      skills: ['Baking', 'Sourdough', 'Pastry'],
      joinDate: '2023-04-22',
      verificationStatus: VerificationStatus.VERIFIED,
      achievements: { coursesCompleted: 3, leaderboardRank: 2 }
  },
  {
      id: 'user-9',
      name: 'Kenji Tanaka',
      avatarUrl: 'https://i.pravatar.cc/150?u=kenjitanaka',
      email: 'kenji.tanaka@example.com',
      bio: 'Creative coder and digital artist.',
      points: 3500,
      skills: ['JavaScript', 'p5.js', 'Creative Coding'],
      joinDate: '2022-08-19',
      verificationStatus: VerificationStatus.NOT_APPLIED,
      achievements: { coursesCompleted: 2, leaderboardRank: 9 }
  }
];

export const currentUser = users.find(u => u.id === 'user-1')!;

export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Pottery',
    instructorId: 'user-5',
    level: SkillLevel.BEGINNER,
    duration: '4 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1557995735-32a5183a81c4?q=80&w=800',
    description: 'Learn the basics of pottery, from clay preparation to wheel throwing and glazing.',
    rating: 4.8,
    reviews: 124,
    price: 550,
  },
  {
    id: 'course-2',
    title: 'Advanced Woodworking Techniques',
    instructorId: 'user-6',
    level: SkillLevel.ADVANCED,
    duration: '8 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1620788506185-3c0296f8a802?q=80&w=800',
    description: 'Master complex joinery, finishing, and design principles in woodworking.',
    rating: 4.9,
    reviews: 210,
    price: 800,
  },
  {
    id: 'course-3',
    title: 'Digital Marketing for Artisans',
    instructorId: 'user-4',
    level: SkillLevel.INTERMEDIATE,
    duration: '6 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=800',
    description: 'Grow your craft business with social media marketing, SEO, and e-commerce strategies.',
    rating: 4.7,
    reviews: 180,
    price: 700,
  },
   {
    id: 'course-4',
    title: 'Urban Beekeeping Basics',
    instructorId: 'user-7',
    level: SkillLevel.BEGINNER,
    duration: '3 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1587329349911-89df17743905?q=80&w=800',
    description: 'Discover the sweet world of beekeeping, from hive setup to honey harvesting.',
    rating: 4.9,
    reviews: 95,
    price: 500,
  },
  {
    id: 'course-5',
    title: 'Intermediate Sourdough Baking',
    instructorId: 'user-8',
    level: SkillLevel.INTERMEDIATE,
    duration: '5 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=800',
    description: 'Perfect your sourdough starter, shaping techniques, and achieve the perfect crust.',
    rating: 4.8,
    reviews: 152,
    price: 700,
  },
  {
    id: 'course-6',
    title: 'Creative Coding with p5.js',
    instructorId: 'user-9',
    level: SkillLevel.ADVANCED,
    duration: '10 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1550063873-ab792950096b?q=80&w=800',
    description: 'Create interactive art and data visualizations with the p5.js JavaScript library.',
    rating: 4.9,
    reviews: 250,
    price: 800,
  },
];

export const quizQuestions = [
    {
        question: "Which of these activities sounds most appealing?",
        options: ["Working with my hands to create something tangible.", "Solving complex problems with logic and data.", "Connecting with people and helping them.", "Expressing my creativity through visual arts."]
    },
    {
        question: "How do you prefer to learn?",
        options: ["Through structured, step-by-step instructions.", "By experimenting and figuring things out on my own.", "In a collaborative group setting.", "By observing and imitating an expert."]
    },
    {
        question: "What kind of impact do you want to have?",
        options: ["Create beautiful and useful objects for others.", "Build efficient systems that make life easier.", "Support and empower my local community.", "Inspire others with new ideas and perspectives."]
    },
    {
        question: "What is your ideal work environment?",
        options: ["A quiet, focused workshop or studio.", "A dynamic, tech-driven office.", "A bustling, people-oriented space.", "A flexible environment where I can be creative."]
    }
];

export const communityPosts: CommunityPost[] = [
    {
        id: 'post-1',
        authorId: 'user-2',
        text: 'Just finished my first pottery project! So proud of this little bowl. Thanks Maria for the great class!',
        imageUrl: 'https://images.unsplash.com/photo-1565193566174-724815a53278?q=80&w=800',
        likes: 42,
    },
    {
        id: 'post-2',
        authorId: 'user-3',
        text: 'This handcrafted table took weeks, but the result from David\'s woodworking course was worth it.',
        imageUrl: 'https://images.unsplash.com/photo-1600171219034-7c980898a39a?q=80&w=800',
        likes: 128,
    }
];

export const products: Product[] = [
    {
        id: 'prod-1',
        name: 'Handmade Ceramic Mug',
        sellerId: 'user-2',
        price: 2500,
        imageUrl: 'https://images.unsplash.com/photo-1605384932351-45d4758b7a63?q=80&w=800',
        rating: 4.9,
        reviews: 34,
    },
    {
        id: 'prod-2',
        name: 'Artisanal Cutting Board',
        sellerId: 'user-3',
        price: 4500,
        imageUrl: 'https://images.unsplash.com/photo-1633430538186-b41385848a4c?q=80&w=800',
        rating: 5.0,
        reviews: 50,
    },
    {
        id: 'prod-3',
        name: 'Organic Honey Jar',
        sellerId: 'user-7',
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1560502126-7245749c95b4?q=80&w=800',
        rating: 4.8,
        reviews: 72,
    }
];

export const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, user: users.find(u => u.id === 'user-3')!, points: 5820 },
    { rank: 2, user: users.find(u => u.id === 'user-8')!, points: 5100 },
    { rank: 3, user: users.find(u => u.id === 'user-1')!, points: 4950 },
    { rank: 4, user: users.find(u => u.id === 'user-2')!, points: 4500 },
    { rank: 5, user: users.find(u => u.id === 'user-4')!, points: 3800 },
];

export const certificatesData: Certificate[] = [
  {
    id: 'cert-123-abc',
    courseTitle: 'Introduction to Pottery',
    studentName: 'Alex Doe',
    instructorName: 'Maria Garcia',
    completionDate: 'June 15, 2024',
  },
  {
    id: 'cert-456-def',
    courseTitle: 'Advanced Woodworking Techniques',
    studentName: 'Alex Doe',
    instructorName: 'David Chen',
    completionDate: 'August 22, 2024',
  },
];