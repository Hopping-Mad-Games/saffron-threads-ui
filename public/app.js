const fallbackTemplates = [
    {
        id: "template-1",
        name: "Template 1 - Heritage Editorial",
        path: "templates/template-1/index.html",
        directory: "templates/template-1/",
        thumbnail: "templates/template-1/assets/model1.png",
        description: "Warm editorial composition with layered polaroid frames and stitched accents.",
        tags: ["Editorial", "Heritage", "Layered"]
    },
    {
        id: "template-2",
        name: "Template 2 - Banner Split",
        path: "templates/template-2/index.html",
        directory: "templates/template-2/",
        thumbnail: "templates/template-2/assets/model2.png",
        description: "Three-panel campaign concept with bold color blocks and center CTA focus.",
        tags: ["Campaign", "Split Screen", "Bold"]
    },
    {
        id: "template-3",
        name: "Template 3 - Luxe Motion",
        path: "templates/template-3/index.html",
        directory: "templates/template-3/",
        thumbnail: "templates/template-3/assets/model_lavender.png",
        description: "Luxury-forward hero with logo treatment, sparkles, and high contrast styling.",
        tags: ["Luxury", "Kids", "Premium"]
    }
];

let templates = [...fallbackTemplates];

const state = {
    filtered: [...templates],
    activeId: templates[0]?.id ?? null
};

const templateList = document.getElementById("template-list");
const templateSearch = document.getElementById("template-search");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");
const prevButton = document.getElementById("prev-template");
const nextButton = document.getElementById("next-template");
const nameEl = document.getElementById("active-template-name");
const descEl = document.getElementById("active-template-description");
const tagsEl = document.getElementById("active-template-tags");
const pathEl = document.getElementById("template-path");
const frameEl = document.getElementById("template-frame");
const deviceShell = document.getElementById("device-shell");
const openTemplate = document.getElementById("open-template");
const openDirectory = document.getElementById("open-directory");
const activePosition = document.getElementById("active-position");
const frameOptions = Array.from(document.querySelectorAll(".frame-option"));

function filterTemplates(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
        return [...templates];
    }

    return templates.filter((template) => {
        const haystack = `${template.name} ${template.description} ${template.tags.join(" ")}`.toLowerCase();
        return haystack.includes(normalized);
    });
}

async function loadTemplatesFromServer() {
    try {
        const response = await fetch("/api/templates", {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        const payload = await response.json();
        if (!payload || !Array.isArray(payload.templates) || payload.templates.length === 0) {
            return;
        }

        templates = payload.templates;
        state.filtered = [...templates];
        if (!templates.some((template) => template.id === state.activeId)) {
            state.activeId = templates[0]?.id ?? null;
        }
    } catch (error) {
        console.warn("Could not load templates from /api/templates. Using fallback data.", error);
    }
}

function getTemplateById(id) {
    return templates.find((template) => template.id === id) ?? null;
}

function getActiveFromFiltered() {
    return state.filtered.find((template) => template.id === state.activeId) ?? state.filtered[0] ?? null;
}

function createTag(tagText) {
    const tag = document.createElement("span");
    tag.textContent = tagText;
    return tag;
}

function renderTemplateList() {
    templateList.innerHTML = "";
    resultsCount.textContent = `${state.filtered.length} template${state.filtered.length === 1 ? "" : "s"}`;
    emptyState.hidden = state.filtered.length !== 0;

    state.filtered.forEach((template) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "template-card";
        card.setAttribute("role", "option");
        card.setAttribute("aria-selected", String(template.id === state.activeId));
        card.dataset.templateId = template.id;

        if (template.id === state.activeId) {
            card.classList.add("is-active");
        }

        const thumb = document.createElement("span");
        thumb.className = "card-thumb";
        thumb.style.backgroundImage = `url("${template.thumbnail}")`;

        const body = document.createElement("span");
        body.className = "card-body";

        const title = document.createElement("p");
        title.className = "card-title";
        title.textContent = template.name;

        const description = document.createElement("p");
        description.className = "card-description";
        description.textContent = template.description;

        const tags = document.createElement("span");
        tags.className = "card-tags";
        template.tags.slice(0, 2).forEach((tag) => tags.append(createTag(tag)));

        body.append(title, description, tags);
        card.append(thumb, body);
        card.addEventListener("click", () => selectTemplate(template.id));
        templateList.append(card);
    });
}

function renderActiveTemplate() {
    const active = getActiveFromFiltered();
    if (!active) {
        state.activeId = null;
        nameEl.textContent = "No templates found";
        descEl.textContent = "Adjust your search to bring templates back into view.";
        tagsEl.innerHTML = "";
        pathEl.textContent = "";
        frameEl.src = "about:blank";
        openTemplate.href = "#";
        openDirectory.href = "#";
        activePosition.textContent = "Template 0 of 0";
        return;
    }

    state.activeId = active.id;
    nameEl.textContent = active.name;
    descEl.textContent = active.description;
    pathEl.textContent = `/${active.path}`;
    frameEl.src = active.path;
    openTemplate.href = active.path;
    openDirectory.href = active.directory;

    tagsEl.innerHTML = "";
    active.tags.forEach((tag) => tagsEl.append(createTag(tag)));

    const position = state.filtered.findIndex((template) => template.id === active.id) + 1;
    activePosition.textContent = `Template ${position} of ${state.filtered.length}`;
}

function render() {
    renderTemplateList();
    renderActiveTemplate();
}

function selectTemplate(templateId) {
    if (!getTemplateById(templateId)) {
        return;
    }

    state.activeId = templateId;
    render();
}

function moveActive(step) {
    if (!state.filtered.length || !state.activeId) {
        return;
    }

    const currentIndex = state.filtered.findIndex((template) => template.id === state.activeId);
    const wrappedIndex = (currentIndex + step + state.filtered.length) % state.filtered.length;
    state.activeId = state.filtered[wrappedIndex].id;
    render();
}

function applyFrame(frameName) {
    deviceShell.dataset.frame = frameName;
    frameOptions.forEach((button) => {
        const isActive = button.dataset.frame === frameName;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

templateSearch.addEventListener("input", (event) => {
    state.filtered = filterTemplates(event.target.value);
    const stillVisible = state.filtered.some((template) => template.id === state.activeId);
    if (!stillVisible) {
        state.activeId = state.filtered[0]?.id ?? null;
    }
    render();
});

prevButton.addEventListener("click", () => moveActive(-1));
nextButton.addEventListener("click", () => moveActive(1));

frameOptions.forEach((button) => {
    button.addEventListener("click", () => applyFrame(button.dataset.frame));
});

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTypingField = target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.isContentEditable);

    if (isTypingField) {
        return;
    }

    if (event.key === "ArrowLeft") {
        moveActive(-1);
    }
    if (event.key === "ArrowRight") {
        moveActive(1);
    }
});

async function init() {
    applyFrame("desktop");
    await loadTemplatesFromServer();
    render();
}

init();
