import { getCategoryIcon } from "./categories.js";
import { notes } from "./notes.js";
import { updateNotesTable } from "./notesTable.js";
import { updateSummaryTable } from "./summaryTable.js";

function closeArchive() {
  try {
    document.querySelector(".archive-wrapper").remove();
  } catch (error) {
    console.error(error);
  }
}

function createArchiveTableEntry(note) {
  const { name, category } = note;
  const categoryIcon = getCategoryIcon(category);
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>
      <div class="name-wrapper">
        ${categoryIcon}
        <span class="name">${name}</span>
      </div>
    </td>
    <td>
      <button class="unarchive">Unarchive</button>
    </td>`;

  return row;
}

function updateArchiveTable() {
  const archiveTable = document.querySelector(".archive");
  archiveTable.innerHTML = `
    <tr>
      <th>Name</th>
      <th></th>
    </tr>`;

  notes
    .filter((note) => !note.isActive)
    .forEach((note) => {
      const archiveTableEntry = createArchiveTableEntry(note);
      const unarchiveBtn = archiveTableEntry.querySelector(".unarchive");

      archiveTable.appendChild(archiveTableEntry);
      unarchiveBtn.addEventListener("click", () =>
        removeNoteFromArchive(note.id)
      );
    });
}

function removeNoteFromArchive(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  notes[noteIndex].isActive = true;
  updateNotesTable();
  updateSummaryTable();
  updateArchiveTable();
}

export { closeArchive, updateArchiveTable };
