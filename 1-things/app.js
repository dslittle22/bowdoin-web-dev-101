const thingUrl = "https://random-word-api.herokuapp.com/word?number=1";
const numUrl =
  "https://www.random.org/integers/?num=1&min=1&max=256&format=plain&col=1&base=10";

function makeTableHeading(table, headings) {
  const headingRow = document.createElement("tr");
  headings.forEach((headingText) => {
    const heading = document.createElement("th");
    heading.appendChild(document.createTextNode(headingText));
    headingRow.appendChild(heading);
  });
  table.appendChild(headingRow);
}

function addRow(table, thing) {
  const row = document.createElement("tr");
  const { name, weight, color } = thing;
  [name, weight, color].forEach((property) => {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(property));
    row.appendChild(td);
  });
  table.appendChild(row);
}

const headphones = { name: "headphones", weight: 523, color: "gray" };
const lamp = { name: "lamp", weight: 1092, color: "blue" };
const bed = { name: "bed", weight: 102390 };

let things = [headphones, lamp, bed];
const thingsDiv = document.getElementsByClassName("things-table")[0];
const thingsTable = document.createElement("table");
thingsDiv.appendChild(thingsTable);

makeTableHeading(thingsTable, ["name", "weight"]);

things.forEach((thing, idx) => {
  addRow(thingsTable, thing);
});
