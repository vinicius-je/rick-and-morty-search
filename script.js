const URL_ID = 'https://rickandmortyapi.com/api/character/';
const URL_NAME = 'https://rickandmortyapi.com/api/character/?name=';

let card = "";
let characters;
let nextPage;

let search_btn = document.querySelector(".search-btn");
let random_btn = document.querySelector(".random-btn");
let more_btn = document.querySelector(".more-btn")
let wrapper_cards = document.querySelector(".wrapper-cards");

window.addEventListener('DOMContentLoaded', () => {
    filterCharacters(URL_ID, '', arrayOfCharacters)
})

async function filterCharacters(url, type, callback){
    characters = await fetch(url + type)
                .then(res => res.json())
                .catch(err => { console.log(err)})

    if(characters.error == 'There is nothing here'){
        alert(characters.error)
    }else{
        //check if user enter with a character name 
        if(typeof(type) === "string"){
            nextPage = nextCharactersPage(characters)
        }else{
            more_btn.classList.remove("display");
        }
        callback(characters);
    }
}

//check for similar characters on other pages and set the load more button display
function nextCharactersPage(data){
    if(data.info.next){
        more_btn.classList.add("display");
        return characters.info.next;
    }else{
        more_btn.classList.remove("display");
        return null;
    }
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
                <h3 class="t-align-center">${data.name}</h3>
                <div class="info-box">
                    <p>Species: ${data.species}</p>
                    <p>Status: <span class=${data.status}>${data.status == 'unknown' ? 'Unknown' : data.status}<span></p>
                    <p>Gender: ${data.gender}</p>
                    <p>Location: ${data.location.name}</p>
                </div>
            </div>`
    
    wrapper_cards.innerHTML = card;
}
//generate number for random search
function generateNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

search_btn.addEventListener("click", ()=> {
    let name = document.querySelector(".search-input").value;
    filterCharacters(URL_NAME, name, arrayOfCharacters);
    card = "";
    nextPage = "";
    document.querySelector(".search-input").value = "";
})

random_btn.addEventListener("click", ()=> {
    let id_number = generateNumber(1, 671);
    filterCharacters(URL_ID, id_number, characterInfo);
    card = "";
})

more_btn.addEventListener("click", () => {
    filterCharacters(nextPage, "", arrayOfCharacters);
})

