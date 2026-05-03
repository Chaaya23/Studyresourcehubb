const params = new URLSearchParams(window.location.search);
const subject = params.get("subject");

const title = document.getElementById("subject-title");
const resourcesDiv = document.getElementById("resources");

const addBtn = document.getElementById("add-btn");
const titleInput = document.getElementById("res-title");
const linkInput = document.getElementById("res-link");
const searchInput = document.getElementById("search");
const darkToggle = document.getElementById("dark-toggle");

let defaultResources = [];
let savedResources = JSON.parse(localStorage.getItem(subject)) || [];

title.innerText = subject.toUpperCase() + " Resources";


// ================= TOAST =================
function showToast(msg) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.innerText = msg;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


// ================= GET ALL =================
function getAll() {
    return [...defaultResources, ...savedResources];
}


// ================= RENDER =================
function display(list) {
    resourcesDiv.innerHTML = "";

    if (list.length === 0) {
        resourcesDiv.innerHTML = `
            <div class="empty-state">
                📭 No resources found. Add your first one!
            </div>
        `;
        return;
    }

    list.forEach((item) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <a href="${item.link}" target="_blank">${item.title}</a>

            <div class="card-buttons">
                <button class="btn edit">Edit</button>
                <button class="btn delete">Delete</button>
            </div>
        `;

        // ================= EDIT =================
        card.querySelector(".edit").addEventListener("click", () => {

            const index = savedResources.findIndex(
                r => r.title === item.title && r.link === item.link
            );

            if (index === -1) return;

            const newTitle = prompt("Edit title:", item.title);
            const newLink = prompt("Edit link:", item.link);

            if (!newTitle || !newLink) {
                showToast("❌ Update cancelled");
                return;
            }

            savedResources[index] = {
                title: newTitle,
                link: newLink
            };

            localStorage.setItem(subject, JSON.stringify(savedResources));
            display(getAll());

            showToast("✏️ Resource updated");
        });


        // ================= DELETE =================
        card.querySelector(".delete").addEventListener("click", () => {

            const index = savedResources.findIndex(
                r => r.title === item.title && r.link === item.link
            );

            if (index === -1) return;

            savedResources.splice(index, 1);
            localStorage.setItem(subject, JSON.stringify(savedResources));

            display(getAll());
            showToast("🗑 Resource deleted");
        });

        resourcesDiv.appendChild(card);
    });
}


// ================= LOAD DEFAULT DATA =================
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        defaultResources = data[subject] || [];
        display(getAll());
    });


// ================= ADD RESOURCE =================
addBtn.addEventListener("click", () => {
    const titleVal = titleInput.value.trim();
    const linkVal = linkInput.value.trim();

    if (!titleVal || !linkVal) {
        showToast("⚠️ Please fill both fields");
        return;
    }

    savedResources.push({
        title: titleVal,
        link: linkVal
    });

    localStorage.setItem(subject, JSON.stringify(savedResources));

    titleInput.value = "";
    linkInput.value = "";

    display(getAll());

    showToast("✅ Resource added");
});


// ================= SEARCH =================
searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = getAll().filter(item =>
        item.title.toLowerCase().includes(value)
    );

    display(filtered);
});


// ================= DARK MODE =================
darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});