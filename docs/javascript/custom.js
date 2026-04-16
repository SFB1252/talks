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

    renderNextSessionCard();
});

// Add any global functions or utilities here
function toggleWorkshopDetails(workshopId) {
    const details = document.getElementById(workshopId);
    if (details) {
        details.classList.toggle('hidden');
    }
}

function renderNextSessionCard() {
    const card = document.getElementById('next-session-card');
    const dataRoot = document.getElementById('session-data');

    if (!card || !dataRoot) {
        return;
    }

    const today = new Date();
    const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

    const sessions = Array.from(dataRoot.querySelectorAll('[data-session-date]'))
        .map(node => {
            const [year, month, day] = node.dataset.sessionDate.split('-').map(Number);
            return {
                title: node.dataset.sessionTitle,
                url: node.dataset.sessionUrl,
                cancelled: node.dataset.sessionCancelled === 'true',
                utcDate: Date.UTC(year, month - 1, day)
            };
        })
        .filter(session => !session.cancelled && session.utcDate >= todayUtc)
        .sort((a, b) => a.utcDate - b.utcDate);

    if (!sessions.length) {
        card.innerHTML = `
            <p class="next-session-label">Next upcoming session</p>
            <p class="next-session-title">No upcoming session is currently listed.</p>
            <p class="next-session-meta">See the draft schedule for future updates.</p>
        `;
        return;
    }

    const next = sessions[0];
    const days = Math.round((next.utcDate - todayUtc) / (1000 * 60 * 60 * 24));
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(next.utcDate));

    card.innerHTML = `
        <p class="next-session-label">Next upcoming session</p>
        <p class="next-session-title"><a href="${next.url}">${next.title}</a></p>
        <p class="next-session-meta">${formattedDate}</p>
        <p class="next-session-countdown">${days === 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} to go`}</p>
    `;
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
