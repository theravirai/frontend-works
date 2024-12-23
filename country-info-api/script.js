// Countries API

const countries_el = document.getElementById("countries");
const darkmode_btn = document.getElementById("dark-mode");
const search_el = document.getElementById("search");
const filter_btn = document.getElementById("filter");
const filter_region = filter_btn.querySelectorAll("li");
const modal = document.getElementById("modal");
const close_btn = document.getElementById("close");

get_countries();

// Sort countries alphabetically
function sort_by_key(array) {
  return array.sort((a, b) => {
    const x = a.name.common;
    const y = b.name.common;

    return x < y ? -1 : x > y ? 1 : 0;
  });
}

// Fetch countries
async function get_countries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
    );

    if (!res.ok) {
      throw new Error("Failed to fetch countries");
    }

    const countries = await res.json();

    sort_by_key(countries);

    display_countries(countries);
  } catch (error) {
    console.error(error);

    countries_el.innerHTML = `
      <h2>Failed to load countries</h2>
    `;
  }
}

// Display country cards
function display_countries(countries) {
  countries_el.innerHTML = "";

  countries.forEach((country) => {
    const country_el = document.createElement("div");

    country_el.classList.add("card");

    country_el.innerHTML = `
      <div class="card-header">
        <img 
          src="${country.flags.svg}" 
          alt="${country.name.common}"
        >
      </div>

      <div class="card-body">

        <h2 class="country-name">
          ${country.name.common}
        </h2>

        <p class="country-capital">
          <strong>Capital:</strong>
          ${country.capital ? country.capital[0] : "N/A"}
        </p>

        <p class="country-region">
          <strong>Region:</strong>
          ${country.region}
        </p>

        <p class="country-population">
          <strong>Population:</strong>
          ${country.population.toLocaleString()}
        </p>

      </div>
    `;

    countries_el.appendChild(country_el);
  });
}

// Show country details in modal
function show_country_details(country) {
  const modal_body = modal.querySelector(".modal-body");
  const modal_img = modal.querySelector("img");

  modal_img.src = country.flags.svg;

  // Currencies
  let currencies_list = "N/A";

  if (country.currencies) {
    currencies_list = Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(", ");
  }

  // Languages
  let languages_list = "N/A";

  if (country.languages) {
    languages_list = Object.values(country.languages).join(", ");
  }

  modal_body.innerHTML = `
  
    <h2 class="country-name">
      ${country.name}
    </h2>

    <p>
      <strong>CCA2:</strong>
      ${country.cca2 || "N/A"}
    </p>

    <p>
      <strong>Region:</strong>
      ${country.region || "N/A"}
    </p>

    <p>
      <strong>Area:</strong>
      ${country.area || "N/A"}
    </p>

    <p>
      <strong>Capital:</strong>
      ${country.capital ? country.capital[0] : "N/A"}
    </p>

    <p>
      <strong>Population:</strong>
      ${country.population ? country.population.toLocaleString() : "N/A"}
    </p>

    <p>
      <strong>LatLng:</strong>
      ${country.latlng || "N/A"}
    </p>

    <p>
      <strong>Time Zones:</strong>
      ${country.timezones || "N/A"}
    </p>

    <p>
      <strong>Currencies:</strong>
      ${currencies_list}
    </p>

    <p>
      <strong>Languages:</strong>
      ${languages_list}
    </p>

    <p>
      <strong>Borders:</strong>
      ${country.borders ? country.borders.join(", ") : "N/A"}
    </p>
  `;
}

// Enable dark mode by default
document.body.classList.toggle("dark");

// Toggle dark mode
darkmode_btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Toggle dropdown
filter_btn.addEventListener("click", () => {
  filter_btn.classList.toggle("open");
});

// Close modal
close_btn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Search countries
search_el.addEventListener("input", (e) => {
  const search_term = e.target.value.toLowerCase();

  const query_list = document.querySelectorAll(".country-name");

  let results_count = 0;

  query_list.forEach((item) => {
    if (item.innerText.toLowerCase().includes(search_term)) {
      item.parentElement.parentElement.style.display = "block";

      results_count++;
    } else {
      item.parentElement.parentElement.style.display = "none";
    }
  });

  if (results_count === 0) {
    console.log("No results found");
  }
});

// Filter by region
filter_region.forEach((filter) => {
  filter.addEventListener("click", () => {
    const filter_value = filter.innerHTML;

    const query_list = document.querySelectorAll(".country-region");

    query_list.forEach((item) => {
      if (item.innerText.includes(filter_value) || filter_value === "All") {
        item.parentElement.parentElement.style.display = "block";
      } else {
        item.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
