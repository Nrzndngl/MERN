const Product = (props) => {
  const maxSeatNumber = props.seatNumber.reduce((a, b) => {
    return a > b ? a : b;
  });
  return (
    <div className="product">
      <h2>{props.name}</h2>
      <li>Price: ${props.price}</li>
      <li>
        Seat Numbers:
        {props.seatNumber.map((val) => {
          return <li>{val}</li>;
        })}
      </li>
      <li>Seatnumber: {maxSeatNumber}</li>
      <hr />
    </div>
  );
};

export default Product;
