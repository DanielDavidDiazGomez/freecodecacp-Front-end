interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

const STORAGE_KEY = "mazo-de-estudio";

const defaultCards: FlashCard[] = [
  { questionText: "¿Cuál es la capital de Francia?", questionAnswer: "París" },
  { questionText: "¿Qué significa HTML?", questionAnswer: "HyperText Markup Language" },
  { questionText: "¿Cuánto es 7 × 8?", questionAnswer: "56" },
];

function loadCards(): FlashCard[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: FlashCard[] = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* si el almacenamiento falla, usamos las tarjetas por defecto */
  }
  return [...defaultCards];
}

function saveCards(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentCards));
  } catch {
    /* ignorar errores de almacenamiento */
  }
}

let currentCards: FlashCard[] = loadCards();
let currentIndex = 0;

// Referencias al DOM
const flashcardEl = document.getElementById("flashcard") as HTMLElement;
const frontEl = document.getElementById("card-front-text") as HTMLElement;
const backEl = document.getElementById("card-back-text") as HTMLElement;
const counterEl = document.getElementById("counter") as HTMLElement;
const deleteBtn = document.getElementById("delete-btn") as HTMLButtonElement;
const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
const entryForm = document.getElementById("entry-form") as HTMLFormElement;
const frontInput = document.getElementById("front-text") as HTMLTextAreaElement;
const backInput = document.getElementById("back-text") as HTMLTextAreaElement;
const formError = document.getElementById("form-error") as HTMLElement;

function InvalidUserInputError(message: string = "Entrada no válida"): never {
  const error = new Error(message);
  error.name = "InvalidUserInputError";
  throw error;
}

// Disponible también como función global
(window as any).InvalidUserInputError = InvalidUserInputError;

function renderCard(): void {
  flashcardEl.classList.remove("flipped");

  if (currentCards.length === 0) {
    frontEl.textContent = "No hay tarjetas. ¡Añade una abajo!";
    backEl.textContent = "";
    counterEl.textContent = "0 / 0";
    return;
  }

  const card = currentCards[currentIndex];
  frontEl.textContent = card.questionText;
  backEl.textContent = card.questionAnswer;
  counterEl.textContent = `${currentIndex + 1} / ${currentCards.length}`;
}

// Voltear la tarjeta
flashcardEl.addEventListener("click", () => {
  flashcardEl.classList.toggle("flipped");
});

flashcardEl.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    flashcardEl.classList.toggle("flipped");
  }
});

// Navegación
prevBtn.addEventListener("click", () => {
  if (currentCards.length === 0) return;
  currentIndex = (currentIndex - 1 + currentCards.length) % currentCards.length;
  renderCard();
});

nextBtn.addEventListener("click", () => {
  if (currentCards.length === 0) return;
  currentIndex = (currentIndex + 1) % currentCards.length;
  renderCard();
});

// Eliminar la tarjeta actual y mostrar la anterior
deleteBtn.addEventListener("click", () => {
  if (currentCards.length === 0) return;
  currentCards.splice(currentIndex, 1);
  currentIndex = Math.max(0, currentIndex - 1);
  saveCards();
  renderCard();
});

// Añadir tarjetas
entryForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  const questionText = frontInput.value.trim();
  const questionAnswer = backInput.value.trim();

  if (questionText === "" || questionAnswer === "") {
    const message = "La pregunta y la respuesta no pueden estar vacías.";
    formError.textContent = message;
    InvalidUserInputError(message);
    return;
  }

  formError.textContent = "";
  currentCards.push({ questionText, questionAnswer });
  currentIndex = currentCards.length - 1;
  saveCards();
  entryForm.reset();
  renderCard();
});

renderCard();
