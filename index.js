// Termminal readline ability
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// run the program in the terminal: node index.js
// ! Do not touch code above this line.
start();

class Player {
  constructor(name, currentRoom) {
    this.name = name;
    this.currentRoom = currentRoom;
    this.inventory = [];
  
  }

  // pickupItem(itemName) {
  //   const item = this.currentRoom.items.find((item) => item.name === itemName);
  //   if (item) {
  //     item.pickup(this);
  //   } else {
  //     console.log(`Could not find ${itemName} in room.`);
  //   }
  // }



  addItemToInventory(item) {
    this.inventory.push(item);
    console.log(`Added ${item.name} to inventory`);
}

listItemsInInventory(inventory) {
  if (this.inventory.length === 0) {
  console.log(`You have no items. :( )`)
} else {
  console.log("You have the following items:")
  for (const index of this.inventory) {
    console.log(`${index.inventory}`)
  }
}
} 
}

class Item {
  constructor(name, description) {
    this.name = name;
    this.description = description
    this.items = [];
  }
  addItem(item) {
    this.items.push(item);
  }
}
class Room {
constructor(name, description) {
  this.name = name;
  this.description = description;
  this.items = [];
  this.exits = {};
  
};

describe() { 
console.log(`\n${this.name}\n${this.description}`);
this.listItems();
this.listExits();

};

pickUpItem(itemName) {
  const itemIndex = this.items.findIndex(item => item.name === itemName);
  if (itemIndex !== -1) {
    const item = this.items.splice(itemIndex, 1)[0];
    this.player.addItem(item);
    console.log(`You picked up ${item.name}.`);
  } else {
    console.log(`There is no ${itemName} in this room.`);
  }
}



listItems () {
if (this.items.length === 0) {
console.log("There are no items in this room.");
} else {
console.log("You see the following items:");
for (const item of this.items) {
  console.log(`- ${item.name}: ${item.description}`);
}
}
}

// addExit(direction, roomName) {
//   this.exits[direction] = roomName;
// }


listExits() {
console.log("You can go to the following rooms:")
for (const exit in this.exits) {
console.log(`-${exit}`);
}
}
}

// const inventory = [];
//------Rooms-------------
const mainDoor = new Room ("Main Door", "The door that you entered into the building from")

const foyer = new Room( `\nYou are in a foyer. Or maybe it's an antechamber. 
Or a vestibule. 
Or an entryway. 
Or an atrium. 
Or a narthex. 
But let's forget all that fancy vocabulary, and just call it a foyer.
Anyways, it's definitely not a mudroom.
A copy of the local paper lies in a corner.`)



// console.log(foyer.exits)
// console.log(mainDoor.exits)

//console.log(foyer)
//----------Items-----------------

const localpaper = new Item("Local paper", "A local newspaper. With something inside?" ) //Parent Item
//console.log(localpaper)
//console.log(localpaper.items)

const key1 = new Item("Key 1", "A golden skeleton key!") // child Item

foyer.items.push(localpaper);
localpaper.addItem(key1);

//console.log(foyer.items)
//-----------Movement/exits/Rooms--------------


let currentRoom = "mainDoor"

// --- This is the look up table---
let roomLookUp = {
  foyer: foyer,
  mainDoor:mainDoor,
};


// This is the state machine table
let Rooms = {
  foyer:["mainDoor"],
  mainDoor:["foyer",]
};

mainDoor.exits = {north: foyer, south: undefined};
foyer.exits = { south: mainDoor,};




function enterRoom(newRoom) {
  let validTransitions = Rooms[currentRoom];
  console.log(`\n You were in: ${currentRoom}`)

  if (validTransitions.includes(newRoom)) {
    currentRoom = newRoom
    console.log(`\nYou are now in ${currentRoom}`);
  } else {
    throw `You cannot move from ${currentRoom} to ${newRoom}`
  }
}




async function start() {
  
  console.log(`\n----------------`)
  console.log(`182 Main St.
  You are standing on Main Street between Church and South Winooski.
  There is a door here. A keypad sits on the handle.
  On the door is a handwritten sign that reads:"Welcome :3".`)
console.log(`------------------`)

 

     console.log('\nWhat would you like to do? "enter code" on the keypad or "leave"?')


      let progress = await ask("> "); 
      

  if (progress === "enter code") {
    console.log("You approach the key pad. Above the keypad is a note that reads: 'Call Jenny :)'")
    console.log(`\n Enter passcode:`)
    codeInput()

  } else if (progress === "leave"){
     console.log ("Yeah this game is dumb anyway :'( ")
     process.exit
  } else {
    console.log(`\n I don't know how to "${progress}".`);
    start()
  };
};
  async function codeInput() {

  const keypadcode = `8675309`
  let attempts = 3;
    
    while (attempts > 0) {
      const enterCode = await ask("> ");

      if (enterCode === keypadcode) {
        console.log("Jenny, Jenny! Who can I turn to? 8675309!")
        console.log(`\n You got it! The door creaked open and you walk inside...`)
        
        levelOne();
        break;
      } else {
        attempts--;
        console.log(`Incorrect passcode entered. You have ${attempts} left.`);
      }
       if (attempts === 0){
        console.log("You have failed to enter the correct passcode three times! The door 'emergency locks' and an alarm starts going off! You'll have to come back when the coast is clear!")
        start()
       }  
    } 
   

    
};

async function levelOne () {
console.log("Welcome to level one")
console.log(currentRoom)

let firstRoom = await ask (`Where do you want to go?`)

enterRoom(firstRoom)








// try {
  //   console.log(enterRoom(`foyer`));
  //   console.log(foyer.describe());
  // } catch (error) {
  //   console.log('Error:', error);




  // }
}



























//process.exit();