document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader').classList.add('fade-out');
    }, 1000);

    // Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');

    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if(this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if(nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenu.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const backToTop = document.querySelector('.back-to-top');
        
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });

    // Back to Top Button
    document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if(count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Start counters when section is in view
    const resultsSection = document.querySelector('#resultados');
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(resultsSection);
        }
    });

    if(resultsSection) {
        observer.observe(resultsSection);
    }

    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if(item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            accordionItem.classList.toggle('active');
            
            if(accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });

    // Form Submission
    const leadForm = document.getElementById('leadForm');
    if(leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            this.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Mensagem enviada com sucesso!</h3>
                    <p>Entraremos em contato em breve.</p>
                </div>
            `;
            
            // In a real scenario, you would send the form data to a server here
            // Example with fetch API:
            /*
            const formData = new FormData(this);
            
            fetch('your-server-endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                this.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Mensagem enviada com sucesso!</h3>
                        <p>Entraremos em contato em breve.</p>
                    </div>
                `;
            })
            .catch(error => {
                alert('Ocorreu um erro. Por favor, tente novamente.');
            });
            */
        });
    }

    // Scroll Animation
    const animateElements = document.querySelectorAll('[data-animate]');
    
    function checkAnimation() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            if(elementBottom >= windowTop && elementTop <= windowBottom) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('load', checkAnimation);

    // Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();
});