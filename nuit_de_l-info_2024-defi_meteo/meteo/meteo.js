function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

function performAction(action) {
  switch (action) {
    case "sleep":
      updateStat("sleep", 20);
      break;
    case "comfy":
      updateStat("mood", 15);
      break;
    case "play":
      updateStat("dryness", 25);
      break;
    case "heat":
      updateStat("temperature", 10);
      break;
    default:
      console.log("Unknown action");
  }
}

function updateStat(stat, value) {
  const progressBar = document.getElementById(stat);
  const icon = document.getElementById(`${stat}-icon`);
  const currentValue = parseInt(progressBar.value, 10);
  const newValue = Math.min(100, Math.max(0, currentValue + value));

  console.log(`Updating stat ${stat} from ${currentValue} to ${newValue}`);

  progressBar.value = newValue;

  if (value > 0) {
    icon.textContent = "arrow_upward";
  } else if (value < 0) {
    icon.textContent = "arrow_downward";
  } else {
    icon.textContent = "remove";
  }
}

let toggleState = 0; // 0 for the first cat, 1 for the second cat

// Fonction qui alterne les deux dessins du chat
function toggleCatArt() {
  const petArt = document.getElementById("pet-art");

  if (toggleState === 0) {
    petArt.textContent = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡴⣆⠀⠀⠀⠀⠀⣠⡀⠀⠀⠀⠀⠀⠀⣼⣿⡗⠀⠀⠀⠀
⠀⠀⠀⣠⠟⠀⠘⠷⠶⠶⠶⠶⠾⠉⢳⡄⠀⠀⠀⠀⠀⣧⣿⠀⠀⠀⠀⠀
⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣤⣤⣤⣤⣤⣿⢿⣄⠀⠀⠀⠀
⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠀⠀⠀⠀⠀⠀⠙⣷⡴⠶⣦
⠀⠀⢱⡀⠀⠉⠉⠀⠀⠀⠀⠛⠃⠀⢠⡟⠀⠀⠀⢀⣀⣠⣤⠿⠞⠛⠋
⣠⠾⠋⠙⣶⣤⣤⣤⣤⣤⣤⣀⣠⣤⣾⣿⠴⠶⠚⠋⠉⠁⠀⠀⠀⠀⠀⠀
⠛⠒⠛⠉⠉⠀⠀⠀⣴⠟⢃⡴⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        `;
    toggleState = 1;
  } else {
    petArt.textContent = `

⠀⢀⡴⣆⠀⠀⠀⠀⠀⣠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣠⠟⠀⠘⠷⠶⠶⠶⠾⠉⢳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀      ⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣤⣤⣤⣤⣤⣤⣧⣿⣿⣿⣿⡗⠀⠀⠀⠀
⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠀⠀⠀⠀⠀⠀⠙⣷⡴⠶⣦
⠀⠀⢱⡀⠀⠉⠉⠀⠀⠀⠀⠛⠃⠀⢠⡟⠀⠀⠀⢀⣀⣠⣤⠿⠞⠛⠋
⣠⠾⠋⠙⣶⣤⣤⣤⣤⣤⣤⣀⣠⣤⣾⣿⠴⠶⠚⠋⠉⠁⠀⠀⠀⠀⠀⠀
⠛⠒⠛⠉⠉⠀⠀⠀⣴⠟⢃⡴⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀       ⠀⠀⠀⠀⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        `;
    toggleState = 0;
  }
}

// Appel de la fonction toggleCatArt toutes les 0,5 secondes
setInterval(toggleCatArt, 500);

const apiKey = "rjCuB3j65eRmtNxZinHBp0a16Rf8a0pc";

async function getIPAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log("Adresse IP:", data.ip);
    return data.ip; // Retourne l'adresse IP de l'utilisateur
  } catch (error) {
    console.error("Erreur lors de la récupération de l'IP:", error);
  }
}

async function getLocation(ip) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${apiKey}&q=${ip}`,
    );
    const data = await response.json();
    console.log("Location:", data);
    return data.Key; // Retourne la clé de localisation
  } catch (error) {
    console.error("Erreur lors de la récupération de la localisation:", error);
  }
}

async function getCurrentWeather(locationKey) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=en-us&details=true`,
    );
    const data = await response.json();
    console.log("Current weather:", data);
    return data[0]; // Retourne les conditions météorologiques actuelles
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des conditions météorologiques actuelles:",
      error,
    );
  }
}

async function getHourlyForecast(locationKey) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}&language=en-us&details=true&metric=true`,
    );
    const data = await response.json();
    console.log("Prévisions horaires:", data);
    return data; // Retourne les prévisions horaires
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des prévisions horaires:",
      error,
    );
  }
}

