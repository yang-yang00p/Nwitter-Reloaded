import { Navigate } from "react-router-dom";
import { auth } from "../firebase"

export default function ProtectedRoute({
    children,
}:{
    children: React.ReactNode; //ts에게 children = ReactNode라고 알려줌 
}) {
    const user = auth.currentUser; // 유저의 로그인 여부를 알려줌(user값을 주거나 null을 줌)
    if(user === null) {  
        return<Navigate to="/login" />;
    }
    return children;
}