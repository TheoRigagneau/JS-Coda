const skinOptions = document.getElementById("skinOptions");
const selectedCanvas = document.getElementById("selectedSkin");
const btnJouer = document.getElementById("btn-jouer");
const selectedCtx = selectedCanvas.getContext("2d");
const errorMessage = document.getElementById("error-message");
const pseudoInput = document.getElementById("pseudo");
const serverUrlInput = document.getElementById("serverUrl");


let selectedSkin = 1;

// Génère les 29 skins
for (let i = 1; i <= 29; i++) {
    const div = document.createElement("div");
    div.className = "skin-option";
    div.dataset.value = i;

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "assets/" + i + ".png";

    img.onload = () => {
        ctx.drawImage(img, 0, 128, 64, 64, 0, 0, 64,64);
    };

    div.appendChild(canvas);
    skinOptions.appendChild(div);

    // Sélection d’un skin
    div.addEventListener("click", () => {
        selectedSkin = i;

        selectedCtx.clearRect(0, 128, 64, 64, 0, 0, 64, 64);
        selectedCtx.drawImage(img, 0, 128, 64, 64, 0, 0, 64, 64);

        skinOptions.style.display = "none";
    });
}
btnJouer.onclick = (e) => {
    e.preventDefault();

  const pseudo = pseudoInput.value.trim();
  const serverUrl = serverUrlInput.value.trim();

  //Vérification si les champs sont vides
  if (pseudo === "" || serverUrl === "") {
    errorMessage.textContent = "Veuillez remplir tous les champs (Pseudo et Serveur).";
    errorMessage.style.display = "block";

    if (pseudo === "") pseudoInput.style.borderColor = "#ff4d4d";
    if (serverUrl === "") serverUrlInput.style.borderColor = "#ff4d4d";

    return;
  }
    localStorage.setItem("playerPseudo", pseudo);
    localStorage.setItem("Url", serverUrl);
    localStorage.setItem("playerSkin", `assets/${selectedSkin}.png` );

    console.log("Pseudo :", pseudo);
    console.log("Serveur :", serverUrl);
    console.log("Skin enregistré :", `assets/${selectedSkin}`);


  window.location.href="game.html";
}

// Ouvre / ferme le menu
document.querySelector(".skin-selected").addEventListener("click", () => {
    skinOptions.style.display =
        skinOptions.style.display === "block" ? "none" : "block";
});
