//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une note aléatoire entre 0 et note_maximum (inclus)
    let note = Math.floor(Math.random() * (note_maximum + 1));
    // Ajouter la note générée au tableau
    notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////
console.log("La taille du tableau généré est ",notes.length) ;

let notesv2 = notes.slice();

let valeur_min = Infinity ;
for (let i = 0; i<notes.length; i++) {
    if (valeur_min > notes[i] ) {
        valeur_min = notes[i] ;
    }
}
console.log("La valeur la plus petite du tableau est ",valeur_min) ;

let valeur_max = -Infinity ; 
for (let i = 0; i<notes.length; i++) { //check toute les valeurs afin de trouver la valeur max
    if (valeur_max <notes[i] ) { //si l'ancienne valeur max est plus petite que la nouvelle valeur
        valeur_max = notes[i]; //on affecte a valeur max la nouvelle valeur
    }
}
console.log("La valeur la plus grande du tableau est ", valeur_max) ;
console.log("Le tableau contient les valeurs suivantes",notes) ;

valeur_min = Infinity ;
indice_valeur_min = 0;
for (let i = 0; i<notes.length; i++) {
    if (valeur_min > notes[i] ){
        valeur_min = notes[i];
        indice_valeur_min = i ;
    }
}
console.log("La valeur la plus petite est ", valeur_min,"et son indice est",indice_valeur_min) ;

let mid ; //crée une valeur temporaire pour échanger deux valeurs
mid = notes[indice_valeur_min]
notes[indice_valeur_min] = notes[0];
notes[0]= mid;

console.log(notes); //renvoie le tableau avec les deux valeurs échangés
console.log("==========") ;

deplacement=0;
verif=0;

for (let i=0; i<notes.length-1; i++) { //crée une double boucle
    for (let j=i+1; j<(notes.length); j++) {
        if (notes[i] > notes[j]) { //vérifie quelle valeur est la plus grande
            mid = notes[i] ;
            notes[i] = notes[j] ; //intervertie les deux valeurs
            notes[j] = mid ;
            deplacement+=1; //augment le nombre de déplacement à chaque switch de valeur
            console.log("État du tableau après avoir déplacé",deplacement,"valeur :", notes) ;
        }
        verif+=1 ; //augment le nombre de vérif a chaque essaie
    }
    console.log("Le tableau est trié par ordre croissant") ;
}
console.log("il y a eu",verif,"vérificatinos") ;
console.log("il y a eu", deplacement,"échanges") ;
console.log("==========") ;

console.log("Le tableau trié :",notes) ;
console.log("Le tableau avant d'être trié: ",notesv2) ;
console.log("==========") ;

deplacement=0;
verif=0;

for (let i=0; i<notes.length-1; i++) { //crée une double boucle
    for (let j=i+1; j<(notes.length); j++) {
        if (notes[i] < notes[j]) { //vérifie quelle valeur est la plus grande
            mid = notes[i] ;
            notes[i] = notes[j] ; //intervertie les deux valeurs
            notes[j] = mid ;
            deplacement+=1;
            console.log("État du tableau après avoir déplacé",deplacement,"valeur :", notes) ;
        }
        verif+=1 ;
    }
    console.log("Le tableau est trié par ordre décroissant") ;
}
console.log("il y a eu",verif,"vérificatinos") ;
console.log("il y a eu", deplacement,"échanges") ;
console.log("==========") ;

console.log("Voici le tableau dans l'ordre décroissant",notes) ;