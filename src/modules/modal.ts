const modal = document.getElementById("myModal") as HTMLElement;
const openModalButton = document.getElementById("openModal") as HTMLElement;
const closeModalButton = document.getElementById("closeModal") as HTMLElement;

export function initModal(): void {
    openModalButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
}