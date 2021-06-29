const URL_ID = 'https://rickandmortyapi.com/api/character/';
const URL_NAME = 'https://rickandmortyapi.com/api/character/?name=';

let card = "";
let characters;

let search_btn = document.querySelector(".search-btn");
let random_btn = document.querySelector(".random-btn")
let display = document.querySelector(".display");

async function filterByID(url, id, callback){
    characters = await fetch(url + id)
                .then(res => res.json())
                .catch(err => console.log(err))

    callback(characters)
}

function arrayOfCharacters(data){
    for(let character of data.results){
        characterInfo(character)
    }
}

function characterInfo(data){
    card += `<div class="card">
                <div class="img-box">
                    <img src=${data.image} alt="Image of ${data.name}">
                </div>
                <div class="info-box">
                    <p>Name: ${data.name}</p>
                    <p>Species: ${data.species}</p>
                    <p>Status: <span class=${data.status}>${data.status}<span></p>
                    <p>Location: ${data.location.name}</p>
                </div>
            </div>`
    
    display.innerHTML = card;
}

function generateNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

search_btn.addEventListener("click", ()=> {
    let name = document.querySelector(".search-input").value;
    filterByID(URL_NAME, name, arrayOfCharacters);
    card = "";
})

random_btn.addEventListener("click", ()=> {
    let id_number = generateNumber(1, 671);
    filterByID(URL_ID, id_number, characterInfo);
    card = "";
})

