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
                addForm(JSON.parse(crudRef), "Registro de " + crudItem, false)
                break;
            
            default:
                addSearchWindow(crudUrl, crudType);
                break;
            
                //En edit se carga 

        }
    })
})


// Renderizar formularios
function addForm(newForm, title, disabled){
    
    //se crea el contenedor del fomulario y se pone en el main
    const container = document.createElement('section');
    container.classList.add('container-form');
    mainContainer.appendChild(container);

    //Se crea la etiqueta de formulario y se adjunta al contenedor
    const form = document.createElement('form');
    form.classList.add('register__form');
    container.appendChild(form);

    //creacion del titulo de formulario
    const titleForm = document.createElement('h2');
    titleForm.textContent = title;
    form.appendChild(titleForm);


    newForm.forEach((input)=>{
        switch (input.typeInput){
            //Rceibe numeros y texto
            case 'email':
            case 'text':
            case 'number':{
                    const div = document.createElement('div');                     
                    div.innerHTML = `
                        <label for="${input.value[0]}">${input.value[1]}: </label>
                        <input class="input__form" type="${input.typeInput}" id="${input.value[0]}" name="${input.value[2]}" min="0">
                    `
                    //Agrega el id de phone
                    if (input.value[0].includes('phone') && isEdit ===true){
                        div.querySelector('label').for+= count;
                        div.querySelector('input').id+= count;
                    }
                    count++;
                    //Hace que no se generen subformularios 
                        form.appendChild(div);
                }
                break;
            case 'select':
                {
                    const div = document.createElement('div');
                    div.innerHTML = `
                    <label for="${input.value[0]}">${input.value[1]} </label>
                    <select  id="${input.value[0]}">
                        <option value="${input.value[0]}-1">id1 - NombreCategoria1</option>
                        <option value="${input.value[0]}-2">id2 - NombreCategoria2</option>
                        <option value="${input.value[0]}-3">id3 - NombreCategoria3</option>
                    </select> 
                    `
                    form.appendChild(div);
                }
                break;

            case 'submit':
                const btnSubmit = document.createElement('button');
                btnSubmit.classList.add('register__form--submit'); //Clase de los botones (addEventLister)
                btnSubmit.setAttribute('id', input.value[0]);
                btnSubmit.setAttribute('name', input.value[2]);

                
                btnSubmit.textContent = input.value[1];
                form.appendChild(btnSubmit);
                loadButton();
                break;
            //Para asignaciones y busqueda
        }
    
    })
}


//FUNCION DE ESCUCHA para post (egistro de elementos)
function loadButton(){
    
    document.querySelector('.register__form--submit').addEventListener('click', (e)=>{
        e.preventDefault();
        console.log('...');
    })
}
// Funcion para mostrar ventana de busqueda
function addSearchWindow(URL, action){

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

        /*

        ...logica de busqueda para el backend...

        */


        //Solo se ejecuta si el usuario es encontrado
        showResults(URL, inputUser, action);
    })
    
}

// Funcion para mostrar los resultados :D !
function showResults(URL, id, action){
    const containerBody = document.createElement('section');
    containerBody.classList.add('container-crud__body');
    containerBody.innerHTML = ``;

    //Se toma el objeto que se ha recibido como respuesta (exitosa) y se inserta en este div
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


    //El boton se cambia segun la ccion qu se esté haciendo
    switch(action){
        case 'edit':
            btnCrud.innerHTML = `<i class='bx bxs-edit'></i>`;

            break;
        case 'remove':
            btnCrud.innerHTML = `<i class='bx bxs-trash' ></i>`;
            break;
        case 'search':
            btnCrud.innerHTML = `<i class='bx bx-detail'></i>`;
            break;
    }

    document.querySelector('.container-crud').appendChild(containerBody);   
}







