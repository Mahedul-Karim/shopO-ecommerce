import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styles from "../../util/style";
import { useSelector } from "react-redux";
import Ratings from "../../util/Ratings";

const ProductTab = ({ data }) => {
  const { product } = useSelector((state) => state.product);

  const [totalProduct, setTotalProduct] = useState(0);
  const [sellerProducts, setSellerProducts] = useState(0);

  const [active, setActive] = useState(1);

  const sellerProduct =
    product && product.filter((p) => p.shopId === data.shopId);

  const totalReviews=sellerProduct.reduce((a,p)=>a+p.reviews.length,0);
  
  const totalRatings=sellerProduct.reduce((a,p)=>a+(p.ratings ? p.ratings : 0),0);
  
  const avgRating = totalRatings / totalReviews || 0;

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2" key={item._id}>
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shopId}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">({avgRating}/5) Ratings</h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae officia, debitis doloribus vitae quae consequatur
              reiciendis vero doloremque quibusdam sint dolorem esse dolor
              accusantium nostrum laudantium labore id dolore. Cum aliquam
              excepturi, dolore consectetur nesciunt totam distinctio voluptate,
              commodi vel fugiat libero officiis provident eveniet doloribus ab
              facilis nulla. Ex?
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:
                <span className="font-[500]">
                  {data.shop.createdAt.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:
                <span className="font-[500]">{sellerProduct.length}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:
                <span className="font-[500]">{totalReviews}</span>
              </h5>
              <Link to={`/shop/preview/${data.shopId}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTab;
