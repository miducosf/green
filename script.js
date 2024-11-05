// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("7gunyeTjOUckuz2Lu"); // Your public key
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show sending status
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    
    emailjs.sendForm('service_14f511s', 'template_7nw26ux', this)
        .then(function() {
            button.textContent = 'Message Sent!';
            document.getElementById('contact-form').reset();
            setTimeout(() => button.textContent = originalText, 3000);
        }, function(error) {
            button.textContent = 'Failed to send';
            console.log('FAILED...', error);
            setTimeout(() => button.textContent = originalText, 3000);
        });
});

// Active navigation highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-emerald-600');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-emerald-600');
        }
    });
});

// Resume download handler
document.querySelector('a[download]').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Check if file exists
    fetch(this.href)
        .then(response => {
            if (response.ok) {
                // File exists, proceed with download
                window.location.href = this.href;
            } else {
                // File doesn't exist
                alert('Resume file not found. Please make sure your resume is uploaded to the assets folder.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Unable to download resume. Please try again later.');
        });
}); 