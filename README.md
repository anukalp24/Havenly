# 🏨 Havenly - Full Stack Hotel Booking Platform

Havenly is a production-ready hotel booking platform built using the MERN stack. It enables users to discover luxury stays, securely book hotels, manage reservations, save wishlists, and allows property owners to list and manage their own properties through a dedicated dashboard.

The project follows modern full-stack development practices including JWT authentication, Access & Refresh Token authentication, HTTP-only cookies, Stripe payment integration, Cloudinary image storage, email verification using OTP, and secure password recovery.

---

# 🚀 Tech Stack

### Frontend

- React 19
- React Router DOM
- Vite
- Context API
- CSS3
- React Icons
- React OTP Input

### Backend

- Node.js
- Express.js 5
- MongoDB
- Mongoose

### Authentication & Security

- JWT Authentication
- Access Tokens
- Refresh Tokens
- HTTP-Only Cookies
- bcryptjs
- Helmet
- Express Rate Limit
- CORS
- Cookie Parser

### Cloud & Third Party Services

- Cloudinary (Image Storage)
- Brevo (Transactional Emails)
- Stripe Payment Gateway
- Stripe Refund API

---

# ✨ Features

## Authentication

- User Registration
- Secure Login
- Email Verification using OTP
- JWT Authentication
- Access Token & Refresh Token Authentication
- Automatic Access Token Refresh
- HTTP-Only Refresh Token Cookies
- Protected Routes
- Secure Logout
- Forgot Password
- Password Reset using Secure Token

---

## Property Management

- Add New Property
- Edit Property
- Delete Property
- Upload Multiple Images
- Cloudinary Image Storage
- Owner Dashboard
- Manage Listed Properties

---

## Booking System

- Secure Hotel Booking
- Stripe Checkout Integration
- Instant Booking Confirmation
- Booking History
- User Booking Cancellation
- Owner Booking Cancellation
- Automatic Stripe Refunds
- Booking Status Management

---

## Browse & Search

- Browse All Hotels
- Search by City
- Browse by Categories
- Price Range Filter
- Property Details Page

---

## Wishlist

- Add Property to Wishlist
- Remove Property from Wishlist
- View Saved Wishlist

---

## Contact & Email

- Contact Form
- Email Verification OTP
- Password Reset Email
- Contact Form Emails
- Transactional Emails using Brevo

---

## User Experience

- Responsive Design
- Skeleton Loaders
- Loading States
- Error Handling
- Toast Notifications

---

# 📄 Pages

| Route | Description |
|--------|-------------|
| `/` | Home Page |
| `/auth` | Login & Register |
| `/email-verification` | Verify Email using OTP |
| `/host` | Add New Property |
| `/edithome/:id` | Edit Existing Property |
| `/dashboard` | Manage Your Listings |
| `/home/:id` | Property Details |
| `/search` | Search Results |
| `/wishlist` | User Wishlist |
| `/reservation` | User Reservations |
| `/owner-reservation` | Owner Reservations |
| `/about` | About Page |
| `/contact` | Contact Page |
| `/forgot-password` | Forgot Password |
| `/reset-password/:token` | Reset Password |

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/signin` | ❌ | Register User |
| POST | `/login` | ❌ | Login User |
| POST | `/email-verification` | ❌ | Verify Email OTP |
| POST | `/refresh` | ❌ | Generate New Access Token |
| POST | `/logout` | ✅ | Logout User |
| POST | `/forgot-password` | ❌ | Send Password Reset Link |
| POST | `/reset-password/:token` | ❌ | Reset Password |

---

## Properties

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | `/` | ❌ | Get All Properties |
| GET | `/home/:id` | ❌ | Get Property Details |
| POST | `/search` | ❌ | Search by City |
| POST | `/addhome` | ✅ | Add Property |
| PUT | `/edithome/:id` | ✅ | Update Property |
| DELETE | `/deletehome/:id` | ✅ | Delete Property |
| GET | `/dashboard` | ✅ | Get Owner Listings |

---

## Bookings

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/booking/:id` | ✅ | Book Property |
| GET | `/reservation` | ✅ | User Reservations |
| GET | `/owner-reservation` | ✅ | Owner Reservations |
| PUT | `/cancel-booking/:id` | ✅ | Cancel User Booking |
| PUT | `/owner-cancel-booking/:id` | ✅ | Cancel Booking by Owner |

---

## Wishlist

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| PUT | `/wishlist/:id` | ✅ | Add to Wishlist |
| GET | `/wishlist` | ✅ | Get Wishlist |
| DELETE | `/removewishlist/:id` | ✅ | Remove from Wishlist |

---

## Contact

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/contact` | ❌ | Contact Form |

---

# 🔐 Authentication Flow

1. User creates an account.
2. An OTP is sent to the registered email using Brevo.
3. User verifies the OTP.
4. Server generates an Access Token and Refresh Token.
5. Refresh Token is stored inside an HTTP-only cookie.
6. Access Token is used for authenticated requests.
7. When the Access Token expires, a new one is automatically generated using the Refresh Token.
8. User can securely logout, which clears both the Refresh Token cookie and the stored refresh token.

---

# 💳 Payment Flow

1. User selects a property.
2. Stripe Checkout session is created.
3. User completes payment securely through Stripe.
4. Booking is stored after successful payment.
5. Both users and owners can cancel bookings.
6. Stripe automatically processes refunds when applicable.

---

# ☁ Image Storage

All uploaded property images are securely stored using **Cloudinary**.

---

# 📧 Email Services

Brevo is used for:

- Email Verification OTP
- Forgot Password Emails
- Contact Form Emails

---

# 📦 Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/havenly.git
```

```bash
cd havenly
```

---

## Install Backend Dependencies

```bash
npm install
```

---

## Install Frontend Dependencies

```bash
cd Frontend
npm install
```

---

# ⚙ Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=

MONGODB_URI=

JWT_SECRET=
JWT_REFRESH_SECRET=

BREVO_API_KEY=
SENDER_EMAIL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

---

# ▶ Running the Project

Backend

```bash
npm start
```

Frontend

```bash
cd Frontend
npm run dev
```

---

# 📈 Future Improvements

- Reviews & Ratings
- Property Availability Calendar
- Google Authentication
- Admin Dashboard
- Push Notifications
- Maps Integration
- AI-based Property Recommendations

---

# 👨‍💻 Author

**Anukalp Agarwal**

If you found this project helpful, consider giving it a ⭐ on GitHub.
