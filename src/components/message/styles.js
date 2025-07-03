/* 📦 LIBS */
import styled, { keyframes } from "styled-components";
import SVG from "react-inlinesvg";

/* 🔧 UTILS */
import { colors } from "../../utils/colors";

const fadeInDown = keyframes` 
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0); 
  }
`

export const Container = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: fixed;
    right: 10px;
    top: 20px;
    z-index: 9999;

    li {
      align-items: center;
      animation: ${fadeInDown} 0.3s ease;
      background: ${colors.primary};
      border-radius: 8px;
      display: flex;
      gap: 20px;
      list-style: none;
      padding: 12px 20px;
      
      span {
        color: ${colors.secondary};
      }
    }
`

export const MessageIcon = styled(SVG)` 
    height: 28px;
    width: 28px;

    & path {
        fill: ${colors.secondary};
    }
`;