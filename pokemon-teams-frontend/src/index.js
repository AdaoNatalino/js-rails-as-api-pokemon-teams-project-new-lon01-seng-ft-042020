    const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', () => {

    getAlltrainers();
})

function getAlltrainers() {
return fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(data => createCard(data))
.catch(error => console.log(error))};

function createDivTrainer(trainer) {
    const div = document.createElement('div');
    div.className = "card";
    div.dataset.id = "";
    const p = document.createElement('p');
    p.innerText = trainer.name;
    const button = document.createElement('button');
    button.innerText = "Add Pokemon";
    button.dataset.trainerId = trainer.id;
    div.append(p);
    div.append(button);
    const ul = document.createElement('ul');
    ul.id = `pokemon-list-${trainer.id}`
    div.append(ul);

    button.addEventListener('click', (e) => addPoke(e, trainer))
    return div
}

function createLiPokemon(pokemon) {
    const li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    const button = document.createElement('button');
    button.innerText = 'Release';
    button.className = 'release';
    button.dataset.pokemonId= pokemon.id;
    li.append(button);
    button.addEventListener('click', (e) => deletePokemon(e, pokemon))
    return li

}

function createCard(dataArrays) { 
    const cardList = document.querySelector("#list")
    dataArrays.forEach(trainer => {
        const div = createDivTrainer(trainer);
        cardList.append(div);
        const list = document.getElementById(`pokemon-list-${trainer.id}`);
        trainer.pokemons.forEach(pokemon => {
            const li = createLiPokemon(pokemon);
            list.append(li);
        });
    });
}


function  deletePokemon(e, pokemon) {
    e.preventDefault();
    let object = {
    nickname: `${pokemon.nickname}`,
    species: `${pokemon.species}`,
    id: `${pokemon.id}`,
    trainer_id: `${pokemon.trainer_id}`
    };
    
    let configObject = {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify(object)
    };

    fetch(`${POKEMONS_URL}/${pokemon.id}`, configObject)
    // .then(resp => resp.json())
    // .then(data => console.log(data))
    .catch(error => console.log(error));

    e.target.parentNode.remove();
}

function addPoke(e, trainer) {
    e.preventDefault();
    let object = {
    trainer_id: trainer.id
    };
    
    let configObject = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify(object)
    };
    
    fetch(POKEMONS_URL, configObject)
    .then(resp => resp.json())
    .then(pokemon => addNewPokemon(pokemon, trainer))
    .catch(error => console.log(error));
}

function addNewPokemon(pokemon, trainer) {
    // console.log(pokemon);
    // console.log(trainer);
    const li = createLiPokemon(pokemon);
    const list = document.getElementById(`pokemon-list-${trainer.id}`);
    list.append(li);
}