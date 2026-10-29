export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  caption: string;
  note?: string;
  rotation?: number; // tilt angle for polaroid effect
}

export interface ReasonCard {
  id: string;
  emoji: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  accentColor: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
}

export interface BirthdayConfig {
  // 1. Personal Information
  partnerName: string;
  partnerNickname: string;
  senderName: string;

  // 2. Opening Screen
  opening: {
    greeting: string;
    subtitle: string;
    buttonText: string;
  };

  // 3. Hero Section
  hero: {
    title: string;
    subtitle: string;
    wishText: string;
  };

  // 4. Love Letter
  letter: {
    title: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  // 5. Memories Gallery
  memories: {
    title: string;
    subtitle: string;
    photos: MemoryPhoto[];
  };

  // 6. Reasons Why You're Special
  reasons: {
    title: string;
    subtitle: string;
    items: ReasonCard[];
  };

  // 7. Interactive Love Buttons
  loveButtons: {
    compliments: string[];
    vouchers: {
      title: string;
      description: string;
      code: string;
    }[];
  };

  // 8. Our Love Story Timeline
  timeline: {
    title: string;
    subtitle: string;
    events: TimelineEvent[];
  };

  // 9. Cake Mini-Game
  cake: {
    title: string;
    subtitle: string;
    initialCandles: number;
    wishMessage: string;
  };

  // 10. Secret Love Room
  secretRoom: {
    title: string;
    subtitle: string;
    password: string; // The secret key
    hint: string;
    unlockedTitle: string;
    secretNote: string[];
    secretWish: string;
    secretPhotoUrl: string;
  };

  // 11. Final Surprise
  finalSurprise: {
    heading: string;
    subheading: string;
    buttonText: string;
    finalNote: string[];
    footerText: string;
  };

  // Music & Atmosphere
  music: {
    enabled: boolean;
    title: string;
    customAudioUrl?: string; // leave empty to use built-in sweet piano chimes
  };
}

export const defaultBirthdayConfig: BirthdayConfig = {
  partnerName: "Mansi",
  partnerNickname: "My Sunshine ☀️💛",
  senderName: "Your favorite person 💛",

  opening: {
    greeting: "Hey, My Sunshine... 💛",
    subtitle: "Someone has created a little magical surprise just for you.",
    buttonText: "Open Your Surprise ✨",
  },

  hero: {
    title: "Happy Birthday, My Sunshine! ☀️💛",
    subtitle: "Today is all about you, the sweetest part of my whole life.",
    wishText: "✨ May all your days be filled with warmth, endless laughter, and the kind of happiness you bring into my world every single day.",
  },

  letter: {
    title: "A Little Letter From My Heart",
    greeting: "To my favorite person in the whole world,",
    paragraphs: [
      "Happy Birthday, my love. ❤️",
      "I wish I could put into words how special you are to me. You make ordinary moments feel magical, and your smile has a way of making everything better.",
      "On your birthday, I hope you receive all the happiness, love, and beautiful things your heart deserves. I hope you keep smiling, keep dreaming, and always remember how precious you are.",
      "If I could make one wish today, it would be to see you happy, not just on your birthday, but every single day.",
      "You are my favorite hello, my sweetest thought, and someone I feel incredibly lucky to have in my life.",
      "Happy Birthday, baby. You deserve the entire universe and a little extra. 🌻",
    ],
    closing: "With all my love,",
    signature: "Your favorite person 💛",
  },

  memories: {
    title: "Little Moments, Big Feelings",
    subtitle: "Every second with you turns into a memory I cherish forever.",
    photos: [
      {
        id: "m0_childhood",
        url: "/photos/photo_childhood.jpg",
        title: "Little Mansi: Where It All Began",
        date: "Childhood Days 👶🎒",
        caption: "The cutest little school kid in the whole world! 🥺❤️",
        note: "Look at that adorable little face in school uniform and tie! Who knew this tiny cutie would grow up to be the sweetest sunshine in my life.",
        rotation: -2,
      },
      {
        id: "m0_train",
        url: "/photos/photo_train_sleep.jpg",
        title: "Train Window Slumber",
        date: "Journey Nap 🚂💤",
        caption: "Fast asleep by the window as the world rushes by. 💜",
        note: "Peacefully napping against the train seat in your purple kurta. Even on long journeys, you look so calm, angelic, and precious.",
        rotation: 3,
      },
      {
        id: "m1",
        url: "/photos/photo1.jpg",
        title: "The Sweetest Smile In The World",
        date: "Pure Radiance 💜",
        caption: "Your smile never fails to brighten up my entire universe. 🌸",
        note: "Resting your cheek with that gentle, gorgeous glow. Every time I see this picture, my heart melts all over again.",
        rotation: -2,
      },
      {
        id: "m2",
        url: "/photos/photo2.jpg",
        title: "My Sleeping Angel",
        date: "Peaceful Slumber 😴",
        caption: "The most innocent, precious little nap. 💕",
        note: "You look so serene and cute when you're resting. I could watch over you and protect you forever.",
        rotation: 3,
      },
      {
        id: "m3",
        url: "/photos/photo3.jpg",
        title: "My Cute Little Ninja",
        date: "Goofy & Adorable 🥷",
        caption: "Undercover cutie on duty! Those sparkling eyes give you away. ✨",
        note: "All masked up in your varsity jacket! You manage to look drop-dead adorable even when you're being totally silly.",
        rotation: -3,
      },
      {
        id: "m4",
        url: "/photos/photo4.jpg",
        title: "Sweet Tooth Caught Red-Handed",
        date: "Chocolate Lover 🍫",
        caption: "A little chocolate smile and an endless amount of cuteness. ❤️",
        note: "Wearing that heart shirt with chocolate on your lips! You are effortlessly the sweetest person alive.",
        rotation: 2,
      },
      {
        id: "m5",
        url: "/photos/photo5.jpg",
        title: "A Flower Among Flowers",
        date: "Golden Sunshine 🌻",
        caption: "Surrounded by yellow blooms, but you're the prettiest flower of all. 🌿",
        note: "Standing in front of the green garden, opening your arms to the world. You bring sunshine wherever you go.",
        rotation: -1,
      },
      {
        id: "m6",
        url: "/photos/photo6.jpg",
        title: "The Cutest Pout & Puppy Eyes",
        date: "Puppy Eyes 🥺❤️",
        caption: "How could anyone ever say no to that adorable little face?",
        note: "Looking right at the camera with that playful pout and big expressive eyes. You always know how to steal my heart completely.",
        rotation: 2,
      },
      {
        id: "m7",
        url: "/photos/photo7.jpg",
        title: "Evening Twilight Glow",
        date: "Dusk Magic 🌙✨",
        caption: "The evening sky fades to dusk, but your smile lights up everything.",
        note: "A soft twilight breeze and that gentle, warm expression. You look so graceful and effortlessly breathtaking.",
        rotation: -2,
      },
      {
        id: "m8",
        url: "/photos/photo8.jpg",
        title: "Little Flower In Her Hair",
        date: "Blissful Peace 🌼💛",
        caption: "A yellow bloom by your ear and sweet serenity in your smile.",
        note: "Eyes closed and savoring the quiet breeze. You look so soft, peaceful, and completely enchanting.",
        rotation: 3,
      },
      {
        id: "m9",
        url: "/photos/photo9.jpg",
        title: "Under The Shade Of Love",
        date: "Nature's Sunshine ☀️🍃",
        caption: "Sitting peacefully in nature, radiating warmth and pure grace.",
        note: "Under the leafy green canopy with a gentle smile. Being with you feels like the coziest, sweetest spring afternoon.",
        rotation: -3,
      },
      {
        id: "m10",
        url: "/photos/photo10.jpg",
        title: "Gentle Touch In The Meadow",
        date: "Meadow Whispers 🌾🌸",
        caption: "Adoring the little yellow blossoms in the grass.",
        note: "Crouched gently among the petals with sweet curiosity. The whole world seems softer, kinder, and more magical around you.",
        rotation: 2,
      },
      {
        id: "m11",
        url: "/photos/photo11.jpg",
        title: "Bike Mirror Selfies With You",
        date: "Roads & Smiles 🛵❤️",
        caption: "My favorite passenger and my favorite reflection in the world.",
        note: "Stopping for a quick mirror selfie on the bike. Peeking in together with those sweet eyes — every ride with you is an adventure.",
        rotation: -2,
      },
      {
        id: "m12",
        url: "/photos/photo12.jpg",
        title: "Coke Zero & Maximum Cuteness",
        date: "Sweet Sips 🥤✨",
        caption: "Zero sugar, but 100% pure sweetness.",
        note: "Holding that cold can to your cheek with that glowing playful smile. You make even simple silly moments look adorable.",
        rotation: 3,
      },
      {
        id: "m13",
        url: "/photos/photo13.jpg",
        title: "My Campus Beauty",
        date: "Campus Days 🤍🌸",
        caption: "Looking so elegant, graceful, and effortlessly gorgeous.",
        note: "Sitting in the lobby with that soft, confident smile. You carry yourself with so much grace and poise.",
        rotation: -1,
      },
      {
        id: "m14",
        url: "/photos/photo14.png",
        title: "Late Night Video Calls",
        date: "Midnight Talks 🌙📱",
        caption: "Laughing at 2 AM like the rest of the world doesn't exist.",
        note: "Even when miles apart, seeing your face and hearing your giggle on screen makes everything feel completely right.",
        rotation: 2,
      },
      {
        id: "m15",
        url: "/photos/photo15.jpg",
        title: "Pillar L15: Model Off Duty",
        date: "Street Style Icon 👖💫",
        caption: "Baggy jeans, killer style, and that gorgeous confidence.",
        note: "Posing in the parking lot looking like a total magazine model. You look stunning in everything you wear!",
        rotation: -2,
      },
      {
        id: "m16",
        url: "/photos/photo16.jpg",
        title: "Capturing The World",
        date: "Heritage Walks 📷🏛️",
        caption: "Holding the camera to your eye, but you're the real masterpiece.",
        note: "Under the heritage stone archway holding that little camera. You love freezing moments in time, and I love freezing every moment with you.",
        rotation: 2,
      },
      {
        id: "m17",
        url: "/photos/photo17.jpg",
        title: "Autumn Leaves & Peaceful Breeze",
        date: "Forest Pathways 🍂🍃",
        caption: "Standing in the forest of falling leaves with serene grace.",
        note: "Full-length under the tall trees, surrounded by golden autumn leaves. You bring calm and warmth wherever you walk.",
        rotation: -2,
      },
      {
        id: "m18",
        url: "/photos/photo18.jpg",
        title: "The Smile That Melts My Heart",
        date: "Pure Joy ✨💖",
        caption: "That pure, sparkling happiness looking right at me.",
        note: "A close-up filled with warmth and that glowing laugh. There is truly nothing more captivating than seeing you this happy.",
        rotation: 3,
      },
      {
        id: "m19",
        url: "/photos/photo19.jpg",
        title: "Lip Gloss Check & Soft Glam",
        date: "Soft Glam 💄🌸",
        caption: "Quick touch-up with that effortless, natural cuteness.",
        note: "Applying your lip gloss in the varsity jacket. Even everyday routine moments look movie-worthy when it's you.",
        rotation: -1,
      },
      {
        id: "m20",
        url: "/photos/photo20.jpg",
        title: "Squishy Cheeks & Goofy Winks",
        date: "Squishy Cheeks 🥺🧸",
        caption: "Squishing those adorable cheeks! The absolute sweetest.",
        note: "Making that silly face with your hands squishing your cheeks! You have the funniest, most lovable personality.",
        rotation: 2,
      },
    ],
  },

  reasons: {
    title: "Reasons Why You're So Special",
    subtitle: "Click each card to reveal what my heart whispers about you ☀️💛",
    items: [
      {
        id: "r1",
        emoji: "✨",
        title: "Your Smile Makes My Day",
        shortDesc: "It lights up every room and melts away any gloom.",
        longDesc:
          "There is a genuine, pure magic in your smile. Even on the heaviest days, just seeing your face softens my worries and reminds me of everything good in this world.",
        accentColor: "from-yellow-50 to-yellow-100",
      },
      {
        id: "r2",
        emoji: "☕",
        title: "You Make Ordinary Moments Special",
        shortDesc: "Grocery trips, quiet tea times, or simple walks feel like adventures.",
        longDesc:
          "With you, doing absolutely nothing feels like the greatest event. You turn simple grocery runs, car rides, and silent evenings into memories I want to replay forever.",
        accentColor: "from-yellow-100 to-amber-50",
      },
      {
        id: "r3",
        emoji: "💛",
        title: "Your Happiness Matters To Me",
        shortDesc: "Seeing you happy is my greatest daily victory.",
        longDesc:
          "When you are genuinely excited, laughing until your tummy hurts, my heart swells with so much joy. Your happiness is something I will always protect with all I have.",
        accentColor: "from-amber-50 to-yellow-100",
      },
      {
        id: "r4",
        emoji: "🌻",
        title: "You Have The Sweetest Heart",
        shortDesc: "Compassionate, gentle, caring, and deeply understanding.",
        longDesc:
          "You treat people and little creatures with such tenderness. The way you care, listen, and show empathy makes you the rarest, most beautiful kind of human.",
        accentColor: "from-yellow-50 to-amber-100/60",
      },
      {
        id: "r5",
        emoji: "🌟",
        title: "You Make Me Want To Be Better",
        shortDesc: "Your presence inspires me to be kinder, stronger, and wiser.",
        longDesc:
          "Being loved by someone as incredible as you makes me want to grow, achieve, and be the best version of myself so I can give you the life and happiness you truly deserve.",
        accentColor: "from-yellow-100 to-yellow-200/70",
      },
      {
        id: "r6",
        emoji: "👑",
        title: "You Are Beautiful Inside & Out",
        shortDesc: "Stunning in every way, from your gorgeous eyes to your soul.",
        longDesc:
          "You are drop-dead gorgeous, whether you're dressed up or wearing oversized hoodies with messy hair. But even more than that, the beauty of your soul leaves me breathless.",
        accentColor: "from-[#fffef5] to-yellow-100",
      },
    ],
  },

  loveButtons: {
    compliments: [
      "You have the cutest little laugh that I could listen to on repeat forever. 🎶",
      "The world is undeniably a better, warmer place because you were born into it. 🌍✨",
      "You look so breathtakingly gorgeous, even when you're just waking up with sleepy eyes! 😴💕",
      "You are so smart, capable, and talented — I am constantly in awe of you. 🌟",
      "Your hugs feel like arriving home after the longest journey. 🏡💖",
      "You are effortlessly kind, and that is your biggest superpower. 🌷",
      "I love the way your eyes sparkle when you talk about things you love. ✨",
      "You are the sweetest dream I never want to wake up from. 🌙",
      "Every song that mentions love reminds me of you. 🎧💗",
      "You are my absolute favorite blessing, today and every tomorrow. 🍀",
      "I would choose you in every lifetime, in every parallel universe, over and over again. ♾️",
      "Thank you for being you — gentle, silly, brave, and wonderfully unique. 🧸",
    ],
    vouchers: [
      {
        title: "Free Unlimited Cuddles Pass 🧸",
        description: "Redeemable anytime, anywhere! Guaranteed to make all worries vanish.",
        code: "CUDDLE-FOREVER-01",
      },
      {
        title: "Your Favorite Dessert Delivery 🍰",
        description: "One order of whatever sweet treat your heart is craving right now, on me!",
        code: "SWEET-TREAT-VIP",
      },
      {
        title: "Midnight Drive & Stargazing 🌌",
        description: "Warm coats, our favorite playlist, and holding hands under the night sky.",
        code: "STARRY-NIGHT-03",
      },
      {
        title: "Head Scratches & Compliments Session 💆‍♀️",
        description: "1 hour of relaxing head scratches and gentle whispered reminders of how loved you are.",
        code: "PAMPER-SUNSHINE-04",
      },
    ],
  },

  timeline: {
    title: "Our Love Story Timeline",
    subtitle: "Every chapter of us is my favorite chapter 🧸✨",
    events: [
      {
        id: "e1",
        date: "Chapter One",
        title: "The Beginning of Our Story",
        description: "The moment our paths crossed. Little did I know that day would change my entire world forever.",
        icon: "✨",
        badge: "First Spark",
      },
      {
        id: "e2",
        date: "Chapter Two",
        title: "A Favorite Memory",
        description: "That unforgettable afternoon where we laughed so hard our cheeks hurt, and time stood still.",
        icon: "📸",
        badge: "Pure Joy",
      },
      {
        id: "e3",
        date: "Chapter Three",
        title: "A Moment That Made Me Smile",
        description: "Looking over at you and realizing in that quiet instant: 'I am so completely in love with this girl.'",
        icon: "🥰",
        badge: "Realization",
      },
      {
        id: "e4",
        date: "Chapter Four",
        title: "Something I Will Always Remember",
        description: "The way you held my hand when things felt tough. You showed me what true warmth and comfort feels like.",
        icon: "🤝",
        badge: "Safe Harbor",
      },
      {
        id: "e5",
        date: "The Future & Beyond",
        title: "A Beautiful Wish For Our Future",
        description: "More travels, silly jokes, cozy morning coffees, cooking disasters, and growing together through every season of life.",
        icon: "♾️",
        badge: "Forever & Always",
      },
    ],
  },

  cake: {
    title: "Make a Birthday Wish! 🎂",
    subtitle: "Click each candle to light it up, then make your heartfelt wish and blow them out ✨",
    initialCandles: 5,
    wishMessage: "May every single wish you made today fly up to the stars and come back to you as reality! Happy Birthday my sunshine! ☀️💖🎉",
  },

  secretRoom: {
    title: "The Secret Love Vault 🔐",
    subtitle: "A private corner created only for you and me. Enter the password to unlock.",
    password: "love", // easily editable!
    hint: "Hint: 4 little letters, begins with 'l', the easiest thing in the world to feel for you 🌸 (Default: love)",
    unlockedTitle: "You Found Our Secret Room! 🗝️💖",
    secretNote: [
      "If you're reading this, it means you unlocked my deepest secret... which isn't really a secret at all: I love you more than words, actions, or any website could ever show.",
      "You are the peace in my chaotic days, the warmth in my cold mornings, and the laughter in my quiet nights.",
      "I promise to always listen to you, to hype you up when you doubt yourself, to bring you snacks when you're cranky, and to hold your hand through every chapter of this beautiful journey.",
    ],
    secretWish: "My biggest wish is to spend every single one of your birthdays holding your hand. 🌹",
    secretPhotoUrl: "/photos/photo1.jpg",
  },

  finalSurprise: {
    heading: "You Make My World More Beautiful",
    subheading: "Thank you for bringing your light and grace into my life.",
    buttonText: "Send You All My Love 💗",
    finalNote: [
      "Happy Birthday, my love. ❤️",
      "No matter how many birthdays come and go, I hope you always feel appreciated, cherished, and loved. Today is your day, and I hope it is as beautiful as the happiness you bring into my life.",
      "Keep smiling, my favorite person. You deserve so much love.",
    ],
    footerText: "Made with all my heart, just for you. 💗",
  },

  music: {
    enabled: true,
    title: "Romantic Piano Melody 🎹",
    // customAudioUrl: "/music.mp3", // uncomment or place a custom file in public/music.mp3
  },
};
