// Sample Hogwarts & Tech Hybrid Event Data
const eventsData = [
    {
        id: 1,
        title: "Ravenclaw CyberHack 2026",
        club: "IEEE Student Branch & Ravenclaw House",
        category: "Technical",
        date: "Nov 14, 2026",
        time: "10:00 AM - 10:00 PM",
        venue: "Great Hall Tech Lab, Block A",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80",
        description: "A 12-hour high-voltage hackathon challenging developers and wizards to build decentralized AI solutions and spell-casting applications. Mentorship and cash bounties included."
    },
    {
        id: 2,
        title: "Celestial Symphony: Battle of Bands",
        club: "Campus Music & Culture Guild",
        category: "Cultural",
        date: "Nov 18, 2026",
        time: "05:30 PM Onwards",
        venue: "Open Air Amphitheatre Arena",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        description: "Feel the enchanted rhythm! Watch top college rock, fusion, and indie bands face off under the magical starlight sky. Incredible sound visuals and live stage sorcery."
    },
    {
        id: 3,
        title: "PixelVerse UI/UX Spell Jam",
        club: "Design & Fine Arts Society",
        category: "Creative",
        date: "Nov 22, 2026",
        time: "02:00 PM - 06:00 PM",
        venue: "Media Design Studio, Block C",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
        description: "Push your creative sorcery. Rapid wireframing, 3D spatial prototyping, and magical interface design challenge based on a mystery prompt revealed live."
    },
    {
        id: 4,
        title: "Apex Quidditch Esports Championship",
        club: "Campus Gaming & Quidditch League",
        category: "Sports",
        date: "Nov 26, 2026",
        time: "11:00 AM Onwards",
        venue: "Indoor Esports Stadium",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
        description: "The ultimate tournament of tactical strategy and reflexes. Compete in Valorant and EA Sports FC on high-end rigs with live caster commentary."
    },
    {
        id: 5,
        title: "RoboWars: Mecha Clash",
        club: "Robotics & Automation Guild",
        category: "Technical",
        date: "Nov 30, 2026",
        time: "10:30 AM - 04:30 PM",
        venue: "Mechanical Workshop Arena",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
        description: "Build, battle, and survive! Witness custom-engineered combat robots clash in a reinforced steel arena. Test your wireless control mastery against campus rivals."
    },
    {
        id: 6,
        title: "Starlight Poetry & Open Mic",
        club: "Literary & Dramatic House",
        category: "Cultural",
        date: "Dec 03, 2026",
        time: "06:00 PM - 09:00 PM",
        venue: "Astronomy Tower Rooftop Lounge",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        description: "An intimate evening of spoken word poetry, acoustic melodies, stand-up comedy, and raw storytelling under the night sky."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main > section");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const eventsGrid = document.getElementById("eventsGrid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("searchInput");
    const eventDetailsContent = document.getElementById("eventDetailsContent");
    const backToEventsBtn = document.getElementById("backToEvents");
    const exploreBtn = document.getElementById("exploreBtn");
    
    const registrationForm = document.getElementById("registrationForm");
    const selectedEventSelect = document.getElementById("selectedEvent");
    const successOverlay = document.getElementById("successOverlay");
    const successModalText = document.getElementById("successModalText");
    const closeSuccessModal = document.getElementById("closeSuccessModal");

    // Router & View Switching
    function switchSection(targetId) {
        sections.forEach(sec => sec.classList.remove("active-section"));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add("active-section");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.toggle("active", link.getAttribute("data-target") === targetId);
        });

        if (navMenu) {
            navMenu.classList.remove("active");
        }
    }

    document.querySelectorAll("[data-target]").forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            const target = element.getAttribute("data-target");
            switchSection(target);
        });
    });

    if (exploreBtn) {
        exploreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            switchSection("events");
        });
    }

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Render Events & Search
    function renderEvents(filter = "all", searchQuery = "") {
        if (!eventsGrid) return;
        eventsGrid.innerHTML = "";
        
        const filteredEvents = eventsData.filter(ev => {
            const matchesCategory = filter === "all" || ev.category === filter;
            const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  ev.club.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredEvents.length === 0) {
            eventsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No magical quests found matching your search.</p>`;
            return;
        }

        filteredEvents.forEach(ev => {
            const card = document.createElement("div");
            card.className = "event-card";
            card.innerHTML = `
                <div class="card-img-container">
                    <img src="${ev.image}" alt="${ev.title}" loading="lazy">
                    <span class="card-category-badge">${ev.category}</span>
                </div>
                <div class="card-body">
                    <div class="card-date">🪄 ${ev.date}</div>
                    <h3 class="card-title">${ev.title}</h3>
                    <p class="card-club">${ev.club}</p>
                    <button class="card-btn" data-id="${ev.id}">View Scroll Details</button>
                </div>
            `;
            eventsGrid.appendChild(card);
        });

        document.querySelectorAll(".card-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const eventId = parseInt(btn.getAttribute("data-id"));
                showEventDetails(eventId);
            });
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const currentCategory = btn.getAttribute("data-filter");
            const currentSearch = searchInput ? searchInput.value : "";
            renderEvents(currentCategory, currentSearch);
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const currentSearch = e.target.value;
            const activeFilterBtn = document.querySelector(".filter-btn.active");
            const currentCategory = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
            renderEvents(currentCategory, currentSearch);
        });
    }

    // Dynamic Event Details
    function showEventDetails(id) {
        const event = eventsData.find(ev => ev.id === id);
        if (!event || !eventDetailsContent) return;

        eventDetailsContent.innerHTML = `
            <div class="details-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="details-info">
                <span class="card-category-badge" style="position:static; display:inline-block; margin-bottom:1rem;">${event.category}</span>
                <h2>${event.title}</h2>
                <div class="details-club-tag">Guild: ${event.club}</div>
                
                <div class="details-meta-grid">
                    <div class="meta-item">
                        <span>DATE</span>
                        <strong>✨ ${event.date}</strong>
                    </div>
                    <div class="meta-item">
                        <span>TIME</span>
                        <strong>⏰ ${event.time}</strong>
                    </div>
                    <div class="meta-item" style="grid-column: span 2;">
                        <span>LOCATION</span>
                        <strong>📍 ${event.venue}</strong>
                    </div>
                </div>

                <p class="details-desc">${event.description}</p>
                <button class="btn btn-primary btn-block" id="proceedRegister" data-title="${event.title}">🪄 Claim Spot Now</button>
            </div>
        `;

        switchSection("details");

        const proceedRegisterBtn = document.getElementById("proceedRegister");
        if (proceedRegisterBtn) {
            proceedRegisterBtn.addEventListener("click", (e) => {
                const eventTitle = e.target.getAttribute("data-title");
                switchSection("register");
                if (selectedEventSelect) {
                    selectedEventSelect.value = eventTitle;
                }
            });
        }
    }

    if (backToEventsBtn) {
        backToEventsBtn.addEventListener("click", () => {
            switchSection("events");
        });
    }

    // Populate Dropdown
    function populateEventDropdown() {
        if (!selectedEventSelect) return;
        selectedEventSelect.innerHTML = '<option value="">Choose a quest</option>';
        eventsData.forEach(ev => {
            const option = document.createElement("option");
            option.value = ev.title;
            option.textContent = `${ev.title} (${ev.category})`;
            selectedEventSelect.appendChild(option);
        });
    }

    // Form Validation
    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let isValid = true;

            const fullName = document.getElementById("fullName");
            const email = document.getElementById("email");
            const department = document.getElementById("department");
            const year = document.getElementById("year");

            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const deptError = document.getElementById("deptError");
            const yearError = document.getElementById("yearError");
            const eventError = document.getElementById("eventError");

            [fullName, email, department, year, selectedEventSelect].forEach(el => {
                if (el) el.classList.remove("error");
            });
            [nameError, emailError, deptError, yearError, eventError].forEach(el => {
                if (el) el.textContent = "";
            });

            if (!fullName.value.trim()) {
                fullName.classList.add("error");
                if (nameError) nameError.textContent = "Wizard name is required.";
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                email.classList.add("error");
                if (emailError) emailError.textContent = "Owl email is required.";
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                email.classList.add("error");
                if (emailError) emailError.textContent = "Please enter a valid owl email address.";
                isValid = false;
            }

            if (!department.value) {
                department.classList.add("error");
                if (deptError) deptError.textContent = "Please select your House / Department.";
                isValid = false;
            }

            if (!year.value) {
                year.classList.add("error");
                if (yearError) yearError.textContent = "Please select your year of study.";
                isValid = false;
            }

            if (!selectedEventSelect.value) {
                selectedEventSelect.classList.add("error");
                if (eventError) eventError.textContent = "Please choose a quest.";
                isValid = false;
            }

            if (isValid && successOverlay) {
                if (successModalText) {
                    successModalText.innerHTML = `Owl dispatched! You are locked in for <strong>${selectedEventSelect.value}</strong>!`;
                }
                successOverlay.classList.add("active");
            }
        });
    }

    if (closeSuccessModal) {
        closeSuccessModal.addEventListener("click", () => {
            if (successOverlay) successOverlay.classList.remove("active");
            if (registrationForm) registrationForm.reset();
            switchSection("events");
        });
    }

    renderEvents();
    populateEventDropdown();
});