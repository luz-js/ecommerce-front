import styled from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from 'next/link'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import HeartOutlineIcon from "./icons/HeartOutLineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios"
import { useSession } from "next-auth/react";
import { amarrillo, primary } from "@/lib/colors";

const ProductWrapper = styled.div`
    width: 250px;
    background-color: ${primary};
    border-radius: 10px;
    box-shadow: 5px 2px 15px 5px rgba(0, 0, 0, 0.2);
`

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 30px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  position: relative;
  img{
    max-width: 100%;
    max-height: 150px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color: white;
  font-family: monospace;
  text-decoration:none;
  margin:0;
  padding: 5px;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
  color: white;
  padding: 5px;
  font-family: sans-serif;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:400;
    text-align: left;
  }
`;

const WishlistButton = styled.button`
  border:0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top:0;
  right:0;
  background:transparent;
  cursor: pointer;
  ${props => props.wished ? `
    color:red;
  ` : `
    color:black;
  `}
  svg{
    width: 16px;
  }
`;

export default function ProductBox({
  _id,title,description,price,images,wished=false,
  onRemoveFromWishlist=()=>{},
}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  const {data:session} = useSession();
  const [isWished,setIsWished] = useState(wished);
  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios.post('/api/wishlist', {
      product: _id,
    }).then(() => {});
    setIsWished(nextValue);
  }
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          {session && (
            <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          )}
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button white onClick={() => addProduct(_id)}><CartIcon/></Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

