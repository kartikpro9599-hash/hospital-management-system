import UserLogin from "../components/LoginCard";

function Login(props) { 
    return (
        <UserLogin head={props.back} url={props.url} />
    );
}
export default Login;