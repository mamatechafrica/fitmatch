const admin = require("firebase-admin");
const { fakerFR: faker } = require("@faker-js/faker");

// Initialize Firebase Admin
let serviceAccount;
try {
  serviceAccount = require("../config/serviceAccountKey.json");
} catch (_error) {
  console.error("❌ Service account key not found!");
  console.error(
    "Please create config/serviceAccountKey.json with your Firebase Admin credentials."
  );
  console.error("See config/serviceAccountKey.example.json for the format.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
});

const db = admin.firestore();

// French locales for more realistic data
// faker.setLocale("fr");

// Sports categories for FitMatch app
const SPORTS = [
  "Football",
  "Basketball",
  "Tennis",
  "Volleyball",
  "Rugby",
  "Handball",
  "Natation",
  "Course à pied",
  "Cyclisme",
  "Escalade",
  "Surf",
  "Skateboard",
  "Boxe",
  "Judo",
  "Karaté",
  "Yoga",
  "Pilates",
  "Crossfit",
  "Musculation",
  "Danse",
  "Zumba",
  "Badminton",
  "Squash",
  "Golf",
  "Pétanque",
];

const SPORTS_OBJECTIVES = [
  "Perdre du poids",
  "Gagner en muscle",
  "Améliorer endurance",
  "Se maintenir en forme",
  "Compétition",
  "Plaisir",
  "Socialiser",
];

const PERSONALITY_TYPES = [
  "Extraverti",
  "Introverti",
  "Compétitif",
  "Décontracté",
  "Motivé",
  "Patient",
  "Aventureux",
  "Prudent",
];

const DIET_CHOICES = [
  "Omnivore",
  "Végétarien",
  "Végétalien",
  "Pescatarien",
  "Flexitarien",
  "Sans gluten",
  "Cétogène",
  "Paléo",
];

const WEEKEND_VIBES = [
  "Aventure en plein air",
  "Détente à la maison",
  "Sortie entre amis",
  "Sport intensif",
  "Découverte culturelle",
  "Repos complet",
];

const FRENCH_CITIES = [
  "Paris",
  "Lyon",
  "Marseille",
  "Toulouse",
  "Nice",
  "Nantes",
  "Montpellier",
  "Strasbourg",
  "Bordeaux",
  "Lille",
  "Rennes",
  "Reims",
  "Le Havre",
  "Saint-Étienne",
  "Toulon",
  "Angers",
];

// Generate random profile photo URLs (using placeholder services)
const generateProfilePhoto = (gender = "any") => {
  const genderParam =
    gender === "male" ? "men" : gender === "female" ? "women" : "any";
  const photoId = faker.number.int({ min: 1, max: 99 });
  return `https://randomuser.me/api/portraits/${
    genderParam === "men" ? "men" : "women"
  }/${photoId}.jpg`;
};

// Generate a realistic French birth date for adults
const generateBirthDate = () => {
  const age = faker.number.int({ min: 18, max: 65 });
  return faker.date
    .birthdate({ min: age, max: age, mode: "age" })
    .toISOString()
    .split("T")[0];
};

