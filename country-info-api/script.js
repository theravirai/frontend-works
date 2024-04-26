// Countries API.

const countries_el = document.getElementById('countries');
const darkmode_btn = document.getElementById('dark-mode');
const search_el = document.getElementById('search');
const filter_btn = document.getElementById('filter');
const filter_region = filter_btn.querySelectorAll('li');
const modal = document.getElementById('modal');
const close_btn = document.getElementById('close');

get_countries();


// sort an array by name.common key.
function sort_by_key(array)
{
    return array.sort(function(a, b) {
        //console.log(a.name.common);
        var x = a.name.common;
        var y = b.name.common;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

async function get_countries()
{
    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();

    //console.log(countries); // unsorted, as they come from the API.
    //countries_sorted = sort_by_key(countries);
    sort_by_key(countries);
    //console.log(countries_sorted);

    display_countries(countries);
}

function display_countries(countries)
{
    // clear the element before displaying the countries.
    countries_el.innerHTML = '';

    countries.forEach(country => {
        const country_el = document.createElement('div');
        country_el.classList.add('card');
    
        country_el.innerHTML = `
            <div class="card-header">
                <img src="${country.flags.svg}" alt="Peru">
            </div>
            <div class="card-body">
                <h2 class="country-name">
                    ${country.name.common}
                </h2>
                <p class="country-codes" style="display: none">
                    <strong>Codes: </strong>${country.cca2}, ${country.cca3}
                </p>
                <p class="country-capital">
                    <strong>Capital: </strong>${country.capital}
                </p>
                <p class="country-region">
                    <strong>Region: </strong>${country.region}
                </p>
                <p class="country-population">
                    <strong>Population: </strong>${country.population.toLocaleString()}
                </p>
            </div>
        `;

        //console.log(typeof country);

        country_el.addEventListener('click', () =>  {
            modal.style.display = 'flex';
            show_country_details(country);
        });

        countries_el.appendChild(country_el);
    });
}
