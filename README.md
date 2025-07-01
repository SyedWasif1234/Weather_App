
🌤️ Weather UI – Cloudy Glassmorphism

  A beautiful and responsive weather forecast web app with a Glassmorphism UI and animated cloud background for desktops. The design gracefully adapts for mobile devices by simplifying the UI.



## 📌 Table of Contents

* [Overview](-overview)
* [Features](-features)
* [Tech Stack](-tech-stack)
* [APIs Used](-apis-used)
* [How It Works](-how-it-works)


📖 Overview

  This web application allows users to:
  
  * View the current weather based on location or search query
  * Get extended weekly forecasts
  * View atmospheric metrics like pressure, humidity, visibility, wind speed, and sunrise/sunset times
  * Experience a visually appealing interface using **Glassmorphism** and **animated backgrounds**



✨ Features

  ✅ Search weather by city
  ✅ Current temperature & weather icon
  ✅ Feels-like, pressure, humidity, visibility, and wind info
  ✅ Weekly weather summary with emoji icons
  ✅ Sunrise and sunset times
  ✅ Mobile responsive layout
  ✅ Automatically removes moving background on mobile devices for performance



🧰 Tech Stack
  
  | Tech                 | Description                                                   |
  | -------------------- | ------------------------------------------------------------- |
  | HTML5                | Markup structure                                              |
  | CSS3                 | Styling with modern techniques (Glassmorphism, media queries) |
  | JavaScript           | Dynamic rendering, API calls                                  |
  | OpenWeatherMap API   | Fetches real-time and forecast data                           |



🌐 APIs Used

   1. OpenWeatherMap – Geocoding API
  
  Used to convert city names to coordinates.
  Endpoint:
  `https://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}`
  
   2. OpenWeatherMap – Current Weather API
  
  Fetches real-time weather data using lat/lon.
  Endpoint:
  `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API key}`
  
   3. OpenWeatherMap – 5 Day / 3 Hour Forecast API
  
  Provides weather data in 3-hour intervals. Summarized to daily using logic.
  Endpoint:
  `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={API key}`

⚙️ How It Works

  1. User enters a city name
  
  2. App fetches coordinates using Geocoding API
  
  3. Current weather data and 5-day forecast are fetched
  
  4. Data is displayed in two panels:
  
     * Left Panel: Current weather, date, location, emoji icon, week forecast
     * Right Panel: City search input + weather metrics


🚀 Future Enhancements

  * Add hourly weather breakdown
  * Integrate geolocation to auto-detect user’s city
  * Add background transitions based on weather (rain, snow, etc.)
  * Use React or Vue for modular structure
  * Offline support (Progressive Web App)
  * Add chart visualizations using Chart.js or D3.js


