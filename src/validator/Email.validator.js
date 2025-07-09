import validator from 'validator'

const dominioPermitido = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'live.com'
]

export function emailFormatoValido(email) {
  return validator.isEmail(email);
}

export function emailDominioValido(email){
  const dominio = email.split('@')[1]?.toLowerCase();
  return dominioPermitido.includes(dominio);
}