/* 📦 LIBS */
import styled from "styled-components";
import SVG from "react-inlinesvg";
import { Link as CustomLink } from "react-router";

/* 🔧 UTILS */
import { colors } from "../../utils/colors";

export const Container = styled.main`   
    align-items: center;
    background: ${colors.secondary};
    box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);
    color: #000;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 380px;
    justify-content: center;
    width: 400px;

    -webkit-box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);

    h1 {
        color: ${colors.primary};
    }

    form {
        align-items: center;    
        display: flex;
        flex-direction: column;
        gap: 12px;
        justify-content: center;
        width: 60%;

        div {
            display: flex;
            flex-direction: column;
            width: 100%;

            label {
                color: ${colors.primary};
                font-size: 14px;
                font-weight: 500;
            }
            
            input {
                background: ${colors.secondary};
                border: none;
                border-bottom: 2px solid ${colors.primary};
                color: ${colors.primary};
                outline: none;
                padding-bottom: 6px;
            }
        }

        button {
            align-items: center;
            background: ${colors.primary};
            border: none;
            border-radius: 5px;
            color: ${colors.secondary};
            cursor: pointer;
            display: flex;
            outline: none;
            padding: 6px 18px;
        }
    }
`;

export const Link = styled(CustomLink)`   
    color: ${colors.primary};
    font-size: 14px;
    text-align: center;

    &:visited {
        color: #CCC5B9;
    }
`;

export const RegisterIcon = styled(SVG)`   
    height: 20px;
    margin-left: 10px;
    width: 20px;

    & path {
        fill: ${colors.secondary};
    }
`;