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
const editBar = document.querySelectorAll(".editMode");



for (let i = 0; i < editBar.length; i++) {
    if (verifyToken) {
        editBar[i].style.display = "block";
    } else {
        editBar[i].style.display = "none";
    }
};



function addPhotos() {
    cleanWorkList(modalScreen1);
    const modalScreen2 = document.createElement("div");
    modalScreen2.classList.add("modalScreen2");
    const addPhotoTitle = document.createElement("h2");
    addPhotoTitle.innerText = "Ajout photo";
    const imageSelect = document.createElement("input");
    imageSelect.type = "file";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("PhotoTitle");
    const categorySelect = document.createElement("select");
    const validBtn = document.createElement("button");
    validBtn.innerText = "Valider";
    validBtn.classList.add("btn");
    modalWrapper.appendChild(modalScreen2);
    modalScreen2.appendChild(addPhotoTitle);
    modalScreen2.appendChild(imageSelect);
    modalScreen2.appendChild(titleInput);
    modalScreen2.appendChild(categorySelect);
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

        //console.log(formData);


        const response = fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.Token}`
            },
            body: formData,
        });
    });
};