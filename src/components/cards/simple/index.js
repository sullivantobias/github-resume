import React, { memo } from "react";
import classNames from "classnames";

import Title from "../../title";
import Text from "../../text";

import './index.scss';

/**
 *
 * @param {number || string} value
 * @param {string} text
 * @param {JSX.Element} icon
 * @param {boolean} isBig
 * @returns {JSX.Element}
 */
const SimpleCard = ({ value, text, desc = '', icon, isBig = false }) =>
    <div className={ classNames('cmp-simple-card',
        { 'isBig': isBig }
    ) }>
        { !isBig &&
            <div className="cmp-simple-card__icon">
                { icon }
            </div>
        }
        <div className='cmp-simple-card__info'>
            <Title title={ value } tag={ isBig ? 1 : 2 }/>
            <Text text={ text }/>
            <Text text={ desc }/>
        </div>
    </div>

export default memo(SimpleCard);
