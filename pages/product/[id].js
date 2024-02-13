import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import { primary,amarrillo } from "@/lib/colors";
import ProductReviews from "@/components/ProductReview";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 10px;
  background-color: #001427;
  box-shadow: 1px 2px 20px 0px rgba(2, 30, 29, 0.3);
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.6rem;
`;

const Div = styled.div`
display: flex;
flex-direction: column;
//align-items: center;
justify-content: center;
margin-left: 40px;
color: #f1f1f1;
font-size: 1.3rem;
font-weight: 100;
`;

export default function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <Div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button onClick={() => addProduct(product._id)}>
                  <CartIcon />Agregar a cart
                </Button>
              </div>
            </PriceRow>
          </Div>
        </ColWrapper>
        <ProductReviews product={product} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}