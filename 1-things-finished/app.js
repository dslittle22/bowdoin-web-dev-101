const thingUrl = "https://random-word-api.herokuapp.com/word?number=1";
const numUrl =
  "https://www.random.org/integers/?num=1&min=1&max=256&format=plain&col=1&base=10";

const changeColor = (e, color) => {
  e.target.style.backgroundColor = color;
  e.stopPropagation();
};

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
  row.addEventListener("mouseenter", (e) => changeColor(e, thing.color));
  row.addEventListener("mouseleave", (e) => changeColor(e, ""));
  table.appendChild(row);
}

async function addThing() {
  const name = input.value;
  const weight = weightInput.value;
  if (name && weight) {
    const newThing = { name, weight: parseInt(weight) };
    const [r, g, b] = await Promise.all([
      fetch(numUrl).then((resp) => resp.json()),
      fetch(numUrl).then((resp) => resp.json()),
      fetch(numUrl).then((resp) => resp.json()),
    ]);
    newThing.color = `rgb(${r - 1}, ${g - 1}, ${b - 1})`;

    addRow(thingsTable, newThing);
    input.value = "";
    weightInput.value = "";
  }
}

async function fetchThing() {
  const [thing, weight, r, g, b] = await Promise.all([
    fetch(thingUrl).then((resp) => resp.json()),
    fetch(numUrl).then((resp) => resp.json()),
    fetch(numUrl).then((resp) => resp.json()),
    fetch(numUrl).then((resp) => resp.json()),
    fetch(numUrl).then((resp) => resp.json()),
  ]);

  return { name: thing[0], weight, color: `rgb(${r - 1}, ${g - 1}, ${b - 1})` };
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

for (let i = 0; i < 10; i++) {
  fetchThing().then((thing) => addRow(thingsTable, thing));
}

const addButton = document.createElement("button");
addButton.appendChild(document.createTextNode("Add"));

const input = document.createElement("input");
input.setAttribute("placeholder", "Name");

const weightInput = document.createElement("input");
weightInput.setAttribute("placeholder", "Weight");
weightInput.setAttribute("type", "number");

addButton.addEventListener("click", addThing);

const thingsInputDiv = document.getElementsByClassName("things-input")[0];
thingsInputDiv.appendChild(input);
thingsInputDiv.appendChild(weightInput);
thingsInputDiv.appendChild(addButton);
