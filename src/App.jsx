import { useEffect, useState } from "react";
import "./App.css";
import Product from "./Product";

function App() {
  const [pro, setPro] = useState([]);
  const [item, setItem] = useState([]);

  //DATA LOAD --------------------------------
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setPro(data.products));
  }, []);

  const page = [...Array(pro.length / 6).keys()];
  // console.log(page);
  // console.log(pro);
  // console.log(item);

  //PAGINATION

  const handlePagination = (pageNum) => {
    const lastProductIndex = pageNum * 6;
    const firstProductIndex = lastProductIndex - 6;
    const currentProduct = pro.slice(firstProductIndex, lastProductIndex);
    setItem(currentProduct);
  };

  return (
    <div>
      {item.length ? (
        <div className="grid grid-cols-3 gap-3">
          {item?.map((product, idx) => (
            <Product key={idx} product={product}></Product>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {pro?.slice(0, 6)?.map((product, idx) => (
            <Product key={idx} product={product}></Product>
          ))}
        </div>
      )}
      <div className="my-12">
        {page.map((num, idx) => (
          <button
            onClick={() => handlePagination(idx + 1)}
            className="btn mr-2"
            key={idx}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
