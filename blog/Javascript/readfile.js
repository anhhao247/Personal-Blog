function ReadFile(postApi){
    fetch(postApi)
    .then(function(response){
        return response.json();
    })
    
    .then (function (post1){
        var html = '';
        var Changehtml = document.querySelector('.post__header');
        html = `<div class="post__image">
            <img src="${post1.background}" >
        </div>
        <div class="post__title">
            <div class="post__title-user">
                <div class="body__thurmd">
                    <a href="#" class="static-avatar">
                        <img src="../img/avatar.jpg" alt="Avata" class="author-image" >
                    </a>
                </div>
                <span class="name">Quốc Đạt</span>
            </div>
            <h1>${post1.titles}</h1>
        </div>`;
        Changehtml.innerHTML = html;
        var html1 = ``;
        for(let i = 0; i < post1.main.length; i++){
            html1 += `  
                    <h1>${post1.main[i].title}</h1>`;
                    let n = post1.main[i].discription.length;
                    for(let j = 0; j < n; j++){
                        html1 += `<p>${post1.main[i].discription[j].mean}</p>`
                    }
        }
        html1 += `</div>`;
        var Changehtml = document.querySelector('.post__content');
        console.log(Changehtml)
        Changehtml.innerHTML = html1;
        console.log(post1)
    })
}

function start(posturl, x){
    readFileTags(posturl, function(post){
        randerTags(post, x);
    })
}
function readFileTags(posturl, callback){
    fetch(posturl)
        .then (function(response){
            return response.json();
        })
        .then(callback)
}
function randerTags(post, x){
    var listTags = document.querySelector('.body__tags');
    var htmls = '';
    let n = post.content.length;
    let t = 0;
    let dem = 0;
    for (let i=0; i < n; i++){
        if(t >= 3) {
            t = 0;
            if(t===0 ) dem++;
        }
        htmls += `<div class="tag" style="left: ${t++*33.33333}%; top: ${600*dem}px">
        <div class="tag__image">
            <a href="../HTML_${x}/${post.content[i].link}">
                <img src="../img/${x}_${i+1}.jpg" alt="Life">
            </a>
        </div>
        <div class="content">
            <div class="tag__title">
                <h1><a href="../HTML_${x}/${post.content[i].link}">${post.content[i].title}</a></h1>
            </div>
            <div class="tag__discription">
                <span>${post.content[i].discription}</span>
            </div>
            <div class="tag__contact">
                <div class="tag__contact-img">
                    <a href=""><img src="../img/avatar.jpg" alt="avatar"></a>
                </div>
                <div> <p> -- 3 min read </p></div>
            </div>
        </div>
    </div>`;
    }
    if(htmls!==null) listTags.innerHTML = htmls;
}


