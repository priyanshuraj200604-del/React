// App.js
import React from "react";
import ProductCard from "./ProductCard";

function App() {
  return (
    <div style={styles.container}>
      <h2>Products List</h2>
      <div style={styles.list}>
        <ProductCard name="Wireless Mouse" price={25.99} status="In Stock" />
        <ProductCard name="Keyboard" price={45.5} status="Out of Stock" />
        <ProductCard name="Monitor" price={199.99} status="In Stock" />
      </div>
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #000",
    padding: "20px",
    margin: "20px",
    textAlign: "center",
  },
  list: {
    display: "flex",
    justifyContent: "center",
  },
};

export default App;