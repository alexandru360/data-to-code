import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import ResponsiveDrawer from "../../navigation/app-menu";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > svg': {
            margin: theme.spacing(2),
        },
    },
}));

function MaterialIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    );
}

export default function Icon(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MaterialIcon props={props}/>
        </div>
    );
}

Icon.propTypes = {
    props: PropTypes.any
};
