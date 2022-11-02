import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  width: 100vw;
  overflow-x: hidden;
}
*,
*::before,
*::after {
  box-sizing: inherit;
};
body {
  position: relative;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif; 
    color: #000;
};
ul {
  list-style: none;
  padding: 0;
};
li.selected {
background-color: #eead71;
}
div.swiper-button-next::after{
  color: #eead71 !important;
}
div.swiper-button-prev::after{
  color: #eead71 !important;
}
p, h1, h2, h3, h4, button {
  margin: 0;
  padding: 0;
};
img {
  display: block;
  max-width: 100%;
  height: auto;
};
a {
  text-decoration: none;
};
img.ant-image-preview-img {
  margin: 0 auto;
}
`;
