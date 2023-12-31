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
import { HiOutlineMinus, HiPlus } from "react-icons/hi";

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
              {
                <div className="flex items-center">
                  <button
                    className={`bg-primary border rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center`}
                    onClick={() => count > 1 && setCount((prev) => prev - 1)}
                  >
                    <HiOutlineMinus size={16} color="#fff" />
                  </button>
                  <span className="w-[30px] h-[30px] flex items-center justify-center">
                    {count}
                  </span>
                  <button
                    className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center`}
                    onClick={() =>
                      data.stock > count && setCount((prev) => prev + 1)
                    }
                  >
                    <HiPlus size={18} color="#7d879c" />
                  </button>
                </div>
              }
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
