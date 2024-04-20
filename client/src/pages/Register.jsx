import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import Logo from "../Component/Logo"
import { FormRow } from '../Component';
import { toast } from 'react-toastify';
import customFetch from '../../../utils/customFetch';

export const action = async ({ request }) => {
 const formData = await request.formData();
 const data = Object.fromEntries(formData)
 console.log( data)
try {
  await customFetch.post('auth/register',data)
  toast.success('Registration successful')
  return redirect('/login')
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return error;
}
}
const Register = () => {
  const navigation = useNavigation()
 
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form className='form' method='post'>
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" placeholder="First Name" labelText="First Name" />
        <FormRow type="text" name="lastName" placeholder="Last Name" labelText="Last Name" />
        <FormRow type="text" name="location" placeholder="Address" labelText="Location" />
        <FormRow type="email" name="email" placeholder="Abc@xyz.com" labelText="Email" />
        <FormRow type="password" name="password" placeholder="Secret@123" labelText="Password" />
        <button type='submit' className='btn btn-block'>submit</button>
        {isSubmitting ? 'submiting...' : 'submit'}
        <p> Already a member?
          <Link to='/login' className='member-btn' >Login</Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;