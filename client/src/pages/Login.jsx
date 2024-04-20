import { Link, useNavigate, Form, redirect, useActionData } from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo, FormRow } from '../Component';
import customFetch from '../../../utils/customFetch';
import { toast } from 'react-toastify';


export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const errors = { msg: '' }
  if (data.password.length < 3) {
    errors.msg = 'password is too short'
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const Login = () => {
  const errors = useActionData()
  const navigation = useNavigate()
  const isSubmitting = navigation.state === 'submitting'

  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123'
    }
    try {
      await customFetch.post('/auth/login', data)
      toast.success('Login successful')
      return navigation('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <p></p>
        <FormRow type="email" name="email" placeholder="xyz@abc.com" labelText="Email" />
        <FormRow type="password" name="password" placeholder="Secret@123" labelText="Password" />
        <button type="submit" className='btn btn-block' disabled={isSubmitting}> {isSubmitting ? 'submitting' : 'submit'}</button>

        <button type="submit" className='btn btn-block' onClick={loginDemoUser}>Explore as Guest User</button>
        <p> Not a member yet?
          <Link to='/register' className='member-btn' >Register</Link>
        </p>
      </Form>

    </Wrapper>
  );
};
export default Login;