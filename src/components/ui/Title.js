import styled from "styled-components";
import { breakpoints } from "../../styleConfig/breakpoints";

export const Title = styled.h1`
  color: white;
  font-size: ${(p) => p.theme.fontSizes.l};
  @media (${breakpoints.tablet}) {
    font-size: ${(p) => p.theme.fontSizes.xl};
  }
  @media (${breakpoints.laptop}) {
    font-size: ${(p) => p.theme.fontSizes.xxl};
  } ;
`;
