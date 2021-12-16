import React from "react";

import './index.scss';

const Title = ({ title, tag }) => {
    const CustomTitle = tag ? `h${ tag }` : 'h1';

    return (
        <CustomTitle className="cmp-title">
            { title }
        </CustomTitle>
    )
};

export default Title;
