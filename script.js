function renderPage() {
  if (list.hasChildNodes) {
    list.replaceChildren();
    callGetCityStorage();
  }
}

const addCity = document.querySelector("#addButton");
const cityInputCloser = document.querySelector(".closer");
const newCityPage = document.querySelector(".addNewCity");
const addCityiButtonLabel = document.querySelector("#addButtonLabel");

// this is
addCity.addEventListener("click", () => {
  addCity.style.display = "none";
  addCityiButtonLabel.style.display = "none";
  newCityPage.style.display = "flex";
});

// this is hidden city selector closer button
cityInputCloser.addEventListener("click", () => {
  newCityPage.style.display = "none";
  addCity.style.display = "block";
  addCityiButtonLabel.style.display = "block";
});

// here we get api from the openweather map
async function getData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a4472e6f29b80cbd9a270656eb0b4ce&units=metric`
  );
  const weather = await response.json();
  console.log(weather);
  return weather;
}

const form = document.querySelector("form");
const list = document.querySelector("ul");

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

async function dotMenu() {
  let miniBarClicked = 0;
  const miniBarIcon = document.querySelector(".fa-ellipsis-vertical");
  const miniBarMenu = document.querySelector(".miniBar");
  miniBarIcon.addEventListener("click", async () => {});
}

let cityStorage = [];
let cityTemplate = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  renderPage();
  const cityInput = document.querySelector(".city");
  let city = cityInput.value;
  let getCity = await getData(city);
  let li = document.createElement("li");

  cityTemplate += `<div class="addNewLocation">
    <i class="fa-solid fa-ellipsis-vertical" onclick="dotMenu()"></i>
    <div class="miniBar" style="display:none;"">
      <button type="reset" class="delete">Delete</button>
    </div>
    <div class="locationInfo">
      <div class="location">
        <img src="${`http://openweathermap.org/img/wn/${getCity.weather[0].icon}@2x.png`}" alt="">
        <div>
          <h1>${getCity.name}, ${getCity.sys.country}</h1>
          <span>${today}</span>
        </div>
      </div>
    </div>
    <div class="temp">
      <h1>${Math.round(
        getCity.main.temp
      )}<img src="./img/celsius.png" alt=""></h1>
      <span>${getCity.weather[0].main}</span>
    </div>
    <div class="otherOptions">
      <div>
        <div class="option1"><i class="fa-solid fa-eye-slash"></i>Visibility <span class="visibility ">${
          getCity.visibility
        }km</span></div>
          <div class="option3"><i class="fa-solid fa-temperature-half"></i>Feels like <span class="feels ">${
            getCity.main.feels_like
          }C</span></div>
        </div>
        <div>
        <div class="option2"><span class="material-symbols-outlined">
        humidity_mid
        </span>Humidity <span class="humidity ">${
          getCity.main.humidity
        }km</span></div>
        <div class="option4"><i class="fa-solid fa-wind"></i>Wind <span class="wind ">${
          getCity.wind.speed
        }km</span></div>
        </div>
      </div>
    </div>`;
  cityStorage.push(cityTemplate);

  localStorage.setItem("City", JSON.stringify(cityTemplate));

  addCity.style.display = "block";
  addCityiButtonLabel.style.display = "block";
  newCityPage.style.display = "none";
  list.innerHTML = cityTemplate;
});

renderPage();
function callGetCityStorage() {
  const getCityStorage = JSON.parse(localStorage.getItem("City"));
  if (getCityStorage) {
    list.innerHTML = getCityStorage;
  }
}
