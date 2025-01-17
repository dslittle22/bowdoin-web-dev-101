const changeColor = (e, color) => {
  e.target.style.background = color;
  e.stopPropagation();
};

const addRow = (table, item) => {
  const row = document.createElement("tr");
  const { name, weight, color } = item;
  [name, weight, color].forEach((property) => {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(property));
    row.appendChild(td);
  });
  row.addEventListener("mouseenter", (e) => changeColor(e, item.color));
  row.addEventListener("mouseleave", (e) => changeColor(e, ""));
  table.appendChild(row);
};

const fetchItem = async () => {
  const itemUrl = "https://random-word-api.herokuapp.com/word?number=1";
  const numUrl =
    "https://www.random.org/integers/?num=1&min=1&max=256&format=plain&col=1&base=10";
  const [item, weight, r, g, b] = await Promise.all([
    fetch(itemUrl).then((resp) => resp.json()),
    fetch(numUrl).then((resp) => resp.json()),
    fetch(numUrl).then((resp) => resp.json()),
    fetch(numUrl).then((resp) => resp.json()),
    fetch(numUrl).then((resp) => resp.json()),
  ]);

  return { name: item[0], weight, color: `rgb(${r - 1}, ${g - 1}, ${b - 1})` };
};

const headphones = { name: "headphones", weight: 523, color: "gray" };
const lamp = { name: "lamp", weight: 1092, color: "blue" };
const bed = { name: "bed", weight: 102390 };

let things = [headphones, lamp, bed];
const thingsDiv = document.getElementsByClassName("things-table")[0];
const thingsTable = document.createElement("table");
thingsDiv.appendChild(thingsTable);

const headingRow = document.createElement("tr");

["name", "weight", "color"].forEach((headingText) => {
  const heading = document.createElement("th");
  heading.appendChild(document.createTextNode(headingText));
  headingRow.appendChild(heading);
});
thingsTable.appendChild(headingRow);

things.forEach((thing, idx) => {
  addRow(thingsTable, thing);
});

for (let i = 0; i < 10; i++) {
  fetchItem().then((item) => addRow(thingsTable, item));
}

const addButton = document.createElement("button");
addButton.appendChild(document.createTextNode("Add"));

const input = document.createElement("input");
input.setAttribute("placeholder", "Enter name");

const weightInput = document.createElement("input");
weightInput.setAttribute("placeholder", "Enter weight");
weightInput.setAttribute("type", "number");

addButton.addEventListener("click", () => {
  const name = input.value;
  const weight = weightInput.value;
  if (name && weight) {
    const newItem = { name, weight: parseInt(weight) };
    addRow(thingsTable, newItem);
    input.value = "";
    weightInput.value = "";
  }
});

const thingsInputDiv = document.getElementsByClassName("things-input")[0];
thingsInputDiv.appendChild(input);
thingsInputDiv.appendChild(weightInput);
thingsInputDiv.appendChild(addButton);
