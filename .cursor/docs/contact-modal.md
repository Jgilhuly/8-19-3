# Contact Modal Feature

## Overview
A contact modal has been added to the NeuraLink AI website to capture user information and consultation requests.

## Features
- **Modal Trigger**: The modal can be opened from:
  - "Get Started" button in the hero section
  - "Contact Us" button in the contact section
- **Form Fields**:
  - Full Name (required)
  - Email Address (required)
  - Company (optional)
  - Phone Number (optional)
  - Service Interest (dropdown selection)
  - Message (required)
- **Responsive Design**: Works on both desktop and mobile devices
- **Form Validation**: Client-side validation for required fields
- **Backend Integration**: Submits to existing `/api/contact/consultation` endpoint

## Technical Implementation

### Frontend (Vue.js)
- **Modal State Management**: Uses Vue 3 Composition API with `ref()` for reactive state
- **Form Handling**: Form data is bound to reactive variables using `v-model`
- **API Integration**: Uses Axios to submit form data to backend
- **Error Handling**: Displays user-friendly error messages
- **Accessibility**: Proper labels, form structure, and keyboard navigation

### Backend (Express.js)
- **Existing Endpoint**: Uses the already implemented `/api/contact/consultation` route
- **Data Validation**: Backend validates required fields and email format
- **Storage**: Currently stores requests in memory (demo purposes)
- **Response**: Returns success message with estimated response time

### Styling (CSS)
- **Modal Overlay**: Semi-transparent background with click-to-close
- **Smooth Animations**: Slide-in animation for modal appearance
- **Responsive Design**: Adapts to different screen sizes
- **Form Styling**: Consistent with existing design system

## Usage

### Opening the Modal
```javascript
// The modal can be opened by calling:
openContactModal()
```

### Form Submission
```javascript
// Form data is automatically sent to:
POST /api/contact/consultation
```

### Form Data Structure
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  company: "Tech Corp",
  phone: "+1-555-123-4567",
  serviceInterest: "ai-strategy",
  message: "I need help with AI strategy..."
}
```

## Future Enhancements
- Add toast notifications instead of alerts
- Implement form data persistence to database
- Add email notifications for new submissions
- Include file upload capability for project documents
- Add CAPTCHA or other spam prevention
- Implement form analytics and tracking

## Testing
1. Start the development server: `npm run dev`
2. Navigate to the website
3. Click "Get Started" or "Contact Us" buttons
4. Fill out the form and submit
5. Check backend logs for successful submission
6. Verify form resets after successful submission