// Generate user data
const generateUser = () => {
  const gender = faker.helpers.arrayElement(["male", "female"]);
  const firstName = faker.person.firstName(
    gender === "male" ? "male" : "female"
  );
  const lastName = faker.person.lastName();

  return {
    // Basic info matching UserData interface
    prenoms: firstName,
    nom: lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    naissance: generateBirthDate(),
    ville: faker.helpers.arrayElement(FRENCH_CITIES),
    userType: "binome",

    // Required for app functionality
    acceptCGU: true,
    quizCompleted: faker.datatype.boolean(0.8),
    personalData: true,

    // Profile data
    profilePicUrl: generateProfilePhoto(gender),
    sex: gender === "male" ? 1 : 0,

    // Sports and lifestyle - match interface field names
    sport: faker.helpers.arrayElement(SPORTS),
    diet: faker.helpers.arrayElement(DIET_CHOICES),
    personality: faker.helpers.arrayElements(PERSONALITY_TYPES, {
      min: 2,
      max: 4,
    }),
    objectives: faker.helpers.arrayElements(SPORTS_OBJECTIVES, {
      min: 1,
      max: 3,
    }),
    weekendVibes: faker.helpers.arrayElements(WEEKEND_VIBES, {
      min: 1,
      max: 2,
    }),

    // Optional media arrays
    photosUrl: [],
    videosUrl: [],
    mesPhotos: [],
    mesVideos: [],

    // Quiz data
    quiz: {
      quiz1: faker.number.int({ min: 1, max: 5 }),
      quiz2: faker.number.int({ min: 1, max: 5 }),
      quiz3: faker.number.int({ min: 1, max: 5 }),
      quiz4: faker.number.int({ min: 1, max: 5 }),
      quiz5: faker.number.int({ min: 1, max: 5 }),
    },

    // Timestamps
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
};

// Generate partner data
const generatePartner = () => {
  const businessTypes = [
    "Salle de sport",
    "Club de tennis",
    "Piscine",
    "Centre de yoga",
    "Box de CrossFit",
    "Dojo de arts martiaux",
    "Centre d'escalade",
    "Magasin de sport",
    "Nutrition sportive",
    "Coach personnel",
  ];

  const businessName = faker.company.name();

  return {
    // Basic business info
    titre: businessName,
    email: faker.internet.email().toLowerCase(),
    telephone: faker.phone.number("0# ## ## ## ##"),
    adresse: faker.location.streetAddress(),
    ville: faker.helpers.arrayElement(FRENCH_CITIES),
    codePostal: faker.location.zipCode("####"),

    // Business details
    typeActivite: faker.helpers.arrayElement(businessTypes),
    description: faker.lorem.paragraphs(2),

    // Images and media
    imageUrl: faker.image.urlPicsumPhotos(600, 400, undefined, true),
    images: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () =>
      faker.image.urlPicsumPhotos(800, 600, undefined, true)
    ),
    videos: Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) },
      () =>
        `https://sample-videos.com/zip/10/mp4/720/${faker.number.int({
          min: 1,
          max: 20,
        })}.mp4`
    ),

    // Business hours
    horaires: {
      lundi: "08:00-20:00",
      mardi: "08:00-20:00",
      mercredi: "08:00-20:00",
      jeudi: "08:00-20:00",
      vendredi: "08:00-20:00",
      samedi: "09:00-18:00",
      dimanche: faker.datatype.boolean(0.3) ? "10:00-16:00" : "Fermé",
    },

    // Pricing and offers
    tarifs: {
      adhesion: faker.number.int({ min: 20, max: 100 }),
      mensuel: faker.number.int({ min: 30, max: 150 }),
      annuel: faker.number.int({ min: 300, max: 1200 }),
      seance: faker.number.int({ min: 10, max: 50 }),
    },

    // Special offers
    offres: Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) },
      () => ({
        titre: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        prix: faker.number.int({ min: 15, max: 80 }),
        dureeValidite: faker.date.future(1).toISOString().split("T")[0],
      })
    ),

    // Services offered
    services: faker.helpers.arrayElements(
      [
        "Cours collectifs",
        "Coaching personnel",
        "Nutrition",
        "Vestiaires",
        "Parking",
        "Matériel fourni",
        "Douches",
        "Sauna",
        "Cours en ligne",
      ],
      { min: 3, max: 7 }
    ),

    // Sports/activities
    activites: faker.helpers.arrayElements(SPORTS, { min: 2, max: 6 }),

    // Validation status
    isValid: faker.datatype.boolean(0.8), // 80% are validated
    acceptCGU: true,

    // Contact and social
    siteWeb: faker.internet.url(),
    facebook: `https://facebook.com/${faker.internet.username()}`,
    instagram: `https://instagram.com/${faker.internet.username()}`,

    // Location coordinates (approximate for French cities)
    coordonnees: {
      latitude: faker.location.latitude({ min: 42, max: 51, precision: 6 }), // France latitude range
      longitude: faker.location.longitude({ min: -5, max: 8, precision: 6 }), // France longitude range
    },

    // Rating and reviews
    note: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 1 }),
    nombreAvis: faker.number.int({ min: 5, max: 150 }),

    // Timestamps
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
};

