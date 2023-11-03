import { useEffect, useState } from "react";
import { Login } from "./api/application";

const App = () => {

    const [schema,setSchema] = useState({});
    useEffect(async() => {
        let params = {code:'login/signup'}
        const response = await Login(params);
        console.log(response, "res");
    }, [])

    return (
        <Login
            schema = {schema}
        />
    )
}

export default App