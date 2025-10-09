export const users = [
  { id: 1, name: 'Alex Doe', nickname: 'Alex', avatar: 'https://picsum.photos/seed/101/200/200' },
  { id: 2, name: 'Jane Smith', nickname: 'Janie', avatar: 'https://picsum.photos/seed/102/200/200' },
  { id: 3, name: 'Sam Wilson', nickname: 'Sammy', avatar: 'https://picsum.photos/seed/103/200/200' },
  { id: 4, name: 'Chris Lee', nickname: 'Chris', avatar: 'https://picsum.photos/seed/104/200/200' },
];

export const messages = [
  { id: 1, userId: 2, text: 'Hey everyone! How is studying for finals going?', timestamp: '10:30 AM' },
  { id: 2, userId: 3, text: 'It\'s tough, but we can do it! Anyone want to form a study group for calculus?', timestamp: '10:32 AM' },
  { id: 3, userId: 1, text: 'I\'m in for a study group! When and where?', timestamp: '10:33 AM' },
  { id: 4, userId: 4, text: 'I could use some help with that. The library works for me.', timestamp: '10:35 AM' },
  { id: 5, userId: 2, text: 'Great! How about tomorrow at 2 PM in the main library, 3rd floor?', timestamp: '10:36 AM' },
  { id: 6, userId: 3, text: 'Sounds perfect. See you all there!', timestamp: '10:37 AM' },
];

export const resources = {
  announcements: [
    {
      id: 1,
      title: 'University Mental Health Day',
      description: 'Join us for a day of workshops and activities focused on student well-being. No registration required.',
      date: 'October 10, 2024',
      imageUrl: 'https://picsum.photos/seed/201/600/400',
      imageHint: 'wellness event'
    },
    {
      id: 2,
      title: 'Career Fair Next Week',
      description: 'Don\'t miss the annual career fair. Over 50 companies will be attending. Dress to impress!',
      date: 'October 15, 2024',
      imageUrl: 'https://picsum.photos/seed/202/600/400',
      imageHint: 'career fair'
    },
  ],
  events: [
    {
      id: 1,
      title: 'Guest Lecture: AI in Modern Society',
      description: 'Dr. Evelyn Reed will discuss the impact of artificial intelligence on our daily lives.',
      date: 'November 5, 2024',
      imageUrl: 'https://picsum.photos/seed/204/600/400',
      imageHint: 'lecture hall'
    },
  ],
  help: [
    {
      id: 1,
      title: 'Tutoring Services Available',
      description: 'Free tutoring for a variety of subjects is available at the Student Success Center.',
      date: 'Ongoing',
      imageUrl: 'https://picsum.photos/seed/203/600/400',
      imageHint: 'tutoring study'
    },
  ],
};

export const libraryItems = [
  {
    id: 1,
    type: 'Book',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    description: 'A guide to spiritual enlightenment that encourages living in the present moment.',
    imageUrl: 'https://picsum.photos/seed/301/600/400',
    imageHint: 'book meditation'
  },
  {
    id: 2,
    type: 'Article',
    title: 'Managing Stress in College',
    author: 'Dr. Jane Smith',
    description: 'Practical tips and techniques for students to manage academic and personal stress.',
    imageUrl: 'https://picsum.photos/seed/302/600/400',
    imageHint: 'student stress'
  },
  {
    id: 3,
    type: 'Book',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'An easy & proven way to build good habits & break bad ones.',
    imageUrl: 'https://picsum.photos/seed/303/600/400',
    imageHint: 'habits schedule'
  },
  {
    id: 4,
    type: 'Resource',
    title: 'Campus Counseling Center',
    author: 'UCV',
    description: 'Confidential counseling and psychological services for all students.',
    imageUrl: 'https://picsum.photos/seed/304/600/400',
    imageHint: 'counseling office'
  },
];
