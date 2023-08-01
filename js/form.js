import { categories } from "./categories.js";
import { notes } from "./notes.js";
import { updateNotesTable } from "./notesTable.js";
import { updateSummaryTable } from "./summaryTable.js";

function createForm(note) {
  const categoryOptions = categories
    .map(
      (category) =>
        `<option value="${category.name}" ${
          category.name === note?.category ? "selected" : ""
        }>${category.name}</option>`
    )
    .join("");

  const formWidget = `
    <div class="form-wrapper">
      <form class="form" method="post" action="#">
        <button type="button" class="close">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <input type="text" class="name" name="name" value="${
          note?.name || ""
        }" placeholder="Name..." required />
        <select class="category" name="category">
          ${categoryOptions}
        </select>
        <textarea
          class="content"
          name="content"
          cols="30"
          rows="10"
          placeholder="Content..."
          required
        >${note?.content || ""}</textarea>
        <button class="submit">Submit</button>
      </form>
    </div>`;

  return formWidget;
}

function displayForm(note) {
  const formWidget = createForm(note);
  const main = document.querySelector("main");
  main.insertAdjacentHTML("afterend", formWidget);

  const form = document.querySelector(".form");
  const closeBtn = document.querySelector(".form .close");
  form.addEventListener("submit", (event) => handleFormSubmit(event, note?.id));
  closeBtn.addEventListener("click", closeForm);
}

function closeForm() {
  try {
    document.querySelector(".form-wrapper").remove();
  } catch (error) {
    console.error(error);
  }
}

function handleFormSubmit(event, noteId) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const id = noteId || notes.at(notes.length - 1)?.id + 1 || 1;
  const name = formData.get("name");
  const created = new Date().toISOString();
  const category = formData.get("category");
  const content = formData.get("content");
  const note = {
    id,
    name,
    created,
    category,
    content,
    isActive: true,
  };

  //if noteId is provided then we edit the note else we create a new one
  if (noteId) {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    notes[noteIndex] = note;
  } else {
    notes.push(note);
  }

  updateNotesTable();
  updateSummaryTable();
  closeForm();
}

export { displayForm };
