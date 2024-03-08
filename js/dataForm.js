/*
En este archivo se definen objetos exportados los cuales son recorridos para renderizar los inputs y los labels de cada tipo de formulario
*/
const activeInfo = [
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
];

/*--- informacion de persona ---*/
const personInfo = [
    {
        value : ["person-identification", "Identificacion"],
        typeInput : "number"
    },
    {
        value : ["person-name", "Nombre"],
        typeInput : "text"
    },
    {
        value : ["person-email", "Email"],
        typeInput : 'email'
    },
    {
        value : ["person-type", "Tipo de persona"],
        typeInput : 'select'
    },
];

const brandInfo = [
    {value : ["brand", "Nombre"], typeInput : 'text'},
    {value : ["add-brand", "Nueva marca"], typeInput: 'submit'}
];

const personTypeInfo = [
    {value : ["person-type", "Nombre"], typeInput : 'text'},
    {value : ["add-person-type", "Nuevo tipo de persona"], typeInput: 'submit'}
];
const movTypeInfo = [
    {value : ["movement-type", "Nombre"], typeInput : 'text'},
    {value : ["add-movement-type", "Nuevo tipo de movimiento"], typeInput: 'submit'}
];
const actTypeInfo = [
    {value : ["active-type", "Nombre"], typeInput : 'text'},
    {value : ["add-active-type", "Nuevo tipo de activo"], typeInput: 'submit'}
]
const statusInfo = [
    {value : ["status", "Nombre"], typeInput : 'text'},
    {value : ["add-status", "Nuevo estado"], typeInput: 'submit'}
]
const phoneInfo = [
    {value : ["phone-id", "Numero"], typeInput: 'number'},
    {value : ["phone-location", "Numero"], typeInput: 'text'},
    {value : ["add-phone", "Nuevo telefono"], typeInput: 'submit'}
]
export {
    activeInfo,
    personInfo,
    brandInfo,
    personTypeInfo,
    movTypeInfo,
    actTypeInfo,
    statusInfo,
    phoneInfo
}