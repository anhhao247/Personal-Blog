function createPost() {
    fetch('../Javascript/allpost.json')
        .then((res) => res.json())
        .then((data) => {
            var output = ''
            var cntPost = ''
            var mostPopular = '<h1 class="sidebar-heading">Recent Posts</h1>'
            var mostPopularLimit = 0
            // console.log(data)
            data.forEach(tag => {
                // console.log(post.content)
                tag.content.forEach(post => {
                    output += `
                <div id="${tag.tag}-${post.id}" class="post">
                <div class="post-img">
                    <a href=${post.link}><img src=${post.img} alt=""></a>
                </div>
                <div class="post-content">
                    <div class="post-tag"><a href=${tag.linktag}>${tag.tag}</a></div>
                    <h2 class="post-title"><a href=${post.link}>${post.title}</a></h2>
                    <div class="post-desc">
                        ${post.desc}
                    </div>
                    <div class="subcontent">
                        <div><i class="fa-regular fa-calendar-minus"></i>${post.time}</div>
                        <div onclick="like('${tag.tag}-like-${post.id}')" id="${tag.tag}-like-${post.id}"><i class="fa-solid fa-heart"></i>99</div>
                        <div onclick="cmt('${tag.tag}-cmt-${post.id}')" id="${tag.tag}-cmt-${post.id}"><i class="fa-solid fa-comment-dots"></i>0</div>
                        <div><i class="fa-solid fa-share-nodes"></i></div>
                    </div>
                </div>
                </div>
            </div>
                `
                
                if(mostPopularLimit < 3){
                    mostPopular += `
                    
                    <div class="most-popular-post">
                       <div class="most-popular-post-img"><a href="${post.link}"><img src=${post.img} alt=""></a></div>
                       <div class="most-popular-post-desc">
                            <a href=${post.link}>${post.title}</a>
                           <div><i class="fa-regular fa-calendar-minus"></i>${post.time}</div>
                        </div>
                    </div>
               
                    `
                    mostPopularLimit++
                }
                
                })

                cntPost += `
                <li>
                    <a href="${tag.linktag}"><div>${tag.tag}</div></a>
                    <a href="${tag.linktag}"><div id="cate-${tag.id}">${tag.content.length}</div></a>
                </li>
            `

          
                
                
            })
            output += `<div id="load-more"><span>Load more</span></div>`
            document.getElementById("posts").innerHTML = output
            document.getElementById("sidebar-categories").innerHTML = cntPost
            document.getElementById("most-popular").innerHTML = mostPopular

            var loadMore = document.getElementById("load-more")
            var boxes = [...document.querySelectorAll(".post")]
            var currentPost = 5
            for (let i = 0; i < currentPost; i++) {
                boxes[i].style.display = 'flex'
            }

            loadMore.onclick = () => {
                for (var i = currentPost; i < currentPost + 5; i++) {
                    if (i <= boxes.length - 1) {
                        boxes[i].style.display = 'flex'
                    }
                    else {
                        loadMore.style.display = 'none'
                    }

                }
                currentPost += 5
            }
            
            
            
            updateCmtNum()  

        })
}

createPost()
function updateCmtNum() {
    var cmt_num = JSON.parse(localStorage.getItem('user comments'))
    cmt_num.forEach(cmt => {
        document.getElementById(cmt.id).innerHTML = `<i class="fa-solid fa-comment-dots"></i>${cmt.comment.length}`
    })
}
function like(id) {
    var active = document.getElementById(id)
    var cnt = parseInt(document.getElementById(id).textContent)
    active.classList.toggle("active-love")
    if (active.classList.contains("active-love")) {
        cnt++
        active.innerHTML = `<i class="fa-solid fa-heart"></i>${cnt}`
    }
    else {
        cnt--
        active.innerHTML = `<i class="fa-solid fa-heart"></i>${cnt}`
    }
}

function search() {
    var searchbox = document.getElementById("search-blog").value.toUpperCase()
    var posts = document.getElementById("posts")
    var post = document.querySelectorAll(".post")
    var titlePost = document.querySelectorAll(".post-title a")
    // console.log(titlePost)
    for (var i = 0; i < post.length; i++) {
        var match = titlePost[i].textContent
        // console.log(match)
        if (match.toUpperCase().indexOf(searchbox) > -1) {
            post[i].style.display = "flex"
        }
        else {
            post[i].style.display = "none"
        }
        // console.log(match)
    }
}

