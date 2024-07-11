function categoriesPost() {
    fetch('../Javascript/allpost.json')
        .then((res) => res.json())
        .then((data) => {
            var categories = ''
            var sliderPost = ''
            var slider_cnt = 0            

            var popularTags = `
                <div class="popular__tags">
                <div class="tag__title">
                        <h5>Popular Tags</h5>
                    </div>
                </div>
            `
            data.forEach((tag) => {
            categories += `
            <div class="tag">
                <div class="tag-img">
                    <a href="${tag.linktag}"><img src="${tag.img}" alt=""></a>
                </div>
                <div class="details">
                    <div class="details-title"><a href="${tag.linktag}"><h1>${tag.tag}</h1></a></div>
                    <div class="details-desc"><p>${tag.desc}</p></div>
                    <div class="details-post-number"><a href="${tag.linktag}"><span id="post-number">${tag.content.length} </span>posts</a></div>
                </div>
            </div>
            `

            popularTags += `
            <div class="popular__tags">
            <div class="tags__thurmb cursor-pointer">
                <a href="${tag.linktag}"><img src="${tag.img}" alt="Technology"></a>
            </div>
            <div class="tags__carst">
                <div class="tags__carst-meta cursor-pointer">
                    <a href="${tag.linktag}">
                        <h5>${tag.tag}</h5>
                        <p>${tag.content.length} posts</p>
                    </a>
                </div>
            </div>
            <div class="tags__url cursor-pointer">
                <a href="${tag.linktag}">
                    <i class="fa-solid fa-arrow-trend-up"></i>
                    </a>
                    </div>
                    </div>
                    `
            tag.content.forEach((post) => {
                if(slider_cnt < 5){
                    sliderPost += `
                    <div class="item">
                    <a href="${post.link}"><img src="${post.img}" alt=""></a>
                    <div class="item-desc">
                        <p>${post.time}</p>
                        <a href="${post.link}" title="${post.title}"><h1>${post.title}</h1></a>
                    </div>
                </div>
        
                    `
                    slider_cnt++
                }
            })
            
        
            
            
        
        
        document.getElementById("categories").innerHTML = categories
    })
    popularTags += `
            <div class="popular__tags">
            <div class="tag__title cursor-pointer d-flex">
                <a href="../HTML/categories.html" class="tag__footer">
                    <h5>View All</h5>
                </a>
                <a href="../HTML/categories.html" class="tags_footer-icon">
                    <i class="fa-solid fa-share-from-square"></i>
                </a>
            </div>
            </div>
            `
            
            document.getElementById("tags__container-row").innerHTML = popularTags
            document.getElementById("slider-list").innerHTML = sliderPost

            var list = document.getElementById("slider-list")
            var items = document.querySelectorAll(".item")
            var prev = document.getElementById("prev")
            var next = document.getElementById("next")
            var dots = document.querySelectorAll(".slider-dots li")
            var active = 0
            var lengthItems = items.length - 1
            var autoLoad = setInterval(() =>  {next.click()}, 5000)
            next.onclick = function() {
                if(active + 1 > lengthItems){
                    active = 0
                }
                else{
                    active++    
                }
                reloadSlider()
            }
            prev.onclick = function() {
                if(active - 1 < 0){
                    active = lengthItems
                }
                else{
                    active--  
                }
                reloadSlider()
            }

            function reloadSlider(){
                var checkLeft = items[active].offsetLeft
                list.style.left = -checkLeft + 'px'
                var removeActive = document.querySelector(".active")
                removeActive.classList.remove('active')
                dots[active].classList.add('active')
                clearInterval(autoLoad)
                autoLoad = setInterval(() =>  {next.click()}, 5000)
                console.log(removeActive)
            }

            dots.forEach((li, key) => {
                li.addEventListener('click', function(){
                    active = key
                    reloadSlider()
                })
            })
            
            
        })
}

categoriesPost()


    


            

