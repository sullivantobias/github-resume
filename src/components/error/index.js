import React from "react";
import Title from "../title";

import './index.scss';

/**
 * Error component
 * @param {String} message
 * @param {JSX.Element} logoutElement
 * @returns {JSX.Element}
 */
const Error = ({ message, logoutElement }) =>
    <div className="cmp-error">
        <Title tag={ 3 } title={ message }/>
        { logoutElement }
    </div>

export default Error;
