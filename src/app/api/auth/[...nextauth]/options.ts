import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { createUser, getUserByEmail } from '@/sanity/utils/user';
import { ENV } from '@/utils/env';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: ENV.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user: googleUser }) {
      const user = await getUserByEmail(googleUser.email!);

      if (user) {
        return true;
      }

      await createUser(googleUser);

      return true;
    },
  },
};
