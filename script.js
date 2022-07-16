const URL_ID = 'https://rickandmortyapi.com/api/character/';
const URL_NAME = 'https://rickandmortyapi.com/api/character/?name=';

let card = "";
let characters;
let nextPage;

let searchBTN = document.querySelector(".search-btn");
let randomBTN = document.querySelector(".random-btn");
let moreBTN = document.querySelector(".more-btn");
let upBTN = document.querySelector(".up-btn");
let backBTN = document.querySelector(".back-btn");
let wrapperCards = document.querySelector(".wrapper-cards");

window.addEventListener('DOMContentLoaded', () => {
    filterCharacters(URL_ID, '', arrayOfCharacters)
})

const filterCharacters = async (url, type, callback) => {
    characters = await fetch(url + type)
                .then(res => res.json())
                .catch(err => { console.log(err)})

    if(characters.error == 'There is nothing here'){
        alert(characters.error)
    }else{
        // Check if user enter with a character name 
        if(typeof(type) === "string"){
            nextPage = nextCharactersPage(characters);
            backBTN.classList.remove("display");
        }else{
            moreBTN.classList.remove("display");
            upBTN.classList.remove("display");
        }
        callback(characters);
    }
}

// Check for similar characters on other pages and set the load more button display
const nextCharactersPage = (data) => {
    if(data.info.next){
        moreBTN.classList.add("display");
        upBTN.classList.add("display");
        return characters.info.next;
    }else{
        moreBTN.classList.remove("display");
        upBTN.classList.remove("display");
        return null;
    }
}
 
const arrayOfCharacters = (data) => {
    for(let character of data.results){
        characterInfo(character)
    }
}

const characterInfo = (data) => {
    card += `<div class="card">
                <div class="img-box">
                    <img src=${data.image} alt="Image of ${data.name}">
                </div>
                <h3 class="t-align-center">${data.name}</h3>
                <div class="info-box">
                    <p>Species: ${data.species}</p>
                    <p>Status: <span class=${data.status}>${data.status == 'unknown' ? 'Unknown' : data.status}<span></p>
                    <p>Gender: ${data.gender}</p>
                    <p>Location: ${data.location.name}</p>
                </div>
            </div>`
    
    wrapperCards.innerHTML = card;
}

const searchCharacter = () => {
    let name = document.querySelector(".search-input").value;
    filterCharacters(URL_NAME, name, arrayOfCharacters);
    card = "";
    nextPage = "";
    document.querySelector(".search-input").value = "";
}

// Generate number for random search
const generateNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

searchBTN.addEventListener("click", searchCharacter);

backBTN.addEventListener("click", searchCharacter);

randomBTN.addEventListener("click", ()=> {
    let id_number = generateNumber(1, 671);
    filterCharacters(URL_ID, id_number, characterInfo);
    backBTN.classList.add("display");
    card = "";
})

moreBTN.addEventListener("click", () => {
    filterCharacters(nextPage, "", arrayOfCharacters);
})

upBTN.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
})


