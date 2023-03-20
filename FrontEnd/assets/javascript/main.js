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

console.log("test");

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

//Modal Screen 1
const modalWrapper = domElements.modalWrapper;
const modalScreen1 = createDiv();
modalScreen1.classList.add("modalScreen1");
const modalTitle = createH2();
modalTitle.innerText = "Galerie photo";
const workList = createDiv();
workList.classList.add("workList");
modalWrapper.appendChild(modalScreen1);
modalScreen1.appendChild(modalTitle);
modalScreen1.appendChild(workList);

function cleanWorklist() {
    workList.innerHTML = "";
}

function cleanModal1() {
    modalScreen1.style.display = "none";
}

function showModal1() {
    modalScreen1.style.display = "flex";
}

function showModal2() {
    modalScreen2.style.display = "flex";
}

function cleanModal2() {
    modalScreen2.style.display = "none";
}

function cleanModal2Html() {
    modalScreen2.innerHTML = "";
}


function createWorkList(works) {
    for (let i = 0; i < works.length; i++) {
        const workWrapper = createDiv();
        workWrapper.setAttribute("data-id", works[i].id);
        const fig = createFigure();
        const deleteIcon = createSpan();
        /* Delete Work */
        deleteIcon.addEventListener("click", function() {
            let id = workWrapper.getAttribute("data-id");
            fetch("http://localhost:5678/api/works/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.Token}`
                    },

                })
                .then(function(response) {
                    if (response.status === 204) {
                        cleanWorklist();
                        cleanGallery();
                        getWorks().then(works => {
                            createWorkList(works);
                            createGalery(works);
                        });
                    } else {
                        console.error("Il y a une erreur");
                    }
                })
                .catch(function(error) {
                    console.error("Il y a une erreur:", error);
                });
        });
        deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteIcon.classList.add("deleteIcon");
        const editMe = createButton();
        editMe.innerText = "éditer";
        editMe.classList.add("editIcon");
        const workImg = createImg();
        workWrapper.classList.add("workWrapper");
        workImg.src = works[i].imageUrl;
        workImg.crossOrigin = "anonymous";
        workList.appendChild(workWrapper);
        workWrapper.appendChild(deleteIcon);
        workWrapper.appendChild(fig);
        fig.appendChild(workImg);
        workWrapper.appendChild(editMe);
    };
};
const addPhotoBtn = createButton();
addPhotoBtn.innerText = "Ajouter une photo"
addPhotoBtn.classList.add("btn");
const deleteGaleryBnt = createButton()
deleteGaleryBnt.innerText = "Supprimer la galerie"
deleteGaleryBnt.classList.add("deleteAll");
modalScreen1.appendChild(addPhotoBtn);
modalScreen1.appendChild(deleteGaleryBnt);
addPhotoBtn.addEventListener("click", function() { addPhotos() });



getWorks().then(works => {
    createWorkList(works);
});


// Modal Screen 2 Html Elements
let validBtn = createButton();
const backButton = createSpan();
backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
const categorySelect = createSelect();
const imageSelect = createInput();
const previewImg = createImg();
const fileLabel = createLabel();
const imgSizeType = createSpan();
const imgIcon = createImg();
const modalScreen2 = createDiv();
modalScreen2.classList.add("modalScreen2");
const addPhotoTitle = createH2();
addPhotoTitle.innerText = "Ajout photo";
const imgWrapper = createDiv();
imgWrapper.classList.add("imgWrapper");
previewImg.setAttribute("id", "previewSelectedImage");
imgIcon.setAttribute("src", "assets/icons/imgIcon.png");
imgIcon.classList.add("imgIcon");
fileLabel.setAttribute("for", "addFileInput");
fileLabel.innerText = "+ Ajouter photo";
imageSelect.type = "file";
imageSelect.classList.add("addImg");
imageSelect.setAttribute("id", "addFileInput")
imageSelect.setAttribute("name", "image");
imageSelect.addEventListener("input", testInput);
imgSizeType.innerText = "jpg, png : 4mo max";
const titleCategoryWrapper = createDiv();
titleCategoryWrapper.classList.add("titleCategoryWrapper");
const titleInput = createInput();
titleInput.type = "text";
titleInput.setAttribute("id", "titleInput");
titleInput.setAttribute("name", "title");
titleInput.addEventListener("input", testInput);
const titleLabel = createLabel();
titleLabel.setAttribute("for", "titleInput");
titleLabel.innerText = "Titre";
titleInput.classList.add("PhotoTitle");
const categoryLabel = createLabel();
categoryLabel.setAttribute("for", "selectCategory");
categoryLabel.innerText = "Catégorie";
categorySelect.addEventListener("input", testInput);
categorySelect.classList.add("categorySelector");
categorySelect.setAttribute("id", "selectCategory");
categorySelect.setAttribute("name", "category")
const emptyOption = createOption();
emptyOption.setAttribute("value", "");
validBtn.innerText = "Valider";
validBtn.classList.add("btn");

