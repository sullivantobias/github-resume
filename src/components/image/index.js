import React from "react";

import './index.scss';

const Image = ({ props }) =>
    <div className="cmp-image">
        <img alt={props.alt} {...props} />
    </div>

export default Image;
