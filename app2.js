"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { PI, calculateCircumference } from "./Math/circle";
var Circle = __importStar(require("./Math/circle"));
var rectangle_1 = require("./Math/rectangle");
console.log(Circle.PI);
console.log(Circle.calculateCircumference(10));
console.log(rectangle_1.calculateRectangle(20, 50));
