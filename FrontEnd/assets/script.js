let response = await fetch('http://localhost:5678/api/works');

let works;

async function getWorks() {
    let works;

    const res = await fetch('http://localhost:5678/api/works')

    works = await res.json();

    console.log(works);

    function createGalery(work) {
        const gallery = document.querySelector(".gallery");
        for (let i = 0; i < work.length; i++) {
            const fig = document.createElement("figure");
            const figCaptions = document.createElement("figcaption");
            figCaptions.innerText = work[i].title;
            const workImg = document.createElement("img");
            workImg.src = work[i].imageUrl;
            workImg.crossOrigin = "anonymous";
            gallery.appendChild(fig);
            fig.appendChild(workImg);
            fig.appendChild(figCaptions);

            //console.log(works[i].category.name = "Objets");
            //console.log(works[i]);
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
    }
    createGalery(works);

    function filterWorks(filtredCategory) {
        const Result = works.filter(category => category.category.name == filtredCategory);
        const gallery = document.querySelector(".gallery").innerHTML = "";
        createGalery(Result);
    }

    function filterTous() {
        const gallery = document.querySelector(".gallery").innerHTML = "";
        createGalery(works);
    }
}









getWorks();


function loginMe() {
    //e.preventDefault();
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        body: JSON.stringify({
            email: "sophie.bluel@test.tld",
            password: "S0phie"
        }),
    })

}

<<<<<<< HEAD
const mail = document.getElementById("email");
const password = document.getElementById("password");
const submitBnt = document.querySelector(".submitBtn");
submitBnt.addEventListener("click", logintest);


function logintest() {
    console.log(mail.value, password.value);
}

logintest();

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
=======
getCategories()
*/

const xhttp = new XMLHttpRequest();
xhttp.open("POST", "http://localhost:5678/api/users/login");
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send(JSON.stringify({
    "username": "username",
    "password": "password"
}));

console.log(xhttp);
>>>>>>> 420353eafeb2e7d6841960ec1d0c49da3b62a61e
