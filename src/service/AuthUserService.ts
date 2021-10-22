import axios from 'axios';
import { response } from 'express';
import { prismaClient } from '../prisma/index';

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

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
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

    const response = await axios.get<IUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );
    const { login, id, avatar_url, name } = response.data;
    const user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }
    return response.data;
  }
}
