import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
const footerNavLinks = [
    {
        label: 'Home',
        path: '/'
    },
    {
        label: 'Courses',
        path: '/courses'
    },
    {
        label: 'About Us',
        path: '/about-us'
    },
    {
        label: 'Contact',
        path: '/contact'
    },
];

const socialIcons = [
    {
        icon: 'facebook',
        url: 'https://www.facebook.com/people/GameCentricio/100094155589534/'
    },
    {
        icon: 'instagram',
        url: 'https://www.instagram.com/gamecentric.io/'
    },
    {
        icon: 'threads',
        url: '/'
    },
    {
        icon: 'tiktok',
        url: 'https://www.tiktok.com/@gamecentric.io'
    },
    {
        icon: 'twitter',
        url: '/'
    },
    {
        icon: 'twitch',
        url: 'https://www.twitch.tv/game_centric'
    },
    {
        icon: 'snapchat',
        url: '/'
    },
    {
        icon: 'linkedin',
        url: 'https://www.linkedin.com/company/gamecentric-io/'
    },
    {
        icon: 'youtube',
        url: 'https://www.youtube.com/channel/UC8c60lQGueK_BQkSnUvyFrw'
    },
    {
        icon: 'discord',
        url: '/'
    },

    {
        icon: 'reddit',
        url: 'https://www.reddit.com/user/game_centric/'
    },
]
const Footer = () => {

    return (
        <div className=' bg-gradient-to-r from-secondary  to-secondaryDark '>
            <div className=" py-6 px-9">
                <>
                    <div className='  grid lg:grid-cols-12 sm:items-center  lg:gap-16 gap-8'>
                        <div className=' sm:col-span-3' >
                            <figure className=' mb-3'>
                                <Image src='/svgs/logo-black.svg' alt='Game Centric Logo' width={150} height={50} />
                            </figure>
                            <p className=' text-balance text-background  text-sm'>GAMECENTRIC, the platform by gamers for gamers, publishers, brands, and fans.</p>
                        </div>
                        <div className='  sm:col-span-5' >
                            <ul className=' flex sm:flex-row flex-col sm:items-center lg:justify-between sm:gap-8 gap-3    '>
                                {footerNavLinks?.map((item, i) => {
                                    return <li className='   text-lg font-bold' key={i}>
                                        <Link href={item?.path}>{item?.label}</Link>
                                    </li>
                                })}

                            </ul>
                        </div>

                        <div className=' sm:col-span-4'>

                            <div className=' flex  flex-wrap  items-center gap-2 mb-3'>
                                {socialIcons?.map((icon, i) => {
                                    return <a aria-label={icon?.icon} target='_blank' rel="noopener noreferrer" key={i} href={icon?.url}>
                                        <Image src={`/svgs/footer/${icon?.icon}.svg`} alt={icon?.icon} width={32} height={32} />
                                    </a>
                                })}
                            </div>

                            <p className=' font-normal text-background text-sm  '>ALL RIGHT RESERVED BY
                                DIGITUS TECHNOLOGIES PTE. LTD.,
                                160 ROBINSON ROAD #14-04,
                                SINGAPORE (068914)
                            </p>

                        </div>
                    </div>
                </>
            </div>
        </div >
    )
}

export default Footer