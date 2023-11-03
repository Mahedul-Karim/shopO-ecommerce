import { useEffect, useState } from "react";
import styles from "../../../util/style";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../../store/cartSlice";
import { toast } from "react-toastify";
import { wishlistAction } from "../../../store/wishlistSlice";
import Modal from "./Modal";

function ProductModal({ setOpen, data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = function () {};

  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist && wishlist.find((w) => w._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const handleCardAdd = function (product) {
    dispatch(cartAction.addToCart({ ...product, quantity: count }));
    toast.success("Product added to cart");
  };

  const addToWishlist = function (product) {
    setClick(true);
    dispatch(wishlistAction.addTowishlist(product));
  };

  const removeFromWishlist = function (id) {
    setClick(false);
    dispatch(wishlistAction.removewishlistItem(id));
  };

  return (
    <Modal onClick={setOpen}>
      {data ? (
        <div className="block w-full 800px:flex">
          <div className="w-full 800px:w-[50%]">
            <img src={`${data.images && data.images[0]?.url}`} alt="" />
            <div className="flex">
              <Link to={`/shop/preview/${data.shopId}`} className="flex">
                <img
                  src={`${data.shop.avatar.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div>
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-3 text-[15px]">(4) Ratings</h5>
                </div>
              </Link>
            </div>
            <div
              className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
              onClick={handleMessageSubmit}
            >
              <span className="text-[#fff] flex items-center">
                Send Message <AiOutlineMessage className="ml-1" />
              </span>
            </div>
            <h5 className="text-[16px] text-[red] mt-5">
              ({data.sold_out}) Sold out
            </h5>
          </div>

          <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
            <h1 className={`${styles.productTitle} text-[20px]`}>
              {data.name}
            </h1>
            <p>{data.description}</p>

            <div className="flex pt-3">
              <h4 className={`${styles.productDiscountPrice}`}>
                {data.discountPrice}$
              </h4>
              <h3 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + "$" : null}
              </h3>
            </div>
            <div className="flex items-center mt-12 justify-between pr-3">
              <div>
                <button
                  className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                  onClick={() => count > 1 && setCount((prev) => prev - 1)}
                >
                  -
                </button>
                <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                  {count}
                </span>
                <button
                  className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                  onClick={() =>
                    data.stock > count && setCount((prev) => prev + 1)
                  }
                >
                  +
                </button>
              </div>
              <div>
                {click ? (
                  <AiFillHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => removeFromWishlist(data._id)}
                    color={click ? "red" : "#333"}
                    title="Remove from wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => addToWishlist(data)}
                    title="Add to wishlist"
                  />
                )}
              </div>
            </div>
            <div
              className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
              onClick={() => handleCardAdd(data)}
            >
              <span className="text-[#fff] flex items-center">
                Add to cart <AiOutlineShoppingCart className="ml-1" />
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

export default ProductModal;
