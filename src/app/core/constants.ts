import { environment } from 'src/environments/environment';
const { url } = environment;

export const apiLinks = {
  register: `${url}/auth/register`,
  login: `${url}/auth/login`,
};
