const name = "B1-A";
console.log(name);
let student = 28;
console.log(student);
let classe = true;
console.log(classe);

console.log("==============");
//part 2 
console.log("Part 2");
let eleve1 = {
    prenom : "Théo",
    note_maths : 15,
    note_français : 12
};
console.log(eleve1.prenom);

console.log("==============");
//part 3 
console.log("Part 3");
let eleve2 = {
    prenom : "Lilian",
    note_maths : 14,
    note_français : 9.5
};
let eleve3 = {
    prenom : "Pierre",
    note_maths : 14,
    note_français : 0.5
};

let eleve = [eleve1, eleve2, eleve3];
for (let i = 0; i < eleve.length; i++) {
    console.log(eleve[i].prenom);
}

console.log("==============");
// part 4
console.log("Part 4");
for (let i = 0; i<eleve.length; i++) {
    let moyenne=(eleve[i].note_français+eleve[i].note_maths)/2;
    console.log(eleve[i].prenom, moyenne);
    if (moyenne <10) {
        console.log("Refusé");
    }
    else {
        console.log("Admis");
    }
    console.log("==============");
}
