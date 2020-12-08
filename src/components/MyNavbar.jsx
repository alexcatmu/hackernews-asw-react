// import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import AppBar from "@material-ui/core/AppBar";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
//
// const useStyles = makeStyles((theme) => ({
//     toolbar: {
//         borderBottom: `1px solid ${theme.palette.divider}`,
//     },
//     toolbarTitle: {
//         flex: 1,
//     },
//     toolbarSecondary: {
//         justifyContent: 'space-between',
//         overflowX: 'auto',
//     },
//     toolbarLink: {
//         padding: theme.spacing(1),
//         flexShrink: 0,
//     },
// }));
// // all together
// export default function MyNavbar(props) {
//     const classes = useStyles();
//
//     return (
//         <>
//             <AppBar position="static">
//                 <Toolbar>
//                     <Grid
//                         justify="space-between" // Add it here :)
//                         container
//                         spacing={24}
//                     >
//                         <Grid item>
//                             <Typography type="title" color="inherit">
//                                 Hacker News
//                             </Typography>
//                         </Grid>
//                         <Grid item>
//                             <Typography color="inherit">
//                                 <Link color="inherit" href="/newest">new</Link>
//                                 |
//                                 <Link color="inherit" href="/threads/:id">threads</Link>
//                                 |
//                                 <Link color="inherit" href="/ask">ask</Link>
//                                 |
//                                 <Link color="inherit" href="/submit">submit</Link>
//                                 |
//                                 <Link color="inherit" href="/users/:id">usuario</Link>
//                             </Typography>
//                         </Grid>
//
//                         <Grid item>
//                             <div>
//                                 <Button raised color="accent">
//                                     Login
//                                 </Button>
//                             </div>
//                         </Grid>
//                     </Grid>
//                 </Toolbar>
//             </AppBar>
//         </>
//     );
// }
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Toolbar, Typography, List, ListItem,
    withStyles, Grid, SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "@material-ui/core/Link";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "../routes";

const styleSheet = (theme) => ({
    list: {
        width: 200,
    },
    padding: {
        paddingRight: 30,
        cursor: "pointer",
    },

    sideBarIcon: {
        padding: 0,
        color: "white",
        cursor: "pointer",
    },
    toolbar: theme.mixins.toolbar
})


class MyNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {drawerActivate: false, drawer: false};
        this.createDrawer = this.createDrawer.bind(this);
        this.destroyDrawer = this.destroyDrawer.bind(this);
    }

    componentDidMount() {
        if (window.innerWidth <= 600) {
            this.setState({drawerActivate: true});
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 600) {
                this.setState({drawerActivate: true});
            } else {
                this.setState({drawerActivate: false})
            }
        });
    }

    //Small Screens
    createDrawer() {
        return (
            <>
                <AppBar>
                    <Toolbar>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <MenuIcon
                                className={this.props.classes.sideBarIcon}
                                onClick={() => {
                                    this.setState({drawer: true})
                                }}/>

                            <Typography color="inherit" variant="headline">Hacker News</Typography>
                            <Typography color="inherit" variant="headline"/>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <SwipeableDrawer
                    open={this.state.drawer}
                    onClose={() => {
                        this.setState({drawer: false})
                    }}
                    onOpen={() => {
                        this.setState({drawer: true})
                    }}>

                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                            this.setState({drawer: false})
                        }}
                        onKeyDown={() => {
                            this.setState({drawer: false})
                        }}>

                        <List className={this.props.classes.list}>
                            <ListItem key={1} button divider> <Link color="inherit" href={"/newest"}>new</Link>
                            </ListItem>
                            <ListItem key={2} button divider> <Link color="inherit" href={"/threads/:id"}>threads</Link>
                            </ListItem>
                            <ListItem key={3} button divider> <Link color="inherit" href={"/ask"}>ask</Link> </ListItem>
                            <ListItem key={3} button divider> <Link color="inherit" href={"/submit"}>submit</Link>
                            </ListItem>
                            <ListItem key={3} button divider> <Link color="inherit" href={"/users/:id"}>usuario</Link>
                            </ListItem>
                        </List>

                    </div>
                </SwipeableDrawer>

            </>
        );
    }

    //Larger Screens
    destroyDrawer() {
        const {classes} = this.props
        return (
            <>
                <AppBar>
                    <Toolbar>
                        <Typography variant="headline" style={{flexGrow: 1}} color="inherit">Hacker News</Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit">
                            <Link color="inherit" href={"/newest"}>new</Link>
                        </Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit">
                            <Link color="inherit" href={"/threads/:id"}>threads</Link>
                        </Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit">
                            <Link color="inherit" href={"/ask"}>ask</Link>
                        </Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit">
                            <Link color="inherit" href={"/submit"}>submit</Link>
                        </Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit">
                            <Link color="inherit" href={"/users/:id"}>usuario</Link>
                        </Typography>
                        <Typography variant="subheading" className={classes.padding} color="inherit">
                            <Link color="inherit" href={"/login"}>Manage API Key</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </>
        )
    }

    render() {
        return (
            <>
                {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
                <div className={this.props.classes.toolbar}/>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </>
        );
    }
}

MyNavbar.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styleSheet)(MyNavbar);
