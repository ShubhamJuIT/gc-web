import React, { ReactNode, } from 'react';
import Sidebar from '@/components/sidebar';
import AdminHeader from '@/components/admin-components/admin-header';



const AdminLayout = ({ children }: {
    children: ReactNode;

}) => {


    return (
        <div className="flex h-screen text-foreground overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader


                />
                <div className="flex-1 p-6 overflow-auto  pb-24">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
