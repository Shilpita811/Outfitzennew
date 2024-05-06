import React, { useEffect } from 'react';
import Slider from '../layout/Carousel/Slider';
import { useDispatch, useSelector } from 'react-redux';
// import Product from '../products/Product';
import { clearErrors, getProduct } from "../../actions/productActions";
import { useAlert } from 'react-alert';
import ProductCard from "./ProductCard";
import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, error, productsCount, resultPerPage } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct())
  }, [dispatch, error, alert]);


  return (
    <>
      <Slider />
      {/* <Product/> */}
      <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>


    </>
  );
}

export default Home;
