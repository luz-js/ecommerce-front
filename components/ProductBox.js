import styled from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from 'next/link'
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { primary } from "@/lib/colors";

const ProductWrapper = styled.div`
    width: 250px;
    background-color: #f6bd60;
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
  img{
    max-width: 100%;
    max-height: 150px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:#001524;
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
  color: #001524;
  padding: 5px;
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

export default function ProductBox({_id,title,description,price,images}){
    const {addProduct} = useContext(CartContext);
    const url = '/product/'+_id;
    return(
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images[0]} alt=""/>
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                        <Button primary onClick={() => addProduct(_id)}><CartIcon/></Button>
                </PriceRow>    
            </ProductInfoBox>
        </ProductWrapper>
        
    )
}