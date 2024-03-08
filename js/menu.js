//Importar objs que van a ser ingresados dentro del dataset
import { activeInfo, personInfo, brandInfo, personTypeInfo, movTypeInfo, actTypeInfo, statusInfo} from './dataForm.js';

const menuData = [
    {title: "activos", idDrop : "menu-active" ,icon : "bx bxs-package", infoForm : JSON.stringify(activeInfo)},
    {title: "tipo de activos", idDrop : "menu-active-type" ,icon : "bx bx-pin", infoForm : JSON.stringify(actTypeInfo)},
    {title: "estados", idDrop : "menu-status" ,icon : "bx bx-error", infoForm : JSON.stringify(statusInfo)},
    {title: "marcas", idDrop : "menu-brands" ,icon : "bx bxs-bar-chart-alt-2", infoForm : JSON.stringify(brandInfo)},
    {title: "tipo de personas", idDrop : "menu-person-type" ,icon : "bx bxs-user-detail", infoForm : JSON.stringify(personTypeInfo)},
    {title: "tipo movimiento del activo", idDrop : "menu-mov-active" ,icon : "bx bxs-component", infoForm : JSON.stringify(movTypeInfo)},
    //Agregar atributo name
    //Hacer caso de edit
]
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
        <ul class="side-menu__dropdown" data-item="${element.title}" data-ref='${element.infoForm}' id="testing">
            <li class="dropdown__option"  data-type="add">Agregar</li>
            <li class="dropdown__option"  data-type="edit">Eliminar</li>
            <li class="dropdown__option" data-type="add">Editar</li>
            <li class="dropdown__option" data-type="add">Buscar</li>
        </ul>    
    `
    ul.appendChild(menuOption);
})
mainContainer.append(nav);



/*
    <!-- side bar-->
    <input type="" id="drop-sidebar">
    <nav id="sidebar">
		<ul class="side-menu">
			<li>
                <!-- Activos -->
                <input type="checkbox" id="menu-activo">
                <label class="side-menu__subtitle" for="menu-activo">
                    <i class='bx bxs-package' ></i> 
                    <p> Activos</p>
                    <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
                </label>

                <!-- dropdown-->
				<ul class="side-menu__dropdown" data-item="activo" data-ref="activeInfo" id="testing">
					<li class="dropdown__option"  data-type="add">Agregar</li>
					<li class="dropdown__option"  data-type="edit">Eliminar</li>
					<li class="dropdown__option" data-type="add">Editar</li>
					<li class="dropdown__option" data-type="add">Buscar</p></li>
				</ul>
			</li>


            <li>
                <!-- Tipo activo -->
                <input type="checkbox" id="menu-active-type">
                <label class="side-menu__subtitle" for="menu-active--type">
                    <i class='bx bx-pin' ></i>
                    <p> Tipo activo</p>
                    <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
                </label>

                <!-- dropdown-->
				<ul class="side-menu__dropdown">
					<li><a class="dropdown__option"data-type="create-active-type">Agregar</a></li>
					<li><a class="dropdown__option">Eliminar</a></li>
					<li><a class="dropdown__option">Editar</a></li>
					<li><a class="dropdown__op  tion">Buscar</a></li>
				</ul>
			</li>

            <li>
                <!-- estados -->
                <input type="checkbox" id="menu-status">
                <label class="side-menu__subtitle" for="menu-status">
                    <i class='bx bx-error' ></i> 
                    <p> Estados</p>
                    <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
                </label>

                <!-- dropdown-->
				<ul class="side-menu__dropdown">
					<li><a class="dropdown__option"href="#">Agregar</a></li>
					<li><a class="dropdown__option">Eliminar</a></li>
					<li><a class="dropdown__option">Editar</a></li>
					<li><a class="dropdown__option">Buscar</a></li>
				</ul>
			</li>

            <li>
                <!-- marcas -->
                <input type="checkbox" id="menu-marcas">
                <label class="side-menu__subtitle" for="menu-marcas">
                    <i class='bx bxs-bar-chart-alt-2'></i>
                    <p> Marcas</p>
                    <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
                </label>

                <!-- dropdown-->
				<ul class="side-menu__dropdown">
					<li><a class="dropdown__option"href="#">Agregar</a></li>
					<li><a class="dropdown__option">Eliminar</a></li>
					<li><a class="dropdown__option">Editar</a></li>
					<li><a class="dropdown__option">Buscar</a></li>
				</ul>
			</li>

            <li>
                <!-- Personas -->
                <input type="checkbox" id="menu-person">
                <label class="side-menu__subtitle" for="menu-person">
                    <i class='bx bxs-user'></i>
                    <p>personas</p>
                    <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
                </label>

                <!-- dropdown-->
				<ul class="side-menu__dropdown">
					<li><a class="dropdown__option"href="#">Agregar</a></li>
					<li><a class="dropdown__option">Eliminar</a></li>
					<li><a class="dropdown__option">Editar</a></li>
					<li><a class="dropdown__option">Buscar</a></li>
				</ul>
			</li>


            <li>
                <!-- Tipo personas -->
                <input type="checkbox" id="menu-person-type">
                <label class="side-menu__subtitle" for="menu-person-type">
                    <i class='bx bxs-user-detail' ></i>
                    <p> Tipo personas</p>
                    <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
                </label>

                <!-- dropdown-->
				<ul class="side-menu__dropdown">
					<li><a class="dropdown__option"href="#">Agregar</a></li>
					<li><a class="dropdown__option">Eliminar</a></li>
					<li><a class="dropdown__option">Editar</a></li>
					<li><a class="dropdown__option">Buscar</a></li>
				</ul>
			</li>

            <li>
                <!-- Tipo movimiento del activo -->
                <input type="checkbox" id="menu-mov-activo">
                <label class="side-menu__subtitle" for="menu-mov-activo">
                    <i class='bx bxs-component'></i>
                    <p> Tipo de movimiento del activo</p>
                    <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
                </label>

                <!-- dropdown-->
				<ul class="side-menu__dropdown">
					<li><a class="dropdown__option"href="#">Agregar</a></li>
					<li><a class="dropdown__option">Eliminar</a></li>
					<li><a class="dropdown__option">Editar</a></li>
					<li><a class="dropdown__option">Buscar</a></li>
				</ul>
			</li>

            <li>
                <!-- Asignacion -->
                <input type="checkbox" id="menu-asignacion">
                <label class="side-menu__subtitle" for="menu-asignacion">
                    <i class='bx bxs-share-alt'></i>
                    <p> Asignacion</p>
                    <i class='bx bx-chevron-right icon-right side-menu__arrow' ></i>
                </label>

                <!-- dropdown-->
				<ul class="side-menu__dropdown">
					<li><a class="dropdown__option"href="#">Crear</a></li>
					<li><a class="dropdown__option">Asignar activos</a></li>
					<li><a class="dropdown__option">Retornar activos</a></li>
				</ul>
			</li>         
	</nav>


*/