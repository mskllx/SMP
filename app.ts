const modal = document.getElementById("myModal") as HTMLElement;
const openModalButton = document.getElementById("openModal") as HTMLElement;
const closeModalButton = document.getElementById("closeModal") as HTMLElement;
const modalContent = document.querySelector(".modal-content p") as HTMLElement;

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
        const posts = document.getElementById("posts") as HTMLElement;
        data.forEach((post: { title: string, body: string }) => {
            const postElement = document.createElement("div");
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            posts.appendChild(postElement);
        });
    });
