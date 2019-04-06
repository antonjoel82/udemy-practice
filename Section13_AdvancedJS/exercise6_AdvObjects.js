//Evaluate these:
//#1
[2] === [2] //false;
{} === {}  // false;

//#2 what is the value of property a for each object.
const object1 = { a: 5 };  //4
const object2 = object1; // 4
const object3 = object2;  //4
const object4 = { a: 5}; // 5
object1.a = 4; //4



//#3 create two classes: an Animal class and a Mamal class. 
// create a cow that accepts a name, type and color and has a sound method that moo's her name, type and color. 

class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }

    sound () {
        return `I'm a ${this.color} ${this.type} named ${this.name}!`;
    }
};

class Cow extends Animal {
    constructor (name, color) {
        super (name, "Cow", color);
    }
    
    moo() {
        return `Moooooo! ${this.sound()}`;
    }
};

const daisy = new Cow("Daisy", "Brown");
console.log(daisy.sound());
console.log(daisy.moo());