/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(attr) {
  this.createdAt = attr.createdAt;
  this.name = attr.name;
  this.dimensions = attr.dimensions;
}

GameObject.prototype.destroy = function(){
  return `${this.name} was removed from the game`
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(attr){
  GameObject.call(this,attr);
  this.healthPoints = attr.healthPoints;
  this.alive = attr.alive;
};
CharacterStats.prototype = Object.create(GameObject.prototype); // inherit GameObject methods

CharacterStats.prototype.takeDamage = function(amount) {
  this.healthPoints -= amount;
  return `${this.name} took ${amount} damage`;
};


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(attr) {
  CharacterStats.call(this,attr); // Inherit CharacterStats properties -- needed??
  this.team = attr.team;
  this.weapons = attr.weapons;
  this.language = attr.language;
};

// Humanoid.prototype = Object.create(GameObject.prototype);   // Inherit GameObject properties
Humanoid.prototype = Object.create(CharacterStats.prototype); // Inherit Humanoid properties

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}`;
};

// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function. --done
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;

function Villain (attr) {
  Humanoid.call(this,attr); // Inherit Humanoid properties
};
Villain.prototype = Object.create(Humanoid.prototype); // Inherit Humanoid methods
Villain.prototype.stab_attack = function(target) {
  let damage = 4;
  target.takeDamage(damage);
  if (target.healthPoints <= 0){
    target.destroy();
    return `${this.name} did a STAB ATTACK on ${target.name}, and did ${damage} damage! and killed them! SAVAGE`
  } 
  return `${this.name} did a STAB ATTACK on ${target.name}, and did ${damage} damage!`;
};

function Hero (attr) {
  Humanoid.call(this,attr); // Inherit Humanoid properties
};
Hero.prototype = Object.create(Humanoid.prototype); // Inherit Humanoid methods
Hero.prototype.jump_attack = function (target) {
  let damage = 5;
  target.takeDamage(damage);
  if (target.healthPoints <= 0){
    target.destroy();
    return `${this.name} did a JUMP ATTACK on ${target.name}, and did ${damage} damage! and killed them! SAVAGE`
  } 
  return `${this.name} did a JUMP ATTACK on ${target.name}, and did ${damage} damage!`;
};

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    alive: true,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    alive: true,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    alive: true,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage(10)); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  const jon = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 8,
    alive: true,
    name: 'Jon Snow',
    team: 'The North',
    weapons: [
      'Sword'
    ],
    language: 'Human',
  });

  const nk = new Villain({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 14,
    alive: true,
    name: 'Night King',
    team: 'Dead',
    weapons: [
      'Sword'
    ],
    language: 'Zombie',
  });

  console.log(`******************STRETCH Battle against: ${jon.name} and ${nk.name} *******************`);
  console.log(`Round 1`);
  console.log(`JON HP:${jon.healthPoints} | NIGHT KING HP:${nk.healthPoints}`);
  console.log(jon.jump_attack(nk));
  console.log(nk.stab_attack(jon));
  console.log(`Round 2`);
  console.log(`JON HP:${jon.healthPoints} | NIGHT KING HP:${nk.healthPoints}`);
  console.log(jon.jump_attack(nk));
  console.log(nk.stab_attack(jon));
  