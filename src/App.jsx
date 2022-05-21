import { useState } from 'react';
import Validator from 'validator'
import './App.css';

function App() {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  const { email, password, password2 } = formValues

  const onChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!Validator.isEmail(email)) {
      setErrorMessage('The email you input is invalid')
      return
    }

    if(!Validator.isLength(password, {min: 5})) {
      setErrorMessage('The password you entered should contain 5 or more characters')
      return
    }

    if(password !== password2) {
      setErrorMessage('The passwords does not match')
      return
    }

    setErrorMessage('')
    return

  }

  return (
    <div className='container my-5'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="email" className='form-label'>
            Email address
          </label>
          <input 
            type="text" 
            name='email' 
            id='email' 
            aria-label='email' 
            className='form-control'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="password" className='form-label'>
            Password
          </label>
          <input 
            type="password" 
            name='password' 
            id='password' 
            className='form-control'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="password2" className='form-label'>
            Repeate password
          </label>
          <input 
            type="password" 
            name='password2' 
            id='password2' 
            className='form-control'
            value={password2}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <input type="submit" name='submitButton' aria-label='submitButton' value='submit' className='btn btn-info' />
        </div>
      </form>

      {
        errorMessage ? <span className='text-danger'>{ errorMessage }</span> : ''
      }
    </div>
  );
}

export default App;