(function () {

    const mainImage = document.getElementById("productMainImage");

    const thumbnails = document.querySelectorAll(
        ".product-page__thumbnail"
    );


    if (!mainImage || !thumbnails.length) {
        return;
    }


    thumbnails.forEach(function (thumbnail) {

        thumbnail.addEventListener("click", function () {

            const newImage = thumbnail.dataset.image;


            if (!newImage) {
                return;
            }


            /* =========================================
               FADE MAIN IMAGE
            ========================================== */

            mainImage.style.opacity = "0";


            setTimeout(function () {

                mainImage.src = newImage;

                mainImage.style.opacity = "1";

            }, 120);


            /* =========================================
               UPDATE ACTIVE THUMBNAIL
            ========================================== */

            thumbnails.forEach(function (item) {

                item.classList.remove(
                    "product-page__thumbnail--active"
                );

            });


            thumbnail.classList.add(
                "product-page__thumbnail--active"
            );


            /* =========================================
               BRING SELECTED THUMBNAIL INTO VIEW
            ========================================== */

            thumbnail.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });

        });

    });

})();
