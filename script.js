alert("REMEBER!! HEALTH HAS TO BE BETWEEN 1000 AND 2000. ATTACK HAS TO BE BETWEEN 100 AND 200. ARMOR HAS TO BE BETWEEN 50 AND 75. AND ALSO OPEN THE WEB CONSOLE");

document.querySelector(".submit").addEventListener("click", (e)=>{
    e.preventDefault();
    const health = document.getElementById("health").value
    const attack = document.getElementById("attack").value
    const armor = document.getElementById("armor").value
    document.querySelector("#hiddena").setAttribute("hidden", true)
    document.querySelector("#hiddenb").setAttribute("hidden", true)
    document.querySelector("#hiddenc").setAttribute("hidden", true)
    document.querySelector("#hiddend").setAttribute("hidden", true)
    let character = new Character(health, attack, armor);
    let aux = 0
    let id = 1;
    let enemys = [];
    while(aux<5){
        let randHealth = Math.floor(Math.random() * (2001 - 1000) + 1000);
        let randAttack = Math.floor(Math.random() * 100);
        let randArmor = Math.floor(Math.random() * 50);
        let newEnemy = new Enemys(id, randHealth, randAttack, randArmor)
        enemys.push(newEnemy)
        id++
        aux++
    }
    Game(character, enemys)
})


function Game(character, enemys) {
    let aux = 0;
    let id = 0;
    enemys.sort((a,b)=>{
        return b.health - a.health;
    })
    while (aux < 10) {
        console.log(`Round ${aux + 1}`)
        if (id > 4) {
            id = 0
        }
        let newEnemyHealth = attackEnemy(id, character, enemys);
        enemys[id].health = newEnemyHealth;
        let newCharHealth = enemyAttack(id, character, enemys); 
        console.log(`Your health is decreased to ${newCharHealth}`)
        character.health = newCharHealth;
        if(newCharHealth === 0){
            console.log("YOU DIED! Press F5 to restart"); 
            break;
        }
        id++
        aux++
        if(aux === 10){
            console.log("The number of rounds are over, it's a tie! Press F5 to restart")
        }
    }
}

function attackEnemy(id, char, enemy) {
    for (let i = 0; i < enemy.length; i++) {
        console.log(`The health of the enemy ${i+1} is = ${enemy[i].health}`)    
    }
    let key = prompt("If you would like to attack press 1");
    while(key !== "1"){
        alert("That's not number 1!!!! >:(")
        key = prompt("If you would like to attack press 1");
    }
    if (key === "1") {
        if (enemy[id].health === 0) {
            id++
        }
        let enemyHealth = enemy[id].health;
        let enemyArmor = enemy[id].armor;
        let charAttack = char.attack;
        let totalDamage = charAttack - enemyArmor;
        if(totalDamage < 0){
            totalDamage = 1;
        }
        console.log(`You did ${totalDamage} damage to the enemy ${id + 1}!`)
        return enemyHealth - totalDamage;
    }
    else{
        alert("That's not for attacking")
        prompt("If you would like to attack press 1");
    }
}

function enemyAttack(id, char, enemy) {
    let charHealth = char.health;
    let charArmor = char.armor;
    let enemyAttack = enemy[id].attack;

    let totalDamage = enemyAttack - charArmor;
    if(totalDamage < 0){
        totalDamage = 1;
    }
    return charHealth - totalDamage;
}


function Character(health, attack, armor) {
    this.health = health,
    this.attack = attack,
    this.armor = armor 
}

function Enemys(id, health, attack, armor) {
    this.id = id,
    this.health = health,
    this.attack = attack,
    this.armor = armor
}

function Health(health){
    if (health <=2000 && health >= 1000) {
        return 0
    } else {
        alert("health has to be between 1000 and 2000")
    }
}

function Attack(attack){
    if (attack <=200 && attack >= 100) {
        return 0
    } else {
        alert("armor has to be between 100 and 200")
    }
}

function Armor(armor){
    if (armor <=75 && armor >= 50) {
        return 0
    } else {
        alert("armor has to be between 50 and 75")
    }
}