import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { RevealWrapper } from 'next-reveal'
import { primary, amarrillo } from "@/lib/colors";

const Bg = styled.div`
  background-color: rgba(0, 20, 39, 0);
  color: ${primary};
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${primary};

  @media screen and (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Desc = styled.p`
  color: ${primary};
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    
    div:nth-child(1) {
      order: 0;
    }

    img {
      max-width: 200%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  text-align: center;

  @media screen and (min-width: 768px) {
    max-width: 55%;
    text-align: left;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 25px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
    margin-top: 0;
  }
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <RevealWrapper>
              <div>
                <Title>{product?.title}</Title>
                <Desc>{product?.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink href={'/product/' + product?._id} outline={1} primary={1}>Leer mas</ButtonLink>
                  <Button primary onClick={addFeaturedToCart}>Agregar a Cart</Button>
                </ButtonsWrapper>
              </div>
            </RevealWrapper>
          </Column>
          <Column>
            <RevealWrapper duration={500}>
            <img className={'main'} src={product.images?.[0]} alt=""/>
            </RevealWrapper>
          </Column>
        </ColumnsWrapper>
      </Center> 
    </Bg>
  );
}
