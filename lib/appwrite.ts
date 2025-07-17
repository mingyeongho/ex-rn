import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID as string,
  userCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID as string,
  categoriesCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID as string,
  menuCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID as string,
  customizationsCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID as string,
  menuCustomizationsCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID as string,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw new Error("Failed to create user");

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        name,
        email,
        avatar: avatarUrl,
      }
    );
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Failed to sign in");
    return session;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Failed to get current user");
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    return currentUser.documents[0];
  } catch (e: any) {
    throw new Error(e.message);
  }
};
