var search = document.getElementById("search");

search.addEventListener("input", function () {
  x(search.value);
});

var api = [];
async function x(city) {
  try {
    const g = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=d34ab3bbc879455fb45212617240712&q=${city}&days=3`
    );
    const data = await g.json();
    api = data;
    console.log(api);
    display();
    displayX();
    displayy();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function display() {
  if (!api.location || !api.forecast) return;
  const today = api.forecast.forecastday[0];
  var cartona = `
    <div class="d-flex justify-content-between w-100 align-items-center nn">
      <p>${new Date(today.date).toLocaleDateString("en-US", {
        weekday: "long",
      })}</p>
      <p>${new Date(today.date).toLocaleDateString("en-US")}</p>
    </div>
    <div class="dd px-4">
      <p class="py-3">${api.location.name}</p>
      <h1 class="display-1 fw-bold">${today.day.avgtemp_c}&deg;C</h1>
      <img src="${today.day.condition.icon}" alt="" class="py-3">
      <p class="text-info py-3">${today.day.condition.text}</p>
    </div>
    <div class="d-flex justify-content-around cc">
      <p><i class="fa-solid fa-umbrella"></i> ${
        today.day.daily_chance_of_rain
      }%</p>
      <p><i class="fa-solid fa-wind"></i> ${api.current.wind_kph} km/h</p>
      <p><i class="fa-regular fa-compass"></i> ${api.current.wind_dir}</p>
    </div>
  `;
  document.getElementById("colNum1").innerHTML = cartona;
}

function displayX() {
  if (!api.forecast) return;
  const tomorrow = api.forecast.forecastday[1];
  var cartonaa = `
    <div class="text-center ll m-0">
      <p>${new Date(tomorrow.date).toLocaleDateString("en-US", {
        weekday: "long",
      })}</p>
    </div>
    <div class="vv px-4 text-center">
      <img src="${tomorrow.day.condition.icon}" alt="" class="my-3">
      <h2 class="my-5">${tomorrow.day.avgtemp_c}&deg;C</h2>
      <p class="text-info my-5">${tomorrow.day.condition.text}</p>
    </div>
  `;
  document.getElementById("colNum2").innerHTML = cartonaa;
}

function displayy() {
  if (!api.forecast) return;
  const dayAfterTomorrow = api.forecast.forecastday[2];
  var cartonaaa = `
    <div class="text-center ss">
      <p>${new Date(dayAfterTomorrow.date).toLocaleDateString("en-US", {
        weekday: "long",
      })}</p>
    </div>
    <div class="kk px-4 text-center">
      <img src="${dayAfterTomorrow.day.condition.icon}" alt="" class="my-3">
      <h2 class="my-5">${dayAfterTomorrow.day.avgtemp_c}&deg;C</h2>
      <p class="text-info my-5">${dayAfterTomorrow.day.condition.text}</p>
    </div>
  `;
  document.getElementById("colNum3").innerHTML = cartonaaa;
}

async function first() {
  try {
    await x("Cairo");
  } catch (error) {
    console.error("Error in first():", error);
  }
}
first();
