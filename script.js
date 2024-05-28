// typing text on hero image

document.addEventListener('DOMContentLoaded', () => {
    const phrases = ["I'm a Front End Developer.", "I'm a Freelancer.", "I'm a 3D Modeler."];
    const typingText = document.getElementById('typing-text');
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        const displayedText = currentPhrase.substring(0, currentCharIndex);
        typingText.textContent = displayedText;

        if (!isDeleting && currentCharIndex < currentPhrase.length) {
            currentCharIndex++;
            setTimeout(type, 90);
        } else if (isDeleting && currentCharIndex > 0) {
            currentCharIndex--;
            setTimeout(type, 50);
        } else if (currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(type, 300);
        } else {
            isDeleting = true;
            setTimeout(type, 2000);
        }
    }

    type();
});

// to set color on nav bar links depending on which section is in view

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.list-items a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                setActiveLink(sectionId);
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        observer.observe(section);
    });

    function setActiveLink(sectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').slice(1) === sectionId) {
                link.style.color = 'var(--accent-color)';
            } else {
                link.style.color = ''; // resets the color
            }
        });
    }
});



// script for filtering portfolio items

document.addEventListener('DOMContentLoaded', (event) => {
    filterSelection('all');
});

function filterSelection(category) {
    const items = document.getElementsByClassName('portfolio-item');
    const buttons = document.getElementsByClassName('filter-btn');

    for (let i = 0; i < items.length; i++) {
        items[i].style.display = 'none';
        if (category === 'all' || items[i].classList.contains(category)) {
            items[i].style.display = 'block';
        }
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    document.querySelector(`.filter-btn[onclick="filterSelection('${category}')"]`).classList.add('active');
}

// this will show all items when the page loads

document.addEventListener('DOMContentLoaded', () => {
    filterSelection('all');
});


function openLightbox(imageSrc, captionText) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const caption = document.getElementById("caption");

    lightboxImg.src = imageSrc;
    caption.innerHTML = captionText;
    lightbox.style.display = "block";

}

document.querySelector(".close").addEventListener("click", (e) => {
    e.preventDefault();
    lightbox.style.display = "none";
});

document.querySelectorAll(".portfolio-item a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const img = link.closest(".portfolio-item").querySelector(".portfolio-thumbnail img");
        openLightbox(img.src, img.alt);
    });
});

document.querySelectorAll(".portfolio-item a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const img = link.closest(".portfolio-item").querySelector(".portfolio-thumbnail img");
        console.log(img); // Log the img variable to the console
        if (img) {
            openLightbox(img.src, img.alt);
        } else {
            console.error("Image element not found");
        }
    });
});
