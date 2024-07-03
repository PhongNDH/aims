import "./product-card.scss";
import { Image } from "react-bootstrap";
import QuantityIcon from "../../assets/icons/quantity.png";
import ProductImage1 from "../../assets/images/product/product1.png";

const ProductCard = ({ product }) => {
   return (
      <div className="product-card">
         <div className="product-card__image">
            <Image src={product.imageUrl ? product.imageUrl : ProductImage1} width="100%" />
         </div>
         <div className="product-card__body">
            <div className="product-card__title">
               <p className="mb-1 one-line-restrict">{product.title}</p>
            </div>
            <div className="product-card__description">
               <p className="two-line-restrict mb-1">{product.category}</p>
            </div>
            <div className="mt-3 d-flex justify-content-between">
               <div className="product-card__price">
                  <p className="mb-1">{`${product.price
                     .toString()
                     .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`}</p>
               </div>
               <div className="product-card__quantity d-flex align-items-center">
                  <Image src={QuantityIcon} />
                  <p className="mb-1">
                     &nbsp;
                     {product.quantity < 1000
                        ? product.quantity
                        : product.quantity < 1000000
                        ? `${Math.floor(product.quantity / 100) / 10}k`
                        : `${Math.floor(product.quantity / 10000) / 100}M`}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
