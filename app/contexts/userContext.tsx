'use client'

import { useRouter } from 'next/navigation';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserContextType } from '../data/_models/user.context.type';
import { UserDataModel } from '../data/_models/user.data.model';
import { User } from '../data/_models/user';
import { showErrorToast } from '../data/error.manager';
import { AuthService } from '../_services/auth/auth.service';
import { useToast } from '@/components/ui/use-toast';



const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [userData, setUserData] = useState<UserDataModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const router = useRouter();

    const loginHandler = (data: UserDataModel) => {
        setUserData(data);

    }
    const logoutHandler = () => {
        setUserData(null)
        User.loggedOutCallback()
        router.push('/');
        toast({
            title: 'Logged Out',
            description: 'You have successfully logged out'
        })


    }

    const autoSignIn = async () => {
        setLoading(true);
        try {
            const data = await AuthService.autoSignIn();
            setUserData(data);

            setLoading(false);

        } catch (error) {
            showErrorToast(error);
            setLoading(false);
        }
    }


    useEffect(() => {
        if (User.getAccessToken()) {
            const data: string | null = localStorage?.getItem('currentUser');
            if (data != null) {
                const json = JSON.parse(data);
                setUserData(json);
            }
            autoSignIn();
        }


    }, [])


    return (
        <UserContext.Provider value={{
            loginHandler,
            logoutHandler,
            autoSignIn,
            setUserData,
            userData,
            loading
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
