import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const ContinueShoppingButton = () => <ButtonStyled>
    <Link to="/" className="continue-shopping-button">Continue Shopping</Link>
</ButtonStyled>

const ButtonStyled = styled.div`
    border: 1px solid grey;
    padding: 0.1rem 0.4rem;
    border-radius: 1px;
    background-color: #f3f3f3;

    a {
        display: block;
        text-align: center;
        color: grey;
    }

    @media (min-width: 650px) {

        justify-self: start;
        grid-column: 1;
    }
`;

export default ContinueShoppingButton;