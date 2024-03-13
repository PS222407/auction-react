import React, {useEffect, useState} from 'react';

import {Collapse, initTWE} from "tw-elements";
import {Link} from "react-router-dom";

function Nav() {
    const [config, setConfig] = useState("");

    useEffect(() => {
        initTWE({Collapse});

        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

    return (
        <>
            <nav style={{backgroundColor: '#FDA700'}}
                 className="relative flex w-full flex-nowrap items-center justify-between py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4"
                 data-twe-navbar-ref="">
                <div className="flex w-full flex-wrap items-center justify-between px-3"
                     style={{backgroundColor: '#FDA700'}}>
                    <div className="ms-2 md:me-2">
                        <Link to={`/`} className={'text-xl text-white font-bold'}>{config.APP_NAME}</Link>
                    </div>
                    <button
                        className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button"
                        data-twe-collapse-init=""
                        data-twe-target="#navbarSupportedContent14"
                        aria-controls="navbarSupportedContent14"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd"/></svg>
                        </span>
                    </button>

                    <div
                        className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
                        id="navbarSupportedContent14"
                        data-twe-collapse-item="">
                        <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
                            data-twe-navbar-nav-ref="">
                            <li className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref="">
                                {/*<Link className="text-white lg:px-2" aria-current="page" to="/categories" data-twe-nav-link-ref="">*/}
                                {/*    Categories*/}
                                {/*</Link>*/}
                            </li>
                        </ul>
                        <div className="w-[300px] lg:pe-2">
                            <div className="relative flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="bg-white relative m-0 -me-0.5 block w-[1px] min-w-0 flex-auto rounded-s border border-secondary-500 bg-transparent bg-clip-padding px-3 py-1 text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out focus:z-[3] focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="button-addon3"/>
                                <button
                                    className="bg-white relative z-[2] rounded-e border border-secondary-500 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                                    type="button"
                                    id="button-addon3"
                                    data-twe-ripple-init="">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;