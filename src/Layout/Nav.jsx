import React, {useEffect, useState} from 'react';

import {Collapse, Dropdown, initTWE} from "tw-elements";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

function Nav() {
    const [config, setConfig] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [categories, setCategories] = useState();
    const [roles, setRoles] = useState();

    useEffect(() => {
        initTWE({Collapse, Dropdown});

        if (localStorage.getItem("auth") && dayjs(JSON.parse(localStorage.getItem("auth")).expiresAt) > dayjs()) {
            setAccessToken(JSON.parse(localStorage.getItem("auth")).accessToken);
        }

        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

    useEffect(() => {
        if (config) {
            getUserInfo();
            getCategories();
        }
    }, [config]);

    async function getCategories() {
        const response = await fetch(`${config.API_URL}/api/v1/Category`);

        if (response.status === 200) {
            setCategories(await response.json());
        }
    }

    async function getUserInfo() {
        const response = await fetch(`${config.API_URL}/api/v1/User/info`, {headers: {"Authorization": "Bearer " + accessToken}});

        setIsAuthorized(response.status === 200);

        if (response.status === 200) {
            setRoles(await response.json());
        }
    }

    return (
        <>
            <nav style={{backgroundColor: '#FDA700'}}
                 className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <button
                        className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button"
                        data-twe-collapse-init=""
                        data-twe-target="#navbarSupportedContent1"
                        aria-controls="navbarSupportedContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span
                            className="[&>svg]:w-7 [&>svg]:stroke-white dark:[&>svg]:stroke-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white">
                                  <path
                                      fillRule="evenodd"
                                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                      clipRule="evenodd"/>
                            </svg>
                        </span>
                    </button>

                    <div
                        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                        id="navbarSupportedContent1"
                        data-twe-collapse-item="">
                        <Link to={`/`}
                              className={'mb-4 me-5 ms-2 mt-3 flex items-center text-white font-bold lg:mb-0 lg:mt-0'}>{config.APP_NAME}</Link>
                        <ul
                            className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
                            data-twe-navbar-nav-ref="">
                            {
                                categories && categories.map((category) => {
                                    return (
                                        <li key={category.id} className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref="">
                                            <a href={`/categories/${category.id}`} className="text-white hover:text-black/80 focus:text-black/80 active:text-black/80 dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2">
                                                {category.name}
                                            </a>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>

                    <div className="relative flex items-center">
                        <div className="w-[200px] sm:w-[300px] lg:pe-2">
                            <div className="relative flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="bg-white relative m-0 -me-0.5 block w-[1px] min-w-0 flex-auto rounded-s border border-secondary-500 bg-transparent bg-clip-padding px-3 py-1 text-base font-normal leading-[1.6] text-surface outline-none focus:z-[3] focus:outline-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="button-addon3"/>
                                <button
                                    className="bg-white relative z-[2] rounded-e border border-secondary-500 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                                    type="button"
                                    id="button-addon3"
                                    data-twe-ripple-init="">
                                    Search
                                </button>
                            </div>
                        </div>
                        <a className="me-4 text-neutral-600 dark:text-white" href="#">
                            <span className="[&>svg]:w-8">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="white">
                                <path
                                    d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/>
                              </svg>
                            </span>
                        </a>

                        <div
                            className="relative"
                            data-twe-dropdown-ref=""
                            data-twe-dropdown-alignment="end">
                            <a
                                className="flex items-center whitespace-nowrap"
                                href="#"
                                id="dropdownMenuButton2"
                                role="button"
                                data-twe-dropdown-toggle-ref=""
                                aria-expanded="false">
                                <div className="[&>svg]:w-5">
                                    <svg fill={"white"} xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 448 512">
                                        <path
                                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                                    </svg>
                                </div>
                            </a>
                            <ul
                                className="w-32 absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                                aria-labelledby="dropdownMenuButton2"
                                data-twe-dropdown-menu-ref="">
                                {
                                    isAuthorized === false &&
                                    <>
                                        <li>
                                            <Link
                                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                                to="/login"
                                                data-twe-dropdown-item-ref="">
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <a className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                               href="/register"
                                               data-twe-dropdown-item-ref="">
                                                Register
                                            </a>
                                        </li>
                                    </>
                                }
                                {
                                    isAuthorized === true &&
                                    <li>
                                        <a className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                           href="/account"
                                           data-twe-dropdown-item-ref="">
                                            Account
                                        </a>
                                    </li>
                                }
                                {
                                    roles && roles.includes("Admin") &&
                                    <li>
                                        <Link
                                            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                            to="/admin"
                                            data-twe-dropdown-item-ref="">
                                            Admin
                                        </Link>
                                    </li>
                                }
                                <li>
                                    <a onClick={() => {
                                        localStorage.removeItem("auth");
                                        window.location.reload();
                                    }}
                                       className="block cursor-pointer w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                       data-twe-dropdown-item-ref="">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;