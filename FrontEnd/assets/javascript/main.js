const domElements = {
    gallery: document.querySelector(".gallery"),
    filterBoutonObj: document.querySelector("#objets"),
    boutonFiltrerApt: document.querySelector("#appartements"),
    boutonFiltrerHotel: document.querySelector("#hotelResto"),
    boutonTous: document.querySelector("#tous"),
    modalWrapper: document.querySelector(".modalWrapper"),
    editGaleryBtn: document.getElementById('editGalery'),
    editWorksBtn: document.getElementById("editWorks"),
    closeModalBtn: document.getElementById("closeBtn"),
    editMode: document.querySelectorAll(".editMode"),
    loginBtn: document.getElementById("loginBnt"),
};
let works;
async function getWorks() {
    const res = await fetch('http://localhost:5678/api/works')
    works = await res.json();
    return works;
}

const modalJs = document.createElement("script");
modalJs.src = "assets/javascript/modal.js";
document.body.prepend(modalJs);

const createDiv = () => document.createElement("div");

const createH2 = () => document.createElement("h2");

const createSpan = () => document.createElement("span");

const createButton = () => document.createElement("button");

const createLabel = () => document.createElement("label");

const createInput = () => document.createElement("input");

const createSelect = () => document.createElement("select");

const createOption = () => document.createElement("option");

const createFigure = () => document.createElement("figure");

const createFigcaption = () => document.createElement("figcaption");

const createImg = () => document.createElement("img");

const verifyToken = localStorage.getItem("Token");


function cleanGallery() {
    domElements.gallery.innerHTML = "";
}
// Create galery html elements
function createGalery(works) {
    cleanGallery();
    const gallery = domElements.gallery;
    for (let i = 0; i < works.length; i++) {
        const fig = createFigure();
        const figCaptions = createFigcaption();
        figCaptions.innerText = works[i].title;
        const workImg = createImg();
        workImg.src = works[i].imageUrl;
        workImg.crossOrigin = "anonymous";
        gallery.appendChild(fig);
        fig.appendChild(workImg);
        fig.appendChild(figCaptions);
    }
}

function filterWorks(filtredCategory) {
    const result = works.filter(category => category.category.name == filtredCategory);
    createGalery(result);
}

function showAllWorks() {
    createGalery(works);
}

//Works categories filter
const boutonFiltrerObj = domElements.filterBoutonObj;
boutonFiltrerObj.addEventListener("click", function() { filterWorks("Objets") });
const boutonFiltrerApt = domElements.boutonFiltrerApt;
boutonFiltrerApt.addEventListener("click", function() { filterWorks("Appartements") });
const boutonFiltrerHotel = domElements.boutonFiltrerHotel;
boutonFiltrerHotel.addEventListener("click", function() { filterWorks("Hotels & restaurants") });
const boutonTous = domElements.boutonTous;
boutonTous.addEventListener("click", function() {
    showAllWorks();
});


// Lancement du site
getWorks().then(works => {
    createGalery(works);
});

// Show hide edit buttons
for (let i = 0; i < domElements.editMode.length; i++) {
    if (verifyToken) {
        domElements.editMode[i].style.display = "block";
        domElements.loginBtn.style.display = "none";
    } else {
        domElements.editMode[i].style.display = "none";
        domElements.loginBtn.style.display = "block";
    }
};


// Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    window.localStorage.removeItem("Token");
    window.location.replace("./index.html");
});