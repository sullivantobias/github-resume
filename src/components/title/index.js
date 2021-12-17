import React, { memo } from "react";

import './index.scss';

/**
 *
 * @param title
 * @param tag
 * @returns {JSX.Element}
 */
const Title = ({ title, tag }) => {
    const CustomTitle = tag ? `h${ tag }` : 'h1';

    return title && (
        <CustomTitle className="cmp-title">
            { title }
        </CustomTitle>
    )
};

export default memo(Title);
