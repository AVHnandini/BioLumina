# SymptoTwin - Frontend

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Project Structure

```
src/
  components/
    Header.jsx           # Navigation header
    Footer.jsx           # Footer component
    AssessmentForm.jsx   # Symptom input form
    ResultCard.jsx       # Individual condition card
    LoadingSpinner.jsx   # Loading animation
  pages/
    Home.jsx             # Landing page
    Assessment.jsx       # Assessment form page
    Results.jsx          # Results display page
  services/
    api.js               # Axios API client
  App.jsx                # Main app component with routing
  main.jsx               # React entry point
  index.css              # Global styles
```

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Deployment (Netlify)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variable: `REACT_APP_API_URL=https://your-backend-url/api`
5. Deploy!

## Features

- ✅ Modern, responsive UI
- ✅ Multi-symptom selection
- ✅ Real-time form validation
- ✅ Smooth animations and transitions
- ✅ Data visualization with charts
- ✅ Mobile-friendly design
- ✅ Medical-themed aesthetics
- ✅ Chatbot with quick replies, loading indicator, and a **Clear** option to reset the conversation
