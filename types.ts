import { FieldValue } from "firebase/firestore";

export interface FirestoreUserData {
  id?: string;
  name: string;
  image: string | null;
  email: string;
}

export interface ChatType {
  id: string;
  sender: FirestoreUserData;
  message: string;
  isRead: boolean;
  timestamp: FieldValue;
}
