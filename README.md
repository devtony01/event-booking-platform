# 🎫 EventHub - Event Booking Platform

![Test Status](https://img.shields.io/badge/tests-129%2F129%20%28100%25%29-brightgreen)


A modern event booking platform built with Next.js 15, TypeScript, and Tailwind CSS where users can browse events, view details, and book tickets with authentication.

## 🌐 Live Demo

**🔗 Live URL**: https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app  
**📂 GitHub Repository**: https://github.com/devtony01/event-booking-platform

> **Note**: Production deployment has Vercel authentication protection enabled. For full API testing, use local development environment.

## ✅ Requirements Fulfilled

This project meets all the specified requirements:

- ✅ **Next.js 15 with App Router** (exceeds requirement of Next.js 14)
- ✅ **Mock API with Next.js API routes** for event data
- ✅ **NextAuth.js authentication** with multiple providers
- ✅ **Tailwind CSS styling** with custom design system
- ✅ **Dynamic routes for event detail pages with SSG**
- ✅ **Booking form with validation**
- ✅ **Deployed to Vercel** with live URL

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form
- **Deployment**: Vercel

### Key Libraries
- **UI Components**: Custom component library with CVA
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Validation**: React Hook Form with custom validators

## 🚀 Features Implemented

### 🎯 Core Functionality
- **Event Discovery**: Browse events with search and filtering
- **Event Details**: Comprehensive event pages with all information
- **Ticket Booking**: Interactive booking forms with validation
- **User Authentication**: Login/register with multiple providers
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🔐 Authentication System
- **NextAuth.js Integration**: Configured for multiple providers
- **Providers Supported**: 
  - Email/Password (Credentials)
  - Google OAuth
  - GitHub OAuth
- **Session Management**: JWT-based sessions
- **Protected Routes**: Dashboard and booking features

### 📱 User Interface
- **Modern Design**: Professional UI with custom components
- **Navigation**: Responsive navbar with dropdown menus
- **Event Cards**: Beautiful event listings with images
- **Booking Forms**: Intuitive ticket selection and validation
- **User Dashboard**: Account management and booking history

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main layout group
│   │   ├── page.tsx       # Homepage
│   │   ├── events/        # Events pages
│   │   └── layout.tsx     # Main layout
│   ├── account/           # Authentication (parallel routes)
│   │   ├── @dashboard/    # User dashboard
│   │   ├── @login/        # Login/register forms
│   │   └── layout.tsx     # Account layout
│   └── api/               # API routes
│       ├── auth/          # NextAuth endpoints
│       ├── events/        # Event CRUD operations
│       ├── bookings/      # Booking management
│       └── user/          # User data
├── components/            # Shared components
├── design/                # Design system
│   ├── ui/               # Reusable UI components
│   ├── icons/            # Custom icons
│   └── ui-preset/        # Tailwind configuration
├── lib/                   # Utilities and types
│   ├── data/             # Mock data
│   ├── types/            # TypeScript definitions
│   └── utils/            # Helper functions
├── modules/               # Feature modules
│   ├── account/          # Authentication components
│   ├── events/           # Event-related components
│   ├── layout/           # Navigation and footer
│   └── common/           # Shared components
└── styles/                # Global styles
```

## 🔌 API Routes

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js authentication
- `POST /api/auth/register` - User registration

### Events
- `GET /api/events` - Fetch events with filtering and pagination
- `GET /api/events/[id]` - Fetch single event details
- `POST /api/events` - Create new event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Bookings
- `GET /api/bookings/[id]` - Fetch booking details
- `DELETE /api/bookings/[id]` - Cancel booking

### Users
- `GET /api/user/[id]` - Fetch user profile and bookings

## 🎨 Design System

### Components Available
- **Button**: Multiple variants (primary, secondary, transparent)
- **Text**: Typography system with consistent sizing
- **Input**: Form inputs with validation states
- **Cards**: Event cards and information cards
- **Navigation**: Responsive navbar and footer

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Preset**: Consistent design tokens
- **Component Variants**: CVA for component styling
- **Responsive Design**: Mobile-first approach

## 📱 Pages Implemented

### 🏠 Homepage (`/`)
- Hero section with call-to-action
- Featured events showcase
- Platform benefits overview

### 📅 Events Listing (`/events`)
- Event grid with search functionality
- Category and city filtering
- Pagination support
- Responsive event cards

### 🎫 Event Details (`/events/[id]`)
- **SSG Implementation**: Static generation with `generateStaticParams`
- **SEO Optimized**: Dynamic metadata with `generateMetadata`
- **ISR**: Incremental Static Regeneration (revalidate: 3600)
- Comprehensive event information
- Interactive booking form
- Image gallery and venue details

### 🔐 Authentication (`/account`)
- **Parallel Routes**: Seamless login/register switching
- Login form with validation
- Registration with password requirements
- Social login options (Google, GitHub)
- User dashboard with booking history

## 🎯 Booking System

### Form Validation
- **React Hook Form**: Form state management
- **Custom Validation**: Email, password strength, required fields
- **Real-time Feedback**: Instant validation messages
- **Quantity Controls**: Ticket selection with availability checks

### Booking Flow
1. User selects number of tickets
2. Form validates availability and user input
3. Price calculation updates in real-time
4. Booking submission with loading states
5. Success/error feedback with toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devtony01/event-booking-platform.git
   cd event-booking-platform
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables** (optional for demo)
   ```bash
   cp .env.example .env.local
   ```
   
   For production authentication, add:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://your-domain.com
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3001**

### Build for Production
```bash
npm run build
npm start
```

## 🔒 Authentication Flow

### Demo User Accounts
The application comes with pre-configured demo accounts for testing:

#### **Regular User Account**
- **Email**: `user@example.com`
- **Password**: `password123`
- **Role**: `user`
- **Name**: John Doe
- **Access**: Can browse events, book tickets, view dashboard

#### **Event Organizer Account**
- **Email**: `organizer@example.com`
- **Password**: `password123`
- **Role**: `organizer`
- **Name**: Jane Smith
- **Access**: Can create/manage events, view analytics

### Custom User Registration
Users can create their own accounts with:

#### **Registration Requirements**
- **Email**: Valid email format (validated)
- **Password**: Minimum 6 characters
- **Name**: Full name required
- **Role**: Automatically assigned as `user`

#### **Registration Process**
1. User fills registration form with real-time validation
2. Email format and password strength checked
3. Duplicate email prevention
4. Secure password hashing with bcrypt
5. Automatic login after successful registration
6. Redirect to events page

#### **Account Features**
- **Secure Authentication**: bcrypt password hashing
- **Session Management**: JWT-based sessions with NextAuth.js
- **Profile Management**: Update name, email, preferences
- **Booking History**: View all past and upcoming bookings
- **Account Security**: Password change functionality

### Social Authentication
- **Google OAuth**: Sign in with Google account
- **GitHub OAuth**: Sign in with GitHub account (configurable)
- **Auto Account Creation**: Social users automatically get accounts
- **Profile Sync**: Name and email from social providers
- **Seamless Integration**: Same features as custom accounts

### Authentication Security
- **Password Hashing**: bcrypt with salt rounds (12)
- **Session Security**: Secure JWT tokens
- **CSRF Protection**: Built-in NextAuth.js protection
- **Environment Variables**: Secure credential storage
- **Production Ready**: OAuth callback URLs configured

## 📊 Mock Data

The application uses comprehensive mock data including:

### Events Data
- 8 sample events across different categories
- Realistic event information (dates, prices, locations)
- High-quality images from Unsplash
- Availability and booking status

### User Data
- Sample user accounts for testing
- Different user roles (user, organizer)
- Booking history and preferences

## 🌟 Key Implementation Highlights

### Static Site Generation (SSG)
```typescript
// Event detail pages are statically generated
export async function generateStaticParams() {
  return mockEvents.map((event) => ({
    id: event._id,
  }));
}

// SEO optimization with dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const event = await getEvent(params.id);
  return {
    title: `${event.title} | Event Booking Platform`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
    },
  };
}
```

### Form Validation
```typescript
// Comprehensive form validation with React Hook Form
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<BookingFormData>({
  defaultValues: {
    numberOfTickets: 1,
    customerName: '',
    customerEmail: '',
  },
});
```

### API Route Implementation
```typescript
// RESTful API with proper error handling
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    // ... filtering logic
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
```

## 🧪 Testing

✅ **Test Status**: 129/129 tests passing (100%)


### 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/28/2025, 9:22:56 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/27/2025, 9:22:51 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/26/2025, 9:24:20 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/25/2025, 9:25:00 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/24/2025, 9:20:20 AM |

### 📁 Test Suites

- ❌ **utils**: undefined/NaN (0%)
- ❌ **events**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/23/2025, 9:20:04 AM |

### 📁 Test Suites

- ❌ **utils**: undefined/NaN (0%)
- ❌ **events**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/22/2025, 9:23:44 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/21/2025, 9:23:56 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/20/2025, 9:24:11 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/19/2025, 9:23:20 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/18/2025, 9:28:46 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/17/2025, 9:21:33 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/16/2025, 9:22:06 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/15/2025, 9:24:19 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/14/2025, 9:26:40 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/13/2025, 9:26:12 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/12/2025, 9:26:14 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/11/2025, 9:29:34 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/10/2025, 9:23:04 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/9/2025, 9:22:33 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/8/2025, 9:30:00 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/7/2025, 9:29:50 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/6/2025, 9:31:07 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/5/2025, 9:30:03 AM |

### 📁 Test Suites

- ❌ **utils**: undefined/NaN (0%)
- ❌ **events**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/4/2025, 9:34:58 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/3/2025, 9:23:21 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/2/2025, 9:25:26 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 8/1/2025, 9:29:14 AM |

### 📁 Test Suites

- ❌ **utils**: undefined/NaN (0%)
- ❌ **events**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 7/31/2025, 9:29:31 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 7/30/2025, 9:31:13 AM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 7/29/2025, 9:29:38 AM |

### 📁 Test Suites

- ❌ **utils**: undefined/NaN (0%)
- ❌ **events**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 7/28/2025, 12:14:44 PM |

### 📁 Test Suites

- ❌ **utils**: undefined/NaN (0%)
- ❌ **events**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | 129 |
| **Passing** | 129 ✅ |
| **Failing** | 0 ❌ |
| **Pass Rate** | 100% |
| **Last Updated** | 7/28/2025, 12:12:55 PM |

### 📁 Test Suites

- ❌ **events**: undefined/NaN (0%)
- ❌ **utils**: undefined/NaN (0%)
- ❌ **storage**: undefined/NaN (0%)
- ❌ **data**: undefined/NaN (0%)
- ❌ **validation**: undefined/NaN (0%)
- ❌ **helper**: undefined/NaN (0%)
- ❌ **SocialAuth**: undefined/NaN (0%)
- ❌ **EventCard**: undefined/NaN (0%)
- ❌ **text.spec.tsx**: undefined/NaN (0%)
- ❌ **users**: undefined/NaN (0%)
- ❌ **button.spec.tsx**: undefined/NaN (0%)
- ❌ **label.spec.tsx**: undefined/NaN (0%)

### 🧪 Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test EventCard.test.tsx
```

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

