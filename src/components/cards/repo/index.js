import React, { memo } from "react";

import './index.scss';

/**
 *
 * @param items
 * @returns {JSX.Element}
 */
const RepoCards = ({ items }) =>
    <div className="cmp-repo-cards">
        { items &&
            items.map(
                ({
                     name,
                     url,
                     forkCount,
                     shortDescriptionHTML,
                     stargazers: { totalCount },
                     languages: { edges }
                 },
                 index
                ) => <div key={ index } className="cmp-repo-cards__item">
                    <a className="cmp-repo-cards__item__url" href={ url }>{ name }</a>
                    <span className="cmp-repo-cards__item__desc">{ shortDescriptionHTML }</span>
                    <div className="cmp-repo-cards__item__languages">
                        { edges && edges.map(({ node: { name } }, index) =>
                            <span
                                key={ index }
                                className="language_name">
                                { name }
                            </span>
                        ) }
                    </div>
                    <span className="cmp-repo-cards__item__forkCount">{ forkCount }</span>
                    <span className="cmp-repo-cards__item__stargazers">stargazers: { totalCount }</span>
                </div>
            ) }
    </div>

export default memo(RepoCards);
