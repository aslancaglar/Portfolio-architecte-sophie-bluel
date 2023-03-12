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
                    if (response.status === 204) {} else {
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
    const addPhotoBtn = createButton();
    addPhotoBtn.innerText = "Ajouter une photo"
    addPhotoBtn.classList.add("btn");
    const deleteGaleryBnt = createButton()
    deleteGaleryBnt.innerText = "Supprimer la galerie"
    deleteGaleryBnt.classList.add("deleteAll");
    modalScreen1.appendChild(addPhotoBtn);
    modalScreen1.appendChild(deleteGaleryBnt);
    addPhotoBtn.addEventListener("click", function() { addPhotos() });
};


function cleanWorkList(modalscreen) {
    modalscreen.style = "display : none";
};


getWorks().then(works => {
    createWorkList(works);
});


// Modal Screen 2 Html Elements
let validBtn = createButton();
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

// Build modal screen 2
function addPhotos() {
    cleanWorkList(modalScreen1);
    modalWrapper.appendChild(modalScreen2);
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
    getCategories();
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
    console.log(image);



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