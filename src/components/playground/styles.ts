import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  background-color: rgb(31, 36, 40);
`;

export const GamePanel = styled.div`
  display: grid;
  padding: 1px;
  grid-template-rows: repeat(30, 1rem);
  grid-template-columns: repeat(30, 1rem);
  gap: 2px;
  background-color: #000000;
`;

export const Block = styled.div`
  width: 10px;
  height: 10px;
  background-color: #432245;
`;

export const UserPanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #946952;
`;
