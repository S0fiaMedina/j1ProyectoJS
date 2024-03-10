import {activeInfo} from "./dataForm.js";
import { getData, postData } from "./api.js";
//crear telefonos
let count = 0;
const mainContainer = document.querySelector('main');
const buttonCrud = document.querySelectorAll('.dropdown__option');

//Funcion principal :)
buttonCrud.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        mainContainer.innerHTML = ``;
        const crudType = e.target.dataset.type; //accede al data-set que indica la opcion del crud
        const crudItem = e.target.parentNode.dataset.item; //accede al datase de ul que indica que opcion del menu se edita
        const crudRef = e.target.parentNode.dataset.ref; //accede al dataset de ul para referenciar sobre que obj de dataForm.js se va a iterar
        const crudUrl = e.target.parentNode.dataset.url; //accede al dataset de ul para referenciar al endpoint al cual se debe acceder
        let initialSettings;
        let container;
        switch(crudType){
            case 'add':
                /*contiene la conf del section que va a contener el fomrulario*/
                initialSettings = ['main', 'section', 'container-form', 'register__form', `Registro de ${crudItem}`];
                container = newContainer(initialSettings, 'form');
                addForm(JSON.parse(crudRef),crudType, container, "required=true", crudUrl );
                postInfo(crudUrl);
                break;
            case 'asignation-active':
            case 'return':
                if (crudType == 'return') initialSettings = ['main', 'section', 'container-crud', 'register__form', `registro de ${crudItem}`];
                else initialSettings = ['main', 'section', 'container-crud', 'register__form', `registro de movimientos`];
        
                container = newContainer(initialSettings, 'searchContainer');
                search(crudUrl, crudType, e.target.parentNode.dataset.refmov, crudItem, container);
                break;
            default:
                initialSettings = ['main', 'section', 'container-crud', 'register__form', `registro de ${crudItem}`];
                container = newContainer(initialSettings, 'searchContainer');
                search(crudUrl, crudType, crudRef, crudItem, container);
                
                break;
            
                //En edit se carga 

        }
    })
})
/*Esta funcion genera el contenido del container que NO sea de los formularios*/
function newContainer(settings, action){
    const [tagGlobalContainer, tagContainer, classContainer, classForm, title] = settings; /**desestructuracion */
    const container = document.createElement(tagContainer); /*--- container ---*/
    container.classList.add(classContainer);
    document.querySelector(tagGlobalContainer).appendChild(container);
    switch (action){
        case 'form': /*si se va a renderizar un form*/
            container.innerHTML = /*HTML*/`<form class="${classForm}" id="myForm"><h2>${title}</h2></form>`;
            break;
        case 'searchContainer': /*si se va a renderizar un contenedor de busqueda*/
            container.innerHTML = /*HTML*/`
            <div class="crud__search-bar">
                <input class="crud__search__input" type="text" name="search" placeholder="Search...">
                <button><i class='bx bx-search' ></i></button>
            </div>
            `;
            console.log(container.innerHTML);
            break;
        case 'dialog': /*si se va a renderizar un dialog*/

            container.innerHTML = /*HTML*/`
            <button id="close__dialog"><i class='bx bx-x'></i></button>
            <form class="${classForm}" id="myForm"><h2>${title}</h2></form>
            `;
            
            container.showModal();
            container.querySelector('#close__dialog').addEventListener('click', ()=> {container.close()});
            break;
    }
    
    return container;
}

// Renderizar formularios
function addForm(newForm,action, container, aditionalAtributte, endpoint){
    /*recorre el obj que representa lo que va adentro del array*/
    newForm.forEach( async (input)=>{
        console.log(endpoint);
        const form = container.querySelector('form'); 
        switch (input.typeInput){
            case 'select':{
                const div = document.createElement('div');
                //Aqui se deberia llamar una función para poder traer todos los 
                div.innerHTML = `
                <label for="${input.value[0]}">${input.value[1]} </label>
                <select  id="${input.value[0]}" name="${input.value[2]}" ${aditionalAtributte}></select> 
                `;
                form.appendChild(div);
                let endpointForn;
                switch (input.value[0]) {
                    case "category-active":
                        endpointForn = "categories";
                        break;
                    case "active-type":
                        endpointForn = "typesActive";
                        break;
                    case "active-status":
                        endpointForn = "states";
                        break;
                    case "active-brand":
                        endpointForn = "brands";
                        break;
                    case "person-type":
                        endpointForn = "typesPerson";
                        break;
                    case "mov-act":
                        endpointForn = "typesMovActive";
                        break;
                }
                const collection = await getData(endpointForn);
                    const select = document.querySelector(`#${input.value[0]}`);
                    for (let item of collection) {
                        select.innerHTML += `<option value="${item.id}">${item.id} - ${item.name}</option>`
                }

                
            }
            break;

            case 'submit':{
                const div = document.createElement('div');                     
                div.innerHTML = `<button for="myForm" class="register__form--submit ${action}" id= ${input.value[0]} name=${input.value[2]}></button>`
                const btnSubmit = div.querySelector('button');
                action === 'edit'? btnSubmit.textContent = 'Actualizar' : btnSubmit.textContent = input.value[1] ;
                form.appendChild(div);
            } 
            break;
            /*Este maneja el resto de los casos como date, text, number */
            default:{
                const div = document.createElement('div');                     
                div.innerHTML = `
                    <label for="${input.value[0]}">${input.value[1]}: </label>
                    <input class="input__form" type="${input.typeInput}" id="${input.value[0]}" name="${input.value[2]}" min="0" ${aditionalAtributte}>
                `
                input.typeInput === 'textarea' ? div.querySelector('.input__form').style.resize = 'none' : ''; //Si es textarea el usuario no puede modificar el tamaño
                form.appendChild(div);
                if (action == 'edit'){
                    //EDITAR
                    const collection = await getData(`${endpoint}/${1}` );
                        console.log(collection[input.value[2]])
                        div.querySelector('input').textContent = collection[input.value[2]];

                }
                //Si isUpdating = True, o sea que estamos en modo actualizar es necesario cambiar el value por el input.value[2] del obj, ya que este coincide con la llave para acceder al valor en la base de datos
                // isEdit ? div.querySelector('.input__form').textContent = objetoRecibido[input.value[2]] : ''
                }
            break;
        }
    
    })
}

