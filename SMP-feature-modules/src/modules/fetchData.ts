import { Post } from '../types';

export function fetchAndDisplayPosts(): void {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((data: Post[]) => {
            const posts = document.getElementById("posts") as HTMLElement;
            data.forEach((post: Post) => {
                const postElement = document.createElement("div");
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                posts.appendChild(postElement);
            });
        });
}