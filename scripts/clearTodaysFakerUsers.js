const admin = require("firebase-admin");

// Initialize Firebase Admin (same as your seed script)
const serviceAccount = require("../config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function clearTodaysFakerUsers() {
  console.log("🗑️  Deleting today's Faker-generated users...");

  // Get start of today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // First get all users with userType "binome", then filter by date in code
  const usersSnapshot = await db
    .collection("users")
    .where("userType", "==", "binome")
    .get();

  if (!usersSnapshot.empty) {
    const batch = db.batch();
    let todaysUsers = 0;

    usersSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate();

      // Check if created today
      if (createdAt && createdAt >= startOfToday) {
        batch.delete(doc.ref);
        todaysUsers++;
      }
    });

    if (todaysUsers > 0) {
      await batch.commit();
      console.log(`✅ Deleted ${todaysUsers} Faker-generated users from today`);
    } else {
      console.log("No Faker-generated users found from today");
    }
  } else {
    console.log("No users with userType 'binome' found");
  }

  // Clean up related data created today
  console.log("🗑️  Cleaning up related data from today...");

  const collections = ["posts", "likes", "chats", "partenaires"];

  for (const collection of collections) {
    const snapshot = await db
      .collection(collection)
      .where("createdAt", ">=", startOfToday)
      .get();

    if (!snapshot.empty) {
      const batch = db.batch();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      console.log(
        `✅ Deleted ${snapshot.docs.length} records from ${collection}`
      );
    }
  }

  admin.app().delete();
}

clearTodaysFakerUsers();
