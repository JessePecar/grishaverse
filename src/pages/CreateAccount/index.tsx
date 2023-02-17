import React from 'react';
import * as yup from 'yup';
import {useFormik} from 'formik';
import * as Material from '@mui/material';
import * as MaterialIcon from '@mui/icons-material';
import { NewUser } from '@/stores/interfaces/NewUser';
import { userService } from '@/services/userService';
import Router from 'next/router';

const CreateAccount = () => {

  const signUp = async (form: NewUser) => {
    console.log('Creating a new user');
    let user = await userService.create(form);
    if (user) {
      Router.push('/');
    }
  }

  const newUserSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required().min(6).max(16),
    email: yup.string().email().required(),
  });

  const formikValidator = useFormik({
    validationSchema: newUserSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    },
    onSubmit: (form) => {
      console.log('Form is being submitted');
      signUp(form as NewUser)
    }
  });

  return (
  <Material.Container component="div" maxWidth="xs">
      <Material.CssBaseline />
      <div className="page">
          <Material.Avatar className="avatar">
            <MaterialIcon.LockOutlined />
          </Material.Avatar>
          <Material.Typography component="h1" variant="h5">
            Sign up
          </Material.Typography>
          <form className="form" onSubmit={formikValidator.handleSubmit}>
            <Material.Box sx={{ mt: 3 }}>
              <Material.Grid container spacing={2}>
                <Material.Grid item xs={12} sm={6}>
                  <Material.TextField
                    autoComplete="given-name"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formikValidator.values.firstName}
                    onChange={formikValidator.handleChange}
                    error={formikValidator.touched.firstName && Boolean(formikValidator.errors.firstName)}
                    helperText={formikValidator.touched.firstName && formikValidator.errors.firstName}
                    required
                    fullWidth
                    autoFocus
                  />
                </Material.Grid>
                <Material.Grid item xs={12} sm={6}>
                  <Material.TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    value={formikValidator.values.lastName}
                    onChange={formikValidator.handleChange}
                    error={formikValidator.touched.lastName && Boolean(formikValidator.errors.lastName)}
                    helperText={formikValidator.touched.lastName && formikValidator.errors.lastName}
                    required
                    fullWidth
                  />
                </Material.Grid>
                <Material.Grid item xs={12}>
                  <Material.TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                    value={formikValidator.values.email}
                    onChange={formikValidator.handleChange}
                    error={formikValidator.touched.email && Boolean(formikValidator.errors.email)}
                    helperText={formikValidator.touched.email && formikValidator.errors.email}
                    required
                    fullWidth
                  />
                </Material.Grid>
                <Material.Grid item xs={12}>
                  <Material.TextField 
                        required
                        fullWidth
                        autoFocus
                        margin='normal'
                        variant='standard'
                        label='Password'
                        name='password'
                        autoComplete='password'
                        type='password'
                        value={formikValidator.values.password}
                        onChange={formikValidator.handleChange}
                        helperText={formikValidator.touched.password && formikValidator.errors.password}
                    />
                </Material.Grid>
                <Material.Grid item xs={12}>
                  <Material.Button
                    onClick={() => formikValidator.handleSubmit()}
                    variant="contained"
                    color="primary"
                    className="submit"
                    fullWidth
                  >
                    Sign Up
                  </Material.Button>
                </Material.Grid>
                <Material.Grid item xs={12}>
                  <div className="nav-to-sign-in">
                    <Material.Link href="/Login" variant="body2">
                      Already have an account? Sign in
                    </Material.Link>
                  </div>
                </Material.Grid>
              </Material.Grid> 
          </Material.Box>
        </form>
      </div>
    </Material.Container>
  )
}

export default CreateAccount;