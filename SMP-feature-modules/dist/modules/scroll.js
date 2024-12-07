"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initScrollTracker = initScrollTracker;
let scrollCount = 0;
const modalContent = document.querySelector(".modal-content p");
function initScrollTracker() {
    window.addEventListener("scroll", () => {
        scrollCount++;
        console.log("User is scrolling", scrollCount);
        modalContent.textContent = `This is a modal window! Number of scrolls: ${scrollCount}`;
    });
}
