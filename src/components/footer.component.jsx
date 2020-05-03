import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
    <FooterStyled>
        <h3 className="main-footer__logo">Placeholder</h3>
    </FooterStyled>
    );
}

const FooterStyled = styled.footer`
    margin-top: auto;
    background-color: var(--dark);

    .main-footer__logo {
        color: rgb(212, 212, 212);
        text-transform: uppercase;
        font-weight: 300;
        font-size: 1rem;
        padding: 1rem;
    }

`;

export default Footer;