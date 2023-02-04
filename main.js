window.addEventListener("load", () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        document.querySelector(
          "#countries"
        ).innerHTML += `<option class="country" value="${item.name.common}">${item.name.common}</option>`;
      });
    });
});

const flag = document.querySelector(".flag");
const container = document.querySelector(".container");
const region = document.querySelector(".region p");
const capitals = document.querySelector(".capitals p");
const languagesDiv = document.querySelector(".languages p");
const currencies = document.querySelector(".currencies p");
const population = document.querySelector(".population p");
const bordersText = document.querySelector(".borders p");
const map = document.querySelector(".map p");

document.querySelector("#countries").addEventListener("change", (e) => {
  container.classList.remove("checked");
  console.log(e.target.value);
  fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        flag.innerHTML = `<img src="${item.flags.png}" alt="${item.name.common}">`;
        region.innerHTML = item.region;
        for (let cap of Object.values(item.capital)) {
          capitals.innerHTML = cap;
        }
        languagesDiv.innerHTML = "";
        let langArr = [];
        for (let lang of Object.values(item.languages)) {
          langArr.push(lang);
          if (langArr.length < 2) {
            languagesDiv.innerHTML += lang;
          } else {
            languagesDiv.innerHTML += `, ${lang}`;
          }
        }

        let curArr = [];
        currencies.innerHTML = "";
        for (let cur of Object.values(item.currencies)) {
          curArr.push(cur);
          if (curArr.length < 2) {
            currencies.innerHTML += `${cur.name} ${cur.symbol}`;
          } else {
            currencies.innerHTML += `, ${cur.name} ${cur.symbol}`;
          }
        }

        population.innerHTML = item.population;

        let borderArr = [];
        bordersText.innerHTML = "";
        if (item.borders) {
          for (let border of item.borders) {
            borderArr.push(border);
            if (borderArr.length < 2) {
              bordersText.innerHTML += border;
            } else {
              bordersText.innerHTML += `, ${border}`;
            }
          }
        } else {
          bordersText.innerHTML = "No Borders";
        }
        map.innerHTML = `<a href="${item.maps.googleMaps}" target="_blank"">Harita</a>`;
        console.log(item.maps.googleMaps);
      });
      console.log(data);
    });
});

let languages = {
  newZeland: {
    eng: "English",
    mri: "Māori",
    nzs: "New Zealand Sign Language",
  },
};

for (let i of Object.values(languages)) {
  console.log(i.eng);
}

let para = {
  TRY: { name: "Turkish lira", symbol: "₺" },
};

for (let [i, k] of Object.entries(para)) {
  console.log(k.name);
}
