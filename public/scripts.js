let cards = document.querySelector(".cards");
let input = document.querySelector("#ingredient");
let btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", (e) => {
  let ingredient = input.value;
  e.preventDefault();
  fetch(`ing/${ingredient}`).then((promise) => {
    console.log("this is the ingredient in client", ingredient);
    promise
      .json()
      .then((data) => {
        console.log(data.hits[0]);
        console.log(data.hits[0].recipe);
        let objectOfIngr = data.hits[0].recipe.ingredientLines;
        let sourceOfImg = data.hits[0].recipe.image;
        let card = document.createElement("div");
        let imagen = document.createElement("img");
        let listOfIngr = document.createElement("ul");
        card.setAttribute("class", "card");
        imagen.setAttribute("src", sourceOfImg);
        card.append(imagen, listOfIngr);
        cards.append(card);
        objectOfIngr.forEach((ingr) => {
          console.log(ingr);
          let item = document.createElement("li");
          item.innerHTML = ingr;
          listOfIngr.appendChild(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
