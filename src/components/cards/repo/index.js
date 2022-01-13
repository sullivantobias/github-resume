import React, { memo } from "react";
import { GoStar, GoRepoForked } from "react-icons/go";
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
                        { edges && edges.slice(0, 4).map(({ node: { name, color } }, index) =>
                                <div className='language__wrapper'>
                                    <span className="language__color" style={ { backgroundColor: color } }/>
                                    <span
                                        key={ index }
                                        className="language__name">
                        { name }
                            </span>
                                </div>
                        ) }
                    </div>
                    <div className="cmp-repo-cards__item__bottom">
                        <div className="cmp-repo-cards__item__stargazers">
                            <GoStar/>{ totalCount }
                        </div>
                        <div className="cmp-repo-cards__item__forkCount">
                            <GoRepoForked/>{ forkCount }
                        </div>
                    </div>
                </div>
            ) }
    </div>

export default memo(RepoCards);
