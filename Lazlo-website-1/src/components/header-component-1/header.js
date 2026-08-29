/* =========================================================
   LAZLO HEADER
========================================================= */

(() => {

    const header =
        document.querySelector(".lazlo-header");

    if (!header) {
        return;
    }


    /* =====================================================
   HEADER SCROLL BEHAVIOR
===================================================== */

    let lastScrollPosition = window.scrollY;

    window.addEventListener("scroll", () => {

        const currentScrollPosition = window.scrollY;


        /*
            Keep header visible while search is open.
        */

        const searchIsOpen =
            header.querySelector(
                ".lazlo-header__search-results.active"
            ) ||
            header.querySelector(
                ".lazlo-header__mobile-search.active"
            );


        if (searchIsOpen) {

            header.classList.remove("hidden");

            lastScrollPosition = currentScrollPosition;

            return;
        }


        if (currentScrollPosition <= 10) {

            header.classList.remove("hidden");

            lastScrollPosition = currentScrollPosition;

            return;
        }


        if (currentScrollPosition > lastScrollPosition) {

            header.classList.add("hidden");

        }

        else if (
            currentScrollPosition < lastScrollPosition
        ) {

            header.classList.remove("hidden");

        }


        lastScrollPosition = currentScrollPosition;

    });

    /* =====================================================
       DARK MODE
    ===================================================== */

    const themeButton =
        header.querySelector(
            ".lazlo-header__theme"
        );

    themeButton.addEventListener("click", () => {

        const root =
            document.documentElement;

        const isDark =
            root.getAttribute("data-theme")
            === "dark";


        if (isDark) {

            root.removeAttribute(
                "data-theme"
            );

        }

        else {

            root.setAttribute(
                "data-theme",
                "dark"
            );

        }

    });


    /* =====================================================
       LANGUAGE DROPDOWN
    ===================================================== */

    const languageButton =
        header.querySelector(
            ".lazlo-header__language-toggle"
        );

    const languageMenu =
        header.querySelector(
            ".lazlo-header__language-menu"
        );

    const currentLanguage =
        header.querySelector(
            "#lazloCurrentLanguage"
        );


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
                    ".lazlo-header__language"
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


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        header.querySelector(
            ".lazlo-header__menu-toggle"
        );

    const mobileMenu =
        header.querySelector(
            ".lazlo-header__mobile-menu"
        );


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


    /* =====================================================
       MOBILE SEARCH
    ===================================================== */

    const searchButton =
        header.querySelector(
            ".lazlo-header__search-icon"
        );

    const mobileSearch =
        header.querySelector(
            ".lazlo-header__mobile-search"
        );

    const mobileSearchInput =
        header.querySelector(
            "#lazloMobileSearchInput"
        );

    const mobileSearchResults =
        header.querySelector(
            "#lazloMobileSearchResults"
        );

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

                const name =
                    product
                        .querySelector("strong")
                        .textContent
                        .toLowerCase();


                product.style.display =
                    name.includes(query) || query === ""
                        ? "flex"
                        : "none";

            });


            mobileSearchResults.classList.add(
                "active"
            );

        }
    );


    /* =====================================================
       DESKTOP SEARCH
    ===================================================== */

    const searchInput =
        header.querySelector(
            ".lazlo-header__search-input"
        );

    const searchResults =
        header.querySelector(
            ".lazlo-header__search-results"
        );

    const products =
        searchResults.querySelectorAll("a");


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

                const name =
                    product
                        .querySelector("strong")
                        .textContent
                        .toLowerCase();


                product.style.display =
                    name.includes(query) || query === ""
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
                    ".lazlo-header__search"
                )
            ) {

                searchResults.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       RESPONSIVE STATE SYNCHRONIZATION
    ===================================================== */

    const responsiveQuery =
        window.matchMedia("(max-width: 950px)");


    function resetResponsiveState() {

        /*
            MOBILE → DESKTOP

            Close the mobile-only components
            because they no longer belong to
            the current layout.
        */

        if (!responsiveQuery.matches) {

            mobileSearch.classList.remove(
                "active"
            );

            mobileSearchResults.classList.remove(
                "active"
            );

            mobileMenu.classList.remove(
                "active"
            );

            menuButton.classList.remove(
                "active"
            );

            searchButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileSearchInput.value = "";


            mobileProducts.forEach(product => {

                product.style.display = "flex";

            });


            /*
                Make sure the desktop search is
                also in a clean state after switching.
            */

            searchResults.classList.remove(
                "active"
            );

        }


        /*
            DESKTOP → MOBILE

            Close the desktop-only search dropdown
            because the desktop search is disappearing.
        */

        else {

            searchResults.classList.remove(
                "active"
            );

            searchInput.value = "";


            products.forEach(product => {

                product.style.display = "flex";

            });

        }

    }


    /*
        Run once when the component loads.
    */

    resetResponsiveState();


    /*
        Run every time the breakpoint is crossed.
    */

    responsiveQuery.addEventListener(
        "change",
        resetResponsiveState
    );

})();
