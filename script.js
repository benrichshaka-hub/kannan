document.addEventListener('DOMContentLoaded', () => {
    // Mobile Nav Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Carousel Interactivity
    initTestimonials();

    // FAQ Accordion Interactivity
    initFAQ();

    // IntersectionObserver for Fade-in Animations
    initFadeAnimations();

    // Interactive Swipe Deck Visual Simulator
    initSwipeDeck();

    // Profile Filter Tabs
    initProfileFilters();

    // Match Calculator / Spark Quiz Interactivity
    initSparkQuiz();

    // Auth Sessions & Forms
    initAuthSession();
    initSignupForm();
    initLoginForm();
});

/* ==========================================================================
   Swipe Deck Visual Simulator
   ========================================================================== */
const swipeProfiles = [
    { name: "Alexa, 28", tag: "Looking for Fun", location: "2 miles away", match: "98% Spark Match", img: "assets/a1.png", tags: ["Spontaneous", "Late Night Drinks", "No Drama"] },
    { name: "Jake, 31", tag: "Adventure Seeker", location: "3 miles away", match: "95% Spark Match", img: "assets/boy1.png", tags: ["Outdoors", "Cocktails", "Weekend Getaway"] },
    { name: "Sofia, 26", tag: "No Strings Attached", location: "1 mile away", match: "99% Spark Match", img: "assets/jkjk.png", tags: ["VIP Lounge", "Discreet", "Direct Vibe"] },
    { name: "Maya, 29", tag: "Spontaneous", location: "2 miles away", match: "97% Spark Match", img: "assets/a3.png", tags: ["Music Festivals", "Nightlife", "Fun Energy"] },
    { name: "Marcus, 34", tag: "Night Life", location: "4 miles away", match: "94% Spark Match", img: "assets/boy2.png", tags: ["Late Dates", "Craft Beer", "Good Times"] },
    { name: "Isabella, 30", tag: "Spice Things Up", location: "3 miles away", match: "96% Spark Match", img: "assets/a4.png", tags: ["Sensual", "Fine Dining", "Bold"] },
    { name: "Chloe, 27", tag: "Tonight Only", location: "2 miles away", match: "98% Spark Match", img: "assets/a2.png", tags: ["Party", "Casual", "Local"] }
];

let currentCardIndex = 0;

function initSwipeDeck() {
    const cardPassBtn = document.getElementById('card-pass-btn');
    const cardSuperBtn = document.getElementById('card-super-btn');
    const cardLikeBtn = document.getElementById('card-like-btn');

    if (cardPassBtn && cardSuperBtn && cardLikeBtn) {
        cardPassBtn.addEventListener('click', () => swipeCardAction('pass'));
        cardSuperBtn.addEventListener('click', () => swipeCardAction('super'));
        cardLikeBtn.addEventListener('click', () => swipeCardAction('like'));
    }
}

function swipeCardAction(action) {
    const activeCard = document.querySelector('.swipe-card.active-card');
    if (!activeCard) return;

    if (action === 'pass') {
        activeCard.style.transform = 'translateX(-120%) rotate(-20deg)';
        activeCard.style.opacity = '0';
    } else if (action === 'like' || action === 'super') {
        activeCard.style.transform = 'translateX(120%) rotate(20deg)';
        activeCard.style.opacity = '0';
        
        // Show Instant Match Modal Popup!
        const profile = swipeProfiles[currentCardIndex % swipeProfiles.length];
        showMatchModal(profile);
    }

    setTimeout(() => {
        currentCardIndex++;
        const total = swipeProfiles.length;
        const currentProfile = swipeProfiles[currentCardIndex % total];
        const nextBg2Profile = swipeProfiles[(currentCardIndex + 1) % total];
        const nextBg1Profile = swipeProfiles[(currentCardIndex + 2) % total];
        
        // Update Active Card content
        activeCard.querySelector('.card-name').innerText = currentProfile.name;
        activeCard.querySelector('.swipe-card-info p').innerText = `${currentProfile.tag} • ${currentProfile.location}`;
        activeCard.querySelector('.spark-match-badge').innerText = currentProfile.match;
        activeCard.querySelector('img').src = currentProfile.img;
        
        // Update tags dynamically
        const tagsContainer = activeCard.querySelector('.card-tags');
        if (tagsContainer && currentProfile.tags) {
            tagsContainer.innerHTML = currentProfile.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
        }
        
        // Update Background Stack Card images so the stack underneath always reflects the upcoming cards!
        const bgCard2 = document.getElementById('hero-card-bg-2') || document.querySelector('.swipe-card.card-bg-2');
        const bgCard1 = document.getElementById('hero-card-bg-1') || document.querySelector('.swipe-card.card-bg-1');
        
        if (bgCard2 && bgCard2.querySelector('img')) {
            bgCard2.querySelector('img').src = nextBg2Profile.img;
        }
        if (bgCard1 && bgCard1.querySelector('img')) {
            bgCard1.querySelector('img').src = nextBg1Profile.img;
        }
        
        // Reset card position smoothly
        activeCard.style.transition = 'none';
        activeCard.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        activeCard.style.opacity = '1';
        
        setTimeout(() => {
            activeCard.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        }, 50);
    }, 400);
}