## 🚀 Deployment

### Vercel Configuration
- **Automatic Deployments**: Connected to GitHub
- **Build Command**: `npm run build`
- **Install Command**: `npm install --legacy-peer-deps`
- **Framework**: Next.js (auto-detected)
- **Test Integration**: `npm run test:ci` in CI/CD pipeline

### Performance Optimizations
- **Static Generation**: Event pages pre-generated
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Bundle Size**: Optimized with tree shaking

## 📈 Development Approach

### Architecture Decisions
1. **Modular Structure**: Feature-based organization
2. **Type Safety**: Full TypeScript implementation
3. **Component Reusability**: Custom design system
4. **Performance**: SSG and ISR strategies
5. **User Experience**: Responsive and accessible design

### Code Quality
- **TypeScript**: Strict type checking
- **Component Architecture**: Reusable and composable
- **Error Handling**: Comprehensive error boundaries
- **Form Validation**: Client-side and server-side validation

## 🔐 API Testing

```bash
# Test API endpoints
./scripts/test-api.sh http://localhost:3001

# Test events endpoint
curl -s http://localhost:3001/api/events | jq

# Test OAuth providers
curl -s http://localhost:3001/api/auth/providers | jq
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**

*This project demonstrates modern web development practices with a focus on performance, user experience, and maintainable code architecture.*