function main() {
  fetch("https://swapi.dev/api/people/")
    .then((res) => res.json())
    .then((data) => {
      let results = data["results"];
      resolveAPI(results);
    });

  const resolveAPI = (results) => {
    results.forEach((item, index) => {
      createCard(item.name, item.gender, item.height, index);
    });
  };

  function createCard(name, gender, height, index) {
    let extension;
    let card = document.createElement("div");
    card.className = "card";
    if (index == 5 || index == 7) {
      extension = ".jpeg";
    } else {
      extension = ".jpg";
    }
    card.innerHTML = `
      <div class="card1">
      <img class="card-image" src="./images/image${index}${extension}">
        <h4 class="card-title">${name}</h4>
        <button 
        onclick="document.getElementById('modal-container').style.display='block'" 
          class="btn-primary rounded-pill" data-name="${name}" data-gender="${gender}" data-height="${height}">
          VIEW DETAILS
        </button>
    </div>`;

    document.getElementById("card-container").appendChild(card);

    let button = document.querySelectorAll(".btn-primary");
    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener("click", (evt) => {
        createModal(evt);
      });
    }
  }

  function createModal(evt) {
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div id="my-modal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span onclick="document.getElementById('modal-container').style.display='none'" class="close">&times;</span>
          <h2>CHARACTER DETAILS</h2>
        </div>
        <div class="modal-body">
          <p class="modal-name">${evt.target.dataset.name}</p>
          <p class="modal-gender">${evt.target.dataset.gender}</p>
          <p class="modal-height">${evt.target.dataset.height}</p>
        </div>
        <div class="modal-footer">
          <button onclick="document.getElementById('modal-container').style.display='none'" class="btn-secondary">CLOSE</button>
        </div>
      </div>
    </div>`;
    document.getElementById("modal-container").appendChild(modal);
  }

}

main();

// module.exports = { main };
