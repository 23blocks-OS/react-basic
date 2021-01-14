export const parseFormData = (data) => {
  return {
    'user[provider]': 'email',
    'user[email]': data.email,
    'user[password]': data.password,
    'user[username]': data.email,
    'user[uid]': data.email,
    'user[name]': data.name,
    confirm_success_url: 'http://app.cicero-tech.com/step2',
    subscription: '318f1533-8dd9-4a7d-8b36-9b04a7c2363f',
  };
};
