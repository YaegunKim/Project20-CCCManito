import styled from "@emotion/styled";
import { ReactComponent as HeartSvg } from "../Assest/heart.svg";
import { ReactComponent as SearchSvg } from "../Assest/search.svg";

export const S = {
    Container: styled.div`
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f1fde6;
        border-radius: 10px;
        border: 0.5px solid #5e9f42;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `,
    Content: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        padding: 20px;
        box-sizing: border-box;
    `,
    IconContainer: styled.div`
        width: 8vw;
        height: 8vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #5e9f42;
        border-radius: 50%;
    `,
    searchIcon: styled(SearchSvg)`
        width: 4vw;
        height: 4vw;
        color: white;
        vertical-align: middle;
    `,
    title: styled.span`
        font-size: 4vw;
        font-weight: 800;
        text-align: center;
        color: #5e9f42;
    `,
    heartIcon: styled(HeartSvg)`
        width: 4vw;
        height: 4vw;
        color: #5e9f42;
        vertical-align: middle;
    `,
  description: styled.span`
    font-size: 3vw;
    font-weight: 500;
    white-space: pre-line;
  `,
    InputContainer: styled.div`
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    `,
    Input: styled.input`
        width: 100%;
        height: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 3vw;
    `,
    Button: styled.button`
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
    `,
    ErrorText: styled.span`
        font-size: 2vw;
        font-weight: 500;
        color: #ff0000;
    `,
};