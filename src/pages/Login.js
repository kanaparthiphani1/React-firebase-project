import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { login } from "../firebase/auth";
import { toast } from 'react-toastify';
import {useNavigate,Link} from "react-router-dom"

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        setIsLoading(true);
        const user = await login(email, password);
        setEmail("")
        setPassword("")
        if(user){
            setIsLoading(false);
            // props.history.push(`/profile/${user.uid}`);
            navigate(`/profile/${user.uid}`,{ replace: true })
        }else{
            setIsLoading(false);
            
        }
    }catch(e){
        setIsLoading(false);
    }

    
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        style={{
            borderRadius: "4px",
            padding: "18px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        }}
        onSubmit={handleSubmit}
        >
        <h2 style={{textAlign:"center",marginBottom:"15px"}}>Login</h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
        </Row>

        <Link to="/signup">
              or Signup
        </Link>

        <Button style={{float:"right"}} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
