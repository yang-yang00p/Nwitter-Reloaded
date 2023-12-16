import { auth } from "../../firebase"

export default function Home() {
    const logOut = () => {
        auth.signOut(); //firebase에서 생성한 auth 호출후 signOut
    };
    return (
    <h1>
        <button onClick={logOut}>Log out</button>
    </h1>
    )
}