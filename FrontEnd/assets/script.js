let works;

async function getWorks() {
    const res = await fetch('http://localhost:5678/api/works')

    works = await res.json();
    console.log(works);
    return works;

}

function cleanGallery() {
    document.querySelector(".gallery").innerHTML = "";
}

function createGalery(works) {
    cleanGallery();

    const gallery = document.querySelector(".gallery");
    for (let i = 0; i < works.length; i++) {
        const fig = document.createElement("figure");

        fig.classList.add("worksFig");
        const figCaptions = document.createElement("figcaption");
        figCaptions.innerText = works[i].title;
        const workImg = document.createElement("img");
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

function filterTous() {
    createGalery(works);
}

const boutonFiltrerObj = document.querySelector("#objets");
boutonFiltrerObj.addEventListener("click", function() { filterWorks("Objets") });
const boutonFiltrerApt = document.querySelector("#appartements");
boutonFiltrerApt.addEventListener("click", function() { filterWorks("Appartements") });
const boutonFiltrerHotel = document.querySelector("#hotelResto");
boutonFiltrerHotel.addEventListener("click", function() { filterWorks("Hotels & restaurants") });
const boutonTous = document.querySelector("#tous");
boutonTous.addEventListener("click", function() {
    filterTous();
});


// Lancement du site
getWorks().then(works => {
    createGalery(works);
});



let modalWrapper = document.querySelector(".modalWrapper");
let modalScreen1 = document.createElement("div");
modalScreen1.classList.add("modalScreen1");
let modalTitle = document.createElement("h2");
modalTitle.innerText = "Galerie photo";
let workList = document.createElement("div");
workList.classList.add("workList");
modalWrapper.appendChild(modalScreen1);
modalScreen1.appendChild(modalTitle);
modalScreen1.appendChild(workList);





function createWorkList(works) {
    for (let i = 0; i < works.length; i++) {
        const workWrapper = document.createElement("div");
        workWrapper.setAttribute("data-id", works[i].id);
        const fig = document.createElement("figure");
        let deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteIcon.classList.add("deleteIcon");
        const editMe = document.createElement("button");
        editMe.innerText = "éditer";
        editMe.classList.add("editIcon");
        const workImg = document.createElement("img");
        workWrapper.classList.add("workWrapper");
        workImg.src = works[i].imageUrl;
        workImg.crossOrigin = "anonymous";
        workList.appendChild(workWrapper);
        workWrapper.appendChild(deleteIcon);
        workWrapper.appendChild(fig);
        fig.appendChild(workImg);
        workWrapper.appendChild(editMe);

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
                        //figure.remove();
                        console.log("deleted")
                    } else {
                        console.error("Il y a une erreur");
                    }
                })
                .catch(function(error) {
                    console.error("Il y a une erreur:", error);
                });
        });
    };
    const addPhotoBtn = document.createElement("button");
    addPhotoBtn.innerText = "Ajouter une photo"
    addPhotoBtn.classList.add("btn");
    const deleteGaleryBnt = document.createElement("button");
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

const editGaleryBtn = document.getElementById('editGalery');
editGaleryBtn.addEventListener("click", openModal);

function openModal() {
    document.getElementById("editWorks").style.display = "flex";
};

const closeModalBtn = document.getElementById("closeBtn");

closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
    document.getElementById("editWorks").style.display = "none";
};

const verifyToken = localStorage.getItem("Token");
const editMode = document.querySelectorAll(".editMode");
const loginBtn = document.getElementById("loginBnt");



for (let i = 0; i < editMode.length; i++) {
    if (verifyToken) {
        editMode[i].style.display = "block";
        loginBtn.style.display = "none";
    } else {
        editMode[i].style.display = "none";
        loginBtn.style.display = "block";
    }
};







function addPhotos() {
    cleanWorkList(modalScreen1);
    const modalScreen2 = document.createElement("div");
    modalScreen2.classList.add("modalScreen2");
    const addPhotoTitle = document.createElement("h2");
    addPhotoTitle.innerText = "Ajout photo";
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imgWrapper");
    const previewImg = document.createElement("img");
    previewImg.setAttribute("id", "previewSelectedImage");
    const imgIcon = document.createElement("img");
    imgIcon.setAttribute("src", "assets/icons/imgIcon.png");
    imgIcon.classList.add("imgIcon");
    const fileLabel = document.createElement("label");
    fileLabel.setAttribute("for", "addFileInput");
    fileLabel.innerText = "+ Ajouter photo";
    const imageSelect = document.createElement("input");
    imageSelect.type = "file";
    imageSelect.classList.add("addImg");
    imageSelect.setAttribute("id", "addFileInput")
    imageSelect.setAttribute("name", "image");
    imageSelect.addEventListener("input", testInput);
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
    const imgSizeType = document.createElement("span");
    imgSizeType.innerText = "jpg, png : 4mo max";
    const titleCategoryWrapper = document.createElement("div");
    titleCategoryWrapper.classList.add("titleCategoryWrapper");
    const titleInput = document.createElement("input");

    titleInput.type = "text";
    titleInput.setAttribute("id", "titleInput");
    titleInput.setAttribute("name", "title");
    titleInput.addEventListener("input", testInput);
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "titleInput");
    titleLabel.innerText = "Titre";
    titleInput.classList.add("PhotoTitle");
    const categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "selectCategory");
    categoryLabel.innerText = "Catégorie";
    const categorySelect = document.createElement("select");
    categorySelect.addEventListener("input", testInput);
    categorySelect.classList.add("categorySelector");
    categorySelect.setAttribute("id", "selectCategory");
    categorySelect.setAttribute("name", "category")
    const emptyOption = document.createElement("option");
    emptyOption.setAttribute("value", "");
    const validBtn = document.createElement("button");
    validBtn.innerText = "Valider";
    validBtn.classList.add("btn");
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








    async function getCategories() {
        const response = await fetch("http://localhost:5678/api/categories");
        const categories = await response.json();
        const categorySelector = document.getElementById("categorySelect");
        for (let i = 0; i < categories.length; i++) {
            let option = document.createElement("option");
            option.value = categories[i].id;
            option.innerHTML = categories[i].name;
            categorySelect.appendChild(option);
        }
    }
    getCategories();
    validBtn.disabled = true;
    validBtn.style.backgroundColor = "gray";

    function testInput() {
        if (imageSelect.value != "" && titleInput.value != "" && categorySelect.value != "") {
            validBtn.disabled = false;
            validBtn.style.backgroundColor = "#1D6154";
        } else {
            validBtn.disabled = true;
            validBtn.style.backgroundColor = "gray";
        }
    }

    document.addEventListener(
        "click",
        function(event) {
            // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
            if (!event.target.closest(modalScreen2)) {
                closeModal();
            }
        },
        false
    );

    function closeModal() {
        modalWrapper.style.display = "none";
    }












    /*
        validBtn.disabled = true;
        if (validBtn.disabled = true) {
            validBtn.style.backgroundColor = "gray";
        } */
    validBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const title = titleInput.value;
        const category = categorySelect.value;
        const image = imageSelect.files[0];


        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", category);





        const response = fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.Token}`
            },
            body: formData,
        });
    });
};




const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    window.localStorage.removeItem("Token");
    window.location.replace("./index.html");
});