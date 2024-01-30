"use strict";

function getCountry(country) {
	const btn = document.querySelector(".btn-country");
	const countriesContainer = document.querySelector(".countries");
	const request = new XMLHttpRequest();
	request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
	request.send();
	request.addEventListener("load", function () {
		const [data] = JSON.parse(this.response);
		// console.log(
		// 	Object.values(data.languages)[0],
		// 	Object.values(data.currencies)[0].name
		// );
		console.log(data);
		const html = `
        <article class="country">
		    <img class="country__img" src="${data.flags.png}" />
		    <div class="country__data">
		      <h3 class="country__name">${data.name.common}</h3>
		      <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>🏙️</span>${data.capital}</p>
		      <p class="country__row"><span>👫</span>${(
						+data.population / 1000000
					).toFixed(1)} millions</p>
                    
		      <p class="country__row"><span>🗣️</span>${
						Object.values(data.languages)[0]
					}</p>
		      <p class="country__row"><span>💰</span>${
						Object.values(data.currencies)[0].name
					}</p>
		    </div>
		</article>
        `;
		countriesContainer.insertAdjacentHTML("beforeend", html);
		countriesContainer.style.opacity = 1;
	});
}
getCountry("portugal");
getCountry("usa");
// getCountry("spain");
// getCountry("japan");
