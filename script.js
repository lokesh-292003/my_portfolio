 document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    let currentIndex = 0;
    const totalCards = 5;
    const cards = document.querySelectorAll('.skill-card');
    const carousel = document.getElementById('skillsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const skillsSection = document.querySelector('.skills-section');
    const skillsTitle = document.querySelector('.skills-title');
    const projectsSection = document.querySelector('.projects-section');
    const projectsTitle = document.querySelector('.projects-title');
    const projectCards = document.querySelectorAll('.project-card');
    const scrollDownBtn = document.getElementById('scrollDown');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Dark mode toggle
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    darkModeToggle.addEventListener('click', function() {
        toggleDarkMode();
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Activate skills section when clicking title
    function activateSkillsSection() {
        skillsSection.classList.add('active');
    }

    // Activate projects section when clicking title
    function activateProjectsSection() {
        projectsSection.classList.add('active');
    }

    // Title click handlers
    skillsTitle.addEventListener('click', activateSkillsSection);
    projectsTitle.addEventListener('click', activateProjectsSection);

    // Update carousel
    function updateCarousel() {
        const rotationAngle = (currentIndex * 72);
        carousel.style.transform = `rotateY(${-rotationAngle}deg)`;
        
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
            card.classList.remove('flipped');
        });
    }

    // Navigation functions
    function nextCard() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    // Card flip functionality for skills
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                card.classList.toggle('flipped');
            }
        });
    });

    // Card flip functionality for projects
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === 'ArrowRight') nextCard();
    });

    // Handle scroll events
    function handleScroll() {
        // About section transition
        const aboutSection = document.querySelector('.about-section');
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        if (aboutPosition < window.innerHeight * 0.75) {
            aboutSection.classList.add('active');
        }
        
        // Skills section reset when scrolled away
        const skillsRect = skillsSection.getBoundingClientRect();
        if (skillsRect.bottom < 0 || skillsRect.top > window.innerHeight) {
            if (skillsSection.classList.contains('active')) {
                skillsSection.classList.remove('active');
                currentIndex = 0;
                updateCarousel();
            }
        }

        // Projects section activation
        const projectsRect = projectsSection.getBoundingClientRect();
        if (projectsRect.bottom < 0 || projectsRect.top > window.innerHeight) {
            if (projectsSection.classList.contains('active')) {
                projectsSection.classList.remove('active');
                // Reset all project cards to front face when scrolled away
                projectCards.forEach(card => {
                    card.classList.remove('flipped');
                });
            }
        } else if (projectsRect.top < window.innerHeight * 0.75) {
            projectsSection.classList.add('active');
        }

        // Certifications section
        const certificationsSection = document.querySelector('.certifications-section');
        const certificationsRect = certificationsSection.getBoundingClientRect();
        if (certificationsRect.top < window.innerHeight * 0.75) {
            certificationsSection.classList.add('active');
        }

        // Contact section
        const contactSection = document.querySelector('.contact-section');
        const contactRect = contactSection.getBoundingClientRect();
        if (contactRect.top < window.innerHeight * 0.75) {
            contactSection.classList.add('active');
        }
    }

    // Smooth navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll down button
    scrollDownBtn.addEventListener('click', () => {
        window.scrollTo({
            top: document.querySelector('.about-section').offsetTop,
            behavior: 'smooth'
        });
    });

    // Particles Background
    const particlesEl = document.querySelector(".particles");
    const particleCount = Math.floor(window.innerWidth / 6);

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.4 + 0.2;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particlesEl.appendChild(particle);
    }

    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would typically send the data to a server
        // For demonstration, we'll simulate a successful submission
        
        // Show success message
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        
        // Clear form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.textContent = '';
        }, 5000);
    });

    // Initialize
    updateCarousel();
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
});
