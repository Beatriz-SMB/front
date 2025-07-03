/* 📦 LIBS */
import styled from "styled-components";
import SVG from "react-inlinesvg";

/* 🔧 UTILS */
import { colors } from "../../utils/colors";

export const Container = styled.div`
    background-color: #252422;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 0;
    position: absolute;
    text-align: center;
    width: 120px;
    z-index: 9;

    button {
        background: transparent;
        border: none;
        color: ${colors.primary};
        cursor: pointer;
        display: flex;
        gap: 10px;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        width: 100%;

        &:hover {
            background-color: #403D39;
        }
    }
`

export const ButtonIcon = styled(SVG)`
    height: 20px;
    width: 20px;
    & path {
        fill: ${colors.primary};
    }
`