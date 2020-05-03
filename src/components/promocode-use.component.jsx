import React from "react";

const PromocodeUse = ({
    pendingPromocode,
    addPromocode, 
    canCombine, 
    handlePendingPromocodeChange }) => {

    return (
    <div className="main-section__promocode-use">
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
    </div>
    );
}

export default PromocodeUse;