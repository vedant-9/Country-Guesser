# 🗺️ Country Guesser Game

An interactive geography game built with React where players guess countries based on their silhouettes. Test your world knowledge by identifying countries from their shapes!

## 🎮 Game Features

- **Interactive World Map**: Countries are displayed as detailed silhouettes using D3.js and TopoJSON
- **Smart Autocomplete**: Type-ahead suggestions with keyboard navigation
- **Distance & Direction Hints**: Get distance in kilometers and compass direction to the target country
- **Limited Attempts**: 5 guesses per round to keep the challenge engaging
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Game Statistics**: Track your games played and performance

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd country-guesser
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

## 🎯 How to Play

1. **View the Country**: A country silhouette appears on the map
2. **Make Your Guess**: Type the country name in the input field
3. **Get Feedback**: 
   - ✅ Correct guess wins the round
   - ❌ Wrong guess shows distance and direction to the target
4. **Limited Attempts**: You have 5 guesses to identify the country
5. **New Round**: Game automatically starts a new round after completion

## 🏗️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Visualization**: D3.js
- **Map Data**: TopoJSON (World Atlas)
- **Icons**: Lucide React
- **Geographic Data**: Comprehensive country database with ISO codes and coordinates

## 📁 Project Structure

```
country-guesser/
├── src/
│   ├── CountryGuesser.jsx    # Main game component
│   ├── main.jsx              # React app entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

---

**Made with ❤️ by Vedant** | Test your geography knowledge and have fun exploring the world! 🌍
