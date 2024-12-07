let scrollCount = 0;
const modalContent = document.querySelector(".modal-content p") as HTMLElement;

export function initScrollTracker(): void {
    window.addEventListener("scroll", () => {
        scrollCount++;
        console.log("User is scrolling", scrollCount);

        modalContent.textContent = `This is a modal window! Number of scrolls: ${scrollCount}`;
    });
}