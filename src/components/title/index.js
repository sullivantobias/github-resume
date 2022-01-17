import React, { memo } from "react";

/**
 *
 * @param {string} title
 * @param {number} tag
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
