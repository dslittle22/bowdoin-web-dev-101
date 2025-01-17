import { useEffect, useState } from "react";
import styled from "styled-components";

const thingUrl = "https://random-word-api.herokuapp.com/word?number=1";
const numUrl =
  "https://www.random.org/integers/?num=1&min=1&max=256&format=plain&col=1&base=10";

type Thing = { name: string; weight: number; color: string };

const TR = styled.tr<{ thingColor: string }>`
  transition: background-color 200ms;
  &:hover {
    background-color: ${(props) => props.thingColor || "transparent"};
  }
`;

const AddThingForm = ({ onAdd }: { onAdd: (thing: Thing) => void }) => {
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
      <button type="submit">Add Thing</button>
    </form>
  );
};

const fetchRandomThing = async (): Promise<Thing> => {
  const [thing, weight, r, g, b] = await Promise.all([
    fetch(thingUrl).then((res) => res.json()),
    fetch(numUrl).then((res) => res.text()),
    fetch(numUrl).then((res) => res.text()),
    fetch(numUrl).then((res) => res.text()),
    fetch(numUrl).then((res) => res.text()),
  ]);

  return {
    name: thing[0],
    weight: parseInt(weight),
    color: `rgb(${parseInt(r) - 1}, ${parseInt(g) - 1}, ${parseInt(b) - 1})`,
  };
};

function useFetchThings() {
  const [fetchedThings, setFetchedThings] = useState<Thing[]>([]);

  useEffect(() => {
    const addRandomThings = async () => {
      for (let i = 0; i < 10; i++) {
        const newThing = await fetchRandomThing();
        setFetchedThings((prev: Thing[]) => [...prev, newThing]);
      }
    };
    addRandomThings();
  }, []);

  return fetchedThings;
}

const initialThings = [
  { name: "headphones", weight: 523, color: "gray" },
  { name: "lamp", weight: 1092, color: "blue" },
  { name: "bed", weight: 102390, color: "green" },
];

const App = () => {
  useEffect(() => {
    console.log("hey");
  }, []);
  const [things, setThings] = useState<Thing[]>(initialThings);
  const fetchedThings = useFetchThings();

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
          {[...things, ...fetchedThings].map((thing, index) => (
            <TR key={index} thingColor={thing.color}>
              <td>{thing.name}</td>
              <td>{thing.weight}</td>
              <td>{thing.color}</td>
            </TR>
          ))}
        </tbody>
      </table>
      <AddThingForm
        onAdd={(thing: Thing) => setThings((prev) => [...prev, thing])}
      />
    </>
  );
};

export default App;
