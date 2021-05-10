let divContent = document.getElementById("content");

function getContent(response){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('get', 'pizza.json', true);
    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            response(JSON.parse(this.response))
        }
    }
    xmlHttp.send();

}


// ================== TEMPLATING FOR CARD MOVIE================== 
function templateCardMovie(data){
    return ` <div class="col-sm-3 mb-3">
                <div class="card h-100">
                    <img src="/img/pizza/${data.gambar}" class="card-img-top" alt="...">
                    <div class="card-body" style ="position: relative">
                        <h5 class="card-title">${data.nama}</h5>
                        <p class="card-text">${data.deskripsi}</p>
                        <br>
                        <h3 style ="position: absolute; bottom: 0;">Rp.${data.harga}</h3>
                    </div>
                </div>
            </div>
    `
}


// ================== DISPLAY ALL MENU AT THE FIRST RENDERING ================== 
getContent(response => {
    let html = ''
    response.menu.map(data => {
             html += templateCardMovie(data)
    })
    divContent.innerHTML = html
})




// ================== FILTER CONTENT BASED ON CATEGORY MENU================== 

//Code to reacticate active classs in menu element when user click category menu and
//filter content based on category menu that user clicked
document.querySelectorAll('.nav-link').forEach(list => {
    list.addEventListener("click", function(){
        document.querySelector(".active").classList.remove("active")
        this.className += " active";

        //If menu is "All Menu" then run this code
        if(this.dataset.menu == "all"){
            getContent(response => {   
                let html = ''
                response.menu.map(data => {
                         html += templateCardMovie(data)
                })
                divContent.innerHTML = html
            })
        } else {
            getContent(response => {
                let html = ''
                //filter data based on category menu
                let result = response.menu.filter(data => data.kategori == this.dataset.menu).map(data => {
                    html += templateCardMovie(data)
                 })

                if(result.length == 0){
                    html += `<h3 class="text-center mt-3"> Data not Found </h3>`
                } 
                divContent.innerHTML = html
                
            })
        }

    })
})


/////Code to reacticate active classs from "https://www.w3schools.com/howto/howto_js_active_element.asp"
// var menu = document.getElementsByClassName("nav-link");
// for (var i = 0; i < menu.length; i++) {
//   menu[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");
//     console.log(current)
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }



// ================== EVENT FOR SEARCH INPUT ==================
let buttonSearch = document.querySelector('#button-search')
//User click search button
buttonSearch.addEventListener("click", function(e){
    let html = '';
    e.preventDefault();
    let inputKeyword = document.getElementById("input-keyword").value;
    document.querySelector(".nav-link").classList.remove("active")
    getContent(response => {
        let result = response.menu.filter(data => data.nama.toLowerCase().indexOf(inputKeyword.toLowerCase()) > -1 ).map(data => {
            console.log(data)
            html += templateCardMovie(data)
            })

        if(result.length == 0){
            html += `<h3 class="text-center mt-3"> Data not Found </h3>`
        } 
        divContent.innerHTML = html
    })
})
//User type in search button
document.getElementById("input-keyword").addEventListener("keyup", function(e){
    let html = '';
    e.preventDefault();
    let inputKeyword = document.getElementById("input-keyword").value;
    document.querySelector(".nav-link").classList.remove("active")
    getContent(response => {
        let result = response.menu.filter(data => data.nama.toLowerCase().indexOf(inputKeyword.toLowerCase()) > -1).map(data => {
                        html += templateCardMovie(data)
                    })
        if(result.length == 0){
            html += `<h3 class="text-center mt-3"> Data not Found </h3>`
        } 
        divContent.innerHTML = html
        
        
    })
})
