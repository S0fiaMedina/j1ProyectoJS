/*
En este archivo se definen objetos exportados los cuales son recorridos para renderizar los inputs y los labels de cada tipo de formulario
*/
const activeInfo = [
    {
        value : ["active-code", "Codigo de la transaccion", "code"], //Id que relaciona al input con el label y el texto
        typeInput : "number",
    },
    {
        value : ["active-form", "Numero de formulario", "formNumber"], //Id que relaciona al input con el label y el texto
        typeInput : "text",
    },
    {
        value : ["active-name", "Nombre del activo", "name"], //Id que relaciona al input con el label y el texto
        typeInput : "text",
    },
    {
        value : ["active-serial", "Numero del serial", "serialNumber"], //Id que relaciona al input con el label y el texto
        typeInput : "text",
    },
    {
        value : ["active-value", "Valor Unitario", "unitaryPrice"], //Id que relaciona al input con el label y el texto
        typeInput : "number",
    },
    {
        value : ["provider-active", "Proveedor", "activeProvider"], 
        typeInput : "select",
    },
    {
        value : ["category-active", "Categoria del activo", "activeCategory"], 
        typeInput : "select",
    },
    {
        value : ["active-type", "Tipo del activo", "activeType"], 
        typeInput : "select",
    },
    {
        value : ["active-status", "Estado del activo", "activeStatus"], 
        typeInput : "select",
    },
    {
        value : ["active-brand", "Marca del activo", "activeBrand"], 
        typeInput : "select",
    },
    {
        value : ["active-responsible", "Responsable del activo", "activeResponsible"], 
        typeInput : "select",
    },
    {
        value: ["add-active-id", "registrar Activo", "actives"],
        typeInput : "submit",
    }
];

/*--- informacion de persona ---*/
const personInfo = [
    {
        value : ["person-identification", "Identificacion", "identificationNumber"],
        typeInput : "number"
    },
    {
        value : ["person-name", "Nombre", "name"],
        typeInput : "text"
    },
    {
        value : ["person-email", "Email", "email"],
        typeInput : 'email'
    },
    {
        value : ["person-type", "Tipo de persona", "personType"],
        typeInput : 'select'
    },
    {
        value : ["person-phone", "Telefono", "personNumber"],
        typeInput : 'number'
    },
    {value : ["add-person", "Nueva persona", "persons"], typeInput: 'submit'}
];

const brandInfo = [
    {value : ["brand", "Nombre", "name"], typeInput : 'text'},
    {value : ["add-brand", "Nueva marca", "brands"], typeInput: 'submit'}
];

const personTypeInfo = [
    {value : ["person-type", "Nombre", "name"], typeInput : 'text'},
    {value : ["add-person-type", "Nuevo tipo de persona", "typesPerson"], typeInput: 'submit'}
];

const movTypeInfo = [
    {value : ["movement-type", "Nombre","name"], typeInput : 'text'},
    {value : ["add-movement-type", "Nuevo tipo de movimiento", "typesMovActive"], typeInput: 'submit'}
];

const actTypeInfo = [
    {value : ["active-type", "Nombre", "name"], typeInput : 'text'},
    {value : ["add-active-type", "Nuevo tipo de activo", "typesActive"], typeInput: 'submit'}
];

const statusInfo = [
    {value : ["status", "Nombre", "name"], typeInput : 'text'},
    {value : ["add-status", "Nuevo estado", "states"], typeInput: 'submit'}
];

const phoneInfo = [
    {value : ["phone-number", "Numero"], typeInput: 'number'},
    {value : ["phone-location", "Numero"], typeInput: 'text'},
    {value : ["add-phone", "Nuevo telefono"], typeInput: 'submit'}
];

const movInfo = [
    {value : ["date-mov", "Fecha"], typeInput: 'date'},
    {value : ["mov-act","Id del activo"], typeInput : 'select'},
    {value : ["mov-comment","comentario"], typeInput : 'textarea'},
    {value : ["mov-responsible", "Id de la persona responsable"], typeInput: 'number'},
    {value : ["add-mov", "agregar movimiento"], typeInput: 'submit'}
];

const asignationInfo = [
    {value : ["asignation-date", "Fecha", "asignationDate"], typeInput: 'date'},
    {value : ["asignation-res","Responsable", "asignationResposible"], typeInput : 'select'},
    {value : ["add-asignation", "Nueva asignacion"], typeInput: 'submit'}

];

export {
    activeInfo,
    personInfo,
    brandInfo,
    personTypeInfo,
    movTypeInfo,
    actTypeInfo,
    statusInfo,
    phoneInfo,
    movInfo,
    asignationInfo
}