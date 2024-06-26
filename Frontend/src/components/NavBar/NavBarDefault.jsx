import React from 'react'
import ourLogo from "../../assets/ourLogo.svg"

const NavBarDefault = () => {
    return (
        <nav className="bg-[#3479C2] flex justify-center text-white fixed top-0	right-0 left-0">
            <div className="max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center content-center h-16 gap-2">
                <img className='max-h-[60px]' src={ourLogo}></img>
            </div>
        </nav>
    )
}

export default NavBarDefault
