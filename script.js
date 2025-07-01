
  let weather 
  const timezoneOffsetSeconds = 19800;
  let forcast_weather_data;

  const Search_Input = document.querySelector(".search-bar");
  
  const Matrics_Div = document.querySelector('.metrics');
  const Matrics_Div_Template = Matrics_Div.innerHTML;

  //right section
  const panel1 = document.querySelector('.panel1');
  const panel_Template = panel1.innerHTML;

  function showLoading (){
    Matrics_Div.innerHTML = "Loading...";
    panel1.innerHTML = "Loading...";
  }

  function Hide_Loading(){
    Matrics_Div.innerHTML=Matrics_Div_Template;
    panel1.innerHTML = panel_Template ;
  }

  async function getCityCoordinates(city) {
    try {
      showLoading();
      const url = `https://api.openweathermap.org/geo/1.0/direct?` +
                `q=${encodeURIComponent(city)}&limit=1&appid=API_KEY`;

      const res = await fetch(url)
      const data = await res.json()

      if(!res.ok || !data.length) console.log("city not found");

      return {lat:data[0].lat , lon:data[0].lon}

    } catch (error) {
      console.log("error occured while fetching city coordinates : ", error)
      throw error
    }
  }

  function formatTime (unixSeconds , timezoneOffsetSeconds ) {
    const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000 );
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours > 12 ? "PM":"AM";
    const displayHours = hours%12 || 12 ;
    return `${displayHours}:${minutes.toString().padStart(2,0)} ${ampm} `
  }

  function formatDate(Date_in_Seconds ){
    const date = new Date(Date_in_Seconds*1000  )

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear().toString().slice(-2)

    const formatted = `${day}-${month}-${year}`;
    return formatted;
  }

  function Day(Date_in_Seconds){
    const date = new Date(Date_in_Seconds*1000);
    const day_number = date.getDay();
    let day = " " ;
   
    switch (day_number) {
      case 0: day = "Sunday"; break;
      case 1: day = "Monday"; break;
      case 2: day = "Tuesday"; break;
      case 3: day = "Wednesday"; break;
      case 4: day = "Thursday"; break;
      case 5: day = "Friday"; break;
      case 6: day = "Saturday"; break;
      default: day = "Unknown";
    }
    return day;  
  }

  function Weather_Type (main , description){

    if (!main) return "unknown";

    const m = main.toLowerCase();
    const d = (description || "").toLowerCase();

    switch (m) {
      /* ---------- RAIN ---------- */

      case "rain":
        if (d.includes("light"))        return "rain-light";
        if (d.includes("moderate"))     return "rain-moderate";
        if (d.includes("heavy") ||
            d.includes("very heavy") ||
            d.includes("extreme"))      return "rain-heavy";
        if (d.includes("freezing"))     return "rain-freezing";
        if (d.includes("shower"))       return "rain-shower";
        return "rain";

      /* ---------- DRIZZLE ---------- */

      case "drizzle":
        if (d.includes("light"))        return "drizzle-light";
        if (d.includes("heavy"))        return "drizzle-heavy";
        return "drizzle";

      /* ---------- THUNDER ---------- */

      case "thunderstorm":
        if (d.includes("light"))        return "thunder-light";
        if (d.includes("heavy") ||
            d.includes("ragged"))       return "thunder-heavy";
        return "thunder";

      /* ---------- SNOW ---------- */

      case "snow":
        if (d.includes("light"))        return "snow-light";
        if (d.includes("heavy"))        return "snow-heavy";
        if (d.includes("sleet"))        return "snow-sleet";
        if (d.includes("rain and snow"))return "snow-rainmix";
        return "snow";

      /* ---------- CLOUDS ---------- */

      case "clouds":
        if (d.includes("few"))          return "clouds-few";
        if (d.includes("scattered"))    return "clouds-scattered";
        if (d.includes("broken"))       return "clouds-broken";
        if (d.includes("overcast"))     return "clouds-overcast";
        return "clouds";

      /* ---------- FOG / HAZE / MIST / etc. ---------- */

      case "fog":          return "fog";
      case "mist":         return "mist";
      case "haze":         return "haze";
      case "smoke":        return "smoke";
      case "dust":         return "dust";
      case "sand":         return "sand";
      case "squall":       return "squall";
      case "tornado":      return "tornado";

      
      case "clear":        return "clear";

      default:             return m;  
    }
  }

  function Weather_Type_Icon(main , description){
    
    if (!main) return "unknown";

    const m = main.toLowerCase();
    const d = (description || "").toLowerCase();

    switch (m) {
      /* ---------- RAIN ---------- */

      case "rain":
        if (d.includes("light"))        return "🌦️";
        if (d.includes("moderate"))     return "🌧️";
        if (d.includes("heavy") ||
            d.includes("very heavy") ||
            d.includes("extreme"))      return "🌧️";
        if (d.includes("freezing"))     return "🌧️";
        if (d.includes("shower"))       return "🌧️";
        return "🌧️";

      /* ---------- DRIZZLE ---------- */

      case "drizzle":
        if (d.includes("light"))        return "🌦️";
        if (d.includes("heavy"))        return "🌧️";
        return "🌦️";


      /* ---------- THUNDER ---------- */

      case "thunderstorm":
        if (d.includes("light"))        return "⛈️";
        if (d.includes("heavy") ||
            d.includes("ragged"))       return "⛈️";
        return "⛈️";

      /* ---------- SNOW ---------- */

      case "snow":
        if (d.includes("light"))        return "🌨️";
        if (d.includes("heavy"))        return "❄️";
        if (d.includes("sleet"))        return "🌨️";
        if (d.includes("rain and snow"))return "🌨️";
        return "🌨️";

       

      /* ---------- CLOUDS ---------- */

      case "clouds":
        if (d.includes("few"))          return "🌤️";
        if (d.includes("scattered"))    return "🌥️";
        if (d.includes("broken"))       return "☁️";
        if (d.includes("overcast"))     return "☁️";
        return "☁️";

      /* ---------- FOG / HAZE / MIST / etc. ---------- */

      case "fog":          return "🌫️";
      case "mist":         return "🌫️";
      case "haze":         return "🌫️";
      case "smoke":        return "🌫️";
      case "dust":         return "🏜️";
      case "sand":         return "🏜️";
      case "squall":       return "💨";
      case "tornado":      return "🌪️";

      case "clear":        return "☀️";

      default:             return "❓";  
    }  
  }

  /*   
    ------------------ALGORITHM OF SUMMERISETODAYS---------------------------------------
   1. creted an empty object
   2. traverse through list as it is am array from here split the text and pushed the 0th indexed that is date section into days object
   3. converted days into array and mapped through it extracted min and max temp from here
   4.traverse through slice and extracted the noontime section
   5. return an array of objects

   */

  function summariseToDays(list) {
  const days = {};

  // 1) bucket by date
  list.forEach(p => {
    const k = p.dt_txt.split(' ')[0];
    (days[k] ??= []).push(p);
  });

  // 2) build an array of daily summaries and RETURN it
  return Object.entries(days).map(([date, slices]) => {
    const temps = slices.map(s => s.main.temp);
    const min   = Math.min(...temps).toFixed(0);
    const max   = Math.max(...temps).toFixed(0);

    const temp_sum = temps.reduce((a,b)=>a+b)
    const avg = Math.abs(temp_sum/temps.length).toFixed(0);
  
    const target = new Date(`${date}T12:00:00Z`).getTime() / 1000;
    const noon   = slices.reduce((a, b) =>
        Math.abs(target - a.dt) < Math.abs(target - b.dt) ? a : b);

    return {
      date,
      day : Day(noon.dt),                     // your helper
      temp:avg,
      main: noon.weather[0].main,
      desc: noon.weather[0].description,
      icon:Weather_Type_Icon(noon.weather[0].main , noon.weather[0].description )
    };
  });
}

