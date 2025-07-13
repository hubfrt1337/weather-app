const city = document.querySelector(".city");
const finderInput = document.getElementById("finder");
const info = document.querySelector(".wheather-today-info");
const icon = document.getElementById("iconJs");
const temp = document.querySelector(".temperature");
const stat = document.querySelector(".status");
const perceived = document.getElementById("perceivedId");
const pressure = document.getElementById("pressureId");
const wind = document.getElementById("windId");
const icon0 = document.getElementById("icon0");
const temp0 = document.querySelector(".temp0");
const data0 = document.getElementById("data0");
const icon1 = document.getElementById("icon1");
const temp1 = document.querySelector(".temp1");
const data1 = document.getElementById("data1");
const icon2 = document.getElementById("icon2");
const temp2 = document.querySelector(".temp2");
const data2 = document.getElementById("data2");
const icon3 = document.getElementById("icon3");
const temp3 = document.querySelector(".temp3");
const data3 = document.getElementById("data3");
const icon4 = document.getElementById("icon4");
const temp4 = document.querySelector(".temp4");
const data4 = document.getElementById("data4");
const icon5 = document.getElementById("icon5");
const temp5 = document.querySelector(".temp5");
const data5 = document.getElementById("data5");
const icon6 = document.getElementById("icon6");
const temp6 = document.querySelector(".temp6");
const data6 = document.getElementById("data6");
const icon7 = document.getElementById("icon7");
const temp7 = document.querySelector(".temp7");
const data7 = document.getElementById("data7");
const icon8 = document.getElementById("icon8");
const temp8 = document.querySelector(".temp8");
const data8 = document.getElementById("data8");
const icon9 = document.getElementById("icon9");
const temp9 = document.querySelector(".temp9");
const data9 = document.getElementById("data9");
const icon10 = document.getElementById("icon10");
const temp10 = document.querySelector(".temp10");
const data10 = document.getElementById("data10");
const icon11 = document.getElementById("icon11");
const temp11 = document.querySelector(".temp11");
const data11 = document.getElementById("data11");
const icon12 = document.getElementById("icon12");
const temp12 = document.querySelector(".temp12");
const data12 = document.getElementById("data12");
const icon13 = document.getElementById("icon13");
const temp13 = document.querySelector(".temp13");
const data13 = document.getElementById("data13");
const icon14 = document.getElementById("icon14");
const temp14 = document.querySelector(".temp14");
const data14 = document.getElementById("data14");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const inside = document.querySelector(".inside");
let metrics = [];
const iconsArray = [
  icon0,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
];
const tempArray = [
  temp0,
  temp1,
  temp2,
  temp3,
  temp4,
  temp5,
  temp6,
  temp7,
  temp8,
  temp9,
  temp10,
  temp11,
  temp12,
  temp13,
  temp14,
];
const dataArray = [
  data0,
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
  data11,
  data12,
  data13,
  data14,
];

getWheater(finderInput.value);
getIcon(finderInput.value);
getDate();
setInterval(getDate, 5000);

async function getWheater(name) {
  let cityName;
  if (!name) {
    cityName = "Poznań";
  } else {
    cityName = name;
  }
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=6Q793XTBFCDYVQ5E635KCRYQC&contentType=json`;
  try {
    const res = await fetch(url);
    if (res.status === 400) {
      const errText = document.querySelector(".err-text");
      errText.classList.add("err-text-show");
      console.log(errText);
      setTimeout(() => {
        errText.classList.remove("err-text-show");
      }, 2000);
      throw new Error("nieprawidłowe miasto");
    }
    if (!res.ok) {
      throw new Error(res.status);
    }
    const response = await res.json();

    city.textContent = response.resolvedAddress.split(",")[0];
    temp.innerHTML = `${response.days[0].temp}</br>°C`;
    stat.textContent = response.currentConditions.conditions;
    perceived.textContent = `${response.days[0].feelslike}°C`;
    pressure.textContent = response.days[0].pressure;
    wind.textContent = response.days[0].windspeed + "km/h";
    //
    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i].textContent = `${response.days[i].temp}`;
      dataArray[i].textContent = response.days[i].datetime.replace("2025-", "");
      marginByTemperature(response.days[i].temp, tempArray[i]);
    }
  } catch (err) {
    console.log(err);
  }
}

finderInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWheater(finderInput.value);
    getIcon(finderInput.value);
    console.log(finderInput.value);
  }
});
document.getElementById("search").addEventListener("click", function () {
  getIcon(finderInput.value);
  getWheater(finderInput.value);
  console.log(finderInput.value);
});

async function getIcon(name) {
  let cityName;
  if (!name) {
    cityName = "Poznań";
  } else {
    cityName = name;
  }
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=6Q793XTBFCDYVQ5E635KCRYQC&contentType=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    for (let i = 0; i < 6; i++) {
      console.log(data.days[i].icon)
      const currentId = findId(data.days[i].icon);
      console.log(currentId);
      const response = await fetch(`https://api.giphy.com/v1/gifs/${currentId}?api_key=tUl7YdgQWIEQr5EAdB9l7F5pWOnVZM6n`);
      console.log(response)
      let datas;
      switch (response.status) {
        case 200:
          datas = await response.json();
          break;
        case 404:
          console.warn("Nie znaleziono Url, błędne miasto");
          //getIcon("Poznan");
          break;
        case 429:
          console.warn("Too many requests");
          break;
        default:
          throw new Error(`Nieoczekiwany status ${response.status}`);
      }
      if (i === 0) {
        icon.src = datas.data.images.fixed_width_small.url;
      }

      iconsArray[i].src = datas.data.images.fixed_width_small.url;
    }
  } catch (err) {
    console.log(err);
  }
}

function findId(currentIcon) {
  let currentId = "";
  if (currentIcon === "snow") {
    return (currentId = "h4rVmXTEaH160");
  } else if (currentIcon === "rain") {
    return (currentId = "9aJp6recvQwbjoRgtb");
  } else if (currentIcon === "fog") {
    return (currentId = "W5C6NZGppWc4eZpFYg");
  } else if (currentIcon === "wind") {
    return (currentId = "lnJcK0KjOYwrnlN1iI");
  } else if (currentIcon === "cloudy") {
    return (currentId = "V4ErRLRQG2lfKOjIht");
  } else if (currentIcon === "partly-cloudy-day") {
    return (currentId = "OB3gdVEUzUegDzhgPb");
  } else if (currentIcon === "party-cloudy-night") {
    return (currentId = "c2D2388XDMGVwUeD90");
  } else if (currentIcon === "clear-day") {
    return (currentId = "wGiDflDuxNx4keYKcb");
  } else if (currentIcon === "clear-night") {
    return (currentId = "2A0jXrfittsR3Qae1U");
  }
}

function marginByTemperature(t, el) {
  el.style.marginBottom = `${(t - 12) * 0.8}rem`;
}

function getDate() {
  const date = new Date();
  const mins = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const currentDate = `${hours}:${mins}`;
  info.textContent = `Wheather-now-today hour: ${currentDate}`;
}
