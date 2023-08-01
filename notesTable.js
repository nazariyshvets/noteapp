import { getCategoryIcon } from "./categories.js";
import { notes, updateNotes } from "./notes.js";
import { displayForm } from "./form.js";
import { updateSummaryTable } from "./summaryTable.js";
import { closeArchive, updateArchiveTable } from "./archive.js";

function createNoteTableEntry(note) {
  const { category, name, created, content } = note;
  const categoryIcon = getCategoryIcon(category);
  const formattedDate = new Date(created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  //select all dates from a string in the format mm/dd/yyyy
  const dates =
    content
      .match(/\b(?:\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\/\d{4})\b/g)
      ?.join(", ") || "";
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>
      <div class="name-wrapper">
        ${categoryIcon}
        <span class="name">${name}</span>
      </div>
    </td>
    <td>${formattedDate}</td>
    <td>${category}</td>
    <td>${content}</td>
    <td>${dates}</td>
    <td>
      <div class="buttons">
        <button class="edit-note" title="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="add-note-to-archive" title="add to archive">
          <i class="fa-solid fa-plus"></i>
        </button>
        <button class="remove-note" title="remove">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

function updateNotesTable() {
  const notesTable = document.querySelector(".notes");
  notesTable.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Created</th>
      <th>Category</th>
      <th>Content</th>
      <th>Dates</th>
      <th>
        <div class="buttons">
          <button class="open-archive" title="view archive">
            <i class="fa-solid fa-folder-open"></i>
          </button>
          <button class="remove-all-notes" title="remove all notes">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </th>
    </tr>`;

  const openArchiveBtn = document.querySelector(".open-archive");
  const removeAllNotesBtn = document.querySelector(".remove-all-notes");
  openArchiveBtn.addEventListener("click", openArchive);
  removeAllNotesBtn.addEventListener("click", removeAllNotes);

  notes
    .filter((note) => note.isActive)
    .forEach((note) => {
      const noteTableEntry = createNoteTableEntry(note);
      const editNoteBtn = noteTableEntry.querySelector(".edit-note");
      const addNoteToArchiveBtn = noteTableEntry.querySelector(
        ".add-note-to-archive"
      );
      const removeNoteBtn = noteTableEntry.querySelector(".remove-note");

      notesTable.appendChild(noteTableEntry);
      editNoteBtn.addEventListener("click", () => editNote(note.id));
      addNoteToArchiveBtn.addEventListener("click", () =>
        addNoteToArchive(note.id)
      );
      removeNoteBtn.addEventListener("click", () => removeNote(note.id));
    });
}

function editNote(noteId) {
  const note = notes.find((note) => note.id === noteId);

  //pass the note data to prefill the form
  displayForm(note);
}

function addNoteToArchive(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  notes[noteIndex].isActive = false;
  updateNotesTable();
  updateSummaryTable();
}

function removeNote(noteId) {
  const isConfirmed = confirm("Are you sure you want to delete this note?");

  if (isConfirmed) {
    const newNotes = notes.filter((note) => note.id !== noteId);
    updateNotes(newNotes);
    updateNotesTable();
    updateSummaryTable();
  }
}

function openArchive() {
  const archiveWidget = `
    <div class="archive-wrapper">
      <button type="button" class="close">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <table class="table archive">
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </table>
    </div>`;

  const main = document.querySelector("main");
  main.insertAdjacentHTML("afterend", archiveWidget);

  const closeArchiveBtn = document.querySelector(".archive-wrapper .close");
  closeArchiveBtn.addEventListener("click", closeArchive);

  updateArchiveTable();
}

function removeAllNotes() {
  const isConfirmed = confirm("Are you sure you want to delete all the notes?");

  if (isConfirmed) {
    updateNotes([]);
    updateNotesTable();
    updateSummaryTable();
  }
}

export { updateNotesTable };
