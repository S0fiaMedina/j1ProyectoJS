import {activeInfo} from "./dataForm.js"

async function getData(endPoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endPoint}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        return response;
    } catch (error) {
        return {}
    }
}

async function postData(element, endPoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(element)
        });
        return response;
    }
    catch (error) {
        return {}
    }
}

//crear telefonos
let count = 0;
const mainContainer = document.querySelector('main');
const buttonCrud = document.querySelectorAll('.dropdown__option');

//Funcion que determina que ventanas mostrarse
buttonCrud.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        mainContainer.innerHTML = ``;
        const crudType = e.target.dataset.type; //accede al data-set que indica la opcion del crud
        const crudItem = e.target.parentNode.dataset.item; //accede al datase de ul que indica que opcion del menu se edita
        const crudRef = e.target.parentNode.dataset.ref; //accede al dataset de ul para referenciar sobre que obj de dataForm.js se va a iterar
        const crudUrl = e.target.parentNode.dataset.url; //accede al dataset de ul para referenciar al endpoint al cual se debe acceder

        switch(crudType){
            case 'add':
                addForm(JSON.parse(crudRef), "Registro de " + crudItem, crudType);
                postInfo(crudUrl);
                break;
            case 'return':
                addSearchWindow(crudUrl, crudType, e.target.parentNode.dataset.refmov, crudItem);
                break;
            default:
                addSearchWindow('movements', crudType, crudRef, 'movimiento');
                
                break;
            
                //En edit se carga 

        }
    })
})


// Renderizar formularios
function addForm(newForm, title, action, isSearch = false, isEdit = false){
    console.log(isSearch);

    //Se crea formulario 
    const form = document.createElement('form');
    let container;
    if (isSearch === true){
        newForm.pop();
        console.log
        container = document.createElement('dialog');
        container.classList.add('container-form__dialog');
        document.querySelector('body').appendChild(container);
        form.classList.add('register__form');

        //Agregar boton
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = `<i class='bx bx-x'></i>`;
        closeBtn.setAttribute('id', 'close__dialog')
        container.appendChild(closeBtn);

        closeBtn.addEventListener('click', ()=>{
            container.close();
        })

        container.showModal();
    } else {
        container = document.createElement('section');
        container.classList.add('container-form');
        mainContainer.appendChild(container);
        form.classList.add('register__form');
    }

    container.appendChild(form);

    //creacion del titulo de formulario
    const titleForm = document.createElement('h2');
    titleForm.textContent = title;
    form.appendChild(titleForm);


    newForm.forEach(async (input)=>{

        switch (input.typeInput){
            //Rceibe numeros y texto
            case 'email':
            case 'text':
            case 'number':
            case 'textarea':
            case 'date':{
                    const div = document.createElement('div');                     
                    div.innerHTML = `
                        <label for="${input.value[0]}">${input.value[1]}: </label>
                        <input class="input__form" type="${input.typeInput}" id="${input.value[0]}" name="${input.value[2]}" min="0">
                    `
                    isSearch ? div.querySelector('.input__form').setAttribute('disabled', true) : '';
                    input.typeInput === 'textarea' ? div.querySelector('.input__form').style.resize = 'none' : '';
                    form.appendChild(div);
                    //Si isUpdating = True, o sea que estamos en modo actualizar es necesario cambiar el value por el input.value[2] del obj, ya que este coincide con la llave para acceder al valor en la base de datos
                    // isEdit ? div.querySelector('.input__form').textContent = objetoRecibido[input.value[2]] : ''

                }
                break;
            case 'select':
                {
                    const div = document.createElement('div');
                    div.innerHTML = `
                    <label for="${input.value[0]}">${input.value[1]} </label>
                    <select id="${input.value[0]}" name="${input.value[2]}"></select> 
                    `
                    form.appendChild(div);
                    let endPoint;
                    switch (input.value[0]) {
                        case "category-active":
                            endPoint = "categories";
                            break;
                        case "active-type":
                            endPoint = "typesActive";
                            break;
                        case "active-status":
                            endPoint = "states";
                            break;
                        case "active-brand":
                            endPoint = "brands";
                            break;
                        case "person-type":
                            endPoint = "typesPerson";
                            break;
                        case "mov-act":
                            endPoint = "typesMovActive";
                            break;
                    }
                    const collection = await getData(endPoint);
                    const select = document.querySelector(`#${input.value[0]}`);
                    for (let item of collection) {
                        select.innerHTML += `<option value="${item.id}">${item.id} - ${item.name}</option>`
                    }
                    isSearch ? div.querySelector('select').setAttribute('disabled', true) : '';
                }
                break;

            case 'submit':
                const btnSubmit = document.createElement('button');
                btnSubmit.classList.add('register__form--submit', action); //Clase de los botones (addEventLister)
                btnSubmit.setAttribute('id', input.value[0]);
                btnSubmit.setAttribute('name', input.value[2]);
                isEdit ?  btnSubmit.textContent = 'Actualizar': btnSubmit.textContent = input.value[1]
                form.appendChild(btnSubmit);
                
                break;
        }
    
    })
}

