import React from "react";
import logo from '../assets/img/logo.svg'

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" border-gray-200 bg-neutral-800 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Ozone motors Logo" />
         
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  md:bg-neutral-800 border-neutral-700 ">
       
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:border-0 md:hover:text-neutral-200 md:p-0   "
              >
                ABOUT US
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:border-0 md:hover:text-neutral-200 md:p-0   "
              >
                SERVICES
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3  text-white rounded hover:bg-neutral-700 md:hover:bg-transparent md:border-0 md:hover:text-neutral-200 md:p-0   "
              >
                CONTACT US
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
