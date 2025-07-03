import styled, { keyframes } from "styled-components";
import SVG from "react-inlinesvg";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
    align-items: center;
    background: rgba(0,0,0,0.5);
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%; 
    z-index: 1000;

    .modal-content {
      animation: ${fadeIn} 0.3s ease-out forwards;
      background: #FFF;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      max-width: 500px;
      min-width: 380px;
      padding: 30px;
    }
`;

export const CloseIcon = styled(SVG)`
    cursor: pointer;
    height: 24px;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 24px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

