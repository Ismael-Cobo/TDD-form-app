import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />)
})

test('inputs should be initially empty', () => {
  

  const emailInput = screen.getByRole('textbox')
  const passwordInput = screen.getByLabelText('Password')
  const repeatePasswordInput = screen.getByLabelText(/Repeate password/i)
  expect(emailInput.textContent).toBe('')
  expect(passwordInput.textContent).toBe('')
  expect(repeatePasswordInput.textContent).toBe('')
});

test('should be able to type an email', async() => {
  

  const emailInput = screen.getByRole('textbox', {
    name: 'email'
  })

  await userEvent.type(emailInput, 'ismael@gmail.com')

  expect(emailInput).toHaveValue('ismael@gmail.com')
})

test('should be able to type a password', async() => {
  

  const passwordInput = screen.getByLabelText('Password')

  await userEvent.type(passwordInput, '123456')

  expect(passwordInput).toHaveValue('123456')
})

test('should be able to type a confirm password', async() => {
  

  const repeatePasswordInput = screen.getByLabelText(/Repeate password/i)

  await userEvent.type(repeatePasswordInput, '123456')

  expect(repeatePasswordInput).toHaveValue('123456')
})

test('should show email error message on invalid email', async() => {
  

  const errorText = screen.queryByText('The email you input is invalid')

  const emailInput = screen.getByRole('textbox', {
    name: 'email'
  })

  const submitButton = screen.getByRole('button', {
    name: 'submitButton'
  })

  expect(errorText).not.toBeInTheDocument()


  await userEvent.type(emailInput, '1234567')

  
  await userEvent.click(submitButton)

  const errorTextAfterSubmit = screen.queryByText('The email you input is invalid')

  expect(errorTextAfterSubmit).toBeInTheDocument()

})

test('should show password error message on invalid password 4 or less characters', async() => {
  

  const errorText = screen.queryByText('The password you entered should contain 5 or more characters')

  const emailInput = screen.getByRole('textbox', {
    name: 'email'
  })

  const passwordInput = screen.getByLabelText('Password')

  const submitButton = screen.getByRole('button', {
    name: 'submitButton'
  })

  expect(errorText).not.toBeInTheDocument()


  await userEvent.type(emailInput, 'ismaelcobo@gmail.com')

  await userEvent.type(passwordInput, '1234')
  
  await userEvent.click(submitButton)

  const errorTextAfterSubmit = screen.queryByText('The password you entered should contain 5 or more characters')

  expect(errorTextAfterSubmit).toBeInTheDocument()

})

test('should show confirm password error message on invalid confirm password', async() => {
  

  const errorText = screen.queryByText('The passwords does not match')

  const emailInput = screen.getByRole('textbox', {
    name: 'email'
  })

  const passwordInput = screen.getByLabelText('Password')

  const confirmPasswordInput = screen.getByLabelText(/Repeate password/i)


  const submitButton = screen.getByRole('button', {
    name: 'submitButton'
  })

  expect(errorText).not.toBeInTheDocument()


  await userEvent.type(emailInput, 'ismaelcobo@gmail.com')

  await userEvent.type(passwordInput, '12345')

  await userEvent.type(confirmPasswordInput, '123456')

  
  await userEvent.click(submitButton)

  const errorTextAfterSubmit = screen.queryByText('The passwords does not match')

  expect(errorTextAfterSubmit).toBeInTheDocument()

})

test('should not show error message on all valid inputs', async() => {
  

  const emailInput = screen.getByRole('textbox', {
    name: 'email'
  })

  const passwordInput = screen.getByLabelText('Password')

  const confirmPasswordInput = screen.getByLabelText(/Repeate password/i)


  const submitButton = screen.getByRole('button', {
    name: 'submitButton'
  })

  await userEvent.type(emailInput, 'ismaelcobo@gmail.com')

  await userEvent.type(passwordInput, '123456')

  await userEvent.type(confirmPasswordInput, '123456')

  
  await userEvent.click(submitButton)

  const errorEmailTextAfterSubmit = screen.queryByText('The email you input is invalid')
  const errorPasswordTextAfterSubmit = screen.queryByText('The password you entered should contain 5 or more characters')
  const errorPassword2TextAfterSubmit = screen.queryByText('The passwords does not match')


  expect(errorEmailTextAfterSubmit).not.toBeInTheDocument()
  expect(errorPasswordTextAfterSubmit).not.toBeInTheDocument()
  expect(errorPassword2TextAfterSubmit).not.toBeInTheDocument()

})