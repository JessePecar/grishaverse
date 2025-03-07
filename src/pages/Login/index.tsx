import * as React from 'react';
import * as Material from '@mui/material';
import * as MaterialIcon from '@mui/icons-material';
import { userService } from '@/services/userService';
import Router from 'next/router';

const Login = () => { 
    const [email, setEmail] = React.useState('');    
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const onLogin = async () => {
        setLoading(true);
        
        const user = await userService.login(password, email);
        
        if (user && user !== null) {
            Router.push("/Home");
        } else {
            setPassword('');
            setError('Unable to log in');
        }
        setLoading(false);
    }

    const onCreateAccount = () => {
        Router.push("/CreateAccount");
    }

    return (
        <Material.Container sx={{
            bgcolor: ''
        }} component="div" maxWidth="xs">
            <Material.Box className="page">
                <Material.Avatar className="avatar">
                    <MaterialIcon.LockOutlined />
                </Material.Avatar>
                <Material.Typography component="h1" variant="h5">
                    Sign In
                </Material.Typography>
                <form className="form" noValidate={false}>
                    <Material.TextField 
                        required
                        fullWidth
                        autoFocus
                        margin='normal'
                        variant='standard'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
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
                        value={password}
                        error={error.length > 0 && password.length === 0}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Material.FormControlLabel 
                        control={<Material.Checkbox />}
                        label="Remember me"
                    />
                    <div className="submit-row">
                        <span className="submit">
                            <Material.Button fullWidth disabled={loading} variant='outlined' className="submit" onClick={onCreateAccount}>
                                Create an Account
                            </Material.Button>
                        </span>
                        <span className="submit">
                            <Material.Button type='button' fullWidth disabled={!password || !email || loading} variant='contained' color='primary' onClick={onLogin}>
                                Sign In
                            </Material.Button>
                        </span>
                    </div>
                </form>
            </Material.Box>
        </Material.Container>
    );
}

export default Login;