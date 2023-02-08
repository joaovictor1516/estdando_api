const url = "https://jsonplaceholder.typicode.com/posts",
loadingElements = document.querySelector("#loading");

const postsContainer = document.querySelector("#posts-container"),
postPage = document.querySelector("#post"),
postContainer = document.querySelector("#post-container");

const commentsContainer = document.querySelector("#comments-container"),
commentForm = document.querySelector("#comment-form");

const emailInput = document.querySelector("#email"),
nameInput = document.querySelector("#usuario"),
bodyInput = document.querySelector("#body");

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

    title.classList.add("titlePost"); 
    body.classList.add("bodyPost");
    div.classList.add("divPost");

    title.innerText = "Título do post: " + dataPost.title;
    body.innerText = "Post: " + dataPost.body;

    div.appendChild(title);
    div.appendChild(body);

    postContainer.appendChild(div);

    dataComments.map((comment) => {
        createComment(comment);
    })
}

function createComment(comment){
    const body = document.createElement("p");
    const email = document.createElement("p");
    const name = document.createElement("p");
    const div = document.createElement("div");

    body.classList.add("bodyComments");
    email.classList.add("emailComments");
    name.classList.add("nameComments");
    div.classList.add("divComments");

    body.innerText = "Comentário: " + comment.body;
    email.innerText = comment.email;
    name.innerText = comment.name;

    div.appendChild(name); 
    div.appendChild(email);
    div.appendChild(body);

    commentsContainer.appendChild(div);
}

async function postComment(comment){
    const response = await fetch(url, {
        method: "POST",
        body: comment,
        headers: {
            "content-type": "application/json"
        }
    });

    const data = await response.json();

    createComment(data);
}

if(!postId){
    getAllPosts();
} else{
    getPost(postId);

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let comment = {
            name: nameInput.value,
            email: emailInput.value,
            body: bodyInput.value
        };

        comment = JSON.stringify(comment);

        postComment(comment);

        nameInput.innerText = "";
        emailInput.innerText = "";
        bodyInput.innerText = "";
    })
}