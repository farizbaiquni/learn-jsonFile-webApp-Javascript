
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

let divContent = document.getElementById("content");



//Run in first load to display all menu
getContent(response => {
    console.log(response.menu)
    let html = ''
    response.menu.map(data => {
             html += `
             <div class="col-sm-3 mb-3">
                 <div class="card">
                 <img src="/img/pizza/${data.gambar}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.nama}</h5>
                        <p class="card-text">${data.deskripsi}</p>
                        <h3>Rp.${data.harga}</h3>
                    </div>
                </div>
             </div>
             `
    })
    divContent.innerHTML = html
})



//Code to reacticate active classs base on user click and
//adjust content base on menu that user clicked
document.querySelectorAll('.nav-link').forEach(list => {
    list.addEventListener("click", function(){
        document.querySelector(".active").classList.remove("active")
        this.className += " active";

        //If menu is "All Menu" then run this code
        if(this.dataset.menu == "all"){
            getContent(response => {
                console.log(response.menu)
                let html = ''
                response.menu.map(data => {
                         html += `
                         <div class="col-sm-3 mb-3">
                             <div class="card">
                             <img src="/img/pizza/${data.gambar}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.nama}</h5>
                                    <p class="card-text">${data.deskripsi}</p>
                                    <h3>Rp.${data.harga}</h3>
                                </div>
                            </div>
                         </div>
                         `
                })
                divContent.innerHTML = html
            })
        } else {
            getContent(response => {
                let html = ''
                //First filter data based on menu the mapping
                response.menu.filter(data => data.kategori == this.dataset.menu).map(data => {
                    html += `
                    <div class="col-sm-3 mb-3">
                        <div class="card">
                        <img src="/img/pizza/${data.gambar}" class="card-img-top" alt="...">
                           <div class="card-body">
                               <h5 class="card-title">${data.nama}</h5>
                               <p class="card-text">${data.deskripsi}</p>
                               <h3>Rp.${data.harga}</h3>
                           </div>
                       </div>
                    </div>
                    `
                 })
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
