import { Link } from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo,FormRow } from '../Component';

const Login = () => {
  return (
    <Wrapper>
     <form className='form'>
     <Logo/>
     <h4>Login</h4>
<FormRow type="email"  name="email" placeholder="xyz@abc.com" labelText="Email" />
<FormRow type="password"  name="password" placeholder="Secret@123" labelText="Password" />
   <button type="submit" className='btn btn-block'>Login</button>
   <button type="submit" className='btn btn-block'>Explore as Guest User</button>
   <p> Not a member yet?
   <Link to='/register' className='member-btn' >Register</Link>
   </p>
   </form>

    </Wrapper>
  );
};
export default Login;