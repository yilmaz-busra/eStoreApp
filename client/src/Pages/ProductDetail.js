import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../api";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import "../Styles/ProductDetail.css";
import { Button } from "@chakra-ui/react";
import { useBasket } from "../context/BasketContext";

function ProductDetail() {
  const { addtoBasket, items } = useBasket();

  let { product_id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["productDetail", product_id],
    queryFn: () => {
      return fetchProductDetail(product_id);
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const images = data.photos.map((url) => ({ original: url }));

  const findBasketItem = items.find((item) => item._id === product_id);
  return (
    <div className="detailCard">
      <div className="detailImage">
        <ImageGallery items={images} />
      </div>
      <div className="detailContent">
        <h3>{data.title}</h3>
        <h5>{moment(data.createdAt).format("DD/MM/YY")}</h5>
        <h6>{data.description}</h6>
        <Button
          variant="solid"
          colorScheme={findBasketItem ? "red" : "blue"}
          onClick={() => addtoBasket(data, findBasketItem)}
        >
          {findBasketItem ? "Remove the product" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}

export default ProductDetail;
