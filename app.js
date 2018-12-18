"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(name, username) {
        this.username = username;
        this.age = 32;
        this.name = name;
    }
    Person.prototype.setType = function (type1) {
        // this.type refers to the private type at the top
        this.type = type1;
        console.log(this.type);
    };
    // printAge is calling a private method inside this class. to use the setType(), you have to call a method in the class that is not set to private.
    Person.prototype.printAge = function () {
        console.log(this.age);
        this.setType("Old Guy");
    };
    return Person;
}());
// arguments are (name, username)
var person = new Person("Andrew", "Drew");
console.log(person.name, person.username);
person.printAge();
// person.setType("cool guy"); // this will not work with private methods in the class
// Inheritance
var Andrew = /** @class */ (function (_super) {
    __extends(Andrew, _super);
    //name = "Andrew";
    function Andrew(username) {
        var _this = _super.call(this, "Andrew", username) || this;
        _this.age = 28;
        return _this;
    }
    return Andrew;
}(Person));
var Drewdrew = new Andrew("Handrew");
console.log(Drewdrew);
// ================================================ GETTERS & SETTERS =========================================================================
// getters and setters are used to controll access to your properties and make sure certain criteria are met before assigning a value
var Plant = /** @class */ (function () {
    function Plant() {
        this.species = "Default";
    }
    Object.defineProperty(Plant.prototype, "species1", {
        // setter - call it like a property but set it up like a method with a parameter. this only sets. The value for the setter is going to be set outside this class.
        set: function (value) {
            if (value.length > 3) {
                this.species = value;
            }
            else {
                this.species = "Default";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plant.prototype, "species2", {
        // getter - able to return anything but with this you can grab information outside of this class.
        get: function () {
            return this.species;
        },
        enumerable: true,
        configurable: true
    });
    return Plant;
}());
var plant = new Plant();
// you can grab only getter
console.log(plant.species2);
// set the setter in the Plant class and then use getter in the console.log
plant.species1 = "AB";
console.log(plant.species2);
plant.species1 = "Green Plant";
console.log(plant.species2);
// =========================================== STATIC PROPERTIES & METHODS =================================================================
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.calcCircumference = function (diameter) {
        return this.PI * diameter;
    };
    // PI : number = 3.14; // you need static before the property.  Class Helpers is the class and not an instance of the class. You can make PI accessible when adding 'static'. You can also use static methods.  Static methods are called without instantiating their class and are also not callable when the class is instantiated. Static methods have no access to data stored in specific objects. Static methods are called on the class instead of instances of the class.
    Helpers.PI = 3.14;
    return Helpers;
}());
console.log(2 * Helpers.PI);
console.log(Helpers.calcCircumference(8));
// ================================================ ABSTRACT CLASS ==================================================
//they are marked with abstract keyword at declaration. cannot be instanciated directly, so you MUST inherit from them only. Class that can only be inherited. This class does not needs to be instantiated but other class might need this. This can only be extended.
var Project = /** @class */ (function () {
    function Project() {
        this.projectName = "Default";
        this.budget = 1000;
    }
    // implemented the logic for calcBudget(). This just shows the you can have some method set OR use abstract method to have nothing set here but have it set in a class that extends this abstract class.
    Project.prototype.calcBudget = function () {
        return this.budget * 2;
    };
    return Project;
}());
// I can create a more specialized class. there will be error in the beginning because we have to implement injerit abstract member "changeName" from class "Project"
var ITProject = /** @class */ (function (_super) {
    __extends(ITProject, _super);
    function ITProject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // only set this projectName to name. You could have set this up in the abstract class project but this is just to show that you can also set an abstract method in the abstract class Project and work around like this.
    ITProject.prototype.changeName = function (name) {
        this.projectName = name;
    };
    return ITProject;
}(Project));
// creating an instance of ITProject instead of Project because it's an abstract class. property budget will not be shown in the console unless you define it something e.g. budget : number = 1000.
var newProject = new ITProject();
console.log(newProject);
newProject.changeName("Super IT Project");
console.log(newProject);
// ========================================== PRIVATE CONTRUCTORS =================================================
// singleton - object which can only be instantiated once.  This will be useful in stuations where system-wide actions need to be coordinated from a single central place. Example will be a database connection pool. The pool manages the creation, destruction, and lifetime of all database connections for the entire application ensuring that no connections are 'lost'
var OnlyOne = /** @class */ (function () {
    //using a 'short-cut' to create a public property called name in the private constructor. Having the constructor with argument 'name', it's like having a variable/property in this class.
    function OnlyOne(name) {
        this.name = name;
    }
    // this static method will see if the instance was created before and if not set a new OnlyOne. Then it will not be able to use this class anymore.
    OnlyOne.getInstance = function () {
        if (!OnlyOne.instance) {
            OnlyOne.instance = new OnlyOne('The Only One');
        }
        return OnlyOne.instance;
    };
    return OnlyOne;
}());
// 'wrong' has a private constructors that cannot be accessible
// let wrong = new OnlyOne('The Only One');
var right = OnlyOne.getInstance();
// the way we have it set up we can grab the public property in the constructor.
console.log(right.name);
// you can also set this public property to something else as well
right.name = 'Something else';
console.log(right.name);
// a way to NOT set 'name' in the constructor and no other place like what we did in the example above (right.name = 'something else'). To make the class a 'readOnly' we can use a getter. The OnlyOne class would only have a getter and a setter is not required.  Having a getter will make it Read Only. It makes sense when you think about it. OR you can add 'readonly' in the argument in the private constructor. There are couple ways of doing this. This is a new addition to typescript 2.0
/*
    class OnlyOne {
        private static instance : OnlyOne;
        public readonly name : string;

        private constructor(name : string) {
            this.name = name;
        }
    }

    ============== OR ==================

    class OnlyOne {
        private static instance : OnlyOne;

        private construcxtor(public readonly name : string) {}
    }

*/
// ========================================== Module Exercise Problem ========================================== START -========================
// Exercise 1 - How was your TypeScript Class?
// function Car(name) {
//     this.name = name;
//     this.acceleration = 0;
//     this.honk = function() {
//         console.log("Toooooooooot!");
//     };
//     this.accelerate = function(speed) {
//         this.acceleration = this.acceleration + speed;
//     }
// }
var Car = /** @class */ (function () {
    function Car(name) {
        this.acceleration = 0;
        this.name = name;
    }
    Car.prototype.honk = function () {
        console.log("Toooooooot!");
    };
    Car.prototype.accelerate = function (speed) {
        this.acceleration = this.acceleration + speed;
    };
    return Car;
}());
var car = new Car("BMW");
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);
// ============================== Exercise 2 - Two objects, based on each other ... implement Inheritance ==============================
/*
var baseObject = {
    width: 0,
    length: 0
};
var rectangle = Object.create(baseObject);
rectangle.width = 5;
rectangle.length = 2;
rectangle.calcSize = function() {
    return this.width * this.length;
};
*/
var baseObject = /** @class */ (function () {
    function baseObject() {
        this.width = 0;
        this.length = 0;
    }
    return baseObject;
}());
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype.calcSize = function () {
        return this.width * this.length;
    };
    return Rectangle;
}(baseObject));
var rectangle = new Rectangle();
rectangle.width = 5;
rectangle.length = 10;
console.log(rectangle.calcSize());
// ============================== Exercise 3 - Make sure to compile to ES5 (set the target in tsconfig.json) GETTERS & SETTERS ==============================
/*
var person = {
    _firstName: ""
};
Object.defineProperty(person, "firstName", {
    get: function () {
        return this._firstName;
    },
    set: function (value) {
        if (value.length > 3) {
            this._firstName = value;
        }
        else {
            this._firstName = "";
        }
    },
    enumerable: true,
    configurable: true
});

*/
// I changed the Person class to Person1 because the example in the previous tutorial that has the same name Person.
var Person1 = /** @class */ (function () {
    function Person1() {
        this._firstName = "empty in the beginning";
    }
    Object.defineProperty(Person1.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            if (value.length > 3) {
                this._firstName = value;
            }
            else {
                this._firstName = "the name's length is shorter than 3";
            }
        },
        enumerable: true,
        configurable: true
    });
    return Person1;
}());
var person1 = new Person1();
console.log(person1.firstName);
person1.firstName = "Ma";
console.log(person1.firstName);
person1.firstName = "Maximilian";
console.log(person1.firstName);
// =================== END ======================= Module Exercise Problem ========================================== END -========================
/// <reference path="./reactangleMath.ts"/>
// ===================================== NAMESPACES ======================================================
/*
    we might want to create namesapce to group all the mathematical functions. Having many many functions will get messy so namespace will make it easy. Kind of like a javascript object.
    we have export each method in the namespaces.
*/
var MyMath;
(function (MyMath) {
    MyMath.PI = 3.14;
    function calculateCircumference(diameter) {
        return diameter * MyMath.PI;
    }
    MyMath.calculateCircumference = calculateCircumference;
})(MyMath || (MyMath = {}));
console.log('Namespaces ======= START');
//you target/call namesapce.method
console.log(MyMath.calculateCircumference(3));
//console.log(MyMath.calculateRectangle(10, 20));
console.log(MyMath.PI);
console.log('Namespaces ======= END');
// created another file that has another namespace that will calculate Rectangle.  To combine all the namespaces into one file and so you won't have to <script></script> each file into the index.html we can go to terminal and type:
// tsc --outFile (name of the javascript file) (other namespace files) (reactangleMath.ts) (app.ts)
//=================== importing namespaces ==================================
// instead of in your terminal and typing every file of the namespace that you want to add, you can just import them into this file.
// importing requires '///' three of the forward slashes and a reference and a path. Then we type in terminal:
// tsc app.ts --outFile app.js
/*

/// <reference path="reactangleMath.ts" />

*/
// You can have namespaces INSIDE a namespace
/*

    namespace MyMath {
        export namespace Circle {
            const PI = 3.14;

            export function calculateCircumference(diameter : number) {
                return diameter * 2;
            }
        }
    }

*/
// limitations on namespaces is that if each namespace or files need other namespaces and if you had a lot of these namespaces, it can get really confusing.  Namespaces are great for small size projects but when it comes to medium sized and large sized projects, using modules might be a better choice
var circle_1 = require("./Math/circle");
console.log(circle_1.PI);
console.log(circle_1.calculateCircumference(10));
console.log();
// native js doesn't support modules and importing anything. Without the help of es6. so go to tsconfig.json and in "module": and change it too "amd" 
// we need a module loader - loads all kinds of modules. we are going to install systemjs. go to index.html and replace the script with:
/*
        <script src="node_modules/systemjs/dist/system.js"></script>
    <script>
        SystemJS.config({
            baseURL: '/',
            defaultJSExtensions: true
        });
        SystemJS.import('app.js');
    </script>
*/
