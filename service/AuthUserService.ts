import axios from 'axios';
import { response } from 'express';

/*
 * Receber code(string)
 * Recuperar o access_token no Github
 * Verificar se o usuário existe na DB
 * Se sim - gera um token
 * Se não - Cria na DB, gera um token
 * Retornar o token com as infos do usuário logado
 */

export class AuthUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';
    const response = await axios.post(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  }
}
