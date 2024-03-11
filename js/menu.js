//Importar objs que van a ser ingresados dentro del dataset
import { activeInfo, personInfo, brandInfo, personTypeInfo, movTypeInfo, actTypeInfo, statusInfo, asignationInfo, movInfo, phoneInfo} from './dataForm.js';

/**Opciones del menu */
const menuData = [
    {title: "Activos", idDrop : "menu-active" ,icon : "bx bxs-package", infoForm : JSON.stringify(activeInfo), url: "actives"},
    {title: "Tipo de activos", idDrop : "menu-active-type" ,icon : "bx bx-pin", infoForm : JSON.stringify(actTypeInfo), url: "typesActive"},
    {title: "Tipo movimiento del activo", idDrop : "menu-mov-active" ,icon : "bx bxs-component", infoForm : JSON.stringify(movTypeInfo), url : "typesMovActive"},
    {title: "Estados", idDrop : "menu-status" ,icon : "bx bx-error", infoForm : JSON.stringify(statusInfo), url : "states"},
    {title: "Marcas", idDrop : "menu-brands" ,icon : "bx bxs-bar-chart-alt-2", infoForm : JSON.stringify(brandInfo), url : "brands"},
    {title: "Personas", idDrop : "menu-person" ,icon : "bx bxs-user", infoForm : JSON.stringify(personInfo), url : "persons"},
    {title: "Tipo de personas", idDrop : "menu-person-type" ,icon : "bx bxs-user-detail", infoForm : JSON.stringify(personTypeInfo), url : "typesPerson"},
    {title: "Teléfonos", idDrop : "menu-telephones" ,icon : "bx bxs-phone", infoForm : JSON.stringify(phoneInfo), url : "telephones"},
    {title: "Asignaciones", idDrop : "menu-asignations" ,icon : "bx bxs-plus-square", infoForm : [JSON.stringify(asignationInfo), JSON.stringify(movInfo)], url : "asignations"},
]
/*--- ceracion dinamica de la cabecera ---*/
/*---- creacion de contenedores----*/
const mainContainer = document.querySelector('body'); //trae a main desde el html

// Crear el checkbox que va a usar css para implementar la logica del drop
const checkboxMain = document.createElement('input');
checkboxMain.type = 'checkbox';
checkboxMain.id = 'drop-sidebar';
mainContainer.append(checkboxMain);

//Creacion del nav y el ul general que contendrá todas las opciones
const nav = document.createElement('nav');
nav.setAttribute('id', 'sidebar');
mainContainer.appendChild(nav);
const ul = document.createElement('ul');
ul.setAttribute('class', 'side-menu');
nav.appendChild(ul);

//Construcccion del menu
menuData.forEach((element) =>{
    const menuOption = document.createElement('li');
    menuOption.innerHTML = `
        <input type="checkbox" id="${element.idDrop}">
        <label class="side-menu__subtitle" for="${element.idDrop}">
            <i class="${element.icon}" ></i> 
            <p>${element.title}</p>
            <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
        </label>
           
    `
    if (element.title === 'Asignaciones'){
        menuOption.innerHTML += `
        <ul class="side-menu__dropdown" data-url= "${element.url}" data-item="${element.title}" data-ref='${element.infoForm[0]}' data-refmov ='${element.infoForm[1]}' id="testing">
            <li class="dropdown__option"  data-type="add">Agregar</li>
            <li class="dropdown__option"  data-type="return">Retornar activo activo</li>
            <li class="dropdown__option"  data-type="asignation-active">Asignar activo</li>
        </ul> 
        `

    }else{
        menuOption.innerHTML += `
        <ul class="side-menu__dropdown" data-url= "${element.url}" data-item="${element.title}" data-ref='${element.infoForm}' id="testing">
            <li class="dropdown__option"  data-type="add">Agregar</li>
            <li class="dropdown__option"  data-type="remove">Eliminar</li>
            <li class="dropdown__option" data-type="edit">Editar</li>
            <li class="dropdown__option" data-type="search">Buscar</li>
        </ul> 
        `
    }
    ul.appendChild(menuOption);

})
mainContainer.append(nav);

