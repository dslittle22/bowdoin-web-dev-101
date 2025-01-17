function makeTableHeading(table, headings) {
  const headingRow = document.createElement("tr");
  headings.forEach((headingText) => {
    const heading = document.createElement("th");
    heading.appendChild(document.createTextNode(headingText));
    headingRow.appendChild(heading);
  });
  table.appendChild(headingRow);
}

const addRow = (table, item) => {
  const row = document.createElement("tr");
  const { name, weight } = item;
  [name, weight].forEach((property) => {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(property));
    row.appendChild(td);
  });
  table.appendChild(row);
};

const headphones = { name: "headphones", weight: 523 };
const lamp = { name: "lamp", weight: 1092 };
const bed = { name: "bed", weight: 102390 };

let things = [headphones, lamp];
const thingsDiv = document.getElementsByClassName("things-table")[0];
const thingsTable = document.createElement("table");
thingsDiv.appendChild(thingsTable);

makeTableHeading(thingsTable, ["name", "weight"]);

things.forEach((thing, idx) => {
  addRow(thingsTable, thing);
});
