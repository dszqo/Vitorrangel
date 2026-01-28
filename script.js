// Script principal do site Vitor Rangel Terapeuta

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MENU MOBILE
    // ============================================
    
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const nav = document.querySelector('nav');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuIcon) {
                mobileMenuIcon.classList.remove('active');
            }
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });
    
    // ============================================
    // HEADER SCROLL
    // ============================================
    
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle item atual
            item.classList.toggle('active');
        });
    });
    
    // ============================================
    // CARROSSEL HORIZONTAL DE DEPOIMENTOS
    // ============================================
    
    const slider = document.querySelector('.depoimentos-slider');
    const depoimentos = document.querySelectorAll('.depoimento');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (slider && depoimentos.length > 0) {
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Função para obter slides por view
        function getSlidesPerView() {
            const width = window.innerWidth;
            if (width <= 768) return 1;
            if (width <= 1024) return 2;
            return 3;
        }
        
        // Função para rolar o carrossel
        function scrollToIndex(index) {
            const slidesPerView = getSlidesPerView();
            const totalPages = Math.ceil(depoimentos.length / slidesPerView);
            
            // Garantir que o índice está dentro dos limites
            if (index < 0) index = totalPages - 1;
            if (index >= totalPages) index = 0;
            
            currentIndex = index;
            
            // Calcular a posição de scroll
            const scrollAmount = (index * (depoimentos[0].offsetWidth + 25));
            
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            updateDots();
        }
        
        // Atualizar indicadores (dots)
        function updateDots() {
            if (!dotsContainer) return;
            
            const slidesPerView = getSlidesPerView();
            const totalPages = Math.ceil(depoimentos.length / slidesPerView);
            
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Criar dots
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            
            const slidesPerView = getSlidesPerView();
            const totalPages = Math.ceil(depoimentos.length / slidesPerView);
            
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    scrollToIndex(i);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        // Próximo slide
        function nextSlide() {
            scrollToIndex(currentIndex + 1);
        }
        
        // Slide anterior
        function prevSlide() {
            scrollToIndex(currentIndex - 1);
        }
        
        // Auto slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }
        
        // Event listeners dos botões
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }
        
        // Função global para onclick
        window.moveCarousel = function(direction) {
            if (direction > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoSlide();
        };
        
        // Pausar no hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Touch/Swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (diff > 50) {
                nextSlide();
            } else if (diff < -50) {
                prevSlide();
            }
            
            startAutoSlide();
        }, { passive: true });
        
        // Resize handler
        window.addEventListener('resize', () => {
            createDots();
        });
        
        // Inicializar
        createDots();
        updateDots();
        startAutoSlide();
    }
    
    // ============================================
    // ANIMAÇÕES DE SCROLL
    // ============================================
    
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(el => observer.observe(el));
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
