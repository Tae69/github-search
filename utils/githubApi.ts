export type GitHubUser = {
  login: string;
  avatar_url: string;
}

export type UserListResponse = {
  total_count: number;
  items: GitHubUser[]
}

export type GetUserResponse = {
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  company?: string;
  location?: string;
  repos_url: string;
}

export type GetRepoResponse = {
  name: string;
  forks_count: number;
  stargazers_count: number;
}

const headers = {
  authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
};

export class HttpError extends Error {
  errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
  }
}

async function makeRequest<T>(url: string): Promise<T> {
  try {
    const resp = await fetch(url, { headers: process.env.NEXT_PUBLIC_GITHUB_TOKEN ? headers : {} });
    const body = await resp.json();

    if (!resp.ok) {
      throw new HttpError(body.message, resp.status);
    }

    return body;
  }
  catch (err) {
    if (err instanceof HttpError) {
      throw err;
    }

    throw new Error('Unexpected error happened. Please contact administrator.');
  }
}

export async function searchUsers(keyword: string, page: number = 1): Promise<UserListResponse> {
  return makeRequest<UserListResponse>(`https://api.github.com/search/users?q=${keyword}&per_page=12&page=${page}`);
}

export async function getUser(username: string): Promise<GetUserResponse> {
  return makeRequest<GetUserResponse>(`https://api.github.com/users/${username}`);
}

export async function getUserRepos(username: string): Promise<GetRepoResponse[]> {
  return makeRequest<GetRepoResponse[]>(`https://api.github.com/users/${username}/repos`);
}

export async function getUserFollowers(username: string): Promise<GetUserResponse[]> {
  return makeRequest<GetUserResponse[]>(`https://api.github.com/users/${username}/followers`);
}

export async function getUserFollowing(username: string): Promise<GetUserResponse[]> {
  return makeRequest<GetUserResponse[]>(`https://api.github.com/users/${username}/following`);
}