function Display_Weather_Forecast(Summery){
   const week_forcast_container = document.getElementById("week-forecast")
      week_forcast_container.innerHTML = Summery.map(d=>
        `<div>${d.day}<br><h2>${d.icon}</h2><br>${d.temp}℃</div>`
      ).join('');
}


  function Display_content(weather){

      const Visiblity_value = document.querySelector('.Visiblity')
      const wind_value = document.querySelector('.wind')

      const sunrise_time = document.querySelector('.sunrise_Time')
      const sunset_time = document.querySelector('.Sunset_Time')
      const FeelsLike = document.querySelector('.Feels_like')
      const humidity = document.querySelector('.Humidity')
      const pressure = document.querySelector('.Pressure')
      const Condition = document.querySelector('.Condition')
      const time = document.querySelector('.Time')


      FeelsLike.innerText = `Feels like : ${Math.round(weather.main.feels_like)}℃`
      humidity.innerText = weather.main.humidity
      pressure.innerText = weather.main.pressure
      Condition.innerText = weather.weather[0].description
      time.innerText = formatTime(weather.timezone , timezoneOffsetSeconds)
      
      
      Visiblity_value.innerText =  `${weather.visibility/1000} km ` ; 
      wind_value.innerText = `${weather.wind.speed} km/h`

      sunrise_time.innerText =  formatTime(weather.sys.sunrise , timezoneOffsetSeconds)
      sunset_time.innerText =  formatTime(weather.sys.sunset , timezoneOffsetSeconds)

      /* 
      Condition.innerText = Weather_Type_Icon(weather.weather[0].main , weather.weather[0].description )
      Condition_Text.innerText = Weather_Type(weather.weather[0].main , weather.weather[0].description )
      */


      /*----------------------left section --------------------   */

      const temp = document.querySelector('.temp')
      temp.innerText = `${Math.round(weather.main.temp)}℃`;

      const day= document.querySelector('.day')
      day.innerText = Day(weather.dt)

      const location = document.querySelector('.location')
      location.innerText = `${weather.name} , ${weather.sys.country}`

      const weather_icon = document.querySelector('.weather-icon')
      weather_icon.innerText = Weather_Type_Icon(weather.weather[0].main , weather.weather[0].description)

      const date= document.querySelector('#date')
      date.innerText = `Date : ${formatDate(weather.dt)}`
  }

  async function Load_Weather(lat ,lon){
    try {
      weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=API_KEY`).then((res)=>res.json())
      Hide_Loading();
       
      Display_content(weather)

      forcast_weather_data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=API_KEY`).then((res)=>res.json());

     const Summery = summariseToDays(forcast_weather_data.list) 
     Display_Weather_Forecast(Summery)


    } catch (error) {
      console.log("error occured while fetching weather data",error);
    } finally{
      Search_Input.value = "";
    }
  }

  const DEFAULT_CITY = {          
    lat : 22.8015194,
    lon : 86.2029579,
    name: "Jamshedpur"
  };
  
  Search_Input.addEventListener('keydown' , async function(event) {

    if(event.key === 'Enter'){

     const  City_Name = Search_Input.value.trim();
     const {lat , lon} = await getCityCoordinates(City_Name)

     Load_Weather(lat ,lon)

    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    Load_Weather(DEFAULT_CITY.lat, DEFAULT_CITY.lon);
  });
   


