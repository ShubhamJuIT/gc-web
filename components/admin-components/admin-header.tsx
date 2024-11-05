import Image from "next/image"
import Link from "next/link"
import MobileMenu from "../mobile-menu"
import Submenu from "../submenu"

const AdminHeader = (

) => {

    return (
        <header className='p-6 border-b border-gray-100/20 flex justify-between items-center gap-5 '>

            <div className=" md:block  hidden">
                <h1 className=" text-2xl font-semibold text-primary  ">Welcome, Admin!</h1>

            </div>
            <div className="md:hidden  flex items-center gap-4">
                <MobileMenu logoRedirectTo="/admin/dashboard" >
                    <button id="mobile-menu-button" aria-label="Mobile Menu Button" className=" text-primary  bg-primary/15 p-1 rounded-lg  font-bold">
                        <i className=" text-3xl icon-hamburger"></i>

                    </button>
                </MobileMenu>
                <Link className=' flex-none ' href='/admin/dashboard'>
                    <Image className=' sm:w-1/2 w-2/5 ' src="/svgs/logo.svg" alt="Logo" width={200} height={80} />
                </Link>

            </div>
            <div className=" md:block hidden">
                <Submenu />
            </div>


        </header>
    )
}

export default AdminHeader