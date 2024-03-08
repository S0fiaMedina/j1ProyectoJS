//Importaciones
import { activeInfo, personInfo, brandInfo, personTypeInfo, movTypeInfo, actTypeInfo, statusInfo, phoneInfo } from './dataForm.js';

const mainContainer = document.querySelector('main');




const testListener = document.querySelectorAll('.dropdown__option');
testListener.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        mainContainer.innerHTML = ``;
        const crudType = e.target.dataset.type; //accede al data-set que indica la opcion del crud
        const crudItem = e.target.parentNode.dataset.item; //accede al datase de ul que indica que opcion del menu se edita
        const crudRef = e.target.parentNode.dataset.ref; //accede al dataset de ul para referenciar sobre que obj de dataForm.js se va a iterar
        console.log(typeof(crudType));
        console.log(crudItem);
        console.log(e.target.parentNode.dataset.ref);


        switch(crudType){
            case 'add':
                addForm(JSON.parse(crudRef), "Registro de " + crudItem, false)
                break;
        }
    })
})


//crear telefonos
let count = 0;
// Renderizar formularios
function addForm(newForm, title, isEdit){
    
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
            case 'number':
                {
                    const div = document.createElement('div');                     
                    div.innerHTML = `
                        <label for="${input.value[0]}">${input.value[1]}: </label>
                        <input class="input__form" type="${input.typeInput}" id="${input.value[0]}" min="0">
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
                btnSubmit.classList.add('register__form--submit');
                btnSubmit.setAttribute('id', input.value[0]);
                btnSubmit.textContent = input.value[1];
                form.appendChild(btnSubmit);
                break;
        }
    
    })
}

function addSearchWindow(){

}

