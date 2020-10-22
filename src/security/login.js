import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Login() {
    const [state, setState] = React.useState({
        gilad: true
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
                <TextField required id="standard-required" label="User name" defaultValue="" />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <br/>
                <br/>
                <Button variant="contained">Default</Button>
                <Button variant="contained">Default</Button>
                <br/>
                <hr/>
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
        </FormControl>
    );
}
