import Greetings from "./Greetings";
function Hello({ name, address }) {
  return (
    <div>
      <h1>Hello from {name}</h1>
      <h2>I am in {address}</h2>
      <Greetings name="Morning" />
      <hr />
    </div>
  );
}

export default Hello;
