import { displayForm } from "./form.js";
import { updateNotesTable } from "./notesTable.js";
import { updateSummaryTable } from "./summaryTable.js";

function init() {
  const createNoteBtn = document.querySelector(".create-note");
  createNoteBtn.addEventListener("click", displayForm);
  updateNotesTable();
  updateSummaryTable();
}

document.addEventListener("DOMContentLoaded", init);
