"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndDisplayPosts = fetchAndDisplayPosts;
function fetchAndDisplayPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((data) => {
        const posts = document.getElementById("posts");
        data.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            posts.appendChild(postElement);
        });
    });
}
