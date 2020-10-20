import React from 'react';
import PropTypes from 'prop-types';

function Home(props) {

    return (
        <div>
            <button onClick={() => {
                fetch('config/app.config.json')
                    .then((response) => response.json())
                    .then(data => console.log(data))
                    .catch(ex => console.error(ex));
            }}> Load the config ...
            </button>
        </div>
    );
}

Home.propTypes = {};

export default Home;
