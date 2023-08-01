import { categories, getCategoryIcon } from "./categories.js";
import { notes } from "./notes.js";

function updateSummaryTable() {
  const summaryTable = document.querySelector(".summary");
  summaryTable.innerHTML = `
    <tr>
      <th>Note Category</th>
      <th>Active</th>
      <th>Archived</th>
    </tr>`;

  //calculate the number of active and archived notes for each category
  categories.forEach((category) => {
    const summaryRecord = notes.reduce(
      (accumulator, note) =>
        note.category === category.name
          ? {
              ...accumulator,
              activeNum: accumulator.activeNum + (note.isActive ? 1 : 0),
              archivedNum: accumulator.archivedNum + (!note.isActive ? 1 : 0),
            }
          : accumulator,
      { activeNum: 0, archivedNum: 0 }
    );

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="note-category-wrapper">
          ${getCategoryIcon(category.name)}
          <span class="note-category">${category.name}</span>
        </div>
      </td>
      <td>${summaryRecord.activeNum}</td>
      <td>${summaryRecord.archivedNum}</td>
    `;

    summaryTable.appendChild(row);
  });
}

export { updateSummaryTable };
