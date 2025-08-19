import * as AuthModel from "../models/AuthModel";

export const loginUser = async (email, password) => {
  try {
    const user = await AuthModel.login(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {
    const newUser = await AuthModel.register(email, password);
    return newUser;
  } catch (error) {
    throw error;
  }
};