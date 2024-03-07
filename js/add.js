//Importaciones
import { activeInfo, personInfo } from "./dataForm.js";

//crear telefonos
let count = 0;


function newPhone(){
    //Se crea la etiqueta de formulario y se adjunta al contenedor
    const container = document.createElement('section');
    container.classList.add('container-form');
    const form = document.createElement('form');
    form.classList.add('register__form', 'phone__form');
    container.appendChild(form);

    form.innerHTML = `
        <h2>Nuevo Telefono</h2>        
        <div>
            <!-- Numero de telefono-->
            <label for="person-phone1">Numero de telefono: </label>
            <input class="input__form" type="number" id="person-phone${count}" required>
        </div>
                        
        <div>
            <!-- Ubicacion-->
            <label for="person-phone-ubicacion">Ubicacion: </label>
            <input class="input__form" type="text" id="person-phone-ubicacion${count}" required>
        </div>
        <button class="add__info" id="add__phone${count}">
            Añadir otro telefono
            <i class='bx bx-plus'></i>
        </button>
    `
    document.querySelector('main').appendChild(container);
    count++;
}
newPhone();

document.querySelectorAll('.add__info').forEach((button) =>{

    button.addEventListener('click',(e)=> {
        e.preventDefault();
        newPhone()})
})


// Renderizar formularios
function addForm(newForm, title){
    //se crea el contenedor del fomulario y se pone en el main
    const container = document.createElement('section');
    container.classList.add('container-form');
    document.querySelector('main').appendChild(container);

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
            case 'number':
                {
                    const div = document.createElement('div');
                    //Lo que va adentro del div
                    if (input.value[0].includes('phone')){
                        console.log("Esto hace parte del formulario de telefono :D")
                    }
                     
                    div.innerHTML = `
                        <label for="${input.value[0]}">${input.value[1]}: </label>
                        <input class="input__form" type="${input.typeInput}" id="${input.value[0]}">
                    `
                    
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
                btnSubmit.classList.add('register__form--submit');
                btnSubmit.setAttribute('id', input.value[0]);
                btnSubmit.textContent = input.value[1];
                form.appendChild(btnSubmit);
                break;
        }
    
    })
}



//Para agregar valores traidos de las peticiones, se podria traer un objeto y desestructurarlo en variables e ingresarlo a la funcion de mostrar



//si el data set incluye x cosa, 
//Procede a buscar en la lista de contenedores 