import React, { useState, useEffect } from 'react'
import {Paper, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom';
import Logo from "../../Components/Logo/Logo";
import firebase from '../../firebase';


const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
			width: 500,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '90%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		marginTop: theme.spacing(3),
	},
})


const Login = (props)=> {

    const { classes } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(()=>{
		document.title = "Login";
		if (firebase.getCurrentUsername()) 
			props.history.replace('../Main/Main');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	const login =  () => {
		firebase.login(email, password).then(res => {
			props.history.replace('/main');
		}).catch(err => window.confirm(err));
	}	
    return(
        <main className={classes.main} style={{marginTop: '30px'}}>
            <Logo value="Login to your Odelivery account"/>
            <Paper className={classes.paper} style={{marginBottom: '25px'}}>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={login}
						className={classes.submit}>
						Sign in
          			</Button>
                      <p style={{marginTop: '20px'}}>No account yet? <Link to="/signup" style={{textDecoration: 'none'}}>Get Started for free</Link></p>
				</form>
			</Paper>
        </main>
	);
}

// style={{display: 'flex',flexDirection: 'row', flexWrap:'wrap', justifyContent: 'flex-start'}}
export default withRouter(withStyles(styles)(Login));