let cards = document.querySelector(".cards");
let input = document.querySelector("#ingredient");
let btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", (e) => {
  let ingredient = input.value;
  e.preventDefault();
  // fetch(`ing/${ingredient}`).then((promise) => {
  fetch(`calories/${ingredient}`).then((promise) => {
    promise
      .json()
      .then((data) => {
        console.log(data.hits);
        data.hits.forEach((el) => {
          let sourceOfTitle = el.recipe.label;
          let sourceOfImg = el.recipe.image;
          let calories = `calories: ${el.recipe.calories}`;
          let arrOfIngr = el.recipe.ingredientLines;
          let card = document.createElement("div");
          let title = document.createElement("h2");
          let imagen = document.createElement("img");
          let listOfIngr = document.createElement("ul");
          title.innerText = sourceOfTitle;
          card.classList.add("web", "card");
          imagen.setAttribute("src", sourceOfImg);
          card.append(title, imagen, calories, listOfIngr);
          cards.append(card);
          arrOfIngr.forEach((ingr) => {
            let item = document.createElement("li");
            item.innerHTML = ingr;
            listOfIngr.appendChild(item);
          });
        });
        let footer = document.querySelector("footer");
        footer.classList.add("withCards");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
