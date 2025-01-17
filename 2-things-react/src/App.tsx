// const thingUrl = "https://random-word-api.herokuapp.com/word?number=1";
// const numUrl =
//   "https://www.random.org/integers/?num=1&min=1&max=256&format=plain&col=1&base=10";

type Thing = { name: string; weight: number; color: string };

const App = () => {
  const things: Thing[] = [
    { name: "headphones", weight: 523, color: "gray" },
    { name: "lamp", weight: 1092, color: "blue" },
    { name: "bed", weight: 102390, color: "green" },
  ];

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
          {[...things].map((thing, index) => (
            <tr key={index}>
              <td>{thing.name}</td>
              <td>{thing.weight}</td>
              <td>{thing.color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
