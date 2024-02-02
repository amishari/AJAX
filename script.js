"use strict";

// function getCountry(country) {
// 	const btn = document.querySelector(".btn-country");
// 	const countriesContainer = document.querySelector(".countries");
// 	const request = new XMLHttpRequest();
// 	request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
// 	request.send();
// 	request.addEventListener("load", function () {
// 		const [data] = JSON.parse(this.response);
// 		// console.log(
// 		// 	Object.values(data.languages)[0],
// 		// 	Object.values(data.currencies)[0].name
// 		// );
// 		console.log(data);
// 		const html = `
//         <article class="country">
// 		    <img class="country__img" src="${data.flags.png}" />
// 		    <div class="country__data">
// 		      <h3 class="country__name">${data.name.common}</h3>
// 		      <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>🏙️</span>${data.capital}</p>
// 		      <p class="country__row"><span>👫</span>${(
// 						+data.population / 1000000
// 					).toFixed(1)} millions</p>

// 		      <p class="country__row"><span>🗣️</span>${
// 						Object.values(data.languages)[0]
// 					}</p>
// 		      <p class="country__row"><span>💰</span>${
// 						Object.values(data.currencies)[0].name
// 					}</p>
// 		    </div>
// 		</article>
//         `;
// 		countriesContainer.insertAdjacentHTML("beforeend", html);
// 		countriesContainer.style.opacity = 1;
// 	});
// }
// getCountry("portugal");
// getCountry("usa");

// getCountry("spain");
// getCountry("japan");

Modern Way ES-6 Promise
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
function renderCountry(data, className = "") {
	const html = `
	<article class="country ${className}">
		<img class="country__img" src="${data.flags.png}" />
		<div class="country__data">
		  <h3 class="country__name">${data.name.common}</h3>
		  <h4 class="country__region">${data.region}</h4>
		  <p class="country__row"><span>🏙️</span>${data.capital}</p>
		  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
				1
			)} millions</p>

		  <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
		  <p class="country__row"><span>💰</span>${
				Object.values(data.currencies)[0].name
			}</p>
		</div>
	</article>
	`;
	countriesContainer.insertAdjacentHTML("beforeend", html);
	countriesContainer.style.opacity = 1;
}

function getCountryData(country) {
	fetch(`https://restcountries.com/v3.1/name/${country}`)
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (data) {
			renderCountry(data[0]);
			// for neighbors
			const neighbors = data[0].borders[0];
			if (!neighbors) return;
			console.log(neighbors);
			return fetch(`https://restcountries.com/v3.1/alpha/${neighbors}`);
		})
		.then((response) => response.json())
		.then(function (data) {
			renderCountry(data[0], "neighbor");
		});
}
getCountryData("austria");

ES-6 Catching error centrally with refraction
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
function renderError(msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
}
function renderCountry(data, className = "") {
  const html = `
	<article class="country ${className}">
		<img class="country__img" src="${data.flags.png}" />
		<div class="country__data">
		  <h3 class="country__name">${data.name.common}</h3>
		  <h4 class="country__region">${data.region}</h4>
		  <p class="country__row"><span>🏙️</span>${data.capital}</p>
		  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
        1
      )} millions</p>

		  <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
		  <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
		</div>

	</article>
	`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
}
//Avoiding duplicates in code:
function getJSON(url, errMsg = "Something went wrong!!") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errMsg} Code: ${response.status}. `);
    return response.json();
  });
}
function getCountryData(country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    "Country not found!!"
  )
    .then(function (data) {
      renderCountry(data[0]);
      // for neighbors
      const neighbors = data[0].borders[0];
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbors}`,
        "Country not found!!"
      );
    })
    .then((data) => renderCountry(data[0], "neighbor"))
    .catch((err) => renderError(`Something went wrong! No neighbor exists!! `))
    .finally(() => (countriesContainer.style.opacity = 1)); // this line will executes regardless of promise result
}
btn.addEventListener("click", () => getCountryData("poland"));

// a proof for priority of executing microtasks queue over callback queue
// console.log("Test");0
// setTimeout(() => console.log("0s passed!"), 0);
// Promise.resolve("resolved promise one!").then((res) => console.log(res));
// Promise.resolve("resolved promise two!").then((res) => {
//   for (let index = 0; index < 1_000_000_0000; index++) {}
//   return console.log(res);
// });
// console.log("Test Ends!");
