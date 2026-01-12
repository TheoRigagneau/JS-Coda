const liste_prenoms = [
  "Lucas", "Emma", "Noah", "Léa", "Hugo", "Chloé", "Louis", "Inès",
  "Gabriel", "Jade", "Arthur", "Mila", "Raphaël", "Lina", "Ethan", "Zoé",
  "Nathan", "Manon", "Tom", "Sarah", "Enzo", "Camille", "Maxime", "Anaïs",
  "Paul", "Clara", "Adam", "Eva", "Jules", "Maëlys", "Sacha", "Romane",
  "Timéo", "Louna", "Maël", "Ambre", "Théo", "Océane", "Yanis", "Iris",
  "Nolan", "Elsa", "Mathis", "Pauline", "Aaron", "Lou", "Samuel", "Amandine",
  "Eliott", "Solène"
];
function arrondir(num, decimales) {
  return Number(num.toFixed(decimales));
}
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

// Déclarer le tableau pour stocker les eleve
let prenom = [];
// Définir le nombre d'élève
let liste_eleve = 49;

// Itérer autant de fois qu'on a de eleve aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une liste aléatoire entre 0 et taille_maximum (inclus)
    let note = Math.floor(Math.random() * (liste_eleve + 1));
    // Ajouter le nom générée au tableau
    prenom.push(liste_prenoms[note]);
}

let eleve= [];
function genererEleves() {
    let moyenne = [] ;
    for (let i = 0; i<prenom.length; i++) {
        let maths=  Math.floor(Math.random()* 21) ; //génère 3 notes aléatoire en maths français et hsitoire
        let français=  Math.floor(Math.random()* 21) ;
        let histoire=  Math.floor(Math.random()* 21) ;
        let info_eleve = {
            prenom : liste_prenoms[Math.floor(Math.random()*liste_eleve)] , //génère un nom aléatoire de la liste prenoms
            note_maths : maths ,
            note_français : français,
            note_histoire : histoire,
            moyenne : arrondir((maths+français+histoire)/ 3,2)
    
        }
    eleve.push(info_eleve) ; 
    }
    console.log(eleve) ;
    return eleve;
}

function afficherEleves(eleve) {
    for (let i = 0; i<prenom.length ; i++) {
    console.log("élève", (i+1), ":",eleve[i].prenom,"moyenne = ",eleve[i].moyenne) ;
    }
}

function trouverMoyenneMin(liste_eleve,indexDepart) {
    let moyenneMin=eleve[0].moyenne ;
    for (let i = 1; i<prenom.length ; i++) {
        if (eleve[i].moyenne<moyenneMin) {
            moyenneMin = eleve[i].moyenne ;
        }
    }
    console.log("La moyenne la plus basse est de :") ;
    return moyenneMin ;
}

function afficherDonnees(eleve) {
    console.log("Dans la classe, il y a",eleve.length,"élèves.") ;
    pire_moyenne = eleve[0].moyenne ;
    meilleur_moyenne = eleve[0].moyenne ;
    for (let i= 1; i<prenom.length; i++) {
        if (pire_moyenne >eleve[i].moyenne) {
            pire_moyenne = eleve[i].moyenne ;
        }
        else if (meilleur_moyenne < eleve[i].moyenne) {
            meilleur_moyenne = eleve[i].moyenne ;
        }
    }
    console.log("La pire moyenne est ",pire_moyenne,"et la meilleur est ",meilleur_moyenne) ;
}

function swap(eleve,indexA,indexB) {
    mid = eleve[indexA]
    eleve[indexA] = eleve[indexB];
    eleve[indexB]= mid;
    return eleve
}

function triParSelection(eleve) {
    for (let i=0; i<prenom.length-1; i++) { //crée une double boucle
        for (let j=i+1; j<(prenom.length); j++) {
            if (eleve[i].moyenne > eleve[j].moyenne) { //vérifie quelle valeur est la plus grande
                swap(eleve,i,j) ;
            }
        }
    }
    console.log("Le tableau est trié par ordre croissant") ;
    console.log(eleve) ;
}
eleve=genererEleves();
let elevesv2 = eleve.slice();
afficherEleves(eleve);
console.log(trouverMoyenneMin(eleve,0))
afficherDonnees(eleve);
triParSelection(eleve);
console.log("le tableau avant d'être trié :", elevesv2 ) ;
console.log("le tableau après avoir été trié :",eleve) ;