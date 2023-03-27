import { VariantType } from '@/types';
import React, { createContext, SetStateAction, useContext, useState } from 'react';

interface VariantContextValues {
    variants: VariantType[];
    setVariants: React.Dispatch<SetStateAction<VariantType[]>>
}

const VariantContext = createContext<VariantContextValues>({} as VariantContextValues);

interface VariantContextProps {
    children: JSX.Element;
    providerArgs?: {
        initialVariants: VariantType[] | undefined;
    };
}

const VariantProvider = ({children, providerArgs}: VariantContextProps) => {
    const [variants, setVariants] = useState<VariantType[]>(providerArgs?.initialVariants || [])

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