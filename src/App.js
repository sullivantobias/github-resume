import React, { Fragment, useState, useRef } from 'react';

import Query from "./graphql/query";

import USER_QUERY from "./graphql/queries/user";
import RepoCards from "./components/cards/repo";
import GithubCalendar from "./components/github-calendar";
import Header from "./components/header";
import SimpleCard from "./components/cards/simple";
import Title from "./components/title";
import Text from "./components/text";

import {
    GoGitCommit,
    GoIssueOpened,
    GoGitPullRequest,
    GoRepoPull,
    GoOrganization,
    GoLink,
    GoMarkGithub,
    GoArrowLeft
} from "react-icons/go";
import { IoIosLogOut, IoMdMap } from "react-icons/io";
import { MdOutlineRememberMe } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";

import './commons/styles/app.scss';

/**
 * App
 * @returns {JSX.Element}
 */
const App = () => {
    const [username, setUsername] = useState('')
    const input = useRef(undefined);

    const handleSubmit = () => setUsername(input.current.value);

    const contributionDom = () =>
        <form onSubmit={ handleSubmit }>
            <GoMarkGithub/>
            <input placeholder='github username' ref={ input } type="text" className="username"/>
            <button type="submit" className="submit">Go</button>
        </form>

    return (
        <div className="app">
            { username ?
                <Query query={ USER_QUERY } variables={ { username } } logoutElement={
                    <div className='back' onClick={ () => setUsername(undefined) }>
                        <GoArrowLeft/> get back to form
                    </div>
                }>
                    { ({ data: { user } }) => {
                        const {
                            name,
                            avatarUrl,
                            bio,
                            url,
                            location,
                            websiteUrl,
                            contributionsCollection: {
                                contributionCalendar: {
                                    totalContributions
                                },
                                totalCommitContributions,
                                totalIssueContributions,
                                totalPullRequestContributions,
                                totalRepositoriesWithContributedPullRequests
                            },
                            repositories: {
                                totalCount
                            },
                            createdAt,
                            followers,
                            following,
                            pinnedItems: { nodes }
                        } = user;

                        const creationDate = new Date(createdAt);
                        const fullDate = `${ creationDate.getFullYear() }-${ creationDate.getMonth() + 1 }-${ creationDate.getDate() }`

                        return (
                            <Fragment>
                                <Header
                                    logoutElement={
                                        <IoIosLogOut
                                            onClick={ () => setUsername(undefined) }
                                        />
                                    }
                                    name={ name }
                                    avatar={ avatarUrl }/>
                                <div className="content">
                                    { bio &&
                                        <blockquote className="content__bio">
                                            <p>{ bio }</p>
                                        </blockquote>
                                    }
                                    <div className="content__left">
                                        <SimpleCard value={ totalContributions || 'Zero' }
                                                    text='Total Contributions'
                                                    desc='All the contributions from the past year'
                                                    isBig/>
                                        <Title title="Details" tag={ 5 }/>
                                        <SimpleCard icon={ <GoGitCommit/> }
                                                    value={ totalCommitContributions || 'Zero' }
                                                    text='Commits'/>
                                        <SimpleCard icon={ <GoIssueOpened/> }
                                                    value={ totalIssueContributions || 'Zero' }
                                                    text='Issues'/>
                                        <SimpleCard icon={ <GoGitPullRequest/> }
                                                    value={ totalPullRequestContributions || 'Zero' }
                                                    text='Pull Requests'/>
                                        <SimpleCard icon={ <GoRepoPull/> }
                                                    value={ totalRepositoriesWithContributedPullRequests || 'Zero' }
                                                    text='Repositories'/>
                                        <Title title="More" tag={ 5 }/>
                                        <div className="more">
                                            <div className="followers">
                                                <GoOrganization/>
                                                <Text
                                                    text={ `${ followers.totalCount } followers - ${ following.totalCount } following` }/>
                                            </div>
                                            { url && <div className="profile">
                                                <GoLink/>
                                                <Text link={ url } text={ url }/>}
                                            </div>
                                            }
                                            { websiteUrl && <div className="website">
                                                <CgWebsite/>
                                                <Text link={ websiteUrl } text={ websiteUrl }/>
                                            </div>
                                            }
                                            { location && <div className="location">
                                                <IoMdMap/>
                                                <Text text={ location }/>
                                            </div>
                                            }
                                            { fullDate && <div className="member">
                                                <MdOutlineRememberMe/>
                                                <Text text={ fullDate }/>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="content__right">
                                        <SimpleCard value={ totalCount || 'Zero' }
                                                    text='Total Repositories'
                                                    desc='All the repositories from the account'
                                                    isBig/>
                                        <Title title="Pinned Repositories" tag={ 5 }/>
                                        { nodes && <RepoCards items={ nodes.slice(0, 3) }/> }
                                    </div>

                                    <div className="content__bottom">
                                        <GithubCalendar username={ username }/>
                                    </div>
                                </div>

                            </Fragment>
                        )
                    } }
                </Query>
                : contributionDom()
            }
        </div>
    );
}

export default App;
