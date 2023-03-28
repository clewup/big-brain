import React, { createContext, SetStateAction, useContext, useState } from 'react';

interface VariantContextValues {
    variants: string[];
    setVariants: React.Dispatch<SetStateAction<string[]>>
}

const VariantContext = createContext<VariantContextValues>({} as VariantContextValues);

interface VariantContextProps {
    children: JSX.Element;
    providerArgs?: {
        initialVariants: string[] | undefined;
    };
}

const VariantProvider = ({children, providerArgs}: VariantContextProps) => {
    const [variants, setVariants] = useState<string[]>(providerArgs?.initialVariants || [])

    return (
        <VariantContext.Provider value={{variants: variants, setVariants: setVariants}}>
        {children}
    </VariantContext.Provider>
    )
}

const useVariant = () => {
    const context = useContext(VariantContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider.")

    return context;
}

export {useVariant, VariantProvider}