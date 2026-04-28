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

    renderHomepageSessions();
});

// Add any global functions or utilities here
function toggleWorkshopDetails(workshopId) {
    const details = document.getElementById(workshopId);
    if (details) {
        details.classList.toggle('hidden');
    }
}

function toSiteUrl(docPath) {
    if (!docPath) {
        return '#';
    }

    if (/^(https?:)?\/\//.test(docPath) || docPath.startsWith('#') || docPath.startsWith('/')) {
        return docPath;
    }

    if (docPath.endsWith('index.md')) {
        return docPath.slice(0, -'index.md'.length);
    }

    if (docPath.endsWith('.md')) {
        return docPath.slice(0, -'.md'.length) + '/';
    }

    return docPath;
}

function getCologneTodayUtc() {
    const cologneTimeZone = 'Europe/Berlin';
    const cologneTodayParts = new Intl.DateTimeFormat('en-CA', {
        timeZone: cologneTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).formatToParts(new Date());

    const todayYear = Number(cologneTodayParts.find(part => part.type === 'year')?.value);
    const todayMonth = Number(cologneTodayParts.find(part => part.type === 'month')?.value);
    const todayDay = Number(cologneTodayParts.find(part => part.type === 'day')?.value);

    return Date.UTC(todayYear, todayMonth - 1, todayDay);
}

function formatSessionDate(utcDate) {
    return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Berlin',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(utcDate));
}

function getCalendarUrlForSeries(series) {
    const calendarBySeries = {
        'Summer 2026 Workshops': 'agenda/summer-2026.ics',
        'Winter 2025-26 Workshops': 'agenda/winter-2025-26.ics'
    };

    return toSiteUrl(calendarBySeries[series] || 'workshops/index.md');
}

function renderSessionActions(primaryUrl, series) {
    const calendarUrl = getCalendarUrlForSeries(series);

    return `
        <div class="next-session-actions">
            <a class="btn-primary next-session-primary-action" href="${primaryUrl}">Open Session</a>
            <a class="btn-secondary" href="${calendarUrl}">Subscribe to Calendar</a>
            <a class="btn-secondary" href="${toSiteUrl('workshops/index.md')}">Browse Workshops</a>
            <a class="btn-secondary" href="https://matrix.to/#/#sfb1252-talks:uni.koeln.de">Join Matrix</a>
        </div>
    `;
}

function parseHomepageSessions() {
    const dataRoot = document.getElementById('session-data');

    if (!dataRoot) {
        return [];
    }

    return Array.from(dataRoot.querySelectorAll('[data-session-date]'))
        .map(node => {
            const [year, month, day] = node.dataset.sessionDate.split('-').map(Number);
            return {
                number: Number(node.dataset.sessionNumber),
                series: node.dataset.sessionSeries,
                seriesOrder: Number(node.dataset.sessionSeriesOrder || 0),
                title: node.dataset.sessionTitle,
                summary: node.dataset.sessionSummary || '',
                url: toSiteUrl(node.dataset.sessionUrl),
                cancelled: node.dataset.sessionCancelled === 'true',
                utcDate: Date.UTC(year, month - 1, day)
            };
        });
}

function renderNextSessionCard(sessions) {
    const card = document.getElementById('next-session-card');

    if (!card) {
        return;
    }

    const todayUtc = getCologneTodayUtc();
    const upcomingSessions = sessions
        .filter(session => !session.cancelled && session.utcDate >= todayUtc)
        .sort((a, b) => a.utcDate - b.utcDate);

    if (!upcomingSessions.length) {
        card.innerHTML = `
            <p class="next-session-label">Next upcoming session</p>
            <p class="next-session-title">No upcoming session is currently listed.</p>
            <p class="next-session-meta">See the draft schedule for future updates.</p>
            ${renderSessionActions(toSiteUrl('workshops/index.md'), '')}
        `;
        return;
    }

    const next = upcomingSessions[0];
    const days = Math.round((next.utcDate - todayUtc) / (1000 * 60 * 60 * 24));
    const formattedDate = formatSessionDate(next.utcDate);

    card.innerHTML = `
        <p class="next-session-label">Next upcoming session</p>
        <p class="next-session-title"><a href="${next.url}">${next.title}</a></p>
        <p class="next-session-meta">${formattedDate}</p>
        <p class="next-session-countdown">${days === 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} to go`}</p>
        ${renderSessionActions(next.url, next.series)}
    `;
}

function renderAvailableWorkshops(sessions) {
    const container = document.getElementById('available-workshops-list');

    if (!container) {
        return;
    }

    const groupedSessions = sessions.reduce((accumulator, session) => {
        if (!accumulator.has(session.series)) {
            accumulator.set(session.series, []);
        }

        accumulator.get(session.series).push(session);
        return accumulator;
    }, new Map());

    const seriesOrder = [...groupedSessions.keys()].sort((left, right) => {
        const leftOrder = groupedSessions.get(left)[0]?.seriesOrder ?? 0;
        const rightOrder = groupedSessions.get(right)[0]?.seriesOrder ?? 0;
        return rightOrder - leftOrder;
    });

    const sectionsHtml = seriesOrder.map(series => {
        const sessionItems = groupedSessions
            .get(series)
            .slice()
            .sort((left, right) => right.utcDate - left.utcDate)
            .map(session => {
                const cancelledSuffix = session.cancelled ? ', cancelled' : '';
                const cancelledSummary = session.cancelled ? ' This session was cancelled.' : '';
                const summary = `${session.summary || ''}${cancelledSummary}`.trim();

                return `
                    <li value="${session.number}">
                        <strong><a href="${session.url}">${session.title}</a></strong> (${formatSessionDate(session.utcDate)}${cancelledSuffix})${summary ? ` - ${summary}` : ''}
                    </li>
                `;
            })
            .join('');

        return `
            <section class="homepage-workshop-group">
                <h3>${series}</h3>
                <ol class="homepage-workshop-list" reversed>
                    ${sessionItems}
                </ol>
            </section>
        `;
    }).join('');

    container.innerHTML = sectionsHtml;
}

function renderHomepageSessions() {
    const sessions = parseHomepageSessions();

    if (!sessions.length) {
        return;
    }

    renderNextSessionCard(sessions);
    renderAvailableWorkshops(sessions);
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
