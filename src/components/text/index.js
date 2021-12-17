import React, { memo } from "react";

import './index.scss';

/**
 *
 * @param text
 * @param link
 * @returns {JSX.Element}
 */
const Text = ({ text, link }) => link ?
    <a href={ link } target={ '_blank' } rel='noopener noreferrer'>
        <p className="cmp-text">{ text }</p>
    </a>
    : text && <p className="cmp-text">{ text }</p>

export default memo(Text);
