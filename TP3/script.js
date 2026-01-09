//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

const liste_prenoms = [
  "Lucas", "Emma", "Noah", "Léa", "Hugo", "Chloé", "Louis", "Inès",
  "Gabriel", "Jade", "Arthur", "Mila", "Raphaël", "Lina", "Ethan", "Zoé",
  "Nathan", "Manon", "Tom", "Sarah", "Enzo", "Camille", "Maxime", "Anaïs",
  "Paul", "Clara", "Adam", "Eva", "Jules", "Maëlys", "Sacha", "Romane",
  "Timéo", "Louna", "Maël", "Ambre", "Théo", "Océane", "Yanis", "Iris",
  "Nolan", "Elsa", "Mathis", "Pauline", "Aaron", "Lou", "Samuel", "Amandine",
  "Eliott", "Solène"
];
// Définir la taille du tableau d'élève au hasard entre 7 et 10 éléments
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

///////////////////////////////////////////////////////////////////////////////
function arrondir(num, decimales) {
  return Number(num.toFixed(decimales));
}


console.log(prenom) //liste des élèves

let eleve= [];
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
let elevesv2 = eleve.slice(); //duplique eleve
let eleve_français = eleve.slice();
let eleve_maths = eleve.slice();
let eleve_histoire = eleve.slice();
for (i = 0; i<prenom.length; i++) {
    console.log("élève", (i+1), ":",eleve[i].prenom,"moyenne = ",eleve[i].moyenne) ;
}
console.log("==========") ;
//exercice 2
console.log("Dans la classe, il y a",prenom.length,"eleves.") ;
console.log("==========") ;
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
//exercice 3
let indice_moyenne_min
for (i=0; i<prenom.length; i++) {
    if (eleve[i].moyenne === pire_moyenne) {
        console.log(eleve[i].prenom, "a la pire moyenne de",pire_moyenne,"son indice est", (i)) ;
        indice_moyenne_min=i
    }
}
//exercice 4
let mid ; //crée une valeur temporaire pour échanger deux valeurs
mid = eleve[indice_moyenne_min]
eleve[indice_moyenne_min] = eleve[0];
eleve[0]= mid;
console.log("Tableau après avoir changé la valeur la plus petite avec l'index 0 :") ;
console.log(eleve);
console.log("==========") ;

deplacement=0;
verif=0;

for (let i=0; i<prenom.length-1; i++) { //crée une double boucle
    for (let j=i+1; j<(prenom.length); j++) {
        if (eleve[i].moyenne > eleve[j].moyenne) { //vérifie quelle valeur est la plus grande
            mid = eleve[i] ;
            eleve[i] = eleve[j] ; //intervertie les deux valeurs
            eleve[j] = mid ;
            deplacement+=1; //augment le nombre de déplacement à chaque switch de valeur
        }
        verif+=1 ; //augment le nombre de vérif a chaque essaie
    }
    console.log("Le tableau est trié par ordre croissant") ;
}
console.log("==========") ;
console.log("il y a eu",verif,"vérificatinos") ;
console.log("il y a eu", deplacement,"échanges") ;
console.log("==========") ;

console.log("Le tableau trié :") ;
for (let i =0 ; i<prenom.length; i++) {
 console.log(eleve[i].prenom,"a une moyenne de :",eleve[i].moyenne) ;
}
console.log("==========") ;
console.log("Le tableau avant d'être trié: ") ;
for (let i =0 ; i<prenom.length; i++) {
 console.log(elevesv2[i].prenom,"a une moyenne de :",elevesv2[i].moyenne) ;
}
console.log("==========") ;

console.log("Voici le tableau trié en fonction des notes de maths") ;
for (let i=0; i<prenom.length-1; i++) { //crée une double boucle
    for (let j=i+1; j<(prenom.length); j++) {
        if (eleve_maths[i].note_maths > eleve_maths[j].note_maths) { //vérifie quelle valeur est la plus grande
            mid = eleve_maths[i] ;
            eleve_maths[i] = eleve_maths[j] ; //intervertie les deux valeurs
            eleve_maths[j] = mid ;
        }
    }
}
for (let i =0 ; i<prenom.length; i++) {
 console.log(eleve_maths[i].prenom,": notes maths :",eleve_maths[i].note_maths,"moyenne :",eleve_maths[i].moyenne)
}
console.log("==========") ;
console.log("Voici le tableau trié en fonction des notes de français") ;
for (let i=0; i<prenom.length-1; i++) { //crée une double boucle
    for (let j=i+1; j<(prenom.length); j++) {
        if (eleve_français[i].note_français > eleve_français[j].note_français) { //vérifie quelle valeur est la plus grande
            mid = eleve_français[i] ;
            eleve_français[i] = eleve_français[j] ; //intervertie les deux valeurs
            eleve_français[j] = mid ;
        }
    }

}
for (let i =0 ; i<prenom.length; i++) {
 console.log(eleve_français[i].prenom,": notes français :",eleve_français[i].note_français,"moyenne :",eleve_français[i].moyenne)
}
console.log("==========") ;
console.log("Voici le tableau trié en fonction des notes d'histoire") ;
for (let i=0; i<prenom.length-1; i++) { //crée une double boucle
    for (let j=i+1; j<(prenom.length); j++) {
        if (eleve_histoire[i].note_histoire > eleve_histoire[j].note_histoire) { //vérifie quelle valeur est la plus grande
            mid = eleve_histoire[i] ;
            eleve_histoire[i] = eleve_histoire[j] ; //intervertie les deux valeurs
            eleve_histoire[j] = mid ;
        }
    }
}
for (let i =0 ; i<prenom.length; i++) {
 console.log(eleve_histoire[i].prenom,": notes histoire :",eleve_histoire[i].note_histoire,"moyenne :",eleve_histoire[i].moyenne)
}
