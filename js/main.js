const url = "https://jsonplaceholder.typicode.com/posts",
loadingElements = document.querySelector("#loading"),
postsContainer = document.querySelector("#posts-container"),
postPage = document.querySelector("#post"),
postContainer = document.querySelector("#post-container"),
commentsContainer = document.querySelector("#comments-constainer");

const urlSearchParametars = new URLSearchParams(window.location.search);
const postId = urlSearchParametars.get("id");

async function getAllPosts(){
    const response = await fetch(url);

    console.log(response);

    const data = await response.json();

    loadingElements.classList.add("hide");

    data.map((post) => {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "ler";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);
        
        postsContainer.appendChild(div);
    })
}

async function getPost(id){
    const [responsePosts, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ]);

    const dataPost = await responsePosts.json();
    const dataComments = await responseComments.json();

    loadingElements.classList.add("hide");
    postPage.classList.remove("hide");

    const title = document.createElement("h1");
    const body = document.createElement("p");
    const div = document.createElement("div");

    //arrumar o css destas classes!!
    title.classList.add("titlePost"); 
    body.classList.add("bodyPost");
    div.classList.add("divPost");

    title.innerText = "Título do post: " + dataPost.title;
    body.innerText = "Post: " + dataPost.body;

    div.appendChild(title);
    div.appendChild(body);

    postContainer.appendChild(div);

    dataComments.map((comment) => {
        const body = document.createElement("p");
        const email = document.createElement("p");
        const name = document.createElement("p");
        const div = document.createElement("div");

        //arrumar o css destas classes!!
        body.classList.add("bodyComments");
        email.classList.add("emailComments");
        name.classList.add("nameComments");
        div.classList.add("divComments");

        body.innerText = "Comentário: " + comment.body;
        email.innerText = "E-mail: " + comment.email;
        name.innerText = "Nome: " + comment.name;

        div.appendChild(name); 
        div.appendChild(email);
        div.appendChild(body);

        postContainer.appendChild(div);
    })
}

if(!postId){
    getAllPosts();
} else{
    getPost(postId);
}