/**
 * SENIOR ENGINEER PORTFOLIO - CORE INTERACTION ENGINE
 * Focused on high-performance DOM manipulation and native Browser APIs.
 */

// 1. ADVANCED LOADING HANDLER
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        loading.style.opacity = '0';
        setTimeout(() => loading.style.display = 'none', 800);
    }
    // Initialize animations after load
    initPortfolioEngine();
});

function initPortfolioEngine() {
    createParticles();
    createCodeLines();
    initScrollReveal();
    initMouseParallax();
    initSkillInteractivity();
    initTypingEffect();
}

// 2. DYNAMIC BACKGROUND PARTICLES
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    // Adjust particle count based on screen size for performance
    const count = window.innerWidth < 768 ? 25 : 60;
    
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 2;
        
        Object.assign(p.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `-${Math.random() * 20}s`
        });
        container.appendChild(p);
    }
}

// 3. SCROLL REVEAL (Intersection Observer)
function initScrollReveal() {
    const options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger child elements
                const children = entry.target.querySelectorAll('.experience-item, .project-item, .skill-tag');
                children.forEach((child, i) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, i * 100);
                });
            }
        });
    }, options);

    document.querySelectorAll('.section').forEach(section => {
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
}

// 4. MOUSE PARALLAX & TILT EFFECT
function initMouseParallax() {
    const header = document.querySelector('header');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Move background particles slightly
        const moveX = (clientX - centerX) * 0.01;
        const moveY = (clientY - centerY) * 0.01;
        document.getElementById('particles').style.transform = `translate(${moveX}px, ${moveY}px)`;

        // Header tilt effect
        if (header) {
            const rotX = (clientY - centerY) * -0.01;
            const rotY = (clientX - centerX) * 0.01;
            header.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }
    });
}

// 5. ENHANCED TYPING EFFECT FOR NAME
function initTypingEffect() {
    const h1 = document.querySelector('h1');
    if (!h1) return;
    
    const text = h1.innerText;
    h1.innerText = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            h1.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 1000);
}

// 6. INTERACTIVE SKILL TAGS (Random Color Glow)
function initSkillInteractivity() {
    const colors = ['#667eea', '#764ba2', '#10746c', '#680f72'];
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            tag.style.boxShadow = `0 0 20px ${randomColor}`;
            tag.style.transform = 'scale(1.1) translateY(-5px)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.boxShadow = 'none';
            tag.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// 7. SCROLL TO TOP WITH PROGRESS
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// 8. CODE RAIN FOR HEADER
function createCodeLines() {
    const codeBg = document.getElementById('codeBg');
    if (!codeBg) return;
    const snippets = ['const dev = "Smrati";', 'git push origin main', 'npm run build', 'SELECT * FROM skills;'];
    
    snippets.forEach((text, i) => {
        const line = document.createElement('div');
        line.className = 'code-line';
        line.textContent = text;
        line.style.top = `${i * 40 + 20}px`;
        line.style.animationDuration = `${Math.random() * 5 + 10}s`;
        codeBg.appendChild(line);
    });
}