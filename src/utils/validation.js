// Valida e-mail
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Valida nome de usuário (só letras, números e underline, de 3 a 20 caracteres)
export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

// Valida nome (apenas letras e espaços, mínimo 2 letras)
export const validateName = (name) => {
  const regex = /^[A-Za-zÀ-ÿ\s]{2,}$/;
  return regex.test(name.trim());
};

// Valida nome de grupo (apenas letras e espaços, mínimo 2 letras)
export const validateGroupName = (name) => {
  const regex = /^[A-Za-zÀ-ÿ\s]{2,18}$/;
  return regex.test(name.trim());
};
