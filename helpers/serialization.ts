export const serializeUser = (user: any) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    isAnonymous: user.isAnonymous,
    createdAt: user.metadata?.creationTime || null,
    lastLoginAt: user.metadata?.lastSignInTime || null,
  };
};

export const serializeFirestoreData = (data: any) => {
  if (!data) return data;
  const serialized = { ...data };

  Object.keys(serialized).forEach((key) => {
    const value = serialized[key];
    if (value?.toDate && typeof value.toDate === "function") {
      serialized[key] = value.toDate().toISOString();
    }
    if (value?.seconds !== undefined && value?.nanoseconds !== undefined) {
      serialized[key] = new Date(
        value.seconds * 1000 + value.nanoseconds / 1000000
      ).toISOString();
    }
  });

  return serialized;
};
