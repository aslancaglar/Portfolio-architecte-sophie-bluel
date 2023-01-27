let works;

async function getWorks() {
    let works;

    const res = await fetch('http://localhost:5678/api/works')

    works = await res.json();



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
        const boutonFiltrerObj = document.querySelector("#objets");
        boutonFiltrerObj.addEventListener("click", filterObj);
        //console.log(works[i].category.name = "Objets");
        //console.log(works[i]);



    }

    function filterObj() {
        const result = works.filter(category => category.category.name == "Objets");
        console.log(result);
    }
}









getWorks();
/*
async function getCategories() {
    let categories;

    const res = await fetch('http://localhost:5678/api/categories')

    categories = await res.json();

    let categoriesList = document.querySelector(".projectCategories");
    for (let i = 0; i < categories.length; i++) {
        let categoriesItem = document.createElement("li");
        categoriesItem.innerText = categories[i].name;
        categoriesList.appendChild(categoriesItem);
    }

    console.log(categories);
}

getCategories()
*/