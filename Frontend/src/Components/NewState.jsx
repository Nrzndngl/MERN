import { useState } from "react";

export default function NewState() {
  // useState is a hook that allows you to have state variables in functional components
  //   const [name, setName] = useState("John Doe");
  //   function changeName() {
  //     setName("Jane Doe");
  //   }

  const [counter, setCounter] = useState(0);
  const [increaseby, setIncreaseby] = useState(1);

  return (
    <div>
      {/* {name}
      <br />
      <br />
      <button onClick={changeName}>Change Name</button> */}
      <br />
      <br />
      {counter} {increaseby}
      <br />
      <br />
      <button onClick={() => setCounter(counter + increaseby)}>increase</button>
      <button onClick={() => setCounter(counter - increaseby)}>decrease</button>
      <br />
      <br />
      <button onClick={() => setIncreaseby(increaseby + 1)}>increase by</button>
      <button onClick={() => setIncreaseby(increaseby - 1)}>decrease by</button>
    </div>
  );
}
