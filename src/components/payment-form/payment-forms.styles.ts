import styled from "styled-components";
import button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.form`
  height: 100%;
  min-width: 500px;
`;

export const PaymentButton = styled(button)`
  margin-left: auto;
  margin-top: 30px;
`;
