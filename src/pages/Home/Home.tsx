import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
  ProductModel,
  getProductApi,
} from "../../redux/ProductReducer/productReducer";

type Props = {};

export default function Home({}: Props) {
  const { arrProduct } = useSelector(
    (state: RootState) => state.productReducer
  );

  const dispatch: DispatchType = useDispatch();

  const getAllProductApi = () => {
    const actionAsync = getProductApi();
    dispatch(actionAsync);
  };

  useEffect(() => {
    getAllProductApi();
  }, []);

  return (
    <div className="container">
      <h3>Product Feature</h3>
      <div className="row">
        {arrProduct.map((prod: ProductModel, index: number) => {
          return (
            <div className="col-4 mt-2" key={index}>
              <ProductCard prod={prod} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