// Funcion para mostrar ventana de busqueda
function addSearchWindow(URL, action, ref, item){

    //Cabecera del search
    const container = document.createElement('section');
    container.classList.add('container-crud');

    container.innerHTML = `
    <div class="crud__search-bar">
        <input class="crud__search__input" type="text" name="search" placeholder="Search...">
        <button><i class='bx bx-search' ></i></button>
    </div>
    `
    mainContainer.appendChild(container);

    // FUNCION DE BUSQUEDA
    container.querySelector('button').addEventListener('click', (event)=>{
        event.preventDefault(); //Para que no se recargue la pagina
        let inputUser = container.querySelector('input').value; // Valor del input del usuario 
        console.log(`El usuario ha escrito ${inputUser} y se supone que va a la ruta ${URL} :p`);
        /*solicita los datos*/
        getInfo(event, URL, inputUser);

        if  (action == 'return'){
            console.log(ref);
            addForm(JSON.parse(ref), "creacion de  " + item, 'add', false, true);
        } 
        if (action  == 'edit'){
            addForm(JSON.parse(ref), "Actualizar informacion de " + item, 'edit', false, true);
            putInfo(URL);     
    
        } else{
            showResults(URL, inputUser, action, ref, item);
        }

    })
    
}
// Funcion para mostrar los resultados :D !
function showResults(URL, inputUser, action, ref, item){
    const containerBody = document.createElement('section');
    containerBody.classList.add('container-crud__body');
    containerBody.innerHTML = ``;



    containerBody.innerHTML = `
        <div class="crud__search-result">

        <div class="search-result">
            <h3 class="result-subtitle">Id</h3>
            <p>IdPersona</p> 
        </div>
        <div class="search-result">
            <h3 class="result-subtitle">Nombre</h3>
            <p>nombrePersona</p>                      
        </div>
        <div class="search-result">
            <h3 class="result-subtitle">Tipo de persona</h3>
            <p>TipoPersona</p>                        
        `;
    
    const btnCrud = document.createElement('button');
    containerBody.querySelector('.crud__search-result').appendChild(btnCrud);


    //El boton se cambia segun la ccion qu se esté haciendo, a cada addEventListener hay
    switch(action){
        case 'remove':
            btnCrud.innerHTML = `<i class='bx bxs-trash' ></i>`;
            btnCrud.addEventListener('click', (e) => {
                deleteInfo(e, URL, inputUser)
            })
            break;
        case 'search':
            btnCrud.innerHTML = `<i class='bx bx-detail'></i>`;
            btnCrud.addEventListener('click', (e) => {
                console.log(ref);
                addForm(JSON.parse(ref), "Informacion de "+ item, 'search', true);
            })
            break;
        case 'operations':
            btnCrud.innerHTML = `<i class='bx bx-detail'></i>`;
            btnCrud.addEventListener('click', (e) => {
                console.log(activeInfo);
                addForm(activeInfo, "Informacion del activo", 'search', true);
                loadAssignationButtons();
            })
            break;

    }

    document.querySelector('.container-crud').appendChild(containerBody);   
}


function loadAssignationButtons(){
    const form = document.querySelector('.register__form');
    form.innerHTML += `
    <button class="register__form--submit" id="return-active">Retornar activo</button>
    <button class="register__form--submit" id="quit-active">Dar de baja</button>
    <button class="register__form--submit" id="send-active">Enviar a garantía</button>
    `
    /*Aqui las urls, las puedes colocar manualmente :)*/
    
    /*RETORNAR ACTIVO*/
    document.querySelector('#return-active').addEventListener('click', (e)=>{
        e.preventDefault();
        console.log("Retorna");
    })


    /*DAR DE BAJA*/
    document.querySelector('#quit-active').addEventListener('click', (e)=>{
        e.preventDefault();
        console.log("Da de baja");
    })


    /*ENVIAR A GARANTIA*/
    document.querySelector('#send-active').addEventListener('click', (e)=>{
        e.preventDefault();
        console.log("Envia a garaantia");
    })
}


//funcion para implementar la logica del put (actualizar elementos)
function postInfo(URL){
    document.querySelector('.add').addEventListener('click', (e)=>{
        const datos = Object.fromEntries(new FormData(e.target.form).entries()); //datos del formulario
        console.log(datos);
        postData(datos, URL);
        e.preventDefault();
        console.log('Se oprimio un boton submit para hacer post en la url de ' + URL );
    })
}

//Funcion para implementar la logica del post (registrar elementos)
function putInfo( url, inputUser){
    document.querySelector('.edit').addEventListener('click', (e)=>{
        const datos = Object.fromEntries(new FormData(e.target.form).entries());
        e.preventDefault();
        console.log(datos)
        console.log('Se oprimio un boton para hacer PUT en la url de ' + url );
    })
}
//Funcion para implementar la logica del delete (eliminar elementos)
function deleteInfo(event, url, inputUser){
    event.preventDefault();
    console.log('Se oprimió un boton para hacer DELETE en la URL de '+ url+ ' id:' +inputUser);
}
function getInfo(event, url, inputUser){
    event.preventDefault();
    console.log('Se oprimió un boton para hacer buscar informacion en la URL de '+ url+ ' id:' +inputUser);
}








