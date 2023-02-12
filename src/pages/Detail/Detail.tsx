import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
  ProductDetailModel,
  RelatedProduct,
  getProductDetailApi,
} from "../../redux/ProductReducer/productReducer";
import { useSelector, useDispatch } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { useParams } from "react-router-dom";

type Props = {};

export default function Detail({}: Props) {
  const { productDetail } = useSelector(
    (state: RootState) => state.productReducer
  );

  const dispatch: DispatchType = useDispatch();
  const params = useParams();

  const getProductByIdApi = () => {
    const id: string | undefined = params.id;
    const actionThunk = getProductDetailApi(id as string);
    dispatch(actionThunk);
  };

  useEffect(() => {
    getProductByIdApi();
  }, [params.id]);

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-4">
          <img
            src={productDetail?.image}
            alt=""
            height={350}
            width={350}
            style={{ objectFit: "cover" }}
          ></img>
        </div>
        <div className="col-8">
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
        </div>
      </div>

      <h3 className="mt-2 text-center">- Relate Product -</h3>
      <div className="row">
        {productDetail?.relatedProducts.map(
          (prod: RelatedProduct, index: number) => {
            return (
              <div className="col-4">
                <ProductCard prod={prod} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
