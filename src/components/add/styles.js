/* 📦 LIBS */
import styled from "styled-components";
import SVG from "react-inlinesvg";

/* 🔧 UTILS */
import { colors } from "../../utils/colors";

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 40px;

    h1 {
        font-size: 24px;
        font-weight: 600;
        color: ${colors.secondary};
    }

    .input-container{
        align-items: flex-end;
        display: flex;
        margin: 6px 10px;
        width: 85%;

        input {
            border: none;
            border-bottom: 2px solid ${colors.secondary};
            color: ${colors.secondary};
            outline: none;
            padding-bottom: 6px;
            width: 100%;
        }
    }

    ul {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        height: 220px;
        overflow: auto;
        padding: 0 10px;
        scrollbar-width: thin;
        width: 100%;

        h3 {
            color: ${colors.secondary};
        }

        li {
            align-items: center;
            border-bottom: 1px solid ${colors.secondary};
            color: ${colors.secondary};
            cursor: pointer;
            display: flex;
            gap: 10px;
            list-style: none;
            padding: 10px;
            width: 100%;    

            .contact-info {
                align-items: center;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
            }
        }
    }

    button {
        align-items: center;
        background: ${colors.secondary};
        border: none;
        color: #FFF;
        cursor: pointer;
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 10px;
        width: 100%;
    }
`;

export const SearchIcon = styled(SVG)`  
    border-bottom: 2px solid ${colors.secondary};
    height: 32px;
    padding-bottom: 6px;
    width: 32px;

    & path {
        fill: ${colors.secondary};
    }
`;

export const PersonIcon = styled(SVG)` 
    cursor: pointer;
    height: 34px;
    width: 34px;

    & path {
        fill: ${colors.secondary};
    }
`;

export const AddOrRemoveIcon = styled(SVG)` 
    height: 28px;
    width: 28px;

    & path {
        fill: ${colors.secondary};
    }
`;

export const AddIcon = styled(SVG)` 
    height: 28px;
    width: 28px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;