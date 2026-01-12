# Veterinary Chatbot SDK

## Live Demo

#### Main App (Chat Widget):
``` bash 
[Text to show](https://veterinary-chatbot.netlify.app/)
```

#### Admin Dashboard:
```bash 
[Text to show](https://veterinary-chatbot.netlify.app/admin)
``` 

## Setup Instructions

### 1. Prerequisites
Make sure you have the following installed:

- Node.js (v18+ recommended)  
- Git  
- A modern browser (Chrome / Edge / Firefox)

---

### 2. Clone the Repository
```bash
git clone https://github.com/Connectgauravkaushik/Veterinary-Chatbot.git
cd Veterinary-Chatbot
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Configuration
```bash
API_KEY=your_api_key_here
PORT=5000
```

### 5. Run the Project
```bash
npm start
```

```Open in browser:
Backend: http://localhost:5000
Frontend: http://localhost:5173
```
### 6. Architecture Overview
  ```bash Client (Browser)
Frontend (HTML/CSS/JS or React) -> Backend (Node.js/Express) -> APIs (Gemini) + Database (MongoDB)
```

### 7. Components

- Frontend
Handles UI, iframe embedding, responsiveness, and user interaction.

- Backend
Manages logic, API calls, authentication, and data handling.

- Storage Layer
Uses MongoDB to store data.

### 8. Data Flow
1. User interacts with UI

2. Frontend sends request to backend

3. Backend processes logic and calls APIs

4. Gemini processes the request and generates response based on the question

5. Response is returned to frontend and shown to user

### 9. Assumptions

1. This chatbot is created for veterinarians.

2. It handles basic customer queries and appointments.

3. Reduces human interaction and operational cost.

4. Doctors can focus more on patients.

5. APIs used are reliable and available.

### 10. Future Improvements

1. Role-based access for admin
2. Role-based access for APIs
3. Add database of doctor-provided ideal answers for basic advice
4. Build learning AI agent based on data
5. Voice command support:
  - Talk to agent
  - Book appointment by voice
  - Auto-match doctor availability

6. Analytics & Insights:
- Track usage
- Improve answers
- Analyse common questions


