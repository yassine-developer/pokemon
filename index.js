async function getpokemon(name){

    try{

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    console.log(data);
    return data;

    }catch(error){

        console.error('Error:',error);
    }
}

getpokemon('Blastoise');

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
    if(e.target.tagName === "LI"){
    console.log(e.target.textContent);
    const pokemonName = e.target.textContent;
    const data = await getpokemon(pokemonName);

    const div = document.querySelector(".affichage-Resultat");
    div.innerHTML="";

    const divCard = document.createElement("div");
    divCard.className = "card";
    //partie image
    const divImage = document.createElement("div");
    divImage.className = "card-image";
    const image = document.createElement("img");
    image.src= data.sprites.front_default;
    divImage.append(image);
    divCard.append(divImage);
    div.append(divCard);

    //partie infos
    const divInfo = document.createElement("div");
    divInfo.className = "info-pokemon";
    const type =document.createElement('p');
    const taille =document.createElement('p');
    const poids = document.createElement('p');
    const status = document.createElement('ul');
    type.textContent = `type: ${data.types.map(t => t.type.name).join(', ')}`;
    taille.textContent= `Taille: ${data.height*10}cm`;
    poids.textContent = `Poids: ${data.weight / 10}kg`;
    
    const title = document.createElement("h3");
    title.textContent = data.species.name;
    divInfo.append(title);
    divInfo.append(type);
    divInfo.append(taille);
    divInfo.append(poids);
    divInfo.append(status);
    divCard.append(divInfo);
    
    }
});