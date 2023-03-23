import {useMutation} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";
import {lOGIN_USERS} from "../../apollo/mutations/user/user";
import {FormEvent} from "react";
import {getLoginUser} from "../../redux/security/actions";
import {SecurityInterface, securitySelector} from "../../redux/security/reducer";
import {RootState} from "../_app";
import {Components} from "../../styles/styles";
import {getInputType, useGetArrayInputs} from "./LoginPageService/LoginPageService";

function LoginPage() {
  const [addUserFunc] = useMutation(lOGIN_USERS)
  const dispatch = useDispatch()

  const handlerSubmit = (e: FormEvent<HTMLFormElement>, nameUser: string, passportUser: string) => {
    e.preventDefault()
    dispatch(getLoginUser({addUserFunc, nameUser, passportUser}))
  }

  const {logInUserStatus} = useSelector<RootState, SecurityInterface>(securitySelector)

  const getInput: getInputType = ({name, label, setState, handlerChange, value}) =>
    <Components.InputContainer key={name}>
      <Components.LabelComponent>{label}</Components.LabelComponent>
      <Components.InputComponent
        onChange={(e) => handlerChange(e, setState)}
        value={value}
        name={name}
        type={name}
        autoComplete={name}
        required
      />
    </Components.InputContainer>

  const {arrayInputs, nameUser, passportUser} = useGetArrayInputs()

  return <Components.ContainerComponent>
    {!logInUserStatus && <Components.LoginPage>
        <Components.HeaderTextLoginComponent>Login Page</Components.HeaderTextLoginComponent>
        <Components.FormComponent
            onSubmit={(e: FormEvent<HTMLFormElement>) => handlerSubmit(e, nameUser, passportUser)}
        >
          {arrayInputs.map((input) => getInput(input))}
            <Components.ButtonComponent type='submit'>Login</Components.ButtonComponent>
        </Components.FormComponent>
    </Components.LoginPage>}
  </Components.ContainerComponent>
}

export default LoginPage
