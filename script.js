document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const recommendForm = document.getElementById('recommend-form');
    const categorySelect = document.getElementById('category');
    const budgetSelect = document.getElementById('budget');
    const usageSelect = document.getElementById('usage');

    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');
    const clearResultsBtn = document.getElementById('clear-results');

    const bookmarksSection = document.getElementById('bookmarks-section');
    const bookmarksGrid = document.getElementById('bookmarks-grid');
    const toggleBookmarksBtn = document.getElementById('toggle-bookmarks');
    const closeBookmarksBtn = document.getElementById('close-bookmarks');
    const bookmarkCount = document.getElementById('bookmark-count');

    const modalOverlay = document.getElementById('specs-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalContent = document.getElementById('modal-content');

    const compareDrawer = document.getElementById('compare-drawer');
    const closeCompareBtn = document.getElementById('close-compare');
    const compareSlots = document.getElementById('compare-slots');
    const runCompareBtn = document.getElementById('run-compare');
    const toggleCompareBtn = document.getElementById('toggle-compare');
    const compareCount = document.getElementById('compare-count');

    // === State ===
    let bookmarks = JSON.parse(localStorage.getItem('smartGadgetBookmarks')) || [];
    let compareList = [];

    // Initialize
    updateBookmarkCount();

    // === Recommendation Engine (Frontend-only version for preview) ===
    recommendForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = categorySelect.value;
        const budget = budgetSelect.value;
        const usage = usageSelect.value;

        if (!category || !budget || !usage) return;

        // Show loading state
        const submitBtn = recommendForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Finding...";
        submitBtn.disabled = true;

        // Fetch from Python API Backend
        fetch('/api/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, budget, usage })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(recommendations => {
                renderResults(recommendations);
            })
            .catch(error => {
                console.error('Error fetching recommendations:', error);
                resultsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: var(--secondary); padding: 2rem;">
                    <i class='bx bx-error-circle' style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>Error Connecting to Server</h3>
                    <p>Make sure the Python Flask server is running on port 5000.</p>
                </div>
            `;
                resultsSection.classList.remove('hidden');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });

    clearResultsBtn.addEventListener('click', () => {
        resultsSection.classList.add('hidden');
        resultsGrid.innerHTML = '';
        recommendForm.reset();
    });

    // === Render Functions ===
    function renderResults(items) {
        resultsGrid.innerHTML = '';

        if (items.length === 0) {
            resultsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">
                    <i class='bx bx-sad' style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>No exact matches found</h3>
                    <p>Try adjusting your budget or usage criteria.</p>
                </div>
            `;
        } else {
            items.forEach(item => {
                resultsGrid.appendChild(createGadgetCard(item));
            });
        }

        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    function createGadgetCard(item, isBookmark = false) {
        const isBookmarked = bookmarks.includes(item.id);
        const isCompared = compareList.includes(item.id);

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-container">
                <span class="card-badge">${item.category}</span>
                <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
            </div>
            <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <div class="card-price">$${item.price}</div>
                <ul class="card-highlights">
                    ${item.highlights.slice(0, 2).map(h => `<li>${h}</li>`).join('')}
                </ul>
                <div class="card-actions">
                    <button class="btn-details view-specs" data-id="${item.id}">Specs</button>
                    <button class="action-icon toggle-bookmark ${isBookmarked ? 'active-bookmark' : ''}" data-id="${item.id}" title="Bookmark">
                        <i class='bx ${isBookmarked ? 'bxs-bookmark' : 'bx-bookmark'}'></i>
                    </button>
                    <button class="action-icon toggle-compare-btn ${isCompared ? 'active-compare' : ''}" data-id="${item.id}" title="Compare">
                        <i class='bx bx-git-compare'></i>
                    </button>
                </div>
            </div>
        `;

        // Event Listeners for actions
        const viewSpecsBtn = card.querySelector('.view-specs');
        const bookmarkBtn = card.querySelector('.toggle-bookmark');
        const compareBtn = card.querySelector('.toggle-compare-btn');

        viewSpecsBtn.addEventListener('click', () => openSpecsModal(item));
        bookmarkBtn.addEventListener('click', (e) => {
            toggleBookmark(item.id);
            const icon = bookmarkBtn.querySelector('i');
            if (bookmarks.includes(item.id)) {
                bookmarkBtn.classList.add('active-bookmark');
                icon.className = 'bx bxs-bookmark';
            } else {
                bookmarkBtn.classList.remove('active-bookmark');
                icon.className = 'bx bx-bookmark';
                if (isBookmark) card.remove(); // Remove from DOM immediately in bookmark view
            }
        });
        compareBtn.addEventListener('click', () => {
            toggleCompare(item.id);
            if (compareList.includes(item.id)) {
                compareBtn.classList.add('active-compare');
            } else {
                compareBtn.classList.remove('active-compare');
            }
        });

        return card;
    }

    // === Bookmarks Management ===
    function toggleBookmark(id) {
        if (bookmarks.includes(id)) {
            bookmarks = bookmarks.filter(b => b !== id);
        } else {
            bookmarks.push(id);
        }
        localStorage.setItem('smartGadgetBookmarks', JSON.stringify(bookmarks));
        updateBookmarkCount();
    }

    function updateBookmarkCount() {
        bookmarkCount.textContent = bookmarks.length;
    }

    toggleBookmarksBtn.addEventListener('click', () => {
        bookmarksSection.classList.toggle('hidden');
        if (!bookmarksSection.classList.contains('hidden')) {
            renderBookmarks();
            bookmarksSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    closeBookmarksBtn.addEventListener('click', () => {
        bookmarksSection.classList.add('hidden');
    });

    function renderBookmarks() {
        bookmarksGrid.innerHTML = '';
        if (bookmarks.length === 0) {
            bookmarksGrid.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1;">No saved gadgets yet.</p>';
            return;
        }

        const bookmarkedGadgets = gadgets.filter(g => bookmarks.includes(g.id));
        bookmarkedGadgets.forEach(g => {
            bookmarksGrid.appendChild(createGadgetCard(g, true));
        });
    }

    // === Compare Management ===
    function toggleCompare(id) {
        if (compareList.includes(id)) {
            compareList = compareList.filter(c => c !== id);
        } else {
            if (compareList.length >= 3) {
                alert("You can only compare up to 3 gadgets at once.");
                return;
            }
            compareList.push(id);
        }
        updateCompareDrawer();
    }

    function updateCompareDrawer() {
        compareCount.textContent = compareList.length;

        if (compareList.length > 0) {
            compareDrawer.classList.remove('hidden');
            renderCompareSlots();
        } else {
            compareDrawer.classList.add('hidden');
        }

        if (compareList.length >= 2) {
            runCompareBtn.classList.remove('hidden');
        } else {
            runCompareBtn.classList.add('hidden');
        }
    }

    function renderCompareSlots() {
        compareSlots.innerHTML = '';
        compareList.forEach(id => {
            const item = gadgets.find(g => g.id === id);
            const slot = document.createElement('div');
            slot.className = 'compare-item';
            slot.innerHTML = `
                <img src="${item.image}" alt="">
                <div class="compare-item-info">
                    <h4>${item.name}</h4>
                </div>
                <button class="btn-icon compare-item-remove" data-id="${id}"><i class='bx bx-x'></i></button>
            `;

            slot.querySelector('.compare-item-remove').addEventListener('click', () => {
                toggleCompare(id);
                // Also update the UI card button state
                document.querySelectorAll(`.toggle-compare-btn[data-id="${id}"]`).forEach(btn => {
                    btn.classList.remove('active-compare');
                });
            });

            compareSlots.appendChild(slot);
        });
    }

    closeCompareBtn.addEventListener('click', () => {
        compareList = [];
        updateCompareDrawer();
        document.querySelectorAll('.toggle-compare-btn').forEach(btn => btn.classList.remove('active-compare'));
    });

    toggleCompareBtn.addEventListener('click', () => {
        if (compareList.length > 0) compareDrawer.classList.remove('hidden');
    });

    runCompareBtn.addEventListener('click', () => {
        renderCompareView();
    });

    function renderCompareView() {
        const items = compareList.map(id => gadgets.find(g => g.id === id));

        let html = `
            <h2>Comparison</h2>
            <div style="overflow-x: auto;">
            <table class="compare-table">
                <thead>
                    <tr>
                        <th>Features</th>
                        ${items.map(item => `<th><img src="${item.image}" style="width:100px; border-radius:10px; margin-bottom:10px; display:block;"><h3 style="font-size:1.1rem">${item.name}</h3><div style="color:var(--accent); font-weight:bold;">$${item.price}</div></th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Processor</td>
                        ${items.map(item => `<td>${item.specs.processor}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>RAM</td>
                        ${items.map(item => `<td>${item.specs.ram}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Storage</td>
                        ${items.map(item => `<td>${item.specs.storage}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Battery</td>
                        ${items.map(item => `<td>${item.specs.battery}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Display</td>
                        ${items.map(item => `<td>${item.specs.display}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Highlights</td>
                        ${items.map(item => `<td><ul style="padding-left:1.2rem; font-size:0.9rem">${item.highlights.map(h => `<li>${h}</li>`).join('')}</ul></td>`).join('')}
                    </tr>
                </tbody>
            </table>
            </div>
        `;

        modalContent.innerHTML = html;
        modalOverlay.classList.remove('hidden');
    }

    // === Modal Management ===
    function openSpecsModal(item) {
        modalContent.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="modal-header-img">
            <div class="modal-details">
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div>
                        <span class="card-badge" style="position:relative; top:0; left:0; margin-bottom:0.5rem; display:inline-block;">${item.category}</span>
                        <h2>${item.name}</h2>
                    </div>
                    <div style="font-size:1.8rem; color:var(--accent); font-weight:700;">$${item.price}</div>
                </div>
                
                <p style="color:var(--text-muted); margin-top:1rem;">Recommended for: <strong>${item.usage.map(u => u.charAt(0).toUpperCase() + u.slice(1)).join(', ')}</strong> usage.</p>
                
                <h3 style="margin-top: 2rem;">Technical Specifications</h3>
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-label">Processor</div>
                        <div class="spec-value">${item.specs.processor}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">RAM</div>
                        <div class="spec-value">${item.specs.ram}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Storage</div>
                        <div class="spec-value">${item.specs.storage}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Battery</div>
                        <div class="spec-value">${item.specs.battery}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Display</div>
                        <div class="spec-value">${item.specs.display}</div>
                    </div>
                </div>
                
                <h3 style="margin-top: 2rem;">Key Highlights</h3>
                <ul class="card-highlights" style="margin-top:1rem;">
                    ${item.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
        `;
        modalOverlay.classList.remove('hidden');
    }

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });

    // Close modal on click outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    });

});
