import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { getUserByEmail, validatePassword, createUser } from '@lib/data/users';

// Check if social auth is properly configured
const isGoogleConfigured = process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_SECRET && 
  !process.env.GOOGLE_CLIENT_ID.includes('demo') &&
  !process.env.GOOGLE_CLIENT_SECRET.includes('demo');

const isGitHubConfigured = process.env.GITHUB_ID && 
  process.env.GITHUB_SECRET && 
  !process.env.GITHUB_ID.includes('demo') &&
  !process.env.GITHUB_SECRET.includes('demo');

const providers: any[] = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      console.log('Auth attempt:', { email: credentials?.email, hasPassword: !!credentials?.password });
      
      if (!credentials?.email || !credentials?.password) {
        console.log('Missing credentials');
        return null;
      }

      try {
        // Find user in central data store
        const user = getUserByEmail(credentials.email);
        
        if (!user) {
          console.log('User not found:', credentials.email);
          return null;
        }

        console.log('User found, checking password...');
        
        // Validate password
        const isPasswordValid = await validatePassword(credentials.password, user.password);
        
        console.log('Password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
          return null;
        }

        console.log('Authentication successful for:', user.email);
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      } catch (error) {
        console.error('Authentication error:', error);
        return null;
      }
    },
  }),
];

// Only add social providers if properly configured
if (isGoogleConfigured) {
  console.log('Adding Google provider to NextAuth');
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  );
} else {
  console.log('Google OAuth not configured:', {
    hasClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    clientIdValue: process.env.GOOGLE_CLIENT_ID?.substring(0, 10) + '...',
  });
}

if (isGitHubConfigured) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  );
}

const authOptions: NextAuthOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', { provider: account?.provider, email: user.email });
      
      // Handle social login user creation
      if (account?.provider !== 'credentials' && user.email) {
        try {
          // Check if user exists in our system
          const existingUser = getUserByEmail(user.email);
          
          if (!existingUser) {
            console.log('Creating new social user:', user.email);
            // Create new user for social login
            await createUser({
              email: user.email,
              name: user.name || 'Social User',
              password: 'social-login', // Placeholder for social users
              role: 'user',
            });
          }
        } catch (error) {
          console.error('Error creating social user:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      
      // If the URL is relative, make it absolute
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      // If the URL is for the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      
      // Default redirect to events page after successful auth
      return `${baseUrl}/events`;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // For credentials login, get role from user object
        if (account?.provider === 'credentials') {
          token.role = (user as any).role || 'user';
        } else {
          // For social login, get role from database
          const dbUser = getUserByEmail(user.email!);
          token.role = dbUser?.role || 'user';
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/account',
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
