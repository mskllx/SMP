"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = require("./modules/modal");
const scroll_1 = require("./modules/scroll");
const fetchData_1 = require("./modules/fetchData");
(0, modal_1.initModal)();
(0, scroll_1.initScrollTracker)();
(0, fetchData_1.fetchAndDisplayPosts)();
