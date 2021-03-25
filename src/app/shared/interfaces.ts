import { ViewModeEnum } from "./enums/enums";

export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string,
}

export interface Post {
  id?: string,
  title: string,
  text: string,
  author: string,
  date: Date,
  categoryType: string
}

export interface FbCreateResponse {
  name?: string
}

export interface Category {
  fbId?: string,
  id: number,
  categoryName: string,
  originPath?: string,
  parentId?: string,
  parentPath?: string,
  children: Category[];
}

export interface TreeData {
  id: string;
  children?: TreeData[];
  fbId?: string,
  categoryName: string,
  originPath?: string,
  parentId?: string,
  parentPath?: string,
}

export interface DialogData {
  categoryName?: string;
  isTop?: boolean,
  currentCategory: TreeData,
  nodesQuantity: number,
  viewMode: ViewModeEnum;
}
