import Link from "next/link"
import styled from "styled-components"
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import { useState } from "react";

const StyledHeader = styled.header`
  background-color: #001427;
`;

const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #001427;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#fff;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a{
    display:inline-block;
    min-width:20px;
    color:white;
    svg{
      width:14px;
      height:14px;
    }
  }
`;

export default function Header() {

    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive,setMobileNavActive] = useState(false);
  
    return (
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={'/'}>DuoComp</Logo>
            <StyledNav mobileNavActive={mobileNavActive}>
              <NavLink href={'/'}>Home</NavLink>
              <NavLink href={'/products'}>All products</NavLink>
              <NavLink href={'/categories'}>Categories</NavLink>
              <NavLink href={'/account'}>Account</NavLink>
              <NavLink href={'/cart'}>Cart({cartProducts.length})</NavLink>
              <SideIcons><Link href={'/search'}><SearchIcon /></Link></SideIcons>
            </StyledNav>
              <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                <BarsIcon />
              </NavButton>
          </Wrapper>
        </Center>
      </StyledHeader>
    );
  }