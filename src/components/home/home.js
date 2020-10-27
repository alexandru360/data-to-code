import React from 'react';
import PropTypes from 'prop-types';

function Home(props) {
    let dt = null;
    return (
        <div>
            <button onClick={() => {
                fetch('config/app.config.json')
                    .then((response) => response.json())
                    .then(data => {
                        dt = data;
                        console.log(data);
                    })
                    .catch(ex => console.error(ex));
            }}> Load the config ...
            </button>
            {dt}
        </div>
    );
}

Home.propTypes = {};

export default Home;
