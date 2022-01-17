import React, { memo } from "react";

import Image from "../image";
import Title from "../title";

import './index.scss';

/**
 *
 * @param {string} avatar
 * @param {string} name
 * @param {JSX.Element} logoutElement
 * @returns {JSX.Element}
 * @constructor
 */
const Header = ({ avatar, name, logoutElement }) => {
    return (
        <header className="cmp-header">
            <div className="cmp-header__avatar">
                <Image alt={ name } props={ { src: avatar } }/>
            </div>
            <div className="cmp-header__name">
                <Title title={ name } tag={ 5 }/>
            </div>
            <div className="cmp-header__logout">
                { logoutElement }
            </div>
        </header>
    )
};

export default memo(Header);
