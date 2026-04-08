import client from "./client";

export const UserService = {
  async getUser(userName){
    const res = await client.get(`/users/${userName}`)
    return res.data;
  },

  async getUserRepos(userName){
    const res = await client.get(`/users/${userName}/repos`)
    return res.data;
  }
}