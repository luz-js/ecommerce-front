import styled from 'styled-components';

const StyledButton = styled.button`
  width: 45%;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  border: 1px solid black;
  display: flex;
  align-items: center;
  gap: 2px;
  border-radius: 8px;
  color: black;
  background-color: transparent;
  transition: border-color 0.15s, color 0.15s, box-shadow 0.15s;
`;

const StyledImg = styled.img`
  width: 24px;
  height: 24px;
`;

const GoogleButton = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>
    <StyledImg src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
    <span>{children}</span>
  </StyledButton>
);

const FacebookButton = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>
    <StyledImg src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-round-color-icon.png" loading="lazy" alt="facebook logo" />
    <span>{children}</span>
  </StyledButton>
);

// Uso:
// <GoogleButton onClick={(e) => signIn('google')}>Ingresar con Google</GoogleButton>
// <FacebookButton onClick={(e) => signIn('facebook')}>Ingresar con Facebook</FacebookButton>

export { GoogleButton, FacebookButton };
