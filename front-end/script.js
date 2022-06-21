inicio();

function inicio() {
    //document.querySelector("#agregar").onclick = insert;
    //createCards();
    getAPINotes();
}

function insert() {
    let artist = document.querySelector("#nombre").value.trim();
    let album = document.querySelector("#album").value.trim();
    let select = document.getElementById('category');
    let category = select.options[select.selectedIndex].text;
    let info = {
        artist: artist,
        album: album,
        category: category,
        color: getColor(category)
    }
    addDisco(info);
    card(info);
}

function card(info) {
    document.querySelector("#deposit").insertAdjacentHTML("beforeend", `
    <div class="card justify-content-center m-2 col-lg-2 col-md-3 col-sm-5 col-10 fw-bold font-monospace bg-${info[0]}">
        <div>Artist: ${info[1]}</div>
        <div>Album: ${info[2]}</div>
        <div>Category: ${info[3]}</div>
        <button id="delete" onclick="deleteCard()" class="rounded font-monospace m-2 text-center text-light bg-dark ">Delete</button>
    </div>
    `);

}
/*
function deleteCard(cardToDelete) {
    let eliminar = document.getElementById("delete");
    eliminar.onclick = function () {
        let caja = this.parentNode;
        caja.style.display = "none";
    }
}*/

/*
function createCards() {
    var cardList = [];
    for (let i = 0; i < 10; i++) {
        let card = {
            name: "caja" + " " + i,
            id: i,
        }
        cardList.push(card);
    }
    addCardToBoard(cardList);
}*/

function addCardToBoard(cardList) {
    cardList.forEach(function (card) {
        document.querySelector("#deposit").insertAdjacentHTML("beforeend", `
            <div id="box${card.id}" class="card justify-content-center m-2 col-lg-2 col-md-3 col-sm-5 col-10 fw-bold font-monospace bg-${card.color}">
                <div>nombre: ${card.nombre}</div>
                <div>album: ${card.album}</div>
                <div>category: ${card.category}</div>
                <button id="delete${card.id}" onclick="deleteCardById(${card.id})" class="rounded font-monospace m-2 text-center text-light bg-dark ">Delete</button>
            </div>
        `);
    });
}

function deleteCardById(id) {
    let eliminar = document.getElementById("box" + id);
    deleteDiscoApi(id);
    eliminar.remove();
    clearMainBoard();
}

function clearMainBoard(){
    let clearBoard = document.getElementById("#deposit");
    clearBoard.remove();
}

async function getAPINotes() {
    const uri = "http://localhost:8080/discos";
    var cardsFromDataBase = [];
    fetch(uri)
        .then(res => res.json())
        .then(res => {
            res.forEach(data => {
                    let card = {
                        nombre: data.nombre,
                        album: data.album,
                        category: data.category,
                        id: data.id,
                        color: getColor(data.category)
                    }
                    cardsFromDataBase.push(card);
                })
                addCardToBoard(cardsFromDataBase);
        }).catch((error) => {
             console.log("error de connexion con la base de datos")
        });
}

function getColor(category) {
    var selectedColor = "";
    switch (category) {
        case "Relax":
            selectedColor = "success";
            break;
        case "Footing":
            selectedColor = "danger";
            break;
        case "Dancing":
            selectedColor = "warning";
            break;
        default:
            selectedColor = "info"
    }
    return selectedColor;
}

async function deleteDiscoApi(id) {
    const uri = "http://localhost:8080/discos/" + id;
    fetch(uri, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(res => {
            alert("Disco borrado ");
        });
}

async function sendToAPI(data) {
    const uri = "http://localhost:8080/discos/post";
    fetch(uri, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            alert("DISCO AÑADIDO");
            let card = {
                nombre: res.nombre,
                album: res.album,
                category: res.category,
                id: res.id,
                color: getColor(res.category)
            }
            //cardsFromDataBase.push(card); 
            location.reload(true);
            getAPINotes();

        })

}

function addDisco(info) {
    let select = document.getElementById('category');
    let n = {
        nombre: document.querySelector("#nombre").value.trim(),
        album: document.querySelector("#album").value.trim(),
        category: select.options[select.selectedIndex].text
    }
    if (n.nombre == "" || n.album == "" || n.category == "--Choose One--") {
        alert("Algunos valores no son correctos, por favor, relene el formulario antes de guardar");
    } else {
        sendToAPI(n);
    }

}