/** FUNCION PARA HACER LA BUSQUEDA */
function search(URL, action, ref, item, container){
    const containerBody = document.createElement('section');
    document.querySelector('.container-crud').appendChild(containerBody);

    container.querySelector('button').addEventListener('click', (event)=>{
        containerBody.innerHTML = ``
        event.preventDefault(); //Para que no se recargue la pagina
        let inputUser = container.querySelector('input').value; // Valor del input del usuario 
        console.log(`El usuario ha escrito ${inputUser} y se supone que va a la ruta ${URL} :p`);
        
        
        
        
        /*solicita los datos*/
        const dataFound = getInfo(event, URL, inputUser); 
        /*lo siguiente solo se ejecuta si se encuentra la data*/
        if (action  == 'edit'){
            const initialSettings = ['.container-crud', 'section', 'container-form', 'register__form', `Actualizar ${item}`];
            const container = newContainer(initialSettings, 'form');
            addForm(JSON.parse(ref),'edit', container, "required=true", URL );
            putInfo(URL);     
        } else{

            
            showResults(URL, inputUser, action, ref, item, containerBody);

        }

    })
    
}
// Funcion para mostrar los resultados :D !
function showResults(URL, inputUser, action, ref, item, containerBody){
    containerBody.classList.add('container-crud__body');
    containerBody.innerHTML += `
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
        </div>                    
        `;
    
    const btnCrud = document.createElement('button');
    containerBody.querySelector('.crud__search-result').appendChild(btnCrud);
    //El boton se cambia segun la ccion qu se esté haciendo, a cada addEventListener hay
    let initialSettings;
    switch(action){
        case 'remove':
            btnCrud.innerHTML = `<i class='bx bxs-trash' ></i>`;
            btnCrud.addEventListener('click', (e) => {
                deleteInfo(e, URL, inputUser)
            })
            break;

        case 'search':
        case 'return':
            btnCrud.innerHTML = `<i class='bx bx-detail'></i>`;
            btnCrud.addEventListener('click', (e) => {
                let refData = JSON.parse(ref);
                refData.pop();
                if (action == 'search'){
                    initialSettings = ['body', 'dialog', 'container-form__dialog', 'register__form', `Informacion`];
                    const container = newContainer(initialSettings, 'dialog');
                    addForm(refData,action, container, "disabled=true", URL );
                } else{
                    initialSettings = ['.container-crud', 'section', 'container-form', 'register__form', `Informacion`];
                    containerBody.innerHTML = ``
                    const container = newContainer(initialSettings, 'form');
                    addForm(refData,action, container, "disabled=true", URL );
                    loadAssignationButtons(container);
                }
            })
        case 'asignation-active':
            initialSettings = ['.container-crud', 'section', 'container-form', 'register__form', `Informacion`];
            containerBody.innerHTML = ``
            const container = newContainer(initialSettings, 'form');
            addForm(JSON.parse(ref),action, container, "disabled=true", URL );
            break;

    }   
}


function loadAssignationButtons(container){
    const form = container.querySelector('.register__form');
    form.innerHTML += `
    <div>
        <button class="register__form--submit" id="return-active">Retornar activo</button>
        <button class="register__form--submit" id="quit-active">Dar de baja</button>
        <button class="register__form--submit" id="send-active">Enviar a garantía</button>
    </div>

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
        e.preventDefault();
        postData(datos, URL);
        
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
    /*
    Si la accion es 'asign', se debe conseguir una LISTA de los activos del usuario


    Sino, entonces se debe conseguir cualquiera que sea el elemento que se nos este solicitando
    
    se retorna el objeto
    */
}