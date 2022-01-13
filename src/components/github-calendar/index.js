import React, { memo } from "react";
import ReactTooltip from "react-tooltip";
import GitHubCalendar from 'react-github-calendar';

import './index.scss';

/**
 *
 * @param username
 * @returns {JSX.Element}
 */
const GithubCalendar = ({ username }) =>
    <GitHubCalendar hideTotalCount username={ username }>
        <ReactTooltip html/>
    </GitHubCalendar>

export default memo(GithubCalendar);
