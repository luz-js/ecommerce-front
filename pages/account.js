import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import WhiteBox from "@/components/WhiteBox";
import styled from "styled-components"
import { signIn, signOut, useSession } from "next-auth/react";
import {RevealWrapper} from "next-reveal"
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios"
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";
import Swal from 'sweetalert2';
import { GoogleButton, FacebookButton } from "@/components/loginButtons";

const ColsWrapper = styled.div`
  display:grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0;
  p{
    margin:5px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
`;

const Img = styled.img`
  width: 50%;
  margin-top: 40px;
`;

export default function AccountPage() {
    const {data:session} = useSession();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [addressLoaded,setAddressLoaded] = useState(true);
    const [wishlistLoaded,setWishlistLoaded] = useState(true);
    const [orderLoaded,setOrderLoaded] = useState(true);
    const [wishedProducts,setWishedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('Orders');
    const [orders, setOrders] = useState([]);
  
    async function logout() {
      await signOut({
        callbackUrl: process.env.NEXT_PUBLIC_URL,
      });
    }
    async function login() {
      await signIn('google');
    }
    function saveAddress() {
      const data = {name,email,city,streetAddress,postalCode,country};
      axios.put('/api/address', data)
          .then(response => {
            // La petición PUT se envió correctamente
            Swal.fire({
                icon: 'success',
                title: '¡Dirección guardada!',
                text: 'La dirección se guardó exitosamente.',
            });
            // Aquí puedes realizar otras acciones si es necesario
        })
        .catch(error => {
            // Manejar cualquier error que pueda ocurrir durante la petición
            console.error('Error al guardar la dirección:', error);
            // Mostrar una alerta de error utilizando SweetAlert
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ocurrió un error al guardar la dirección. Por favor, intenta de nuevo más tarde.',
            });
        });
      
    }
    useEffect(() => {
      if (!session) {
        return;
      }
      setAddressLoaded(false);
      setWishlistLoaded(false);
      setOrderLoaded(false);
      axios.get('/api/address').then(response => {
        setName(response.data?.name);
        setEmail(response.data?.email);
        setCity(response.data?.city);
        setPostalCode(response.data?.postalCode);
        setStreetAddress(response.data?.streetAddress);
        setCountry(response.data?.country);
        setAddressLoaded(true);
      });
      axios.get('/api/wishlist').then(response => {
        setWishedProducts(response.data.map(wp => wp.product));
        setWishlistLoaded(true);
      });
      axios.get('/api/orders').then(response => {
        setOrders(response.data);
        setOrderLoaded(true);
      });
    }, [session]);
    function productRemovedFromWishlist(idToRemove) {
      setWishedProducts(products => {
        return [...products.filter(p => p._id.toString() !== idToRemove)];
      });
    }
    return (
      <>
        <Header />
        <Center>
          <ColsWrapper>
            <div>
              <RevealWrapper delay={0}>
                <WhiteBox>
                  <Tabs
                    tabs={['Orders','Wishlist']}
                    active={activeTab}
                    onChange={setActiveTab}
                  />
                  {activeTab === 'Orders' && (
                    <>
                      {!orderLoaded && (
                        <Spinner fullWidth={true} />
                      )}
                      {orderLoaded && (
                        <div>
                          {orders.length === 0 && (
                            <div>
                              <p>Ingresa para ver tus órdenes</p>
                              <Img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5375.jpg?t=st=1709295218~exp=1709298818~hmac=98e09e871ba8966ff99029c331b77dd6ad3300994cae8b27a4835ea7e90fa66d&w=1480"></Img>
                            </div>
                            
                          )}
                          {orders.length > 0 && orders.map(o => (
                            <SingleOrder  key={orders._id} {...o} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'Wishlist' && (
                    <>
                      {!wishlistLoaded && (
                        <Spinner fullWidth={true} />
                      )}
                      {wishlistLoaded && (
                        <>
                          <WishedProductsGrid>
                            {wishedProducts.length > 0 && wishedProducts.map(wp => (
                              <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                            ))}
                          </WishedProductsGrid>
                          {wishedProducts.length === 0 && (
                            <>
                              {session && (
                                <p>Tu lista de favoritos está vacía</p>
                              )}
                              {!session && (
                                <div>
                                <p>Ingresa para ver tu lista de favoritos</p>
                                <Img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5375.jpg?t=st=1709295218~exp=1709298818~hmac=98e09e871ba8966ff99029c331b77dd6ad3300994cae8b27a4835ea7e90fa66d&w=1480"></Img>
                              </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </WhiteBox>
              </RevealWrapper>
            </div>
            <div>
              <RevealWrapper delay={100}>
                <WhiteBox>
                  <h2>{session ? 'Detalles de la cuenta' : 'Login'}</h2>
                  {!addressLoaded && (
                    <Spinner fullWidth={true} />
                  )}
                  {addressLoaded && session && (
                    <>
                      <Input type="text"
                             placeholder="Name"
                             value={name}
                             name="name"
                             onChange={ev => setName(ev.target.value)} />
                      <Input type="text"
                             placeholder="Email"
                             value={email}
                             name="email"
                             onChange={ev => setEmail(ev.target.value)}/>
                      <CityHolder>
                        <Input type="text"
                               placeholder="City"
                               value={city}
                               name="city"
                               onChange={ev => setCity(ev.target.value)}/>
                        <Input type="text"
                               placeholder="Postal Code"
                               value={postalCode}
                               name="postalCode"
                               onChange={ev => setPostalCode(ev.target.value)}/>
                      </CityHolder>
                      <Input type="text"
                             placeholder="Street Address"
                             value={streetAddress}
                             name="streetAddress"
                             onChange={ev => setStreetAddress(ev.target.value)}/>
                      <Input type="text"
                             placeholder="Country"
                             value={country}
                             name="country"
                             onChange={ev => setCountry(ev.target.value)}/>
                      <Button primary block
                              onClick={saveAddress}>
                        Save
                      </Button>
                      <hr/>
                    </>
                  )}
                  {session && (
                    <Button primary onClick={logout}>Logout</Button>
                  )}
                  {!session && (
                    <div>
                      <GoogleButton onClick={(e) => signIn('google')}>Ingresar con Google</GoogleButton>
                      <FacebookButton onClick={(e) => signIn('facebook')}>Ingresar con Facebook</FacebookButton>
                    </div>
                  )}
                </WhiteBox>
              </RevealWrapper>
            </div>
          </ColsWrapper>
        </Center>
      </>
    );
  }