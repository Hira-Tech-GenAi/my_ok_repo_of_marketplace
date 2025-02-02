//! Not used for route handler; this file is utilized for saving user data into the database

import { prisma } from "@/lib/db"; //? Importing the Prisma client for database interactions
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; // Importing Kinde server session utility
import { NextResponse } from "next/server"; //? Importing Next.js response utility
import { unstable_noStore as noStore } from "next/cache";

//? Defining the GET function for handling a GET request
export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession(); //? Retrieving the `getUser` function from the Kinde session

  // ? Error handling: Fetching user details from the session
  const user = await getUser(); //? Getting the current user's details
  if (!user || user === null || !user.id) {
    //? If user data is missing or invalid, throw an error
    throw new Error("Something went wrong...");
  }

  //? Checking if the user already exists in the database
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id, //? Looking for a user with the matching ID
    },
  });

  // ?If the user does not exist in the database, create a new record
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id, //* Setting user ID
        firstName: user.given_name ?? "", // *Using user's given name or an empty string as fallback
        lastName: user.family_name ?? "", //* Using user's family name or an empty string as fallback
        email: user.email ?? "", //* Using user's email or an empty string as fallback
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`, //* Using user's picture or generating a default avatar
      },
    });
  }

  //? Redirecting to the home page after saving user data
  return NextResponse.redirect("http://localhost:3000/");
}
