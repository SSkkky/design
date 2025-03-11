import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(0);

    return (
        <AppContext.Provider value={{ activeMenu, setActiveMenu }}>
            {children}
        </AppContext.Provider>
    );
};
