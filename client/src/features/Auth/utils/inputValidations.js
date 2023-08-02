export const emailValidations = {
   label: "Correo electrónico",
   name: "email",
   placeholder: "Correo electrónico",

   rules: {
      required: "No ha ingresado un correo electrónico",
      maxLength: {
         value: 80,
         message: "Correo electrónico no valido",
      },
      pattern: {
         value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         message: "Correo electrónico no valido",
      },
   },
};

export const passwordValidations = {
   label: "Contraseña",
   name: "password",
   placeholder: "Introduce tu contraseña",
   secureTextEntry: true,
   rules: {
      required: "La contraseña debe tener al menos 6 caracteres, 1 mayúscula, 1 minúscula y 1 número",
      minLength: {
         value: 6,
         message: "La contraseña debe tener al menos 6 caracteres, 1 mayúscula, 1 minúscula y 1 número",
      },
      pattern: {
         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
         message: "La contraseña debe tener al menos 6 caracteres, 1 mayúscula, 1 minúscula y 1 número",
      },
   },
};

export const loginPasswordValidations = {
   label: "Contraseña",
   name: "password",
   placeholder: "Introduce tu contraseña",
   secureTextEntry: true,
   rules: {
      required: "Debes introducir su contraseña",
      minLength: {
         value: 6,
         message: "Contraseña incorrecta",
      },
   },
};
