// Clients Slider Animation
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.clients-slider');
    if(slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('touchend', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('touchmove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if(testimonialSlider) {
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;
        let currentIndex = 0;

        testimonialSlider.addEventListener('touchstart', touchStart);
        testimonialSlider.addEventListener('touchend', touchEnd);
        testimonialSlider.addEventListener('touchmove', touchMove);

        testimonialSlider.addEventListener('mousedown', touchStart);
        testimonialSlider.addEventListener('mouseup', touchEnd);
        testimonialSlider.addEventListener('mouseleave', touchEnd);
        testimonialSlider.addEventListener('mousemove', touchMove);

        // Prevent context menu on drag
        window.oncontextmenu = function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        function touchStart(e) {
            if(e.type === 'touchstart') {
                startPos = e.touches[0].clientX;
            } else {
                startPos = e.clientX;
                e.preventDefault();
            }
            
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            testimonialSlider.classList.add('grabbing');
        }

        function touchEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            
            const movedBy = currentTranslate - prevTranslate;
            
            if(movedBy < -100 && currentIndex < testimonialSlider.children.length - 1) {
                currentIndex += 1;
            }
            
            if(movedBy > 100 && currentIndex > 0) {
                currentIndex -= 1;
            }
            
            setPositionByIndex();
            testimonialSlider.classList.remove('grabbing');
        }

        function touchMove(e) {
            if(isDragging) {
                const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        }

        function animation() {
            setSliderPosition();
            if(isDragging) requestAnimationFrame(animation);
        }

        function setSliderPosition() {
            testimonialSlider.style.transform = `translateX(${currentTranslate}px)`;
        }

        function setPositionByIndex() {
            currentTranslate = currentIndex * -testimonialSlider.children[0].offsetWidth;
            prevTranslate = currentTranslate;
            setSliderPosition();
        }
    }

    // Hero Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if(statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    startCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.hero-stats'));

        function startCounters() {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-count');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if(current >= target) {
                        stat.textContent = target;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    }
});