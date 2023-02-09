import * as React from 'react';
import * as Material from '@material-ui/core';
import * as MaterialIcon from '@material-ui/icons';
import '@/styles/App.css';
import '@/styles/Login/Login.css'

const Login = () => { 
    return (
        <Material.Container component="div" maxWidth="xs">
            <div className="page">
                <Material.Avatar className="avatar">
                    <MaterialIcon.LockOutlined />
                </Material.Avatar>
                <Material.Typography component="h1" variant="h5">
                    Sign In
                </Material.Typography>
                <form className="form" noValidate>
                    <Material.TextField 
                        required
                        fullWidth
                        autoFocus
                        margin='normal'
                        variant='standard'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                    />
                    <div className="submit-row">
                        <Material.FormControlLabel 
                            control={<Material.Checkbox />}
                            label="Remember me"
                            />
                        <Material.Button className="submit">
                            Sign In
                        </Material.Button>
                    </div>
                </form>
            </div>
        </Material.Container>
    );
}

export default Login;