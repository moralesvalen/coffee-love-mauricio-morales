// FOOTER
const today = new Date();
const footer = document.createElement("footer");
footer.className = "bg-footer";
const body = document.querySelector("body");
body.appendChild(footer);

const addFooter = document.querySelector("footer");
const divFooter = document.createElement("div");
divFooter.className = "container";
const pha = document.createElement("p");
pha.textContent = `\u00A9Jose Mauricio Morales ${today.getFullYear()}`;

addFooter.appendChild(pha);

//INDEX.HTML

const currentPage = window.location.pathname;

if (currentPage === "/" || currentPage.includes("index.html")) {
  document.getElementById("btnRoulette").addEventListener("click", () => {
    event.preventDefault(); //evitar que la pagina refresque
    /*RANDOM COFFE */
    const opcionesCafe = ["hot", "iced"];
    const opcionAleatoria =
      opcionesCafe[Math.floor(Math.random() * opcionesCafe.length)];

    console.log(`your option is: ${opcionAleatoria}`);

    async function fetchDataRandom() {
      try {
        const response = await fetch(
          `https://api.sampleapis.com/coffee/${opcionAleatoria}`
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        console.log("*****************************");
        console.log("******* RANDOM COFFEES ******");
        console.log("*****************************");
        const numberCoffees = data.length;
        console.log(
          `Total number of ${opcionAleatoria} coffees: ${numberCoffees}`
        );
        const randomIndex = Math.floor(Math.random() * numberCoffees);
        const randomCoffeObejct = data[randomIndex];
        const randomCoffeId = randomCoffeObejct.id;
        console.log("ID chossen: ", randomIndex);

        return randomCoffeId;
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    async function starAppCoffe() {
      const coffeId = await fetchDataRandom();

      if (coffeId !== null) {
        await fetchDataCoffeDay(coffeId);
      } else {
        console.log("Error. Data not found");
      }
    }

    async function fetchDataCoffeDay(id) {
      try {
        const response = await fetch(
          `https://api.sampleapis.com/coffee/${opcionAleatoria}/${id}`
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const newUrl = `https://api.sampleapis.com/coffee/${opcionAleatoria}/${id}`;

        const data = await response.json();
        console.log(`Title: ${data.title}`);
        console.log(`Description: ${data.description}`);
        console.log(`Ingredients: ${data.ingredients}`);
        console.log(`Image; ${data.image}`);
        console.log("-----------------------------");
        const nuevaURL = `roulette.html?title=${encodeURIComponent(
          data.title
        )}&image=${encodeURIComponent(
          data.image
        )}&description=${encodeURIComponent(
          data.description
        )}&ingredients=${encodeURIComponent(
          data.ingredients
        )}&opcion=${encodeURIComponent(opcionAleatoria)}`;
        window.location.href = nuevaURL;
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    starAppCoffe();
  });
} else if (currentPage.includes("hot") || currentPage.includes("hot.html")) {
  /*HOT COFFE  */
  async function fetchData() {
    try {
      const response = await fetch("https://api.sampleapis.com/coffee/hot");

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const select = document.getElementById("recipeSelect");
      //llenar opciones
      data.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.title;
        select.appendChild(option);
      });
      //habilitar boton
      select.addEventListener("change", () => {
        document.getElementById("btnShowRecipe").disabled = select.value === "";
      });

      console.log("*****************************");
      console.log("******** HOT COFFEES ********");
      console.log("*****************************");
      data.forEach((item) => {
        console.log(`Title: ${item.title}`);
        console.log(`Description: ${item.description}`);
        console.log("-----------------------------");
      });

      document.getElementById("btnShowRecipe").addEventListener("click", () => {
        const selectedIndex = select.value;
        if (selectedIndex !== "") {
          const receta = data[selectedIndex];
          console.log("Receta seleccionada:");
          console.log(`Title: ${receta.title}`);
          console.log(`Description: ${receta.description}`);
          console.log(`Ingredients: ${receta.ingredients}`);
          console.log(`Image URL: ${receta.image}`);

          document.querySelector(".main-title").textContent = receta.title;
          document.querySelector(
            ".about-col-img"
          ).style.backgroundImage = `url('${receta.image}')`;
          document.querySelector(".description").textContent =
            receta.description;
          document.querySelector(".recipe").textContent = receta.ingredients;
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  fetchData();
} else if (currentPage.includes("iced") || currentPage.includes("iced.html")) {
  /*ICE COFFE*/
  async function fetchDataIced() {
    try {
      const response = await fetch("https://api.sampleapis.com/coffee/iced");

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      const select = document.getElementById("recipeSelect");
      data.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.title;
        select.appendChild(option);
      });

      //habilitar boton
      select.addEventListener("change", () => {
        document.getElementById("btnShowRecipe").disabled = select.value === "";
      });

      console.log("*****************************");
      console.log("******** ICED COFFEES ********");
      console.log("*****************************");
      data.forEach((item) => {
        console.log(`Title: ${item.title}`);
        console.log(`Description: ${item.description}`);
        console.log("-----------------------------");
      });

      document.getElementById("btnShowRecipe").addEventListener("click", () => {
        const selectedIndex = select.value;
        if (selectedIndex !== "") {
          const receta = data[selectedIndex];
          console.log("Receta seleccionada:");
          console.log(`Title: ${receta.title}`);
          console.log(`Description: ${receta.description}`);
          console.log(`Ingredients: ${receta.ingredients}`);
          console.log(`Image URL: ${receta.image}`);

          document.querySelector(".main-title").textContent = receta.title;
          document.querySelector(
            ".about-col-img"
          ).style.backgroundImage = `url('${receta.image}')`;
          document.querySelector(".description").textContent =
            receta.description;
          document.querySelector(".recipe").textContent = receta.ingredients;
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  fetchDataIced();
}
//ROULETTE.HTML
else if (
  currentPage.includes("roulette") ||
  currentPage.includes("roulette.html")
) {
  console.log("eSTOY EN LA RULETA");
  const params = new URLSearchParams(window.location.search);
  const titulo = params.get("title");
  const imagen = params.get("image");
  const description = params.get("description");
  const ingredients = params.get("ingredients");
  const opcion = params.get("opcion");

  document.querySelector(".main-title").textContent = titulo;
  document.querySelector(
    ".about-col-img"
  ).style.backgroundImage = `url('${imagen}')`;
  document.querySelector(".description").textContent = description;
  document.querySelector(".recipe").textContent = ingredients;
  document.querySelector(".recipeTitle").textContent = `${opcion} - Recipe `;
}
