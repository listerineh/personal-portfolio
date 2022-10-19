import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";

const Topnav = () => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <Disclosure as="nav" className="bg-black sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <div className="block lg:hidden h-8 w-auto text-white text-xl font-bold">
                    <h1>
                      <Link to="/">Sebastian Alvarez</Link> {""}
                      <span className="text-indigo-600 text-base font-extralight">
                        Dev
                      </span>
                    </h1>
                  </div>
                  <div className="hidden lg:block h-8 w-auto text-white text-xl font-bold">
                    <h1>
                      <Link to="/">Sebastian Alvarez</Link> {""}
                      <span className="text-indigo-600 text-base font-extralight">
                        Software Developer
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className={`${
                        currentLocation === "/"
                          ? "bg-indigo-600 text-white hover:bg-indigo-500"
                          : "text-gray-300 hover:bg-zinc-500 hover:text-white"
                      }  px-3 py-2 rounded-sm text-sm font-medium transition-all`}
                    >
                      About
                    </Link>
                    <Link
                      to="/info"
                      className={`${
                        currentLocation === "/info"
                          ? "bg-indigo-600 text-white hover:bg-indigo-500"
                          : "text-gray-300 hover:bg-zinc-500 hover:text-white"
                      }  px-3 py-2 rounded-sm text-sm font-medium transition-all`}
                    >
                      Information
                    </Link>
                    <Link
                      to="/portfolio"
                      className={`${
                        currentLocation === "/portfolio"
                          ? "bg-indigo-600 text-white hover:bg-indigo-500"
                          : "text-gray-300 hover:bg-zinc-500 hover:text-white"
                      }  px-3 py-2 rounded-sm text-sm font-medium transition-all`}
                    >
                      Portfolio
                    </Link>
                    <Link
                      to="/contacts"
                      className={`${
                        currentLocation === "/contacts"
                          ? "bg-indigo-600 text-white hover:bg-indigo-500"
                          : "text-gray-300 hover:bg-zinc-500 hover:text-white"
                      }  px-3 py-2 rounded-sm text-sm font-medium transition-all`}
                    >
                      Contacts
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-0">
              <Link
                to="/"
                className={`${
                  currentLocation === "/"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-zinc-500 hover:text-white"
                }  block px-3 py-2 rounded-sm text-base font-medium shadow`}
              >
                About
              </Link>
              <Link
                to="/info"
                className={`${
                  currentLocation === "/info"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-zinc-500 hover:text-white"
                }  block px-3 py-2 rounded-sm text-base font-medium shadow`}
              >
                Information
              </Link>
              <Link
                to="/portfolio"
                className={`${
                  currentLocation === "/portfolio"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-zinc-500 hover:text-white"
                }  block px-3 py-2 rounded-sm text-base font-medium shadow`}
              >
                Portfolio
              </Link>
              <Link
                to="/contacts"
                className={`${
                  currentLocation === "/contacts"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-zinc-500 hover:text-white"
                }  block px-3 py-2 rounded-sm text-base font-medium shadow`}
              >
                Contacts
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Topnav;
