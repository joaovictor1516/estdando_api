const url = "https://jsonplaceholder.typicode.com/posts",
loadingElements = document.querySelector("#loading"),
postsContainer = document.querySelector("#posts-container");

async function getAllPosts(){
    const response = await fetch(url);

    console.log(response);

    const data = await response.json();

    console.log(data);

    loadingElements.classList.add("hide")

    data.map((post) => {
        const div = document.createElement("div");
        const tittle = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        tittle.innerText = post.tittle;
        body.innerText = post.body;
        link.innerText = "ler mais";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(tittle);
        div.appendChild(body);
        div.appendChild(link);
        
        postsContainer.appendChild(div);
    })
}

getAllPosts();