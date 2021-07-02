const URL_ID = 'https://rickandmortyapi.com/api/character/';
const URL_NAME = 'https://rickandmortyapi.com/api/character/?name=';
// global variables
let card = "";
let characters;
let nextPage;

let search_btn = document.querySelector(".search-btn");
let random_btn = document.querySelector(".random-btn");
let more_btn = document.querySelector(".more-btn")
let wrapper_cards = document.querySelector(".wrapper-cards");

async function filterCharacters(url, type, callback){
    characters = await fetch(url + type)
                .then(res => res.json())
                .catch(err => console.log(err))
    if(typeof(type) === "string"){
        nextPage = nextCharactersPage(characters)
    }else{
        more_btn.classList.remove("display");
    }
    callback(characters);
}

// check for similar characters on other pages and configure the load more button display
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
                <div class="info-box">
                    <p>Name: ${data.name}</p>
                    <p>Species: ${data.species}</p>
                    <p>Status: <span class=${data.status}>${data.status}<span></p>
                    <p>Location: ${data.location.name}</p>
                </div>
            </div>`
    
    wrapper_cards.innerHTML = card;
}

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

