import axios from "axios";
import { productsSelector, promocodeSelector } from "../selectors/backendSelectors";

const baseUrl = "http://localhost:5000";
const allProductsUrl = `${baseUrl}/`;
const cartItemsUrl = `${baseUrl}/getcartitems`;
const promocodeUrl = `${baseUrl}/applypromocode`;
const orderUrl = `${baseUrl}/neworder`;

export const getAllProducts = async () => {
    const result = await axios.get(allProductsUrl).then(({ data }) => productsSelector(data));
    return result;
}

export const getCartItems = async (cartItemsIds) => {
    const result = await axios.post(cartItemsUrl, {cartItemsIds}).then(({ data }) => productsSelector(data));
    return result;
}

export const applyPromocode = async (code) => {
    const result = await axios.post(promocodeUrl, {code}).then(({ data }) => promocodeSelector(data));
    return result;
}

export const makeNewOrder = async (order) => {
    const result = await axios.post(orderUrl, {order}).then(({data}) => data);
    return result;

}