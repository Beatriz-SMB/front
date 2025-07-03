/* 📦 LIBS */
import styled from "styled-components";
import SVG from "react-inlinesvg";

/* 🔧 UTILS */
import { colors } from "../../utils/colors";

export const Sidebar = styled.div` 
    background: ${colors.primary};
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    
    @media (min-width: 720px) {
        height: 600px;
        width: 300px;
    }

    .buttons-container {
        align-items: center;
        background: #CCC5B9;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 6px;

        .buttons-container-top {
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }
    }

    .content-container {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        width: 100%;

        .input-container{
            align-items: flex-end;
            display: flex;
            margin: 6px 10px;

            input {
                background: ${colors.primary};
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
            overflow: auto;
            padding: 10px;
            scrollbar-width: thin;

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

                .chat-info {
                    align-items: center;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;

                    span {
                        max-width: 260px; 
                        overflow: hidden;
                        text-overflow: ellipsis; 
                        white-space: nowrap;

                        @media (min-width: 720px) {
                            max-width: 140px; 
                        }
                    }
                }
            }
        }
    }
`;

export const CloseIcon = styled(SVG)`  
    cursor: pointer;
    height: 24px;
    width: 24px;

    & path {
        fill: #403D39;
    }

    &:hover {
        opacity: 0.7;
    }
`;

export const AddPersonIcon = styled(SVG)` 
    cursor: pointer;
    height: 34px;
    width: 34px;

    & path {
        fill: ${colors.secondary};
    }

    &:hover {
        opacity: 0.7;
    }
`;

export const AddGroupIcon = styled(SVG)` 
    cursor: pointer;
    height: 34px;
    width: 34px;

    & path {
        fill: ${colors.secondary};
    }

    &:hover {
        opacity: 0.7;
    }
`;

export const MoreIcon = styled(SVG)` 
    cursor: pointer;
    height: 24px;
    width: 24px;

    & path {
        fill: ${colors.secondary};
    }

    &:hover {
        opacity: 0.7;
    }
`;

export const LogoutIcon = styled(SVG)` 
    cursor: pointer;
    height: 24px;
    width: 24px;

    & path {
        fill: ${colors.secondary};
    }

    &:hover {
        opacity: 0.7;
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

export const ChatIcon = styled(SVG)` 
    cursor: pointer;
    height: 28px;
    width: 28px;

    & path {
        fill: ${colors.secondary};
    }
`;
