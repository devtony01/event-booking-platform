# 🎫 EventHub - Event Booking Platform

A modern event booking platform built with Next.js 15, TypeScript, and Tailwind CSS where users can browse events, view details, and book tickets with authentication.

## 🌐 Live Demo

**🔗 Live URL**: https://next-mo09lu6d7-chibueze-ogbujis-projects.vercel.app  
**📂 GitHub Repository**: https://github.com/devtony01/event-booking-platform

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

### Demo Credentials
For testing the credentials provider:
- **Email**: `user@example.com`
- **Password**: `password123`

### Registration Process
1. User fills registration form with validation
2. Password strength requirements enforced
3. Account creation with form validation
4. Automatic redirect to dashboard

### Social Authentication
- Google OAuth integration ready
- GitHub OAuth integration ready
- Extensible for additional providers

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

## 🚀 Deployment

### Vercel Configuration
- **Automatic Deployments**: Connected to GitHub
- **Build Command**: `npm run build`
- **Install Command**: `npm install --legacy-peer-deps`
- **Framework**: Next.js (auto-detected)

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