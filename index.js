async function getListPokemon(page = 1) {
  try {
    const offset = (page - 1) * 20;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

getListPokemon();

async function getpokemon(name) {

  try {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {

    console.error('Error:', error);
  }
}

let currentPage = 1;

// le numero de la page
function displayCurrentPage() {
  document.querySelector('#currentPage').textContent = `${currentPage}`;
}

displayCurrentPage();

async function displayPokemons(page) {

  const pokemons = await getListPokemon(page);
  console.log(pokemons);
  const liste = document.querySelector("#pokemonList");
  liste.textContent = '';
  pokemons.results.forEach(pokemon => {
    const li = document.createElement("li");
    li.textContent = `${pokemon.name} `;
    liste.append(li);
  })
}

displayPokemons(5);

const input = document.getElementById('nameInput');
const list = document.getElementById('pokemonList');
const resultContainer = document.querySelector('.affichage-Resultat');

input.addEventListener('input', () => {
  const filter = input.value.toLowerCase();
  const items = list.querySelectorAll('li');
  console.log(items);

  items.forEach(item => {
    const name = item.textContent.toLowerCase();
    item.style.display = name.includes(filter) ? 'list-item' : 'none';
  });
});

list.addEventListener('click', async (e) => {
  if (e.target.tagName === "LI") {
    console.log(e.target.textContent);
    const pokemonName = e.target.textContent;
    const data = await getpokemon(pokemonName);

    const div = document.querySelector(".affichage-Resultat");
    div.innerHTML = "";

    const divCard = document.createElement("div");
    divCard.className = "card";
    //partie image
    const divImage = document.createElement("div");
    divImage.className = "card-image";
    const image = document.createElement("img");
    image.src = data.sprites.front_default;
    divImage.append(image);
    divCard.append(divImage);
    div.append(divCard);

    //partie infos
    const divInfo = document.createElement("div");
    divInfo.className = "info-pokemon";
    const type = document.createElement('p');
    const taille = document.createElement('p');
    const poids = document.createElement('p');
    const statsList = document.createElement('p');
    const stats = document.createElement('ul');
    statsList.textContent = "status:";
    // type.textContent = `type: ${data.types.map(t => t.type.name).join(', ')}`;
    type.textContent = ''; // vider le contenu d'origine
    data.types.forEach(t => {
      const span = document.createElement('span');
      span.className = `type-${t.type.name}`; // ex: type-fire
      span.textContent = t.type.name;
      span.style.marginRight = "0.5rem";
      span.style.padding = "0.3rem 0.6rem";
      span.style.borderRadius = "12px";
      type.appendChild(span);
    });
    taille.textContent = `Taille: ${data.height * 10}cm`;
    poids.textContent = `Poids: ${data.weight / 10}kg`;
    data.stats.forEach(
      t => {
        const li = document.createElement("li");
        li.textContent = `${t.stat.name} : ${t.base_stat}`;
        stats.append(li);
      });
    statsList.append(stats);
    console.log(stats.textContent);


    const title = document.createElement("h3");
    title.textContent = data.species.name;
    divInfo.append(title);
    divInfo.append(type);
    divInfo.append(taille);
    divInfo.append(poids);
    divInfo.append(statsList);
    divCard.append(divInfo);

  }
});

document.querySelector('#next').addEventListener('click', () => {
  if (currentPage < 66) {
    currentPage++;
    displayCurrentPage();
    displayPokemons(currentPage);
  }
})

document.querySelector('#prev').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayCurrentPage();
    displayPokemons(currentPage);
  }
})