backButton.addEventListener("click", function() {
    cleanModal2();
    cleanWorklist()
    getWorks().then(works => {
        createWorkList(works);
    });
    showModal1();
});

// Get works categories
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    for (let i = 0; i < categories.length; i++) {
        let option = document.createElement("option");
        option.value = categories[i].id;
        option.innerHTML = categories[i].name;
        categorySelect.appendChild(option);
    }
};

function clearCategory() {
    categorySelect.innerHTML = "";
}

function clearImageSelect() {
    previewImg.innerHTML = "";
}

// Build modal screen 2
function addPhotos() {
    cleanModal1();
    cleanModal2Html();
    showModal2();
    clearCategory();
    getCategories();
    clearImageSelect();
    modalWrapper.appendChild(modalScreen2);
    modalScreen2.appendChild(backButton);
    modalScreen2.appendChild(addPhotoTitle);
    modalScreen2.appendChild(imgWrapper);
    modalScreen2.appendChild(titleCategoryWrapper);
    imgWrapper.appendChild(previewImg);
    imgWrapper.appendChild(imgIcon);
    imgWrapper.appendChild(imageSelect);
    imgWrapper.appendChild(fileLabel);
    imgWrapper.appendChild(imgSizeType);
    titleCategoryWrapper.appendChild(titleLabel);
    titleCategoryWrapper.appendChild(titleInput);
    titleCategoryWrapper.appendChild(categoryLabel);
    titleCategoryWrapper.appendChild(categorySelect);
    categorySelect.appendChild(emptyOption);
    modalScreen2.appendChild(validBtn);
};

// Show uploaded image
imageSelect.addEventListener("change", (event) => {
    /**
     * Get the selected files.
     */
    previewImg.style = "display : block";
    imgSizeType.style = "display : none";
    fileLabel.style = "display : none";
    imgIcon.style = "display : none";
    const imageFiles = event.target.files;
    /**
     * Count the number of files selected.
     */
    const imageFilesLength = imageFiles.length;
    /**
     * If at least one image is selected, then proceed to display the preview.
     */
    if (imageFiles[0].type !== "image/jpeg" && imageFiles[0].type !== "image/png") {
        alert("jpg ou png obligatoire");
        previewImg.style = "display : none";
        imgSizeType.style = "display : block";
        fileLabel.style = "display : block";
        imgIcon.style = "display : block";
    }

    if (imageFilesLength > 0) {
        /**
         * Get the image path.
         */

        imageSrc = URL.createObjectURL(imageFiles[0]);
        /**
         * Select the image preview element.
         */
        previewImg.setAttribute("src", imageSrc);
        /**
         * Show the element by changing the display value to "block".
         */

        if (imageSrc !== "") {

            imageSrcCheck = true;

        } else {
            imageSrcCheck = false;
        }
    };
});

// Check inputs
//validBtn.disabled = true;
validBtn.style.backgroundColor = "gray";

function testInput() {
    if (imageSelect.value != "" && titleInput.value != "" && categorySelect.value != "") {
        validBtn.disabled = false;
        validBtn.style.backgroundColor = "#1D6154";
    } else {
        //validBtn.disabled = true;
        validBtn.style.backgroundColor = "gray";
    }
}


// Upload a new work
validBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const title = titleInput.value;
    const category = categorySelect.value;
    const image = imageSelect.files[0];

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    if (image == undefined && title == false && category == false) {
        alert("Veuillez remplir tous les champs requis")
    } else if (category == false) {
        alert("Choisissez une catégorie")
    } else if (image == undefined) {
        alert("Choisissez une image")
    } else if (title == false) {
        alert("Tapez un titre s'il vous plait")
    } else {
        const response = fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.Token}`
                },
                body: formData,
            })
            .then(function(response) {
                if (response.status === 201) {
                    closeModal();
                    getWorks().then(works => {
                        createGalery(works);
                    });
                    previewImg.style = "display : none";
                    imgSizeType.style = "display : block";
                    fileLabel.style = "display : block";
                    imgIcon.style = "display : block";

                } else {
                    console.error("Il y a une erreur");
                }
            })
            .catch(function(error) {
                console.error("Il y a une erreur:", error);
            });
    }
});

// Open Close Modal
domElements.editGaleryBtn.addEventListener("click", openModal);

function openModal() {
    domElements.editWorksBtn.style.display = "flex";
};
domElements.closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
    domElements.editWorksBtn.style.display = "none";
};