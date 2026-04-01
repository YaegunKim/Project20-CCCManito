import styled from "@emotion/styled";

export const S = {
    Container: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fefefb;
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
    giftBox: styled.img`
        width: 40%;
        height: 40%;
        object-fit: contain;
    `,
    title: styled.span`
        font-size: 4vw;
        font-weight: 800;
        text-align: center;
        color: #5e9f42;
    `,
    heartIcon: styled.img`
        width: 4vw;
        color: #5e9f42;
    `,
    name: styled.span`
        font-size: 4vw;
        font-weight: 600;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
  description: styled.span`
    font-size: 3vw;
    font-weight: 500;
    white-space: pre-line;
  `,
  Button: styled.button`
    padding: 5px;
    background-color: #5e9f42;
    color: white;
    border-radius: 5px;
    border: none;
    font-weight: 500;
  `,
  Footer: styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1fde6;
    border-radius: 0 0 10px 10px;
    padding: 10px;
    box-sizing: border-box;
  `,
  FooterText: styled.span`
    font-size: 2.5vw;
    font-weight: 500;
    color: #5e9f42;
  `,
};