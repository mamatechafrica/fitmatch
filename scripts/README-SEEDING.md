# FitMatch Database Seeding

This script generates realistic test data for the FitMatch app using Faker.js and Firebase Admin SDK.

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Firebase Admin Setup:**

   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate a new private key
   - Save the JSON file as `config/serviceAccountKey.json`
   - Update the `storageBucket` in `scripts/seedUsers.js` with your project ID

3. **Configuration:**
   - Ensure your Firebase project has Firestore enabled
   - Make sure your Firestore rules allow admin access

## Usage

### Seed Everything

```bash
npm run seed
```

### Seed Only Users

```bash
npm run seed:users
```

### Seed Only Partners

```bash
npm run seed:partners
```

## What Gets Generated

### Users

- **Personal Information:** French names, emails, birth dates, cities
- **Profile Data:** Profile pictures, cover photos, bios, physical stats
- **Sports Preferences:** Sports activities, objectives, fitness levels
- **Personality:** Personality types, diet choices, weekend preferences
- **Media:** Some users have video challenges with thumbnails
- **Activity Status:** Active/inactive status, last seen timestamps

### Partners

- **Business Information:** Business names, addresses, contact details
- **Services:** Business types, descriptions, services offered
- **Media:** Business photos, promotional videos
- **Pricing:** Membership fees, session rates, special offers
- **Schedule:** Business hours for each day of the week
- **Location:** Coordinates, addresses in French cities
- **Reviews:** Ratings and review counts

### Posts

- **Content:** Various post types (workout, achievement, motivation, event, challenge)
- **Media:** Images and videos attached to posts
- **Engagement:** Likes from other users, comments with realistic content
- **Metadata:** Location tags, sport tags, timestamps

### Likes

- **User Interactions:** Likes between users for matching functionality
- **Timestamps:** Recent like activity for realistic data

### Chats

- **Conversations:** Chat rooms between matched users
- **Messages:** Realistic conversation history with read status
- **Participants:** User pairs with message exchange

## Data Characteristics

- **Localized:** French locale with French names, cities, and content
- **Realistic:** Age-appropriate data, logical relationships
- **Varied:** Different activity levels, preferences, and engagement patterns
- **Complete:** All required fields populated for app functionality
- **Recent:** Timestamps within realistic timeframes

## Collections Created

- `users` - User profiles and preferences
- `partenaires` - Partner/business profiles
- `posts` - User posts and content
- `likes` - User like interactions
- `chats` - Chat rooms with message subcollections

## Security Notes

- The `serviceAccountKey.json` file contains sensitive credentials
- Add it to `.gitignore` to prevent committing to version control
- Only run seeding scripts in development environments
- Consider using Firebase emulator for local testing

## Customization

You can modify the script to:

- Change the number of generated items
- Add new data types or fields
- Customize the French localization
- Add specific business logic for your app
