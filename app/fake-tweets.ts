export interface Tweet {
  id: string;
  text: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  retweets: number;
  replies: number;
}

export const tweets: Tweet[] = [
  {
    id: "1",
    text: "Just launched my new startup! So excited to revolutionize the way people think about sustainable energy 🚀 #CleanTech #Innovation",
    author: {
      name: "Sarah Chen",
      username: "sarahchen_tech",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    createdAt: "2024-01-15T08:30:00Z",
    likes: 1542,
    retweets: 284,
    replies: 89
  },
  {
    id: "2",
    text: "Raised our Series A! $10M to build the future of AI-powered healthcare. Grateful for our amazing team and investors 🙏 #VentureCapital #HealthTech",
    author: {
      name: "Alex Rivera",
      username: "arivera_vc",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    createdAt: "2024-01-14T15:45:00Z",
    likes: 2891,
    retweets: 567,
    replies: 143
  },
  {
    id: "3",
    text: "Looking for a technical co-founder for my fintech startup. DM if interested! #StartupLife #TechJobs",
    author: {
      name: "Mike Johnson",
      username: "mikej_startup",
      avatar: "https://i.pravatar.cc/150?u=mike",
    },
    createdAt: "2024-01-13T19:20:00Z",
    likes: 876,
    retweets: 234,
    replies: 156
  },
  {
    id: "4",
    text: "Just hit 1M users! Remember when everyone said B2B SaaS was boring? 😎 #SaaS #StartupSuccess",
    author: {
      name: "Lisa Wong",
      username: "lwong_saas",
      avatar: "https://i.pravatar.cc/150?u=lisa",
    },
    createdAt: "2024-01-12T11:15:00Z",
    likes: 3421,
    retweets: 892,
    replies: 245
  },
  {
    id: "5",
    text: "Building in public: Our MVP is now live! Check out our new no-code platform for small businesses 🎉 #NoCode #Entrepreneurship",
    author: {
      name: "David Park",
      username: "dpark_builds",
      avatar: "https://i.pravatar.cc/150?u=david",
    },
    createdAt: "2024-01-11T14:30:00Z",
    likes: 1234,
    retweets: 345,
    replies: 98
  },
  {
    id: "6",
    text: "Remote work is here to stay. Just closed our office and went fully remote. Best decision ever! 🌍 #RemoteWork #FutureOfWork",
    author: {
      name: "Emma Wilson",
      username: "emmaw_remote",
      avatar: "https://i.pravatar.cc/150?u=emma",
    },
    createdAt: "2024-01-10T16:40:00Z",
    likes: 2567,
    retweets: 678,
    replies: 189
  },
  {
    id: "7",
    text: "Bootstrapped to $1M ARR in 18 months. No VC funding needed. Here's how we did it: (thread) 🧵 #Bootstrapped #StartupGrowth",
    author: {
      name: "Tom Martinez",
      username: "tommartz_biz",
      avatar: "https://i.pravatar.cc/150?u=tom",
    },
    createdAt: "2024-01-09T09:25:00Z",
    likes: 4532,
    retweets: 1234,
    replies: 345
  },
  {
    id: "8",
    text: "Just acquired our biggest competitor! Exciting times ahead for blockchain gaming 🎮 #GameFi #Web3",
    author: {
      name: "Nina Patel",
      username: "nina_gamefi",
      avatar: "https://i.pravatar.cc/150?u=nina",
    },
    createdAt: "2024-01-08T13:50:00Z",
    likes: 1876,
    retweets: 432,
    replies: 167
  },
  {
    id: "9",
    text: "Looking for angel investors for our seed round. Building the future of edtech! 📚 #EdTech #Investment",
    author: {
      name: "James Kim",
      username: "jamesk_edu",
      avatar: "https://i.pravatar.cc/150?u=james",
    },
    createdAt: "2024-01-07T17:15:00Z",
    likes: 987,
    retweets: 234,
    replies: 178
  },
  {
    id: "10",
    text: "Just launched in Europe! Now available in 15 countries 🇪🇺 #GlobalExpansion #StartupGrowth",
    author: {
      name: "Sophie Martin",
      username: "sophiem_global",
      avatar: "https://i.pravatar.cc/150?u=sophie",
    },
    createdAt: "2024-01-06T10:30:00Z",
    likes: 2345,
    retweets: 567,
    replies: 123
  },
  {
    id: "11",
    text: "Hiring senior developers! Remote-first, competitive salary, great benefits. DM for details 💻 #TechJobs #Hiring",
    author: {
      name: "Ryan Thompson",
      username: "ryant_tech",
      avatar: "https://i.pravatar.cc/150?u=ryan",
    },
    createdAt: "2024-01-05T12:45:00Z",
    likes: 1543,
    retweets: 432,
    replies: 234
  },
  {
    id: "12",
    text: "Our AI model just achieved 99% accuracy in medical diagnosis. This could change healthcare forever 🏥 #AI #HealthTech",
    author: {
      name: "Dr. Maria Garcia",
      username: "dr_maria_ai",
      avatar: "https://i.pravatar.cc/150?u=maria",
    },
    createdAt: "2024-01-04T14:20:00Z",
    likes: 5678,
    retweets: 1567,
    replies: 456
  },
  {
    id: "13",
    text: "Just closed our Series B! $50M to scale our sustainable fashion marketplace 👗 #FashionTech #Sustainability",
    author: {
      name: "Olivia Brown",
      username: "oliviab_fashion",
      avatar: "https://i.pravatar.cc/150?u=olivia",
    },
    createdAt: "2024-01-03T16:55:00Z",
    likes: 3456,
    retweets: 876,
    replies: 234
  },
  {
    id: "14",
    text: "Looking for beta testers for our new productivity app! Sign up link in bio 📱 #ProductHunt #BetaTesters",
    author: {
      name: "Chris Lee",
      username: "chrisl_product",
      avatar: "https://i.pravatar.cc/150?u=chris",
    },
    createdAt: "2024-01-02T08:15:00Z",
    likes: 765,
    retweets: 189,
    replies: 87
  },
  {
    id: "15",
    text: "Just hit $100K MRR! Proof that focusing on customer success works 📈 #SaaS #Growth",
    author: {
      name: "Rachel Foster",
      username: "rachelf_saas",
      avatar: "https://i.pravatar.cc/150?u=rachel",
    },
    createdAt: "2024-01-01T11:30:00Z",
    likes: 2987,
    retweets: 654,
    replies: 178
  },
  {
    id: "16",
    text: "Our crypto wallet now supports all major chains! Multi-chain is the future 🔗 #Blockchain #Crypto",
    author: {
      name: "Kevin Zhang",
      username: "kevinz_crypto",
      avatar: "https://i.pravatar.cc/150?u=kevin",
    },
    createdAt: "2023-12-31T13:45:00Z",
    likes: 1876,
    retweets: 432,
    replies: 156
  },
  {
    id: "17",
    text: "Just partnered with @Microsoft! Big things coming for enterprise cloud security 🔒 #CloudComputing #Security",
    author: {
      name: "Anna Smith",
      username: "annas_cloud",
      avatar: "https://i.pravatar.cc/150?u=anna",
    },
    createdAt: "2023-12-30T15:20:00Z",
    likes: 4321,
    retweets: 987,
    replies: 276
  },
  {
    id: "18",
    text: "Looking for a marketing co-founder. Must be passionate about sustainability 🌱 #Startup #GreenTech",
    author: {
      name: "Daniel White",
      username: "danielw_green",
      avatar: "https://i.pravatar.cc/150?u=daniel",
    },
    createdAt: "2023-12-29T09:40:00Z",
    likes: 876,
    retweets: 234,
    replies: 145
  },
  {
    id: "19",
    text: "Just launched our API! Developers, check out our docs and start building 🛠️ #API #DevTools",
    author: {
      name: "Michelle Chang",
      username: "michc_dev",
      avatar: "https://i.pravatar.cc/150?u=michelle",
    },
    createdAt: "2023-12-28T12:10:00Z",
    likes: 1432,
    retweets: 345,
    replies: 98
  },
  {
    id: "20",
    text: "We're now carbon negative! Proud to be part of the solution, not the problem 🌍 #Sustainability #ClimateAction",
    author: {
      name: "Peter Anderson",
      username: "petera_climate",
      avatar: "https://i.pravatar.cc/150?u=peter",
    },
    createdAt: "2023-12-27T14:35:00Z",
    likes: 3567,
    retweets: 876,
    replies: 234
  }
];
