const cont = document.querySelector(".container");
const pokeDex =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

for (let i = 1; i <= 898; i++) {
  const pokemonContainer = document.createElement("div");
  pokemonContainer.classList.add("pokemon");

  const imgSrc = document.createElement("img");
  imgSrc.src = `${pokeDex}${i}.png`;

  pokemonContainer.appendChild(imgSrc);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button");
  buttonDiv.textContent = "View Details";

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("details");

  buttonDiv.addEventListener("click", () => {
    const popup = document.querySelector(".popup");
    popup.style.display = "flex";

    const details = document.querySelector(".details");
    details.innerHTML = "";

    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((response) => response.json())
      .then((data) => {
        const name = document.createElement("p");
        name.textContent = `Name: ${data.name}`;
        details.appendChild(name);

        const abilities = document.createElement("p");
        abilities.textContent = `Abilities: ${data.abilities
          .map((ability) => ability.ability.name)
          .join(", ")}`;
        details.appendChild(abilities);

        const types = document.createElement("p");
        types.textContent = `Types: ${data.types
          .map((type) => type.type.name)
          .join(", ")}`;
        details.appendChild(types);
      })
      .catch((error) => console.log(error));
  });

  pokemonContainer.insertAdjacentElement("beforeend", buttonDiv);
  cont.appendChild(pokemonContainer);
}

const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
