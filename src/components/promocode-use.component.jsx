import React from "react";
import styled from "styled-components";

const PromocodeUse = ({
    pendingPromocode,
    addPromocode, 
    canCombine, 
    handlePendingPromocodeChange }) => {

    return (
    <PromocodeUseStyled>
        <h3>Do you have our promocodes?</h3>
        <form onSubmit={addPromocode}
            className="promocode-use__form">
            <label htmlFor="promocode-input" hidden>Enter your promocode</label>
            <input 
                type="text" id="promocode-input" 
                className="form__promocode-input" 
                placeholder="Enter your promocode"
                value={pendingPromocode}
                onChange={handlePendingPromocodeChange}
                />
            <button type="submit" disabled={!canCombine} className="form__promocode-submit-button">Apply</button>
            <p className="form__promocode-submit-message">{!canCombine && "No combining codes" }</p>
        </form>
    </PromocodeUseStyled>
    );
}

const PromocodeUseStyled = styled.div`
    padding: 1rem;
    background-color: rgb(238, 226, 226);

    > h3 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    .promocode-use__form {
        display: flex;
        flex-wrap: wrap;
    }

    .form__promocode-input {
        flex-grow: 2;
    }

    .form__promocode-submit-message {
        margin-top: 0.3rem;
        color: rgb(128, 25, 25);
        font-size: 0.8rem;
        width: 100%;
    }

`;

export default PromocodeUse;