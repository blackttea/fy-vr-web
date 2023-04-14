import useDataType from "../../hook/useDataType";

const getSession = (name: string, parse=true) => {
  if (parse) return JSON.parse(sessionStorage.getItem(name) || "")
  else return sessionStorage.getItem(name);
}

const setSession = (name: string, value: any) => {
  if (useDataType(value, "string") || useDataType(value, "number")) sessionStorage.setItem(name, value);
  else sessionStorage.setItem(name, JSON.stringify(value));
}

const getLocal = (name: string, parse=true) => {
  if (parse) return JSON.parse(localStorage.getItem(name) || "")
  else return localStorage.getItem(name);
}

const setLocal = (name: string, value: any) => {
  if (useDataType(value, "string") || useDataType(value, "number")) localStorage.setItem(name, value);
  else localStorage.setItem(name, JSON.stringify(value));
}

const clearLocal = (name: string) => {
  localStorage.removeItem(name)
}

export {
  getSession,
  setSession,
  getLocal,
  setLocal,
  clearLocal
}
