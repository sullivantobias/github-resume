import React, { Fragment, useState, useRef, useEffect } from 'react';

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
    GoArrowLeft,
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
    const [code, setCode] = useState(undefined)
    const [token, setToken] = useState(undefined)
    const input = useRef(undefined);
    const tokenInput = useRef(undefined);

    const handleSubmit = event => {
        event.preventDefault()
        setUsername(input.current.value);
    }

    const handleToken = event => {
        event.preventDefault()
        const token = tokenInput.current.value;

        if (token) {
            setToken(token)
            localStorage.setItem('token', token);
        }
    }

    const handleCode = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const token = localStorage.getItem('token');

        setCode(code);
        setToken(token);
    }

    const contributionDom = () =>
        <form className="app-form" onSubmit={ handleSubmit }>
            <GoMarkGithub/>
            <input placeholder='Github username' ref={ input } type="text" className="username"/>
            <button type="submit" className="submit">Go</button>
        </form>

    const tokenDom = () => {
        return (
            !token && !code ?
                <div className="code">
                    <a
                        href={ `https://github.com/login/oauth/authorize?client_id=81985586e6b07c42ca38` }>
                        Click here to auth
                    </a>
                    <Text
                        text="Because github doesn't allow CORS Policy to call their API by JS, i'll did a workaround with two steps to do to use the APP. Enjoy."/>
                </div>
                :
                !token &&
                <form onSubmit={ handleToken } className="token">
                    <a
                        href={ `https://github.com/login/oauth/access_token?client_secret=d3888b30957285d9429eb2aff54f786101c5f45a&client_id=81985586e6b07c42ca38&code=${ code }` }>
                        Get Access Token
                    </a>
                    <input pattern="gho_[0-9a-zA-Z]{36}" placeholder='Put your access token'
                           ref={ tokenInput }
                           type="text"
                           className="token"/>
                    <button type='submit'>Access The App</button>
                </form>
        )
    }

    useEffect(() => {
        handleCode()
    }, []);

    return (
        <div className="app">
            { tokenDom() }
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
                : token && contributionDom()
            }
        </div>
    );
}

export default App;
