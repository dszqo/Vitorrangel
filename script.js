// Script para funcionalidades interativas do site

document.addEventListener('DOMContentLoaded', function() {
    // Variáveis
    const header = document.querySelector('header');
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const nav = document.querySelector('nav');
    const faqItems = document.querySelectorAll('.faq-item');
    const depoimentoSlider = document.querySelector('.depoimentos-slider');
    const depoimentos = document.querySelectorAll('.depoimento');
    const navPrev = document.querySelector('.nav-prev');
    const navNext = document.querySelector('.nav-next');
    const dotsContainer = document.querySelector('.nav-dots');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    let currentSlide = 0;
    let isScrolling = false;
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate elements on scroll
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(checkAnimateElements, 100);
        }
    });
    
    // Mobile menu toggle
    mobileMenuIcon.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        const spans = this.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // FAQ accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Testimonial slider - Gerar dots dinamicamente
    // Limpar dots existentes
    dotsContainer.innerHTML = '';
    
    // Criar dots baseados no número de depoimentos
    depoimentos.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
    
    // Atualizar referência aos dots após criá-los dinamicamente
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        if (index < 0) {
            currentSlide = depoimentos.length - 1;
        } else if (index >= depoimentos.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Ocultar todos os depoimentos primeiro
        depoimentos.forEach((depo, i) => {
            depo.style.opacity = "0";
            depo.style.visibility = "hidden";
        });
        
        // Mostrar apenas o depoimento atual
        depoimentos[currentSlide].style.opacity = "1";
        depoimentos[currentSlide].style.visibility = "visible";
        
        depoimentoSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        console.log("Mostrando slide:", currentSlide);
    }
    
    navPrev.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    navNext.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
        });
    });
    
    // Auto slide
    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    depoimentoSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    depoimentoSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });
    
    // Custom cursor
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
            
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseout', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        
        // Cursor hover effect on links and buttons
        const hoverElements = document.querySelectorAll('a, button, .faq-question');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    } else {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
    
    // Animate elements on scroll
    function checkAnimateElements() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            }
        });
        
        isScrolling = false;
    }
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('.section-header, .sobre-content, .abordagem-cards, .especialidades, .processo-steps, .processo-cta, .faq-grid, .contato-content').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Check for animations on load
    checkAnimateElements();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const spans = mobileMenuIcon.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                successMessage.style.color = 'var(--success-color)';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                successMessage.style.borderRadius = 'var(--border-radius)';
                successMessage.style.textAlign = 'center';
                
                contactForm.appendChild(successMessage);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
});
