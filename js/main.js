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
}

if(!postId){
    getAllPosts();
} else{
    getPost(postId);
}