/* =========================================================
   DEMO HEADER
========================================================= */

(() => {

    const header =
        document.querySelector(".demo-header");

    if (!header) {
        return;
    }


    const root =
        document.documentElement;


    const isInnerPage =
        header.classList.contains("demo-header--inner-page");


    /* =====================================================
       DARK MODE
    ===================================================== */

    const themeButton =
        header.querySelector(".demo-header__theme");


    const savedTheme =
        localStorage.getItem("demo-theme");


    if (savedTheme === "dark") {

        root.setAttribute(
            "data-theme",
            "dark"
        );

    }


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            () => {

                const isDark =
                    root.getAttribute("data-theme")
                    === "dark";


                if (isDark) {

                    root.removeAttribute(
                        "data-theme"
                    );

                    localStorage.setItem(
                        "demo-theme",
                        "light"
                    );

                }

                else {

                    root.setAttribute(
                        "data-theme",
                        "dark"
                    );

                    localStorage.setItem(
                        "demo-theme",
                        "dark"
                    );

                }

            }
        );

    }



    /* =====================================================
       LANGUAGE DROPDOWN
    ===================================================== */

    const languageButton =
        header.querySelector(
            ".demo-header__language-toggle"
        );

    const languageMenu =
        header.querySelector(
            ".demo-header__language-menu"
        );

    const currentLanguage =
        header.querySelector(
            "#demoCurrentLanguage"
        );


    if (
        languageButton &&
        languageMenu &&
        currentLanguage
    ) {

        languageButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                const isOpen =
                    languageMenu.classList.toggle(
                        "active"
                    );


                languageButton.classList.toggle(
                    "active"
                );


                languageButton.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );


        const languageOptions =
            languageMenu.querySelectorAll(
                "button"
            );


        languageOptions.forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    currentLanguage.textContent =
                        option.dataset.language;


                    languageMenu.classList.remove(
                        "active"
                    );


                    languageButton.classList.remove(
                        "active"
                    );


                    languageButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


        document.addEventListener(
            "click",
            event => {

                if (
                    !event.target.closest(
                        ".demo-header__language"
                    )
                ) {

                    languageMenu.classList.remove(
                        "active"
                    );


                    languageButton.classList.remove(
                        "active"
                    );


                    languageButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }



    /* =====================================================
       MOBILE MENU
       
       ONLY EXISTS ON THE NORMAL HEADER
       ===================================================== */

    const menuButton =
        header.querySelector(
            ".demo-header__menu-toggle"
        );

    const mobileMenu =
        header.querySelector(
            ".demo-header__mobile-menu"
        );


    if (
        menuButton &&
        mobileMenu
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.toggle(
                        "active"
                    );


                menuButton.classList.toggle(
                    "active"
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );

    }



    /* =====================================================
       SEARCH ELEMENTS
    ===================================================== */

    const searchButton =
        header.querySelector(
            ".demo-header__search-icon"
        );


    const searchInput =
        header.querySelector(
            ".demo-header__search-input"
        );


    const searchResults =
        header.querySelector(
            ".demo-header__search-results"
        );


    const mobileSearch =
        header.querySelector(
            ".demo-header__mobile-search"
        );


    const mobileSearchInput =
        header.querySelector(
            "#demoMobileSearchInput"
        );


    const mobileSearchResults =
        header.querySelector(
            "#demoMobileSearchResults"
        );



    /* =====================================================
       INNER PAGE SEARCH
       
       Inner pages:
       - Search bar is hidden
       - Search icon exists on ALL screen sizes
       - Clicking the icon opens the existing mobile
         search interface
       ===================================================== */

    if (isInnerPage) {

        if (
            searchButton &&
            mobileSearch
        ) {

            searchButton.addEventListener(
                "click",
                () => {

                    const isOpen =
                        mobileSearch.classList.toggle(
                            "active"
                        );


                    searchButton.setAttribute(
                        "aria-expanded",
                        isOpen
                    );


                    if (isOpen) {

                        if (mobileSearchInput) {

                            mobileSearchInput.focus();

                        }


                        if (mobileSearchResults) {

                            mobileSearchResults.classList.add(
                                "active"
                            );

                        }

                    }

                    else {

                        if (mobileSearchResults) {

                            mobileSearchResults.classList.remove(
                                "active"
                            );

                        }

                    }

                }
            );

        }


        /* ---------------------------------------------
           Inner page mobile-search filtering
        --------------------------------------------- */

        if (
            mobileSearchInput &&
            mobileSearchResults
        ) {

            const mobileProducts =
                mobileSearchResults.querySelectorAll(
                    "a"
                );


            mobileSearchInput.addEventListener(
                "input",
                () => {

                    const query =
                        mobileSearchInput.value
                            .toLowerCase()
                            .trim();


                    mobileProducts.forEach(product => {

                        const nameElement =
                            product.querySelector(
                                "strong"
                            );


                        /*
                           "See all results" does not
                           contain a <strong>, so leave it
                           visible.
                        */

                        if (!nameElement) {

                            product.style.display =
                                "flex";

                            return;

                        }


                        const name =
                            nameElement.textContent
                                .toLowerCase();


                        product.style.display =
                            name.includes(query) ||
                                query === ""
                                ? "flex"
                                : "none";

                    });


                    mobileSearchResults.classList.add(
                        "active"
                    );

                }
            );


            /* Close inner search when clicking outside */

            document.addEventListener(
                "click",
                event => {

                    if (
                        !event.target.closest(
                            ".demo-header__search"
                        ) &&
                        !event.target.closest(
                            ".demo-header__mobile-search"
                        )
                    ) {

                        mobileSearch.classList.remove(
                            "active"
                        );


                        mobileSearchResults.classList.remove(
                            "active"
                        );


                        if (searchButton) {

                            searchButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }

                }
            );

        }


        /*
           IMPORTANT:

           The inner page does NOT need the normal
           desktop search input behavior because the
           search bar is hidden.
        */

        return;

    }



    /* =====================================================
       NORMAL HEADER — MOBILE SEARCH
       
       Everything below here applies ONLY to the
       normal homepage/header.
       ===================================================== */

    if (
        searchButton &&
        mobileSearch &&
        mobileSearchInput &&
        mobileSearchResults
    ) {

        const mobileProducts =
            mobileSearchResults.querySelectorAll(
                "a"
            );


        searchButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileSearch.classList.toggle(
                        "active"
                    );


                searchButton.setAttribute(
                    "aria-expanded",
                    isOpen
                );


                if (isOpen) {

                    mobileSearchInput.focus();


                    mobileSearchResults.classList.add(
                        "active"
                    );

                }

                else {

                    mobileSearchResults.classList.remove(
                        "active"
                    );

                }

            }
        );


        /* Mobile search filtering */

        mobileSearchInput.addEventListener(
            "input",
            () => {

                const query =
                    mobileSearchInput.value
                        .toLowerCase()
                        .trim();


                mobileProducts.forEach(product => {

                    const nameElement =
                        product.querySelector(
                            "strong"
                        );


                    if (!nameElement) {

                        product.style.display =
                            "flex";

                        return;

                    }


                    const name =
                        nameElement.textContent
                            .toLowerCase();


                    product.style.display =
                        name.includes(query) ||
                            query === ""
                            ? "flex"
                            : "none";

                });


                mobileSearchResults.classList.add(
                    "active"
                );

            }
        );

    }



    /* =====================================================
       NORMAL HEADER — DESKTOP SEARCH
    ===================================================== */

    if (
        searchInput &&
        searchResults
    ) {

        const products =
            searchResults.querySelectorAll(
                "a"
            );


        searchInput.addEventListener(
            "focus",
            () => {

                searchResults.classList.add(
                    "active"
                );

            }
        );


        searchInput.addEventListener(
            "input",
            () => {

                const query =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                products.forEach(product => {

                    const nameElement =
                        product.querySelector(
                            "strong"
                        );


                    if (!nameElement) {

                        product.style.display =
                            "flex";

                        return;

                    }


                    const name =
                        nameElement.textContent
                            .toLowerCase();


                    product.style.display =
                        name.includes(query) ||
                            query === ""
                            ? "flex"
                            : "none";

                });


                searchResults.classList.add(
                    "active"
                );

            }
        );


        document.addEventListener(
            "click",
            event => {

                if (
                    !event.target.closest(
                        ".demo-header__search"
                    )
                ) {

                    searchResults.classList.remove(
                        "active"
                    );

                }

            }
        );

    }



    /* =====================================================
       RESPONSIVE STATE SYNCHRONIZATION
       
       ONLY NEEDED FOR THE NORMAL HEADER
       ===================================================== */

    const responsiveQuery =
        window.matchMedia(
            "(max-width: 950px)"
        );


    if (
        mobileSearch &&
        mobileSearchResults &&
        searchButton
    ) {

        function resetResponsiveState() {

            if (!responsiveQuery.matches) {

                /*
                   MOBILE → DESKTOP
                */

                mobileSearch.classList.remove(
                    "active"
                );


                mobileSearchResults.classList.remove(
                    "active"
                );


                if (mobileMenu) {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }


                if (menuButton) {

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                searchButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                if (mobileSearchInput) {

                    mobileSearchInput.value = "";

                }


                mobileSearchResults
                    .querySelectorAll("a")
                    .forEach(product => {

                        product.style.display =
                            "flex";

                    });


                if (searchResults) {

                    searchResults.classList.remove(
                        "active"
                    );

                }

            }

            else {

                /*
                   DESKTOP → MOBILE
                */

                if (searchResults) {

                    searchResults.classList.remove(
                        "active"
                    );

                }


                if (searchInput) {

                    searchInput.value = "";

                }


                if (searchResults) {

                    searchResults
                        .querySelectorAll("a")
                        .forEach(product => {

                            product.style.display =
                                "flex";

                        });

                }

            }

        }


        /* Initial state */

        resetResponsiveState();


        /* Breakpoint changes */

        responsiveQuery.addEventListener(
            "change",
            resetResponsiveState
        );

    }

})();
