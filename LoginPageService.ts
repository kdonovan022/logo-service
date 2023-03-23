import {ChangeEvent, SetStateAction, useState} from "react";

import {Dispatch} from "../../../redux/store";

export const handlerChange = (e: ChangeEvent<HTMLInputElement>, setFunction: Dispatch<string>) => setFunction(e.target.value)

export type HandlerChangeType = (e: ChangeEvent<HTMLInputElement>, setFunction: Dispatch<string>) => void

export interface inputInterface {
  name: string,
  label: string,
  setState: Dispatch<SetStateAction<string>>,
  handlerChange: HandlerChangeType,
  value: string,
}

export type getInputType = (input: inputInterface) => JSX.Element

export const useGetArrayInputs = () => {
  const [nameUser, setNameUser] = useState("")
  const [passportUser, setPassportUser] = useState("")

  return {
    arrayInputs: [
      {name: 'email', label: 'Email', setState: setNameUser, handlerChange, value: nameUser},
      {name: 'password', label: 'Password', setState: setPassportUser, handlerChange, value: passportUser}
    ],
    nameUser,
    passportUser
  }
}
