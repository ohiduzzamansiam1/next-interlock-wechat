import LoginPage from "@/components/login/LoginPage";
import { createNewUserOnFirebaseCollection } from "@/helpers/firebaseApis";
import { authOptions } from "@/helpers/nextAuthHandler";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function HomePage() {
  // Create user when the logged in if they are not in firebase firestore `users` collection
  createNewUserOnFirebaseCollection();

  const session = await getServerSession(authOptions);

  return <>{session?.user ? redirect("/chats") : <LoginPage />}</>;
}

export default HomePage;
