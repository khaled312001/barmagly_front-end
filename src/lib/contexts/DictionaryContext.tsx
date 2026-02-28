'use client';

import React, { createContext, useContext } from 'react';

type DictionaryContent = any; // You can type this more strictly based on your JSON structure

const DictionaryContext = createContext<DictionaryContent>(null);

export function DictionaryProvider({
    dict,
    children,
}: {
    dict: DictionaryContent;
    children: React.ReactNode;
}) {
    return (
        <DictionaryContext.Provider value={dict}>
            {children}
        </DictionaryContext.Provider>
    );
}

export function useDictionary() {
    const context = useContext(DictionaryContext);
    if (!context) {
        throw new Error('useDictionary must be used within a DictionaryProvider');
    }
    return context;
}
