"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModal = initModal;
const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
function initModal() {
    openModalButton.addEventListener("click", () => {
        modal.style.display = "block";
    });
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
}
