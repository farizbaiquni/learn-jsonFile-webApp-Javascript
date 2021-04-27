
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
                    </div>
                </div>
             </div>
             `
    })

    divContent.innerHTML = html
})



// let xmlHttp = new XMLHttpRequest();
// xmlHttp.responseType = "text"
// xmlHttp.open('get', 'pizza.json', true);
// xmlHttp.onreadystatechange = function(){
//     if(this.readyState == 4 && this.status == 200){
//         JSON.parse(this.responseText).menu.map(data => console.log(data))
        
//     }
// }
// xmlHttp.send();