function mapWeatherToCategory(weatherText) {
  const lowerCaseText = weatherText.toLowerCase();
  if (
    lowerCaseText.includes("rain") ||
    lowerCaseText.includes("shower") ||
    lowerCaseText.includes("water_drop")
  ) {
    return "water_drop";
  } else if (lowerCaseText.includes("thunder")) {
    return "thunderstorm";
  } else if (lowerCaseText.includes("snow")) {
    return "cloudy_snowing";
  } else if (
    lowerCaseText.includes("sunny") ||
    lowerCaseText.includes("clear")
  ) {
    return "clear_day";
  } else if (
    lowerCaseText.includes("cloud") ||
    lowerCaseText.includes("overcast")
  ) {
    return "cloud";
  } else if (
    lowerCaseText.includes("snowstorm") ||
    lowerCaseText.includes("blizzard")
  ) {
    return "ac_unit";
  } else if (lowerCaseText.includes("mist") || lowerCaseText.includes("fog")) {
    return "mist";
  } else if (
    lowerCaseText.includes("alert") ||
    lowerCaseText.includes("warning")
  ) {
    return "emergency_home";
  } else {
    return "unknown";
  }
}

function getBonusMalusIcons(category) {
  switch (category) {
    case "water_drop":
      return { bonus: "hotel", malus: "dry" };
    case "thunderstorm":
      return { bonus: "mood", malus: "hotel" };
    case "cloudy_snowing":
      return { bonus: "hotel", malus: "thermostat" };
    case "clear_day":
      return { bonus: "mood", malus: "hotel" };
    case "cloud":
      return { bonus: "dry", malus: "mood" };
    case "ac_unit":
      return { bonus: "mood", malus: "thermostat" };
    case "mist":
      return { bonus: "dry", malus: "mood" };
    case "emergency_home":
      return { bonus: "thermostat", malus: "mood" };
    default:
      return { bonus: "help_outline", malus: "help_outline" };
  }
}

async function updateWeatherStats() {
  try {
    const ip = await getIPAddress();
    const locationKey = await getLocation(ip);
    const currentWeather = await getCurrentWeather(locationKey);
    const forecast = await getHourlyForecast(locationKey);

    // Mettez à jour les statistiques en fonction des prévisions horaires
    const temperature = forecast[0].Temperature.Value;

    console.log(`Current weather: ${currentWeather.WeatherText}`);

    console.log(document.getElementById("current-weather-icon"));

    // Update current weather text and icons
    document.getElementById("current-weather-icon").textContent =
      mapWeatherToCategory(currentWeather.WeatherText);

    let currentWeatherCategory = mapWeatherToCategory(
      currentWeather.WeatherText,
    );

    console.log(`Current weather category: ${currentWeatherCategory}`);

    let { bonus: currentBonus, malus: currentMalus } = getBonusMalusIcons(
      currentWeatherCategory,
    );

    document.getElementById("current-bonus").textContent = currentBonus;
    document.getElementById("current-malus").textContent = currentMalus;

    // Mettre à jour les prévisions horaires pour les 5 prochaines heures
    for (let i = 1; i <= 5; i++) {
      const hourlyWeatherText = forecast[i - 1].IconPhrase;
      let hourlyWeatherCategory = mapWeatherToCategory(hourlyWeatherText);
      const { bonus, malus } = getBonusMalusIcons(hourlyWeatherCategory);
      // document.getElementById(`min-temp-${i}`).textContent = forecast[i - 1].Temperature.Minimum.Value;
      //document.getElementById(`max-temp-${i}`).textContent = forecast[i - 1].Temperature.Maximum.Value;
      document.getElementById(`condition-${i}`).textContent =
        hourlyWeatherCategory;
      document.getElementById(`bonus-${i}`).textContent = bonus;
      document.getElementById(`malus-${i}`).textContent = malus;
    }
  } catch (error) {
    console.error("Error updating weather stats:", error);
  }
}

function applyWeatherEffects(weatherCategory) {
  switch (weatherCategory) {
    case "water_drop" || "water_drop":
      updateStat("sleep", 5);
      updateStat("dryness", -5);
      break;
    case "thunderstorm":
      updateStat("mood", 5);
      updateStat("sleep", -5);
      break;
    case "cloudy_snowing":
      updateStat("sleep", 5);
      updateStat("temperature", -5);
      break;
    case "clear_day":
      updateStat("mood", 5);
      updateStat("sleep", -5);
      break;
    case "cloud":
      updateStat("dryness", 5);
      updateStat("mood", -5);
      break;
    case "ac_unit":
      updateStat("sleep", 5);
      updateStat("temperature", -5);
      break;
    case "mist":
      updateStat("dryness", 5);
      updateStat("mood", -5);
      break;
    case "emergency_home":
      updateStat("temperature", 5);
      updateStat("mood", -5);
      break;
    default:
      break;
  }
}

function applyCurrentForecastEffects() {
  console.log("Applying effects for current forecast");

  const currentWeatherText = document.getElementById(
    "current-weather-icon",
  ).textContent;
  const currentWeatherCategory = mapWeatherToCategory(currentWeatherText);

  console.log(
    `Applying effects for current weather category: ${currentWeatherCategory}`,
  );

  applyWeatherEffects(currentWeatherCategory);
}

// Appel de la fonction updateWeatherStats toutes les 12 heures
setInterval(updateWeatherStats, 12 * 60 * 60 * 1000);

// Appel initial pour mettre à jour les statistiques dès le chargement de la page
updateWeatherStats();

// Appliquer les effets du forecast actuel toutes les 5 secondes
setInterval(applyCurrentForecastEffects, 5000);
