import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Item = { name: string; weight: number; color: string };

const TR = styled.tr<{ itemColor: string }>`
  transition: background-color 200ms;
  &:hover {
    background-color: ${(props) => props.itemColor || "transparent"};
  }
`;

const TableRow = ({ item }: { item: Item }) => (
  <TR itemColor={item.color}>
    <td>{item.name}</td>
    <td>{item.weight}</td>
    <td>{item.color}</td>
  </TR>
);

const AddItemForm = ({ onAdd }: { onAdd: (item: Item) => void }) => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, weight: parseInt(weight), color });
    setName("");
    setWeight("");
    setColor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight"
        required
      />
      <input
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Color"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

const fetchRandomItem = async (): Promise<Item> => {
  const itemUrl = "https://random-word-api.herokuapp.com/word?number=1";
  const numUrl =
    "https://www.random.org/integers/?num=1&min=1&max=256&format=plain&col=1&base=10";

  const [item, weight, r, g, b] = await Promise.all([
    fetch(itemUrl).then((res) => res.json()),
    fetch(numUrl).then((res) => res.text()),
    fetch(numUrl).then((res) => res.text()),
    fetch(numUrl).then((res) => res.text()),
    fetch(numUrl).then((res) => res.text()),
  ]);

  return {
    name: item[0],
    weight: parseInt(weight),
    color: `rgb(${parseInt(r) - 1}, ${parseInt(g) - 1}, ${parseInt(b) - 1})`,
  };
};

function useFetchItems() {
  const hasFetchedRef = useRef(false);
  const [fetchedItems, setFetchedItems] = useState<Item[]>([]);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    const addRandomItems = async () => {
      for (let i = 0; i < 10; i++) {
        const newItem = await fetchRandomItem();
        setFetchedItems((prev: Item[]) => [...prev, newItem]);
      }
    };
    addRandomItems();
  }, []);

  return fetchedItems;
}

const App = () => {
  const [items, setItems] = useState<Item[]>([
    { name: "headphones", weight: 523, color: "gray" },
    { name: "lamp", weight: 1092, color: "blue" },
    { name: "bed", weight: 102390, color: "green" },
  ]);
  const fetchedItems = useFetchItems();

  return (
    <>
      <h1>Things!</h1>
      <span>Here's my list of things.</span>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {[...items, ...fetchedItems].map((item, index) => (
            <TableRow key={index} item={item} />
          ))}
        </tbody>
      </table>
      <AddItemForm
        onAdd={(item: Item) => setItems((prev) => [...prev, item])}
      />
    </>
  );
};

export default App;
