# MedGuard AI - API Configuration Guide

## API Base URL
The application is configured to connect to your backend at:
```
http://127.0.0.1:8000/api/server
```

## Integrated Endpoints

### 1. Authentication Endpoints

#### Register
- **Endpoint**: `POST /auth/register/`
- **Payload**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: User data with ID, name, email, role, created_at

#### Login
- **Endpoint**: `POST /auth/login/`
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns access token, refresh token, and user data
- **Token Storage**: Tokens are stored in localStorage

#### Logout
- **Endpoint**: `POST /auth/logout/`
- **Headers**: `Authorization: Bearer {access_token}`
- **Action**: Clears all tokens and user data from localStorage

#### Refresh Token
- **Endpoint**: `POST /auth/token/refresh/`
- **Payload**:
  ```json
  {
    "refresh": "refresh_token_here"
  }
  ```
- **Response**: New access token

### 2. Profile Endpoints

#### Get Profile
- **Endpoint**: `GET /auth/profile/{user_id}`
- **Headers**: `Authorization: Bearer {access_token}`
- **Response**: User profile data

#### Update Profile
- **Endpoint**: `PATCH /auth/profile/update/`
- **Headers**: `Authorization: Bearer {access_token}`
- **Payload**:
  ```json
  {
    "name": "Updated Name"
  }
  ```

### 3. Medicine Endpoints

#### Get Medicine History
- **Endpoint**: `GET /medicine/history/`
- **Headers**: `Authorization: Bearer {access_token}`
- **Response**: Array of medicine verification history

## Token Management

### Storage
- **Access Token**: `localStorage.getItem('accessToken')`
- **Refresh Token**: `localStorage.getItem('refreshToken')`
- **User Data**: `localStorage.getItem('user')` (JSON stringified)

### Authentication Flow
1. User logs in or registers
2. Backend returns access and refresh tokens
3. Tokens are stored in localStorage
4. Access token is sent with every authenticated request
5. On logout, all tokens are cleared

## Components Using API

### Login Component (`src/app/components/Login.tsx`)
- Uses `useAuth().login()` to authenticate users
- Shows loading state during login
- Displays error toasts on failure
- Redirects to dashboard on success

### Register Component (`src/app/components/Register.tsx`)
- Uses `useAuth().register()` to create new accounts
- Validates password confirmation
- Shows loading state during registration
- Redirects to dashboard on success

### Dashboard Component (`src/app/components/Dashboard.tsx`)
- Protected route - redirects to login if not authenticated
- Fetches medicine history from backend
- Shows user profile data from auth context
- Handles logout with token cleanup

## Error Handling

All API calls include error handling with:
- Toast notifications for user feedback
- Try-catch blocks for network errors
- Loading states during async operations
- Proper error messages from backend

## Development Notes

### Changing API Base URL
To point to a different backend URL, edit:
```typescript
// src/services/api.ts
const API_BASE_URL = "http://your-backend-url/api/server";
```

### CORS Configuration
Make sure your backend allows requests from the frontend origin:
```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Add your frontend URL
]
```

### Testing Authentication
1. Start your backend server
2. Register a new account
3. Check the Network tab in browser DevTools to see API requests
4. Verify tokens are stored in localStorage
5. Test protected routes (dashboard, history)

## Future API Integrations

The following features are ready for API integration when endpoints become available:

- Medicine verification (image upload, barcode scanning)
- Detailed medicine analysis
- Symptom checker
- Medicine search
- User preferences

## Logo and Branding

- Logo file: `src/imports/MedGuardAI@2_logo.png`
- Used in: Navbar, Dashboard sidebar
- Favicon: Copy of logo in `public/favicon.png` (if supported by hosting environment)
