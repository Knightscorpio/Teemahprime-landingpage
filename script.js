// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links (simplified and robust)
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty hashes

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;

                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
});
// Guide form submission
const guideForm = document.getElementById('guideForm');
if (guideForm) {
    guideForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you! Your free guide has been sent to your email.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    question.addEventListener('click', function () {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                otherAnswer.classList.remove('active');
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });

        const isActive = answer.classList.contains('active');
        if (isActive) {
            answer.classList.remove('active');
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.classList.add('active');
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// FAQ Search
const faqSearch = document.getElementById('faqSearch');
if (faqSearch) {
    faqSearch.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (position < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);
});

// Scroll to guide function
function scrollToGuide() {
    const guideSection = document.getElementById('guide');
    if (guideSection) {
        window.scrollTo({
            top: guideSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Booking modal functions
function openBookingModal() {
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();
}

function submitBookingForm() {
    const form = document.getElementById('bookingForm');
    const submitBtn = document.querySelector('#bookingModal .btn-primary');
    const originalText = submitBtn.innerHTML;

    // Basic validation
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const phone = document.getElementById('bookingPhone').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;

    if (!name || !email || !phone || !date || !time) {
        alert('Please fill in all required fields.');
        return;
    }

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    submitBtn.disabled = true;

    // Simulate API call to booking system
    setTimeout(() => {
        // Close booking modal
        const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        bookingModal.hide();

        // Show success modal
        setTimeout(() => {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            // Reset form
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 500);

    }, 2000);
}

// Make phone numbers clickable
document.addEventListener('DOMContentLoaded', function () {
    const phoneNumbers = document.querySelectorAll('strong');
    phoneNumbers.forEach(el => {
        if (el.textContent.includes('+234')) {
            const phone = el.textContent.trim();
            el.innerHTML = `<a href="tel:${phone}" style="color: inherit; text-decoration: none;">${phone}</a>`;
        }
    });
});