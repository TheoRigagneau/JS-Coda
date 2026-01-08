const name = "B1-A" ; //affecte un nom a "name"
console.log(name) ;
let student = 28 ; //affecte le nombre d'élève de la classe dans student
console.log(student) ;
let classe = true ;
console.log(classe) ; //dit si la classe est ouverte ou non

console.log("==============") ;
//part 2 
console.log("Part 2") ;
let eleve1 = { //crée les valeurs d'un élève
    prenom : "Théo" ,
    note_maths : 15 ,
    note_français : 12
} ;
console.log(eleve1.prenom) ;

console.log("==============") ;
//part 3 
console.log("Part 3") ; //recréation de deux élèves
let eleve2 = {
    prenom : "Lilian" ,
    note_maths : 14 ,
    note_français : 9.5
} ;
let eleve3 = {
    prenom : "Pierre" ,
    note_maths : 14 ,
    note_français : 10.5
} ;

let eleve = [eleve1, eleve2, eleve3] ;
for (let i = 0; i < eleve.length; i++) {
    console.log(eleve[i].prenom); //renvoie le nom de tout les élèves
}

console.log("==============") ;
// part 4
console.log("Part 4") ;
for (let i = 0; i<eleve.length; i++) { //fait la moyenne des notes pour chaque élève
    let moyenne=(eleve[i].note_français+eleve[i].note_maths) / 2 ;
    console.log(eleve[i].prenom, moyenne) ;
    if (moyenne <10) {
        console.log("Refusé") ; //dit si il est admis ou refusé en fonction de sa moyenne
    }
    else {
        console.log("Admis") ;
    }
    //part 5
    if (10 <=moyenne && moyenne<12) { //renvoie une mention en fonction de sa moyenne
        console.log("Passable") ;
    }
    else if (12 <=moyenne && moyenne<14) {
        console.log("Assez bien") ;
    }
    else if (14 <=moyenne && moyenne<16) {
        console.log("Bien") ;
    }
    else if (16 <=moyenne) {
        console.log("Très bien") ;
    }
    else {
        console.log("Insuffisant") ;
    }
    console.log("==============") ;
}
let eleve_admis=0 ;
eleve_restant=eleve.length ; //récupère le nombre d'élève pas encore noté
while (eleve_restant!=0) {
    if (((eleve[eleve_restant-1].note_français+eleve[eleve_restant-1].note_maths)/2)>=10) { //vérifie la moyenne du dernier élève de la liste
        eleve_admis += 1  ; //s'il a la moyenne, il est admis
    }
    eleve_restant-=1 ; //retire le dernier élève de la liste
}
console.log("il y a", eleve_admis, "eleve admis") ;
console.log("==============") ;

//bonus moyenne de la classe
console.log("Bonus") ;
let note_classe = 0 ;
for (let i = 0; i<eleve.length; i++) {
    let moyenne=(eleve[i].note_français+eleve[i].note_maths) / 2 ;
    note_classe += moyenne ; //récupère la moyenne de chaque élève
}
let moyenne_classe = note_classe / eleve.length ; //fait la moyenne en fonction du nombre d'élève
console.log("La moyenne de la classe est de ",Math.round(moyenne_classe)) ;

//ajout d'élève dans la classe
let eleve4 = {
    prenom : "Alexis" ,
    note_maths : 18 ,
    note_français : 10
};
eleve.push(eleve4) ; //ajoute à la liste d'élève Alexis

//affiche du nouveau nombre d'élève
console.log("Il y a ", eleve.length ,"élèves dans la classe.") ;

//
eleve_admis=0 ;
eleve_restant=eleve.length ; //récupère le nombre d'élève pas encore noté
while (eleve_restant!=0) {
    if (((eleve[eleve_restant-1].note_français+eleve[eleve_restant-1].note_maths)/2)>=10) { //vérifie la moyenne du dernier élève de la liste
        eleve_admis += 1  ; //s'il a la moyenne, il est admis
    }
    eleve_restant-=1 ; //retire le dernier élève de la liste
}
if (eleve_admis === eleve.length) {
    console.log("Félicitations, tout les élèves de la classe ont la moyenne") ;
}