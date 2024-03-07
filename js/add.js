//segun lo que apa
const formAddActive = [
    {
        value : ["active-code", "Codigo de la transaccion"], //Id que relaciona al input con el label y el texto
        typeInput : "number",
    },
    {
        value : ["active-name", "Nombre del activo"], //Id que relaciona al input con el label y el texto
        typeInput : "text",
    },
    {
        value : ["active-serial", "Numero del serial"], //Id que relaciona al input con el label y el texto
        typeInput : "text",
    },
    {
        value : ["active-value", "Valor Unitario"], //Id que relaciona al input con el label y el texto
        typeInput : "number",
    },
    {
        value : ["category-active", "Categoria del activo"], 
        typeInput : "select",
    },
    {
        value : ["active-type", "Tipo del activo"], 
        typeInput : "select",
    },
    {
        value : ["active-status", "Estado del activo"], 
        typeInput : "select",
    },
    {
        value : ["active-brand", "Marca del activo"], 
        typeInput : "select",
    },
    {
        value: ["add-active-id", "registrar Activo"],
        typeInput : "submit",
    }
]
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
            case 'text':
            case 'number':
                {
                    console.log(input.typeInput)
                    const div = document.createElement('div');
                    //Lo que va adentro del div
                    div.innerHTML = `
                        <label for="${input.value[0]}">${input.value[1]}: </label>
                        <input  class="input__form" type="${input.typeInput}" id="${input.value[0]}">
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

addForm(formAddActive, "Formulario de registro de activo"); 

//Para agregar valores traidos de las peticiones, se podria traer un objeto y desestructurarlo en variables e ingresarlo a la funcion de mostrar


const template = `

`
//si el data set incluye x cosa, 
//Procede a buscar en la lista de contenedores 