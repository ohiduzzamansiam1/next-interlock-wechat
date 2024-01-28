import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { ChatType, FirestoreUserData } from "../../types";
import { authOptions } from "./nextAuthHandler";

export const getUniqueConversationId = async (email: string) => {
  const session = await getServerSession(authOptions);
  return [session?.user?.email, email].sort().join("-");
};

// Create user when the logged in if they are not in firebase firestore `users` collection
export const createNewUserOnFirebaseCollection = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    const userEmail = session?.user?.email;
    const userDocRef = doc(db, "users", userEmail as string);

    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        email: userEmail,
        name: session?.user?.name,
        image: session?.user?.image,
      });
    }
  }
};
// Find all users and their chats with the current user
export const getAllUsers = async () => {
  const session = await getServerSession(authOptions);
  let users: FirestoreUserData[] = [];
  let chats: any = [];
  if (session) {
    // Fetch all users from users collection
    const usersCollectionRef = collection(db, "users");
    const userCollectionQuery = query(usersCollectionRef);

    const userQuerySnapShot = await getDocs(userCollectionQuery);

    userQuerySnapShot.forEach(async (doc) => {
      if (doc.data().email !== session?.user?.email) {
        users = [...users, doc.data() as any];
      }
    });
  }
  return { users };
};

// get specific chats using user mail and unique id
export const getSpecificChats = async (receiverEmail: string) => {
  const session = await getServerSession(authOptions);
  let chats: ChatType[] = [];
  if (session) {
    const uniqueConversationId = await getUniqueConversationId(receiverEmail);
    const chatsCollectionRef = collection(
      db,
      "chats",
      uniqueConversationId,
      "messages"
    );
    const chatCollectionQuery = query(chatsCollectionRef);

    const chatQuerySnapShot = await getDocs(chatCollectionQuery);

    chatQuerySnapShot.forEach(async (doc) => {
      chats = [...chats, doc.data() as any];
    });
  }
  return { chats };
};
