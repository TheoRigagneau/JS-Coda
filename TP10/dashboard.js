const BtnSave = document.getElementById("save-server");
const BtnName = document.getElementById("save-name");
const BtnRank = document.getElementById("save-rank");
const IP_serv = document.getElementById("ip-serv");
const names = document.getElementById("name");
const output = document.getElementById("output");
const rankingDiv = document.getElementById("ranking");
const playerListDiv = document.getElementById("player-list")



async function loadRanking(data, serverAddress) {
    const classement = [];

    for (let i = 0; i < data.length; i++) {
        try {
            const response = await fetch(
                `http://${serverAddress}/api/stats?name=${data[i].name}`
            );

            if (!response.ok) continue;

            const stats = await response.json();
            classement.push(stats);

        } catch (error) {
            console.log("Erreur lors du chargement :", error);
        }
    }

    classement.sort((a, b) => a.overallRanking - b.overallRanking);

    let html = `<h2>🏆 Classement Overall</h2><ol>`;
    for (let i = 0; i < classement.length; i++) {
        html += `
            <li>
                <strong>${classement[i].name}</strong>
                — Overall : ${classement[i].overallRanking}
            </li>
        `;
    }
    html += `</ol>`;

    rankingDiv.innerHTML = html;
}


function loadPlayers(data) {
    let html = "<h3>Liste des joueurs :</h3><ul>";
    for (let i = 0; i < data.length; i++) {
        html += `
            <button class="player-btn" data-index="${i}">
                ${data[i].name}
            </button><br>
        `;
    }
    playerListDiv.innerHTML = html;

    const buttons = document.querySelectorAll(".player-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const joueur = button.dataset.index;
            loadPlayerStats(data[joueur]);
        });
    });
}


function loadPlayerStats(player) {
     output.innerHTML = `
     <h2>${player.name}</h2>
        <p> Games Played : ${player.gamesPlayed}</p>
        <p> Total Kills : ${player.totalKills}</p>
        <p> Total Deaths : ${player.totalDeaths}</p>
        <p> K/D Ratio : ${player.kdRatio}</p> `
}

BtnSave.onclick = async (e) => {
    e.preventDefault();
    const serverAddress = IP_serv.value.trim();


    if (!serverAddress) {
    console.log("Adresse serveur non renseignée");
    return;
  }

    try {
        const response = await fetch(`http://${serverAddress}/api/listPlayers`);

        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status)
        }

        const data = await response.json();
        loadPlayers(data);

        BtnName.onclick = async (f) => {
            f.preventDefault();
            const name_search = names.value.trim();

            if (!name_search) {
                console.log("Nom non renseignée");
                return;
            }
            
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === name_search) {
                    loadPlayerStats(data[i]);
                    loadRanking(data, serverAddress);
                    return;
                }
            }
            console.log("Joueur non trouvé");
        }
        BtnRank.onclick = async (g) => {
            g.preventDefault();
            await loadRanking(data, serverAddress);
        };
    } catch(error) {
        console.log("Erreur lors du chargement : ", error);
    }
}
