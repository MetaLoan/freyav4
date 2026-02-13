import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BirthData } from '@/src/services/api/types';

// Demo User: 1990-06-15 12:30, Beijing
const DEMO_USER: BirthData = {
    year: 1990,
    month: 6,
    day: 15,
    hour: 12,
    minute: 30,
    latitude: 39.9042,
    longitude: 116.4074,
    timezone: 8
};

interface UserContextValue {
    birthData: BirthData;
    updateBirthData: (data: BirthData) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [birthData, setBirthData] = useState<BirthData>(DEMO_USER);

    const updateBirthData = (data: BirthData) => {
        setBirthData(data);
    };

    return (
        <UserContext.Provider value={{ birthData, updateBirthData }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
}
