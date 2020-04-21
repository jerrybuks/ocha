import React from 'react'
import { withRouter } from 'react-router-dom';


import {useStyles} from './styles.js'
import { Button } from '@material-ui/core';

const Home = withRouter(props => <HomeContainer {...props}/>)

function HomeContainer(props) {

    const classes = useStyles();
    const handleAuth = (value) =>{
        props.history.push({pathname:`/auth`, state : value})
    }
    return (
        <div>
            <header className={classes.header}>
                <div className={classes.headerContainer}>
                    <div className={classes.headerContainerLeft}>
                       Stop managing waste the wrong way. Manage Waste the right way.
                    </div>
                    <div>
                      <Button variant="outlined"  size="large" className={classes.root} onClick={()=>handleAuth("sign in")}>sign in</Button>
                        <Button variant="contained" size="large"  onClick={()=>handleAuth("sign up")}>sign up</Button>
                    </div>
                </div>
            </header>
            
        </div>
    )
}

export default Home