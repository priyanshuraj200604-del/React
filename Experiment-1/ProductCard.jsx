import React from "react";

const ProductCard = ({ name, price, status }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    margin: "10px",
    textAlign: "center",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    width: "200px",
  },
  title: {
    fontWeight: "bold",
  },
};

export default ProductCard;
