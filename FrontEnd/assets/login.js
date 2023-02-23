const form = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    submit: document.querySelector("#submitUserInfo"),
};





let button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "http://localhost:5678/api/users/login";

    fetch(login, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email.value,
                password: form.password.value,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem("Token", data.token);


            if (data.message) {
                alert("Identifiant ou mot de passe incorrect");
            } else {
                window.location = "http://127.0.0.1:5500/FrontEnd/index.html";

            }
        })


});

const verifyToken = localStorage.getItem("Token");
console.log(verifyToken);

if (verifyToken) {
    console.log("Teken is ok");
};