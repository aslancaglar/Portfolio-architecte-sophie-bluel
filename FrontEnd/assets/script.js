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