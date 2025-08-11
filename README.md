# Event Management Dashboard

A React + TypeScript application for managing events, featuring authentication, CRUD operations, filtering, and form validation.  
This project was built as a practical task to demonstrate skills in **authentication**, **state management**, **form handling**, and **UI interactions**.

---

## 🚀 Features

### 1. Authentication (Local Only)
- **Sign Up & Login** using **localStorage**.
- Session persistence across page reloads.
- Unauthenticated users are redirected to the login page.

### 2. Event CRUD Operations
- Create, Read, Update, and Delete events.
- Event fields:
  - `title` (string)
  - `description` (text)
  - `eventType` (Online / In-Person)
  - `location` (optional if Online)
  - `eventLink` (optional if In-Person)
  - `startDateTime` and `endDateTime`
  - `category` (dropdown)
  - `organizer` (auto-assigned to logged-in user)
- **No overlapping events** — detects time conflicts and shows a friendly error message.

### 3. Search, Filter & Sorting
- Search events by title or description.
- Filter by:
  - Event Type
  - Category
  - Date Range
- Sort by:
  - Start Date
  - Title
- Filters and search parameters persist in the **URL query string**.

### 4. State Management
- Managed with **React Context API**.
- Contexts:
  - `AuthContext` – authentication state
  - `EventContext` – event data state
  - `FilterContext` – filter & sorting state

### 5. Form Handling & Validation
- **Formik** for form handling.
- **Yup** for schema-based validation.
- Conditional validation:
  - `eventLink` required if event is **Online**
  - `location` required if event is **In-Person**

### 6. Toast Notifications
- **react-hot-toast** for success/error messages.

---

## 🛠 Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast build and development
- **Formik** & **Yup** for form validation
- **react-hot-toast** for notifications
- **react-datepicker** for date inputs
- **React Router v6** for routing
- **LocalStorage** for persistent data

---

## 📂 Project Structure

```
src/
 ├── assets/               # Static assets
 ├── components/           # Reusable components
 ├── contexts/             # React Context API providers
 ├── hooks/                # Custom hooks
 ├── pages/                # Page components (Dashboard, Login, Signup, Event form)
 ├── routes/               # App routing configuration
 ├── styles/               # CSS styles
 ├── types/                # TypeScript types
 ├── utils/                # Helper functions
 ├── App.tsx               # Root component
 ├── main.tsx              # Entry point
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/harsh472000/Event-management-Thinkwik.git
cd Event-management-Thinkwik
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the development server
```bash
npm run dev
```
The app will be available at:  
```
http://localhost:5173
```

### 4️⃣ Build for production
```bash
npm run build
```

---

## 💡 How It Works

### Authentication
- New users sign up → credentials stored in `localStorage`.
- On login, the app checks stored credentials.
- Auth context persists the logged-in user until logout.

### Event Management
- All events are stored in `localStorage` under a dedicated key.
- CRUD operations update this storage and the context state.
- Before saving, a **time conflict check** runs to prevent overlaps.

### Filtering & Sorting
- Filter and search parameters update the context & URL.
- On page reload, parameters are read from the URL and applied automatically.

---

## 🧪 Validation Rules
- **Title**: Required
- **Description**: Required
- **Event Type**: Required
- **Location**: Required if In-Person
- **Event Link**: Required if Online
- **Start/End Dates**: Required, must be valid, and cannot overlap with another event.

---


