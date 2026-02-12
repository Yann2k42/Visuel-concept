// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.querySelector('.portfolio-grid');
const modal = document.getElementById('portfolioModal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const contactForm = document.getElementById('contactForm');

// Portfolio data adaptée à vos nouvelles catégories
const portfolioItems = [
    {
        id: 1,
        title: "Tableau pour une femme",
        description: "elle voulait un résultat épuré qui reflète sa joie de vivre",
        category: "Tableau",
        image: "img12.jpg"
    },
    {
        id: 2,
        title: "Tableau pour un homme",
        description: "il voulait un résultat qui reflète son professionnalisme",
        category: "Tableau",
        image: "img14.jpg"
    },
    {
        id: 3,
        title: "Afficher publicitaire",
        description: "Affiche promotionnelle d'une entreprise d'hydocarbure",
        category: "Affiche",
        image: "img4.jpg"
    },
    {
        id: 4,
        title: "Logo",
        description: "Le logo de notre entreprise",
        category: "Logo",
        image: "img1.jpg"
    },
    {
        id: 5,
        title: "Tableau pour un homme",
        description: "il voulait un résultat qui reflète son charisme",
        category: "Tableau",
        image: "img13.jpg"
    },
    {
        id: 6,
        title: "Affiche promotionnelle",
        description: "Affiche pour le lancement d'une marque de jus.",
        category: "Affiche",
        image: "img3.jpg"
    },
    {
        id: 7,
        title: "Affiche promotionnelle",
        description: "Affiche promotionnelle d'un tournoi de football",
        category: "Affiche",
        image: "img5.jpg"
    },
    {
        id: 8,
        title: "Affiche promotionnelle",
        description: " Affiche promotionnelle d'une entreprise Télécom",
        category: "Affiche",
        image: "img6.jpg"
    },
    {
        id: 9,
        title: "Affiche de mariage",
        description: "Affiche professionnelle pour la promotion d'un événement ",
        category: "Affiche",
        image: "img7.jpg"
    },
    {
        id: 10,
        title: "Logo",
        description: "Le logo d'une entreprise Telecom",
        category: "Logo",
        image: "logo1.jpg"
    },
    {
        id: 11,
        title: "Logo",
        description: "Le logo d'une entreprise multiservice",
        category: "Logo",
        image: "logo2.jpg"
    },
    {
        id: 12,
        title: "Logo",
        description: "Le logo d'une entreprise d'hydrocarbure",
        category: "Logo",
        image: "logo3.jpg"
    },
    {
        id: 13,
        title: "Logo",
        description: "Le logo d'un club de sport",
        category: "Logo",
        image: "logo4.jpg"
    },
    {
        id: 14,
        title: "Logo",
        description: "Le logo d'une société de formation",
        category: "Logo",
        image: "logo5.jpg"
    }
];

// Get category name for display
function getCategoryName(category) {
    const categoryNames = {
        'all': 'Tous',
        'branding': 'Branding',
        'web': 'Affiche',
        'print': 'Logo',
        'social': 'Impression'
        'personnalisation': 'Personnalisation sur tous supports'
    };
    
    return categoryNames[category] || category;
}

// Initialize portfolio
function initPortfolio() {
    portfolioGrid.innerHTML = '';
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = `portfolio-item ${item.category}`;
        portfolioItem.setAttribute('data-category', item.category);
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-img">
            <div class="portfolio-overlay">
                <span class="portfolio-category">${getCategoryName(item.category)}</span>
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-description">${item.description}</p>
            </div>
        `;
        
        // Add click event to open modal
        portfolioItem.addEventListener('click', () => openModal(item));
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Filter portfolio items
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Show or hide portfolio items based on filter
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Open modal with portfolio item details
function openModal(item) {
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalCategory.textContent = `Catégorie: ${getCategoryName(item.category)}`;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Initialisation lors du chargement
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Back to top button functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


// Contact form submission pour WhatsApp
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name) {
        alert("Veuillez entrer votre nom.");
        document.getElementById('name').focus();
        return;
    }
    
    if (!message) {
        alert("Veuillez entrer votre message.");
        document.getElementById('message').focus();
        return;
    }
    
    // Construire le message pour WhatsApp
    let whatsappText = "🌟 *NOUVEAU MESSAGE - VISUEL CONCEPT* 🌟\n\n";
    whatsappText += "👤 *Nom :* " + name + "\n";
    whatsappText += "📧 *Email :* " + (email || "Non renseigné") + "\n";
    whatsappText += "📋 *Sujet :* " + (subject || "Non renseigné") + "\n\n";
    whatsappText += "💬 *Message :*\n" + message + "\n\n";
    whatsappText += "🕐 *Envoyé le :* " + new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) + "\n\n";
    whatsappText += "🌐 *Source :* Site web Visuel Concept";
    
    // Encoder le texte pour URL
    const encodedText = encodeURIComponent(whatsappText);
    
    // Votre numéro WhatsApp (format correct)
    const phoneNumber = "22656283629";
    
    // Créer le lien WhatsApp (essayer les deux formats)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Ouvrir WhatsApp dans un nouvel onglet
    const newWindow = window.open(whatsappUrl, '_blank');
    
    // Vérifier si la fenêtre a été ouverte
    if (newWindow) {
        // Message de succès
        alert(`✅ Merci ${name} !\n\nVotre message est prêt dans WhatsApp.\n\n➡️ Il ne vous reste plus qu'à cliquer sur "Envoyer" (la flèche bleue) dans WhatsApp.`);
        
        // Réinitialiser le formulaire
        contactForm.reset();
    } else {
        // Si la fenêtre est bloquée (popup bloqué)
        alert("⚠️ Oups ! Votre navigateur bloque les fenêtres popup.\n\nVeuillez autoriser les popups pour ce site, ou cliquez sur ce lien :\n\n" + whatsappUrl);
        
        // Optionnel : Afficher le lien pour copier
        const copyLink = document.createElement('div');
        copyLink.innerHTML = `
            <div style="margin-top: 15px; padding: 10px; background: #f0f0f0; border-radius: 5px;">
                <p style="margin: 0; font-size: 12px;">Lien WhatsApp :</p>
                <input type="text" value="${whatsappUrl}" readonly 
                       style="width: 100%; padding: 5px; margin-top: 5px; font-size: 12px;"
                       onclick="this.select()">
                <button onclick="navigator.clipboard.writeText('${whatsappUrl}'); alert('Lien copié !')"
                        style="margin-top: 5px; padding: 5px 10px; background: #3949ab; color: white; border: none; border-radius: 3px; cursor: pointer;">
                    Copier le lien
                </button>
            </div>
        `;
        contactForm.parentNode.appendChild(copyLink);
    }

});

