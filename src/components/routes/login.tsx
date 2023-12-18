import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../auth-components";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function CreateAccount() {
    const navigate = useNavigate()
    const [isLoading,setLoading] = useState(false) ; 
    const [email,setEmail] = useState("") ; 
    const [password,setPassword] = useState("") ; 
    const [error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name,value}} =e; //target 추출
        if (name==="email"){
            setEmail(value)
        }
        else if(name === "password"){
            setPassword(value)
        }
    }
    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(""); // 사용자가 버튼 클릭시 error 초기화 
        if(isLoading || email === "" || password ==="" ) return; // 비어있으면 함수 종료
        try{
            setLoading(true) // 위의 경우가 아니라면 여기로.
            await signInWithEmailAndPassword(auth,email,password);
            navigate("/")
        }catch(e){
           if(e instanceof FirebaseError){ 
            setError(e.message);
    
           }
        }
        finally{
            setLoading(false);
        }
    }
    return (
    <Wrapper>
        <Title>Log into X</Title>
        <Form onSubmit={onSubmit}>
            <Input
            onChange={onChange}
            name = "email" 
            value={email} 
            placeholder="Email" 
            type="email" 
            required
            />
            <Input 
            onChange={onChange}
             name = "password"
             value={password} 
             placeholder="Password" 
             type="password" 
             required 
             />
            <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account?{" "}
            <Link to="/create-account">Create one &rarr</Link>
        </Switcher>
    </Wrapper>
    )
}