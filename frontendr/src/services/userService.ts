import React from "react"

import { IUser } from "models";

let user: IUser;
let userPromise: Promise;

const getUserDetails = (): Promise<IUser> => {
  if (user) {
    Promise.resolve(user)
  }
  if (userPromise) {
    return userPromise;
  }

  userPromise


}

export const UserService = {
  getUserDetails,

}
