export default function Product({ product }) {
//   console.log(product);

  const {thumbnail} = product;
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src={thumbnail}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"></h2>
        <p></p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">BUY NOW</button>
        </div>
      </div>
    </div>
  );
}
