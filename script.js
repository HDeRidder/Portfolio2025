document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            if (targetElement) {
                // Calculate the position to scroll to, accounting for the fixed navbar
                const  elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-hidden');
        observer.observe(section);
    });

    // Observe all skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.classList.add('animate-hidden');
        observer.observe(card);
    });

    // Observe all stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.classList.add('animate-hidden');
        observer.observe(card);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('button');
            const originalText = button.textContent;
            
            // Simulate sending (replace with actual form submission)
            button.textContent = 'SENDING...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'MESSAGE SENT!';
                contactForm.reset();
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Add some parallax effect to the hero section
    const hero = document.querySelector('.hero');
    const heroButton = document.querySelector('.hero .cta-button');
    const aboutSection = document.getElementById('about');
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        hero.style.transform = `translateY(${scroll * 0.15}px)`;

        // Hide hero button when about section reaches the top
        if (heroButton && aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            if (aboutRect.top <= 0) {
                heroButton.classList.add('hide-on-scroll');
            } else {
                heroButton.classList.remove('hide-on-scroll');
            }
        }
    });

    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check for saved theme in localStorage or default to light mode
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        // If theme is explicitly saved as dark, apply dark mode
        body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        // Default to light mode (either no saved preference or explicitly light)
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    }

    toggleBtn.addEventListener('click', function () {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        if (isLight) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Initialize new Project Info Carousel if present
    const projectInfoCarouselContainer = document.querySelector('.project-info-carousel-container');
    if (projectInfoCarouselContainer) {
        showInfoSlides(infoSlideIndex); // Show the first slide initially
        autoInfoSlides(); // Start automatic slideshow for project info carousel
    }

    // Project Filtering Logic (Multi-select dropdown)
    const filterDropdownToggle = document.getElementById('filterDropdownToggle');
    const filterDropdownContent = document.getElementById('filterDropdownContent');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const projectCards = document.querySelectorAll('.project-grid .project-card');

    filterDropdownToggle.addEventListener('click', () => {
        filterDropdownContent.classList.toggle('show');
        filterDropdownToggle.classList.toggle('active');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.filter-dropdown-toggle') && !event.target.closest('.filter-dropdown-content')) {
            if (filterDropdownContent.classList.contains('show')) {
                filterDropdownContent.classList.remove('show');
                filterDropdownToggle.classList.remove('active');
            }
        }
    });

    // Function to apply filters
    function applyProjectFilters() {
        let selectedFilters = [];
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.value !== 'all') {
                selectedFilters.push(checkbox.value);
            }
        });

        // If 'All' is checked or no other filters are selected, show all
        if (document.querySelector('.filter-checkbox[value="all"]').checked || selectedFilters.length === 0) {
            projectCards.forEach(card => card.style.display = 'block');
            // Ensure 'All' checkbox is checked if no other filters are selected
            document.querySelector('.filter-checkbox[value="all"]').checked = true;
            return; // Exit function as all cards are shown
        }

        // Filter based on selected tags
        projectCards.forEach(card => {
            const tagsContainer = card.querySelector('.project-tags');
            let hasMatchingTag = false;

            if (tagsContainer) {
                const tags = tagsContainer.querySelectorAll('.tag');
                tags.forEach(tag => {
                    const tagName = tag.textContent.substring(1).toLowerCase();
                    if (selectedFilters.includes(tagName)) {
                        hasMatchingTag = true;
                    }
                });
            }

            if (hasMatchingTag) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners to checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.value === 'all') {
                // If 'All' is checked, uncheck all others
                if (checkbox.checked) {
                    filterCheckboxes.forEach(otherCheckbox => {
                        if (otherCheckbox.value !== 'all') {
                            otherCheckbox.checked = false;
                        }
                    });
                }
            } else {
                // If any other tag is checked, uncheck 'All'
                if (checkbox.checked) {
                    document.querySelector('.filter-checkbox[value="all"]').checked = false;
                } 
            }
            // If no checkboxes are checked, check 'All'
            const anyOtherChecked = Array.from(filterCheckboxes).some(cb => cb.checked && cb.value !== 'all');
            if (!anyOtherChecked) {
                document.querySelector('.filter-checkbox[value="all"]').checked = true;
            }
            applyProjectFilters(); // Apply filters after change
        });
    });

    // Apply filters on initial load to ensure correct state
    applyProjectFilters();
});

// Carousel functionality (This section will be for the original, now removed, project image carousel)
// Kept for reference if needed elsewhere, but not controlling the new project info carousel
let slideIndex = 1; // This is for the old carousel

function plusSlides(n) { // Old carousel navigation
  // showSlides(slideIndex += n);
}

function currentSlide(n) { // Old carousel navigation
  // showSlides(slideIndex = n);
}

function showSlides(n) { // Old carousel display logic
  let i;
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides.length > 0) { // Check if slides exist
    slides[slideIndex-1].style.display = "block";
  }
  if (dots.length > 0) { // Check if dots exist
    dots[slideIndex-1].className += " active";
  }
}

// Automatic slideshow function (Old carousel)
// function autoSlides() {
//   (Existing implementation remains but is not called for the new carousel)
// }

// New Project Info Carousel functionality
let infoSlideIndex = 1; // Index for the new project info carousel

function plusInfoSlides(n) {
  showInfoSlides(infoSlideIndex += n);
}

function currentInfoSlide(n) {
  showInfoSlides(infoSlideIndex = n);
}

function showInfoSlides(n) {
  let i;
  let slides = document.getElementsByClassName("project-info-slide");
  let dots = document.getElementsByClassName("dot-info");
  if (n > slides.length) {infoSlideIndex = 1}
  if (n < 1) {infoSlideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides.length > 0) { // Check if slides exist
    slides[infoSlideIndex-1].style.display = "block";
  }
  if (dots.length > 0) { // Check if dots exist
    dots[infoSlideIndex-1].className += " active";
  }
}

function autoInfoSlides() {
    let i;
    let slides = document.getElementsByClassName("project-info-slide");
    let dots = document.getElementsByClassName("dot-info");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    infoSlideIndex++;
    if (infoSlideIndex > slides.length) { infoSlideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides.length > 0) { // Check if slides exist
        slides[infoSlideIndex - 1].style.display = "block";
    }
    if (dots.length > 0) { // Check if dots exist
        dots[infoSlideIndex - 1].className += " active";
    }
    setTimeout(() => autoInfoSlides(), 5000); // Change image every 5 seconds
}