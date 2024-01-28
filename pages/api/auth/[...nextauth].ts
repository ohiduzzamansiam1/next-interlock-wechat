import { authOptions } from "@/helpers/nextAuthHandler";
import NextAuth from "next-auth/next";

export default NextAuth(authOptions);
