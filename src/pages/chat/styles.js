/* 📦 LIBS */
import styled from "styled-components";
import SVG from "react-inlinesvg";

/* 🔧 UTILS */
import { colors } from "../../utils/colors";

export const Container = styled.div`  
    display: flex;
    height: 100vh;
    margin: auto;
    width: 100%;

    @media (min-width: 720px) {
        height: auto;
        width: auto;
    }

    .chat-conatiner {
        align-items: flex-start;
        background: ${colors.secondary};
        box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: center;
        padding: 20px;
        width: 100%;

        -webkit-box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);

        @media (min-width: 720px) {
            height: 600px;
            width: 420px;
        }

        .chat-header {
            align-items: center;
            display: flex;
            gap: 28px;

            .chat-name {
                align-items: center;
                display: flex;
                gap: 10px;

                h2 {
                    color: ${colors.primary};
                    font-size: 20px;
                    font-weight: 600;
                    max-width: 260px; 
                    overflow: hidden;
                    text-overflow: ellipsis; 
                    white-space: nowrap;
                }
            }
            
        }

        .chat {
            display: flex;
            flex-direction: column;
            height: 100vh;
            margin: 10px 0;
            padding-right: 8px;
            overflow: auto;
            scrollbar-color: ${colors.primary} ${colors.secondary};
            scrollbar-width: thin;
            width: 100%;

            @media (min-width: 720px) {
                height: 550px;
            }
            
            div {
                display: flex;
                flex-direction: column;

                span {
                    color: ${colors.secondary};
                    font-size: 10px;
                    text-align: end;
                }
            }

            .empty-chat-message {
                align-self: center;
                color: ${colors.primary};
                font-style: italic;
                font-size: 0.8rem;
            }

            .message-container {
                align-self: start;
                background-color: lightgrey;
                border-radius: 7px;
                color: ${colors.secondary};
                margin-top: 10px;
                max-width: 250px;
                padding: 5px 10px;
                width: fit-content;
            }

            .message-mine{
                align-self: end;
                background: #D8A47F;
                color: ${colors.secondary};
            }
        }

        .input-container {
            align-items: center;
            display: flex;
            width: 100%;

            div {
                align-items: flex-end;
                display: flex;
                width: 100%;

                input {
                    background: ${colors.secondary};
                    border: none;
                    border-bottom: 2px solid ${colors.primary};
                    color: ${colors.primary};
                    outline: none;
                    padding-bottom: 6px;
                    width: 100%;
                }
                
                label {
                    display: inline-block;
                }

                .hidden-input{
                    display: none;
                }
            }

            button {
                align-items: center;
                background: transparent;
                border: none;
                border-radius: 5px;
                color: #000;
                cursor: pointer;
                display: flex;
                outline: none;
            }
        }
    }
`;

export const MenuIcon = styled(SVG)` 
    cursor: pointer;
    height: 28px;
    width: 28px;

    & path {
        fill: ${colors.primary};
    }
`;

export const ChatIcon = styled(SVG)` 
    cursor: pointer;
    height: 28px;
    width: 28px;

    & path {
        fill: ${colors.primary};
    }
`;

export const ClipIcon = styled(SVG)`   
    border-bottom: 2px solid ${colors.primary};
    cursor: pointer;
    height: 32px;
    padding-bottom: 6px;
    width: 32px;

    & path {
        fill: ${colors.primary};
    }
`;

export const SendIcon = styled(SVG)`   
    height: 28px;
    margin-left: 10px;
    width: 28px;

    & path {
        fill: ${colors.primary};
    }
`;