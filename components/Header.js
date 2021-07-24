import React from 'react'
import Icon from '@material-tailwind/react/Icon';
import Button from '@material-tailwind/react/Button';
import { signOut, useSession } from 'next-auth/client';

export default function Header() {
    const [session, loading] = useSession();
    return (
        <div className="sticky top-0 z-50 flex items-center px-4 shadow-md bg-white">
            <Button color="gray" buttonType="outline" rounded={true} iconOnly={true} ripple="dark" className="h-20 w-20 !border-0">
                <Icon name="menu" size="3xl"/>
            </Button>

            <Icon name="description" size="5xl" color="blue"/>
            <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-2xl">Docs</h1>

            <div className="flex items-center bg-gray-100 px-5 py-2 text-gray-600 rounded-lg flex-grow mx-5 md:mx-20 focus-within:text-gray-600 focus-within:shadow-md">
                <Icon name="search" size="3xl" color="gray"/>
                <input type="text" placeholder="Search" className="flex-grow px-5 text-base outline-none bg-transparent"/>
            </div>

            <Button color="blue" buttonType="outline" className="hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 !border-0" rounded={true} iconOnly={true} ripple="dark" >
            <Icon name="apps" size="3xl" color="gray"/>
            </Button>

            <img loading="lazy" className="cursor-pointer rounded-full ml-2 h-12 w-12 z-50" src={session?.user?.image} alt="" onClick={signOut} />

        </div>
    )
}
