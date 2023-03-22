import React from "react";

const Product = (props) => (
  <div key={props.Id} className="my-4 flex w-full items-center gap-4 pr-6">
    <a className="shrink-0" href={`https://www.dvrpc.org/Products/${props.Id}`}>
      <img
        className="w-[100.5px] border border-solid border-gray-400 bg-white"
        src={`https://www.dvrpc.org/asp/pubs/201px/${props.Id}.png`}
        alt="cover"
      />
    </a>
    <h4 className="m-0 text-lg font-normal">
      <a
        className="no-underline"
        href={`https://www.dvrpc.org/Products/${props.Id}`}
      >
        {props.Title}
      </a>
    </h4>
  </div>
);

const ProductLoader = (props) => (
  <div className="my-4 grid w-full grid-cols-[100.5px_1fr] gap-4 pr-12">
    <div className="h-[100.5px] w-[100.5px] bg-gray-300" />
    <div className="w-full">
      <div className="m-2 h-8 w-full bg-gray-300" />
      <div className="m-2 mr-12 h-8 bg-gray-300" />
    </div>
  </div>
);

export default Product;
export { ProductLoader };
