import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDB from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { toast } from "react-toastify";

const authOptions = {
  providers: [
    // Google Authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username"
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      async authorize(credentials) {
        try {
          // Connect to the database
          await connectToDB();

          // Find the user in the database
          const user = await User.findOne({ username: credentials.username });
          if (!user) {
            console.error("User not found");
            toast.error("Invalid username or password")
            throw new Error("Invalid username or password");
          }

          // Compare the provided password with the hashed password
          const isPasswordMatched = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordMatched) {
            console.error("Incorrect password");
            toast.error("Invalid username or password")
            throw new Error("Invalid username or password");
          }

          // Return the user object
          return {
            id: user._id,
            name: user.username,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Error during credentials login:", error.message);
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],

  // Custom Pages
  pages: {
    signIn: "/signin", // Sign-in page
    error: "/signin", // Redirect to the same page on error
  },

  // Callbacks
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id; // Attach user ID to the session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the JWT
      }
      return token;
    },
  },

  // Secrets
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
