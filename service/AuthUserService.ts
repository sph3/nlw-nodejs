import axios from 'axios';
import { response } from 'express';

/*
 * Receber code(string)
 * Recuperar o access_token no Github
 * Recuperar infos do user no Github
 * Verificar se o usuário existe na DB
 * Se sim - gera um token
 * Se não - Cria na DB, gera um token
 * Retornar o token com as infos do usuário logado
 */

interface IAccessTokenResponse {
  access_token: string;
}

export class AuthUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';
    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      });

    const response = await axios.get('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    });
    return response.data;
  }
}
