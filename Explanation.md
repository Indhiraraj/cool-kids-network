# Cool Kids Network - Technical Documentation

## Problem Understanding
The challenge is to create a social platform where users get assigned random character identities upon registration. The system implements a hierarchical access system with three tiers of "coolness" that determine what information users can see about others. A maintainer can modify user roles through a protected API endpoint.

Key Features:
- User registration with random character generation
- Simple email-based authentication for users
- Role-based data visibility
- Protected maintainer endpoints for role management

## Technical Specification

### Architecture
The application uses:
- Frontend: React.js
- Backend: Express.js
- Database: MongoDB
- External API: randomuser.me for character generation

### Implementation Details

#### Authentication System
- Users: Simple email-based authentication without middleware
- Maintainer: Protected routes with middleware authentication
- Password hashing using bcryptjs

#### Role-Based Access
Three user roles with different access levels:
- Cool Kid: Can only see their own data
- Cooler Kid: Can see names and countries of all users
- Coolest Kid: Can see all user data including emails and roles

## Technical Decisions

### 1. Authentication Approach
**Decision:** Simple email-based authentication for users, middleware authentication only for maintainer
**Reason:** 
- Meets POC requirements without overcomplicating
- Focuses security on critical maintainer functions
- Quick to implement and test

### 2. Technology Stack
**Selected Stack:**
- React for frontend
- Express for backend
- MongoDB for database

**Reasons:**
- Rapid development capability
- Good ecosystem support
- Easy to implement required features
- Flexible document structure for user data

### 3. Code Quality
**Implemented:**
- ESLint for code quality
- Layered architecture
- Error handling

**Not Implemented:**
- Testing (unit/integration)
- Authentication middleware for users
- CI/CD pipeline

## Solution Achievement Per User Story

### User Story 1: Anonymous Registration
**Implementation:**
- Simple signup form with email input
- Integration with randomuser.me API
- Automatic "Cool Kid" role assignment

### User Story 2: User Login
**Implementation:**
- Basic email-based login
- Direct access to personal character data

### User Story 3 & 4: Role-Based Access
**Implementation:**
- Role checking in backend controllers
- Data filtering based on user role
- Frontend conditional rendering

### User Story 5: Maintainer Integration
**Implementation:**
- Protected endpoints with middleware authentication
- Role update functionality
- User identification by email or name

## Why This Direction?

### 1. Simplicity First Approach
- Focused on core functionality
- Minimized complexity where possible
- Easy to understand and maintain

### 2. Security Where It Matters
- Protected maintainer endpoints
- Basic user authentication for POC
- Role-based data access control

### 3. Scalable Foundation
- Structured codebase
- Clear separation of concerns
- Easy to add features later

## Current Limitations and Future Improvements

### Current Limitations
1. **Security:**
   - Basic user authentication
   - No middleware protection for user routes
   - No session management

2. **Testing:**
   - No automated tests
   - Manual testing only

## Development Setup

### Prerequisites
- Node.js v14+
- MongoDB
- npm or yarn

### Installation Steps
1. Clone repository
2. Install dependencies
   ```bash
   cd frontend && npm install
   cd backend && npm install
   npm i -g nodemon
   ```

### Setup Environment Variables
## backend
MONGODB_URI=
PORT=
RANDOM_USER_API_URL=
## frontend
VITE_BASE_API_URL

### Start Development Servers
# Frontend
```bash
npm run dev
```
# Backend
```bash
npm start
```