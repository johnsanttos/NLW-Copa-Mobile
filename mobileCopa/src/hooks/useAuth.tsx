import {useContext} from "react";

import {AuthContextDataProps, AuthContext } from "../context/AuthContext";

export function useAuth(): AuthContextDataProps{
const context = useContext(AuthContext);

return context
}