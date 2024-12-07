"use strict";
const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const modalContent = document.querySelector(".modal-content p");
let scrollCount = 0;
openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
});
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});
window.addEventListener("scroll", () => {
    scrollCount++;
    console.log("User is scrolling", scrollCount);
    modalContent.textContent = `Кількість пролистувань: ${scrollCount}`;
});
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
    const posts = document.getElementById("posts");
    data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        posts.appendChild(postElement);
    });
});
