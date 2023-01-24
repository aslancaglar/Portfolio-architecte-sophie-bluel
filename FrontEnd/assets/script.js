let works;

async function getWorks() {
    let works;

    const res = await fetch('http://localhost:5678/api/works')

    works = await res.json();



    let gallery = document.querySelector(".gallery");
    for (let i = 0; i < works.length; i++) {
        let fig = document.createElement("figure");
        let figCaptions = document.createElement("figcaption");
        figCaptions.innerText = works[i].title;
        let workImg = document.createElement("img");
        workImg.src = works[i].imageUrl;
        workImg.crossOrigin = "anonymous";
        gallery.appendChild(fig);
        fig.appendChild(workImg);
        fig.appendChild(figCaptions);
    }

    console.log(works);
}

getWorks();