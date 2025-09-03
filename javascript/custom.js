// Custom JavaScript for Research Data and Methods Workshop Series

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Research Data and Methods Workshop Series - MkDocs site loaded');

    // Add any custom JavaScript functionality here

    // Example: Add smooth scrolling to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Workshop card hover effects (if needed as enhancement)
    const workshopCards = document.querySelectorAll('.workshop-card');
    workshopCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading states for buttons (if needed)
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state for links that might take time to load
            if (this.href && !this.href.startsWith('#')) {
                this.style.opacity = '0.7';
                this.textContent += ' ...';
            }
        });
    });
});

// Add any global functions or utilities here
function toggleWorkshopDetails(workshopId) {
    const details = document.getElementById(workshopId);
    if (details) {
        details.classList.toggle('hidden');
    }
}

// Analytics or tracking code can be added here if needed
// Example: Google Analytics, Matomo, etc.

// Performance monitoring
if ('performance' in window && 'timing' in performance) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
}