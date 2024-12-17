import { useEffect, useRef, useState } from "react";
import "./App.css";
import Product from "./Product";

function App() {
  const [pro, setPro] = useState([]);
  const [item, setItem] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [check, setCheck] = useState(false);

  const search = useRef();

  //DATA LOAD --------------------------------
  useEffect(() => {
    fetch(`http://localhost:5000/pagination?search=${searchProduct}`)
      .then((res) => res.json())
      .then((data) => setPro(data));
  }, [searchProduct]);

  const page = [...Array(5).keys()];
  // (page);
  // (pro);
  // (item);

  //PAGINATION

  const handlePagination = (pageNum) => {
    const lastProductIndex = pageNum * 6;
    const firstProductIndex = lastProductIndex - 6;
    // const currentProduct = pro.slice(firstProductIndex, lastProductIndex);
    fetch(
      `http://localhost:5000/paginations?last=${lastProductIndex}&first=${firstProductIndex}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setPro(data);
      });
  };

  // (searchProduct, pro);

  return (
    <div className="text-center my-10">
      <input
        onChange={() => setSearchProduct(search.current.value)}
        ref={search}
        className="w-48 h-10 p-5 border"
        type="search"
        placeholder="Search"
      />
      {searchProduct.length === 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {item?.map((product, idx) => (
            <Product key={idx} product={product} setCheck={setCheck}></Product>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {pro?.map((product, idx) => (
            <Product key={idx} product={product}></Product>
          ))}
        </div>
      )}
      {searchProduct.length === 0 && (
        <div className="my-12">
          {page?.map((num, idx) => (
            <button
              onClick={() => handlePagination(idx + 1)}
              className="btn mr-2"
              key={idx}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
      <div
        className={
          check
            ? "absolute top-32 left-72 w-1/2 h-1/2 bg-gray-200 rounded-lg"
            : "hidden"
        }
      >
        <button
          className="absolute bg-red-600 rounded-full w-10 right-0"
          onClick={() => setCheck(false)}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default App;