document.getElementById("exit-btn").onclick = () => {
    document.querySelector(".cmt-container").style.display = 'none'
}


function cmt(id) {
        var cmt = localStorage.getItem('user comments') ? JSON.parse(localStorage.getItem('user comments')) : []
        console.log(document.querySelector(".cmt-container"))
        document.querySelector(".cmt-container").style.display = 'flex'
        document.querySelector(".cmt-body").style.display = 'none'
        var cmt_input = document.getElementById("user-cmt")
        var flag = false
        var output = ''
        // console.log(cmt)
        if(cmt.length > 0) {
            cmt.forEach(i => {
                // console.log(i.comment)
                if(id === i.id){
                    flag = true
                    console.log(i)
                    i.comment.forEach(post => {
                        output += `
                        <div class="user-cmt">
                        <div class="cmt-img">
                        <img src="../img/avatar_an_danh.jpg" alt="user">
                        </div>
                        <div class="user-cmt-content">
                        <h1>User</h1>
                        <p>${post}</p>
                        </div>
                        </div>
                        `
                    })
                    document.getElementById("cmt-body").innerHTML = output
                    document.querySelector(".cmt-body").style.display = 'flex'
                }
                
            })
            if(flag){
                document.getElementById("cmt-btn").onclick = (e) => {
                    e.preventDefault()
                        cmt.forEach(j => {
                            if(id === j.id){
                                j.comment.push(cmt_input.value)
                                localStorage.setItem('user comments', JSON.stringify(cmt))
                                output += `
                        <div class="user-cmt">
                        <div class="cmt-img">
                            <img src="../img/avatar_an_danh.jpg" alt="user">
                        </div>
                        <div class="user-cmt-content">
                            <h1>User</h1>
                            <p>${cmt_input.value}</p>
                        </div>
                    </div>
                        `
                        document.getElementById("cmt-body").innerHTML = output
                    }
                })
                clearinput()
                updateCmtNum()
                document.querySelector(".cmt-body").style.display = 'flex'
                }
            }
            else{
                cmt.push({  
                    id: id,
                    comment: []
                })
                localStorage.setItem('user comments', JSON.stringify(cmt))
                document.getElementById("cmt-btn").onclick = (e) => {
                    e.preventDefault()
                        cmt.forEach(j => {
                            if(id === j.id){
                                j.comment.push(cmt_input.value)
                                localStorage.setItem('user comments', JSON.stringify(cmt))
                                output += `
                        <div class="user-cmt">
                        <div class="cmt-img">
                            <img src="../img/avatar_an_danh.jpg" alt="user">
                        </div>
                        <div class="user-cmt-content">
                            <h1>@user</h1>
                            <p>${cmt_input.value}</p>
                        </div>
                    </div>
                        `
                        document.getElementById("cmt-body").innerHTML = output
                            }
                        })
                        clearinput()
                        updateCmtNum()
                        document.querySelector(".cmt-body").style.display = 'flex'
                }
            }
        }
        else{
            cmt.push({  
                id: id,
                comment: []
            })
            localStorage.setItem('user comments', JSON.stringify(cmt))
            document.getElementById("cmt-btn").onclick = (e) => {
                e.preventDefault()
                    cmt.forEach(j => {
                        if(id === j.id){
                            j.comment.push(cmt_input.value)
                            localStorage.setItem('user comments', JSON.stringify(cmt))
                            output += `
                    <div class="user-cmt">
                    <div class="cmt-img">
                        <img src="../img/avatar_an_danh.jpg" alt="user">
                    </div>
                    <div class="user-cmt-content">
                        <h1>@user</h1>
                        <p>${cmt_input.value}</p>
                    </div>
                </div>
                    `
                    document.getElementById("cmt-body").innerHTML = output
                        }
                    })
                    clearinput()
                    updateCmtNum()
                    document.querySelector(".cmt-body").style.display = 'flex'
            }
        }
    
        
        
    }




    
    



function clearinput() {
    document.getElementById("user-cmt").value = ''
}




