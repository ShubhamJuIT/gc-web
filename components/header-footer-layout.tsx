
'use client'

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
const HeaderFooterLayout = (props: {
    children: React.ReactNode
}) => {
    const pathname = usePathname();

    const hideHeaderFooter = pathname.includes('/auth/login') || pathname.includes('/auth/signup') || pathname.includes('/admin');



    return (
        <>
            {hideHeaderFooter ? null : <Header />}

            {props?.children}

            {hideHeaderFooter ? null : <Footer />}

        </>
    )
}

export default HeaderFooterLayout