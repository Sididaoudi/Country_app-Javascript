// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// fetch("https://restcountries.com/v3.1/all")
//     .then((res) => res.json())
//     .then((data) => console.log(data));




// 3 - Passer les données à une variable



const input = document.getElementById("inputSearch");
const countryContain = document.getElementById("countriesContainer");
const range = document.getElementById("inputRange");
let countryData = [];
let rangeValue = document.getElementById("rangeValue");
let min = document.getElementById("minToMax");
let max = document.getElementById("maxToMin");
let alpha = document.getElementById("alpha");






// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP


const fetchCountry = async () => {
    await fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => countryData = data);
};

const displayCountries = (countries) => {
    countryContain.innerHTML = countries.map((country) =>
        `
            <div class="card">
                <h3>${country.translations.fra.common}</h3>
                <img src=${country.flags.png} alt="drapeau de ${country.translations.fra.common}" />
                <h4>${country.capital}</h4>
                <p>Population : ${country.population}</p>
            </div>
        `)
        .join('');
};


const countryDisplay = async () => {
    await fetchCountry();

    displayCountries(countryData);

    input.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filteredCountries = countryData.filter((country) => {
            return country.translations.fra.common.toLowerCase().includes(searchTerm);
        });


        displayCountries(filteredCountries);
        
    });



    range.addEventListener('input', (e) => { 

             
        rangeValue.innerHTML = e.target.value;

        const inputRange = Number(e.target.value); // Convertir en nombre entier (ChatGTP)

        const filteredCountries = countryData.slice(0, inputRange); // Utiliser slice pour obtenir les pays de l'index 0 jusqu'à l'index spécifié par inputRange  (ChatGTP)

        displayCountries(filteredCountries);
    });

    min.addEventListener('click', () => {

        const filteredCountries = countryData.sort((countryA, countryB) => { // Aide de ChatGTP
            return countryA.population - countryB.population;
        });

        displayCountries(filteredCountries);

    });


    max.addEventListener('click', () => {

        const filteredCountries = countryData.reverse().sort(); // Fait sans chatGTP

        displayCountries(filteredCountries);

    });

    alpha.addEventListener('click', () => {  

        const filteredCountries = countryData.sort((countryA, countryB) => {
            if (countryA.translations.fra.common < countryB.translations.fra.common) { 
                return -1;
            } else {
                return 1;
            }
        });
      
        displayCountries(filteredCountries);

        

    });

};

countryDisplay();



// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value); // (ChatGPT)


// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value) (solution à l'aide de CHATGPT sans tricher)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays (fait à l'aide de chatgpt, j'ai réussi à faire le tri par ordre alphabétique à l'aide de chatGTP sans tricher, 
// idem pour min et max) 

// Notes : mon code n'est pas opti, prendre la correction pour un code plus propre sans me répeter notamment pour les trois boutons (min,max et alpha) faire un forEach

// Points positifs : j'ai réussi à faire pratiquement tout seul, j'ai compris mon code et j'ai fait des recherches pour trouver les solutions, j'ai utilisé ChatGTP sans tricher 
