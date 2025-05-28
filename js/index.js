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

/*HOT COFFE */
async function fetchData() {
  try {
    const response = await fetch("https://api.sampleapis.com/coffee/hot");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("*****************************");
    console.log("******** HOT COFFEES ********");
    console.log("*****************************");
    data.forEach((item) => {
      console.log(`Title: ${item.title}`);
      console.log(`Description: ${item.description}`);
      console.log("-----------------------------");
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

fetchData();

/*ICE COFFE*/
async function fetchDataIced() {
  try {
    const response = await fetch("https://api.sampleapis.com/coffee/iced");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("*****************************");
    console.log("******** ICED COFFEES ********");
    console.log("*****************************");
    data.forEach((item) => {
      console.log(`Title: ${item.title}`);
      console.log(`Description: ${item.description}`);
      console.log("-----------------------------");
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

fetchDataIced();

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
    console.log(`Total number of ${opcionAleatoria} coffees: ${numberCoffees}`);
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

    const data = await response.json();
    console.log(`Title: ${data.title}`);
    console.log(`Description: ${data.description}`);
    console.log(`Ingredients: ${data.ingredients}`);
    console.log(`Image; ${data.image}`);
    console.log("-----------------------------");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

starAppCoffe();
