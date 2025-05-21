async function fetchData() {
  try {
    const response = await fetch("https://api.sampleapis.com/coffee/hot");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

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
