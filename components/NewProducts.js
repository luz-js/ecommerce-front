import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import { primary } from "@/lib/colors";

const Title = styled.h2`
  font-size: 2rem;
  margin:20px 0px 0px;
  text-align: center;
`;
const Text = styled.p`
  font-size: 1rem;
  text-align: center;
  font-weight: 100;
  margin-bottom: 50px;
`;
const Linea = styled.hr`
height: 1px;
background-color: ${primary};
`;
const LineaDos = styled.hr`
margin-bottom: 50px;
height: 1px;
background-color: ${primary};
`;
const Caja = styled.div`
background-color: #001427;
padding-top: 2px;
padding-bottom: 2px;
color: white;
margin-bottom: 40px;
border-radius: 5px;
`;


export default function NewProducts({products,wishedProducts}) {
  return (
    <Center>
      <Linea />
        <Title>Nuevos Productos</Title>
        <Text>Nuestros nuevos lanzamientos disponibles</Text>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  );
}