import React, { createContext, useContext, useState } from 'react'

const BuyCarContext = createContext();

export const BuyCarProvider = ({ children }) => {

    const [buyCar, setBuyCar] = useState(() => {
        const saveBuyCar = localStorage.getItem('buy-car');
        return saveBuyCar ? JSON.parse(saveBuyCar) : null;
    });
    const saveBuyCar = (userBuyCar) => {
        console.log('BuyCarProvider', userBuyCar);
        setBuyCar(userBuyCar);
        localStorage.setItem('buy-car', JSON.stringify(userBuyCar));
    };

    const logout = () => {
        setBuyCar(null);
        localStorage.removeItem('buy-car');
    };

    return (
        <BuyCarContext.Provider value={{ buyCar, saveBuyCar, logout}}>
            {children}
        </BuyCarContext.Provider>
    );
};
// Hook personalizado
export const userBuyCar = () => {
  return useContext(BuyCarContext);
};
