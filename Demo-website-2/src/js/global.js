document.addEventListener("DOMContentLoaded", () => {

    const copyButtons = document.querySelectorAll(".demo-contact__copy");

    copyButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            const value = button.dataset.copy;
            const text = button.querySelector(".demo-contact__copy-text");

            if (!value || !text) {
                return;
            }

            const showCopiedState = () => {

                button.classList.add("copied");
                text.textContent = "Copied";

                setTimeout(() => {
                    button.classList.remove("copied");
                    text.textContent = "Copy";
                }, 1800);

            };


            try {

                // Modern Clipboard API
                if (navigator.clipboard && window.isSecureContext) {

                    await navigator.clipboard.writeText(value);

                    showCopiedState();

                    return;
                }


                // Fallback for older browsers
                const temporaryInput = document.createElement("textarea");

                temporaryInput.value = value;

                temporaryInput.setAttribute("readonly", "");
                temporaryInput.style.position = "fixed";
                temporaryInput.style.opacity = "0";
                temporaryInput.style.pointerEvents = "none";

                document.body.appendChild(temporaryInput);

                temporaryInput.select();
                temporaryInput.setSelectionRange(0, temporaryInput.value.length);

                const successful = document.execCommand("copy");

                temporaryInput.remove();


                if (successful) {

                    showCopiedState();

                } else {

                    text.textContent = "Failed";

                    setTimeout(() => {
                        text.textContent = "Copy";
                    }, 1800);

                }

            } catch (error) {

                console.error("Demo copy error:", error);

                text.textContent = "Failed";

                setTimeout(() => {
                    text.textContent = "Copy";
                }, 1800);

            }

        });

    });


});









const sections = document.querySelectorAll(".animate-section");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.2,
    }
);

sections.forEach((section) => observer.observe(section));
