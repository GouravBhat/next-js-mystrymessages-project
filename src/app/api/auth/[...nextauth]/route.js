import NextAuth from "next-auth";
import { authoptions } from "./options";

const handler = NextAuth(authoptions);

export const GET = handler;
export const POST = handler;
