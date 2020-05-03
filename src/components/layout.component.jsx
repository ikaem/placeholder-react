import React from "react";

import Header from "../containers/header.component";
import Footer from "./footer.component";
import CartProvider from "../contexts/cart.context";



const Layout = ({children}) => {
    return (
    <CartProvider>
        <Header />
        <main style={{padding: "1rem"}}>{children}</main>
        <Footer />
    </CartProvider>
    );
}

export default Layout;