import styled from "styled-components";
import bgPattern from "../assets/pattern-bg.png";

export const Container = styled.div`
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
  }
  @media (max-width: 4000px) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100vw;
    padding: 0;
    margin: 0;
  }
`;

export const DivTitulo = styled.h1`
  @media (max-width: 400px) {
  }
  @media (max-width: 4000px) {
    color: white;
  }
`;

export const DivHeaders = styled.div`
  background-image: url(${bgPattern});
  width: 100vw;
  display: grid;
  place-items: center;
  height: 50vh;
  padding-bottom: 220px;
  padding-top: 50px;
  background-size: cover;
`;

export const DivBox = styled.div`
  margin: 20px auto 0 auto;
  position: absolute;
  top: -130px;
  z-index: 100;
  background: #fff;
  width: 80vw;
  border-radius: 10px;
  min-height: 20vh;
  box-shadow: 3px 12px 31px 0 rgb(0 0 0 / 75%);
`;
export const DivContainerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const DivContainerMap = styled.div`
  touch-action: none;
  height: 50vh;
  position: sticky;
  display: grid;
`;


