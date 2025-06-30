# HVAC Hero - React Native App

A React Native iOS app for connecting homeowners with trusted HVAC and home service professionals.

## 🎯 Project Overview

HVAC Hero is an on-demand home services platform that allows homeowners to quickly find and book trusted professionals for HVAC, plumbing, electrical, and general handyman services. The app facilitates job posting, professional matching, in-app communication, and secure payments.

## 📱 Features

### For Homeowners (Customers)

- **User Authentication**: Sign up/login with email and phone
- **Service Request Creation**: Post detailed job requests with photos
- **Professional Matching**: View and accept professional bids
- **In-App Messaging**: Communicate directly with professionals
- **Job Tracking**: Monitor job progress and status updates
- **Payment Processing**: Secure payment via Stripe integration
- **Ratings & Reviews**: Rate and review completed services

### For Service Professionals

- **Professional Onboarding**: Upload licenses and insurance documents
- **Job Feed**: Browse available jobs in their service area
- **Job Acceptance**: Accept and manage job requests
- **Communication**: Chat with customers about job details
- **Job Management**: Update job status and completion
- **Earnings Tracking**: View earnings and payment history

## 🏗️ Technical Architecture

### Tech Stack

- **Frontend**: React Native with TypeScript
- **Navigation**: React Navigation v6
- **State Management**: React Context + useReducer
- **UI Components**: Custom component library with consistent theming
- **Image Handling**: Expo Image Picker
- **Location Services**: Expo Location (for future GPS features)
- **Notifications**: Expo Notifications (for push notifications)

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── customer/      # Customer-specific screens
│   └── professional/  # Professional-specific screens
├── navigation/        # Navigation configuration
├── services/          # Business logic and API services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and theme
└── assets/           # Images, fonts, and other assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd HVACHero
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on iOS Simulator**
   ```bash
   npm run ios
   ```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
API_BASE_URL=your_api_base_url

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Firebase Configuration (for future features)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 📋 MVP Features Status

### ✅ Completed

- [x] User authentication (Login/SignUp)
- [x] Customer home screen with service categories
- [x] Job creation flow with photo upload
- [x] Professional job feed with filtering
- [x] Navigation structure (Customer/Professional tabs)
- [x] Reusable UI components (Button, Input, Card)
- [x] Theme system with consistent styling
- [x] TypeScript type definitions

### 🚧 In Progress

- [ ] Job details screen
- [ ] In-app messaging system
- [ ] Payment integration
- [ ] Push notifications
- [ ] Profile management

### 📅 Planned

- [ ] Admin dashboard
- [ ] GPS location tracking
- [ ] Advanced filtering and search
- [ ] Video call integration
- [ ] Loyalty/rewards program

## 🎨 Design System

The app uses a consistent design system with:

### Colors

- **Primary**: Blue (#2563EB) - Main brand color
- **Secondary**: Green (#10B981) - Success states
- **Accent**: Amber (#F59E0B) - Warning states
- **Neutral**: Gray scale for text and backgrounds

### Typography

- **Font Family**: System fonts for optimal performance
- **Font Sizes**: 12px to 36px scale
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing

- **Base Unit**: 4px
- **Scale**: xs(4), sm(8), md(16), lg(24), xl(32), 2xl(48), 3xl(64)

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names

### Component Structure

```typescript
// Component template
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../utils/theme";

interface ComponentProps {
  // Define props here
}

export const Component: React.FC<ComponentProps> = ({ props }) => {
  return <View style={styles.container}>{/* Component content */}</View>;
};

const styles = StyleSheet.create({
  container: {
    // Styles here
  },
});
```

### State Management

- Use React Context for global state
- Use local state for component-specific data
- Implement proper loading and error states

## 📱 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Job creation flow
- [ ] Professional job acceptance
- [ ] Navigation between screens
- [ ] Photo upload functionality
- [ ] Form validation
- [ ] Error handling

### Automated Testing (Future)

- Unit tests for utility functions
- Component testing with React Native Testing Library
- Integration tests for critical user flows

## 🚀 Deployment

### iOS App Store

1. Build the production bundle
2. Configure app signing and provisioning
3. Submit to App Store Connect
4. Configure app metadata and screenshots

### Android Google Play (Future)

1. Build APK/AAB
2. Configure app signing
3. Submit to Google Play Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Roadmap

### Phase 2 (Post-MVP)

- Real-time messaging with WebSocket
- Advanced job scheduling
- Professional verification system
- Customer background checks
- Multi-language support

### Phase 3 (Scale)

- AI-powered job matching
- Dynamic pricing
- Advanced analytics dashboard
- Mobile app for professionals
- Web dashboard for admins

---

**Built with ❤️ for the HVAC Hero team**
