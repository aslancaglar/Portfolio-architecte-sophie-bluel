let works;

async function getWorks() {
    const res = await fetch('http://localhost:5678/api/works')

    works = await res.json();

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



function createWorkList(works) {


    const workList = document.querySelector(".workList");
    for (let i = 0; i < works.length; i++) {
        const workWrapper = document.createElement("div");
        const fig = document.createElement("figure");
        const deleteIcon = document.createElement("span");
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

    };
};
getWorks().then(works => {
    createWorkList(works);
});


const editGaleryBtn = document.getElementById('editGalery');
editGaleryBtn.addEventListener("click", openModal);

function openModal() {
    document.getElementById("editWorks").style.display = "flex";
};

const closeModalBtn = document.getElementById('closeBtn');
closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
    document.getElementById("editWorks").style.display = "none";
};

/*
let users;

async function getUsers() {
    const rest = await fetch('http://localhost:5678/api/users/login')

    users = await rest.json();

    return users;
    console.log(users);
}

getUsers();




/*const mail = document.getElementById("email");
const password = document.getElementById("password");
const submitBnt = document.querySelector(".submitBtn");
submitBnt.addEventListener("click", logintest);


function logintest() {
    console.log(mail.value, password.value);
}

logintest(); */

/*

async function loginMe() {
    const loginData = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        body: JSON.stringify({
            email: "sophie.bluel@test.tld",
            password: "S0phie"
        })
    })
}

loginMe();

*/