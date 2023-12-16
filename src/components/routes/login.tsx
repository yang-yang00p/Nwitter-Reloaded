import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";


const Wrapper = styled.div`
   height : 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   width:  420px;
   padding: 58px 0px;
`;

const Title = styled.h1`
    font-size: 42px;
`;

const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"]{
        cursor: pointer;
        &:hover{
            opacity: 0.8;
        }
    }

`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`


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
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        }catch(e){
           if(e instanceof FirebaseError){ 
            setError(e.message)
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
    </Wrapper>
    )
}