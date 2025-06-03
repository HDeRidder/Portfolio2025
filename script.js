document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.opacity = '1';
        }
        
        if (currentScroll > lastScroll && currentScroll > 50) {
            navbar.style.opacity = '0';
        } else {
            navbar.style.opacity = '1';
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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

    // Initialize carousel if present on the page
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        showSlides(slideIndex);
    }
});

// Carousel functionality
let slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
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