// Generate posts for users
const generatePost = (userData) => {
  const hasImage = faker.datatype.boolean(0.7);
  const hasVideo = !hasImage && faker.datatype.boolean(0.3);

  let mediaUrl = "";
  let mediaType = "";
  let thumbnailUrl = "";

  if (hasImage) {
    mediaUrl = faker.image.urlPicsumPhotos(600, 400, undefined, true);
    mediaType = "photo";
  } else if (hasVideo) {
    mediaUrl = `https://sample-videos.com/zip/10/mp4/480/${faker.number.int({
      min: 1,
      max: 30,
    })}.mp4`;
    mediaType = "video";
    thumbnailUrl = faker.image.urlPicsumPhotos(600, 400, undefined, true);
  }

  return {
    posterInfo: {
      uid: userData.id,
      username: `${userData.prenoms} ${userData.nom}`,
      profilePicUrl: userData.profilePicUrl || "",
      verified: userData.verified || false,
    },
    text: faker.lorem.paragraph(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    mediaUrl: mediaUrl,
    mediaType: mediaType,
    ...(thumbnailUrl && { thumbnailUrl }),
    taggedUsers: [],
    ...(faker.datatype.boolean(0.3) && {
      taggedPlaceName: faker.helpers.arrayElement(FRENCH_CITIES),
    }),
    likes: {
      count: faker.number.int({ min: 0, max: 50 }),
      by: [], // Will be populated with actual user IDs
    },
    comments: {
      count: faker.number.int({ min: 0, max: 10 }),
      by: [], // Will be populated with actual user IDs
    },
    shares: {
      count: faker.number.int({ min: 0, max: 5 }),
      by: [], // Will be populated with actual user IDs
    },
  };
};

// Generate likes between users
const generateLike = (fromUserId, toUserId) => {
  return {
    fromUserId: fromUserId,
    toUserId: toUserId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
};

// Generate chat messages
const generateChat = (user1Id, user2Id) => {
  const participants = [user1Id, user2Id].sort();
  const chatId = participants.join("_");

  const messages = Array.from(
    { length: faker.number.int({ min: 5, max: 20 }) },
    () => ({
      text: faker.lorem.sentence(),
      senderId: faker.helpers.arrayElement(participants),
      createdAt: faker.date.recent(30),
      read: faker.datatype.boolean(0.7),
    })
  );

  return {
    chatId,
    chatData: {
      participants,
      lastMessage: messages[messages.length - 1],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    messages,
  };
};

// Main seeding function
async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  try {
    // Generate users
    console.log("👥 Creating users...");
    const users = [];
    const userIds = [];

    for (let i = 0; i < 10; i++) {
      const userData = generateUser();
      const userRef = await db.collection("users").add(userData);
      users.push({ id: userRef.id, ...userData });
      userIds.push(userRef.id);

      if (i % 10 === 0) console.log(`Created ${i + 1} users...`);
    }

    // Generate partners
    console.log("🏢 Creating partners...");
    const partners = [];

    for (let i = 0; i < 5; i++) {
      const partnerData = generatePartner();
      const partnerRef = await db.collection("partenaires").add(partnerData);
      partners.push({ id: partnerRef.id, ...partnerData });

      if (i % 5 === 0) console.log(`Created ${i + 1} partners...`);
    }

    // Generate posts
    console.log("📝 Creating posts...");
    const posts = [];

    for (let i = 0; i < 50; i++) {
      const randomUser = faker.helpers.arrayElement(users);
      const postData = generatePost(randomUser);

      // Add some random likes from other users
      const likeCount = faker.number.int({ min: 0, max: 15 });
      const likingUsers = faker.helpers.arrayElements(userIds, likeCount);
      postData.likes.by = likingUsers.filter((id) => id !== randomUser.id);
      postData.likes.count = postData.likes.by.length;

      // Update comments count to match by array length
      const commentingUsers = faker.helpers.arrayElements(
        userIds.filter((id) => id !== randomUser.id),
        postData.comments.count
      );
      postData.comments.by = commentingUsers;

      const postRef = await db.collection("posts").add(postData);
      posts.push({ id: postRef.id, ...postData });

      if (i % 20 === 0) console.log(`Created ${i + 1} posts...`);
    }

    // Generate likes between users
    console.log("💕 Creating likes...");
    const likes = [];

    for (let i = 0; i < 100; i++) {
      const fromUserId = faker.helpers.arrayElement(userIds);
      const toUserId = faker.helpers.arrayElement(
        userIds.filter((id) => id !== fromUserId)
      );

      const likeData = generateLike(fromUserId, toUserId);
      await db.collection("likes").add(likeData);
      likes.push(likeData);

      if (i % 50 === 0) console.log(`Created ${i + 1} likes...`);
    }

    // Generate chats
    console.log("💬 Creating chats...");
    const chats = [];

    for (let i = 0; i < 20; i++) {
      const user1Id = faker.helpers.arrayElement(userIds);
      const user2Id = faker.helpers.arrayElement(
        userIds.filter((id) => id !== user1Id)
      );

      const chatData = generateChat(user1Id, user2Id);

      // Create chat document
      await db.collection("chats").doc(chatData.chatId).set(chatData.chatData);

      // Add messages to subcollection
      const batch = db.batch();
      chatData.messages.forEach((message) => {
        const messageRef = db
          .collection("chats")
          .doc(chatData.chatId)
          .collection("messages")
          .doc();
        batch.set(messageRef, message);
      });
      await batch.commit();

      chats.push(chatData);

      if (i % 10 === 0) console.log(`Created ${i + 1} chats...`);
    }

    console.log("✅ Database seeding completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Partners: ${partners.length}`);
    console.log(`   - Posts: ${posts.length}`);
    console.log(`   - Likes: ${likes.length}`);
    console.log(`   - Chats: ${chats.length}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close the admin app
    admin.app().delete();
  }
}

// Add command line arguments for partial seeding
const args = process.argv.slice(2);
const seedType = args[0] || "all";

if (seedType === "users") {
  // Seed only users
  console.log("Seeding users only...");
} else if (seedType === "partners") {
  // Seed only partners
  console.log("Seeding partners only...");
} else {
  // Seed everything
  seedDatabase();
}

module.exports = {
  seedDatabase,
  generateUser,
  generatePartner,
  generatePost,
  generateLike,
  generateChat,
};