/* ==========================================================================
   Match Modal Popup
   ========================================================================== */
function showMatchModal(profile) {
    let modal = document.getElementById('match-modal');
    const user = getCurrentUser();

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'match-modal';
        modal.className = 'match-modal-overlay';
        modal.innerHTML = `
            <div class="match-modal-card">
                <div style="margin-bottom: 0.5rem;"><span class="tag-pill" style="background: rgba(255,255,255,0.12); color: var(--color-spark-gold); font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">🎮 INTERACTIVE DEMO SIMULATOR</span></div>
                <h2 class="gradient-text" style="font-size: 2rem; font-weight: 900;">SPARK MATCH PREVIEW! 🔥</h2>
                <p style="color: var(--color-text-muted); margin-top: 0.5rem;">Interactive Demo: You and <strong id="match-modal-name" style="color: #fff;">${profile.name}</strong> liked each other.</p>
                <div class="match-avatars">
                    <img src="assets/logo.png" class="match-avatar-img" alt="You">
                    <span class="match-icon-flame">🔥</span>
                    <img id="match-modal-img" src="${profile.img}" class="match-avatar-img" alt="Match">
                </div>
                <div style="display: flex; gap: 1rem; flex-direction: column; margin-top: 1.5rem;">
                    <a href="${user ? 'index.html#discover' : 'contact.html'}" class="btn btn-ember btn-large" style="width: 100%;">
                        ${user ? 'Browse Your Deck 💬' : 'Join Free To Connect 💬'}
                    </a>
                    <button id="close-match-modal" class="btn btn-outline" style="width: 100%;">Keep Swiping</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#close-match-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });
    } else {
        modal.querySelector('#match-modal-name').innerText = profile.name;
        modal.querySelector('#match-modal-img').src = profile.img;
    }

    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
}

/* ==========================================================================
   Profile Category Filters
   ========================================================================== */
function initProfileFilters() {
    const filterBtns = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.discover-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Attach click to Spark buttons on cards to launch match modal
    document.querySelectorAll('.spark-btn').forEach((sparkBtn) => {
        sparkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = sparkBtn.closest('.discover-card');
            const name = card.querySelector('.discover-title').innerText.trim();
            const img = card.querySelector('img').src;
            showMatchModal({ name, img });
        });
    });
}

/* ==========================================================================
   Interactive Spark Calculator / Quiz
   ========================================================================== */
let quizStep = 1;

function initSparkQuiz() {
    const quizCard = document.getElementById('spark-quiz-card');
    if (!quizCard) return;

    updateQuizStepDisplay();

    quizCard.querySelectorAll('.option-card').forEach(option => {
        option.addEventListener('click', () => {
            const step = option.closest('.quiz-step');
            step.querySelectorAll('.option-card').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    const quizNextBtn = document.getElementById('quiz-next-btn');
    if (quizNextBtn) {
        quizNextBtn.addEventListener('click', () => {
            if (quizStep < 3) {
                quizStep++;
                updateQuizStepDisplay();
            } else {
                showQuizResults();
            }
        });
    }
}

function updateQuizStepDisplay() {
    document.querySelectorAll('.quiz-step').forEach(stepEl => {
        stepEl.style.display = 'none';
    });

    const activeStepEl = document.getElementById(`quiz-step-${quizStep}`);
    if (activeStepEl) activeStepEl.style.display = 'block';

    const dots = document.querySelectorAll('.step-dot');
    dots.forEach((dot, idx) => {
        if (idx + 1 === quizStep) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
        nextBtn.innerText = quizStep === 3 ? "Calculate Spark Match 🔥" : "Next Step →";
    }
}

function showQuizResults() {
    const quizCard = document.getElementById('spark-quiz-card');
    if (!quizCard) return;
    const user = getCurrentUser();

    quizCard.innerHTML = `
        <div class="text-center" style="padding: 1rem 0;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔥 ⚡ 🔥</div>
            <h3 class="gradient-text" style="font-size: 2rem; font-weight: 900; margin-bottom: 0.5rem;">Spark Matches Calculated!</h3>
            <p style="color: var(--color-text-muted); max-width: 500px; margin: 0 auto 2rem;">We found local singles matching your desired vibe and connection type.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="${user ? 'index.html#discover' : 'contact.html'}" class="btn btn-ember btn-large">
                    ${user ? 'Browse Your Matches 🔥' : 'Create Free Account To Connect'}
                </a>
                <button onclick="location.reload()" class="btn btn-outline btn-large">Retake Quiz</button>
            </div>
        </div>
    `;
}

/* ==========================================================================
   Testimonial Carousel
   ========================================================================== */
function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-card');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const btnPrev = document.getElementById('car-prev');
    const btnNext = document.getElementById('car-next');

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', nextSlide);
        btnPrev.addEventListener('click', prevSlide);
    }

    setInterval(nextSlide, 6000);
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(i => {
                i.classList.remove('active');
                const ans = i.querySelector('.faq-answer');
                if (ans) ans.style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

/* ==========================================================================
   Fade Animation
   ========================================================================== */
function initFadeAnimations() {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

/* ==========================================================================
   Real User Auth Session Handling & 18+ Age Validation
   ========================================================================== */
function getUsers() {
    const users = localStorage.getItem('smolderswipe_users');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('smolderswipe_users', JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem('smolderswipe_current_user');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('smolderswipe_current_user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('smolderswipe_current_user');
    alert('You have logged out.');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 300);
}

function initAuthSession() {
    const user = getCurrentUser();
    const navLinks = document.getElementById('nav-links');
    
    if (user && navLinks) {
        // Remove static Login and Join Free buttons
        const loginLink = navLinks.querySelector('a[href="login.html"]');
        const joinLink = navLinks.querySelector('a[href="contact.html"]');
        
        if (loginLink && loginLink.parentElement) loginLink.parentElement.remove();
        if (joinLink && joinLink.parentElement) joinLink.parentElement.remove();

        const userMenu = document.createElement('li');
        userMenu.style.display = 'flex';
        userMenu.style.alignItems = 'center';
        userMenu.style.gap = '10px';
        userMenu.innerHTML = `
            <span style="color: #FFFFFF; font-weight: 800; font-size: 0.95rem; text-shadow: 0 0 10px #FFFFFF;">
                Hi, ${escapeHTML(user.fname)} 🔥
            </span>
            <span style="background: rgba(255,61,0,0.2); border: 1px solid #FFF; color: var(--color-spark-gold); font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">
                18+ Verified
            </span>
            <button id="logoutBtn" class="btn btn-sm btn-outline" style="cursor: pointer;">Logout</button>
        `;
        navLinks.appendChild(userMenu);

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', logout);
    }
}

function initSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Verifying & Registering...';

        const fname = document.getElementById('fname')?.value.trim();
        const lname = document.getElementById('lname')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value;
        const dob = document.getElementById('dob')?.value;
        const intent = document.getElementById('intent')?.value;
        const ageCheck = document.getElementById('ageCheck')?.checked;

        if (!fname || !lname || !email || !password || !dob || !intent) {
            alert('Please fill out all required fields.');
            btn.innerText = originalText;
            return;
        }

        if (!ageCheck) {
            alert('Please confirm that you are at least 18 years old.');
            btn.innerText = originalText;
            return;
        }

        // Calculate Age from Birthdate
        const birthDate = new Date(dob);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }

        if (isNaN(calculatedAge) || calculatedAge < 18) {
            alert('Access Denied: You must be at least 18 years old to join SmolderSwipe.');
            btn.innerText = originalText;
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            btn.innerText = originalText;
            return;
        }

        const users = getUsers();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            alert('An account with this email address already exists.');
            btn.innerText = originalText;
            return;
        }

        const newUser = {
            fname,
            lname,
            email,
            age: calculatedAge,
            dob,
            password: await hashPassword(password),
            intent: intent || 'casual',
            createdAt: new Date().toISOString()
        };

        setTimeout(() => {
            saveUser(newUser);
            setCurrentUser(newUser);
            
            btn.innerText = 'Account Created! Redirecting...';
            btn.style.background = 'var(--gradient-flame)';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 600);
        }, 500);
    });
}

function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Authenticating...';

        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value;

        if (!email || !password) {
            alert('Please enter both email and password.');
            btn.innerText = originalText;
            return;
        }

        const hashedPassword = await hashPassword(password);
        setTimeout(() => {
            const users = getUsers();
            const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === hashedPassword);

            if (foundUser) {
                setCurrentUser(foundUser);
                btn.innerText = 'Success!';
                btn.style.background = 'var(--gradient-flame)';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 600);
            } else {
                alert('Invalid email or password. Please check your credentials or create a new account.');
                btn.innerText = originalText;
            }
        }, 500);
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

async function hashPassword(password) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
