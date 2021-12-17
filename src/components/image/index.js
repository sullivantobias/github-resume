import React, { memo } from "react";

import './index.scss';

/**
 *
 * @param props
 * @returns {JSX.Element}
 */
const Image = ({ props }) =>
    props.src && <div className="cmp-image">
        <img alt={ props.alt } { ...props } />
    </div>

export default memo(Image);
