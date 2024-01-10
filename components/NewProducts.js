import styled from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";

const ProductsGrid = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 70px;
padding-top: 30px;
`

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({products}) {
  return (
    <Center>
        <Title>Nuevos Productos</Title>
      <ProductsGrid>
        {products?.length > 0 && products.map(product => (
            <ProductBox key={product.id} {...product}/>
        ))}
      </ProductsGrid>  
    </Center>
    
  );
}