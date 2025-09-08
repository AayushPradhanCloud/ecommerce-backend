export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export const validatePassword = (password) => {
    return password.length >= 6;
};
export const validateName = (name) => {
    return name.length >= 2;
};
export const validatePrice = (price) => {
    return price >= 0;
};
export const validateStock = (stock) => {
    return stock >= 0;
};
//# sourceMappingURL=validators.js.map