import React from "react";

import './index.scss';

const Text = ({ text, link }) => link ?
        <a href={ link } target={'_blank'} rel='noopener noreferrer'>
            <p className="cmp-text">{ text }</p>
        </a>
        : <p className="cmp-text">{ text }</p>

export default Text;
