// Animações e interatividade para o currículo
document.addEventListener('DOMContentLoaded', function() {
    
    // Função para animar elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas as seções para animação de entrada
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Efeito de digitação para o nome
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Efeito de hover nas skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animação de progresso nas barras de seção
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            const afterElement = this.querySelector('::after');
            this.style.setProperty('--after-width', '150px');
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.setProperty('--after-width', '60px');
        });
    });

    // Efeito parallax suave no header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        }
    });

    // Smooth scroll para links internos (se houver)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efeito de clique nos itens de contato
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const span = this.querySelector('span');
            if (span) {
                // Copiar para clipboard se possível
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(span.textContent).then(() => {
                        // Feedback visual
                        const originalBg = this.style.backgroundColor;
                        this.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                        this.style.transition = 'background-color 0.3s ease';
                        
                        setTimeout(() => {
                            this.style.backgroundColor = originalBg;
                        }, 1000);
                    });
                }
            }
        });
    });

    // Animação de entrada escalonada para os itens de experiência
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        observer.observe(item);
    });

    // Contador animado para a idade (se quiser adicionar um efeito especial)
    const ageElement = document.querySelector('.contact-item span');
    if (ageElement && ageElement.textContent.includes('38')) {
        let currentAge = 0;
        const targetAge = 38;
        const increment = () => {
            if (currentAge < targetAge) {
                currentAge++;
                ageElement.textContent = `${currentAge} anos`;
                setTimeout(increment, 50);
            }
        };
        
        setTimeout(increment, 2000);
    }

    // Efeito de hover nas atividades da experiência
    const activities = document.querySelectorAll('.activities-list li');
    activities.forEach(activity => {
        activity.addEventListener('mouseenter', function() {
            this.style.paddingLeft = '2rem';
        });
        
        activity.addEventListener('mouseleave', function() {
            this.style.paddingLeft = '1.5rem';
        });
    });

    // Adicionar classe para indicar que o JavaScript foi carregado
    document.body.classList.add('js-loaded');
    
    // Preloader simples (fade out após carregamento)
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Responsividade: ajustar comportamentos em dispositivos móveis
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Desabilitar alguns efeitos em dispositivos móveis para melhor performance
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(el => {
            el.style.transform = 'none';
        });
    }

    // Adicionar indicador de scroll
    const scrollIndicator = document.createElement('div');
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
});

