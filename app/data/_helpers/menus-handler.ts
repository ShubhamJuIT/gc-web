import { AccoutTypesEnum } from "../_enums/account.types.enum";
import { NavItemModel } from "../_models/nav.item.model";

export default class MenusHandler {


    private static commonWebMenu: NavItemModel[] = [
        {
            label: 'Home',
            path: '/'
        },
        {
            label: 'Courses',
            path: '/courses'
        },
        {
            label: 'Contact',
            path: '/contact'
        },
        {
            label: 'About Us',
            path: '/about-us'
        },
    ]

    private static superAdminMenu: NavItemModel[] = [
        {
            label: 'Dashboard',
            path: '/admin/dashboard'
        },

        {
            label: 'Users',
            path: '/admin/users'
        },
        {
            label: 'Courses',
            path: '/admin/courses'
        },
        {
            label: 'Orders',
            path: '/admin/orders'
        },


    ]


    private static studentSubMenu: NavItemModel[] = [
        {
            label: 'My Profile',
            path: '/account/profile'
        },
        {
            label: 'My Courses',
            path: '/account/courses'
        },

        {
            label: 'My Certificates',
            path: '/account/certificates'
        },

    ]
    private static mentorSubMenu: NavItemModel[] = [

        {
            label: 'My Profile',
            path: '/account/profile'
        },
        {
            label: 'My Enrolled Courses',
            path: '/account/courses'
        },

        {
            label: 'My Certificates',
            path: '/account/certificates'
        },
        {
            label: 'My Courses',
            path: '/my-courses'
        },



    ]
    private static superAdminSubMenu: NavItemModel[] = [
        {
            label: 'Switch To App',
            path: '/'
        },



    ]

    private static superAdminAppSubMenu: NavItemModel[] = [
        {
            label: 'Switch To Admin',
            path: '/admin/dashboard'
        },
        {
            label: 'My Profile',
            path: '/account/profile'
        },
        {
            label: 'My Enrolled Courses',
            path: '/account/courses'
        },

        {
            label: 'My Certificates',
            path: '/account/certificates'
        },
        {
            label: 'My Courses',
            path: '/my-courses'
        },

    ]

    public static getCommonWebMenu(): NavItemModel[] {
        return this.commonWebMenu;
    }
    public static getSuperAdminMenu(): NavItemModel[] {
        return this.superAdminMenu;
    }


    public static getMobileMenu(accountType?: AccoutTypesEnum, pathname?: string): NavItemModel[] {
        switch (accountType) {
            case AccoutTypesEnum.STUDENT:
                return [...this.commonWebMenu, ...this.studentSubMenu];
            case AccoutTypesEnum.MENTOR:
                return [...this.commonWebMenu, ...this.mentorSubMenu];
            case AccoutTypesEnum.ADMIN:
            case AccoutTypesEnum.SUPER_ADMIN:
                let val: NavItemModel[] = []

                if (pathname?.startsWith("/admin")) {
                    val = [...this.superAdminMenu, ...this.superAdminSubMenu,]

                } else {
                    val = [...this.commonWebMenu, ...this.superAdminAppSubMenu,]
                }

                return val;
            default:
                return this.commonWebMenu;
        }
    }


    public static getSubMenu(accountType: AccoutTypesEnum, pathname: string): NavItemModel[] {
        switch (accountType) {
            case AccoutTypesEnum.STUDENT:
                return this.studentSubMenu;
            case AccoutTypesEnum.MENTOR:
                return this.mentorSubMenu;
            case AccoutTypesEnum.ADMIN:
            case AccoutTypesEnum.SUPER_ADMIN:
                let val: NavItemModel[] = []

                if (pathname?.startsWith("/admin")) {
                    val = this.superAdminSubMenu;

                } else {
                    val = this.superAdminAppSubMenu;
                }

                return val;
            default:
                return this.studentSubMenu;
        }
    }
    public static getAccountMenu(accountType: AccoutTypesEnum): NavItemModel[] {
        switch (accountType) {
            case AccoutTypesEnum.STUDENT:
                return this.studentSubMenu;
            case AccoutTypesEnum.MENTOR:
                return this.mentorSubMenu;
            case AccoutTypesEnum.ADMIN:
            case AccoutTypesEnum.SUPER_ADMIN:
                return this.superAdminAppSubMenu?.slice(1);
            default:
                return this.studentSubMenu;
        }
    }








}


