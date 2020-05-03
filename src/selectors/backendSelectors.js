export const productsSelector = (products) => {
    return products.map(({image, name, price, _id}) => ({image, name, price, id: _id}))
}

export const promocodeSelector = ({ _id, code, description, amount, type, combination }) => {
    return {id: _id, code, description, amount, type, combination};
}
