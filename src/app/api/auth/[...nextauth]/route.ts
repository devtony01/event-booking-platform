import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';

// Mock users for demonstration (shared with register route)
const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    password: '$2b$12$m8axFJ9dZikfBcTE32LV/.WcBJfEQdrFhp.wvo967vvtDvMbzh38K', // password123
    name: 'John Doe',
    role: 'user',
  },
  {
    id: '2',
    email: 'organizer@example.com',
    password: '$2b$12$m8axFJ9dZikfBcTE32LV/.WcBJfEQdrFhp.wvo967vvtDvMbzh38K', // password123
    name: 'Jane Smith',
    role: 'organizer',
  },
];

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

      // Find user in mock data
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        console.log('User not found:', credentials.email);
        return null;
      }

      console.log('User found, checking password...');
      
      // Check password
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
      
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
    },
  }),
];

// Only add social providers if properly configured
if (isGoogleConfigured) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  );
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
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || 'user';
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
