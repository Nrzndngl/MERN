import Products from "./Product";
function Product() {
  const products = [
    { id: 1, name: "Laptop", price: 1000, seatNumber: [1, 2, 3, 4, 5] },
    { id: 2, name: "Mobile", price: 500, seatNumber: [6, 7, 8, 9, 10] },
    { id: 3, name: "Tablet", price: 300, seatNumber: [11, 12, 13, 14, 15] },
    { id: 4, name: "Watch", price: 200, seatNumber: [16, 17, 18, 19, 20] },
    { id: 5, name: "Headphone", price: 100, seatNumber: [21, 22, 23, 24, 25] },
  ];
  return (
    <div className="products">
      <h1>Products</h1>
      {products.map((item) => (
        <Products
          key={item.id}
          name={item.name}
          price={item.price}
          seatNumber={item.seatNumber}
        />
      ))}
    </div>
  );
}
export default Product;
