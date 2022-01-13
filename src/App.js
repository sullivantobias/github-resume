import React, { Fragment, useState, useRef } from 'react';

import Query from "./graphql/query";

import USER_QUERY from "./graphql/queries/user";
import RepoCards from "./components/cards/repo";
import GithubCalendar from "./components/github-calendar";
import Header from "./components/header";
import SimpleCard from "./components/cards/simple";
import Title from "./components/title";

import { GoGitCommit, GoIssueOpened, GoGitPullRequest, GoRepoPull } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";

import './commons/styles/app.scss';

const App = () => {
    const [username, setUsername] = useState('')
    const input = useRef(undefined);

    const handleSubmit = () => setUsername(input.current.value);

    const contributionDom = () =>
        <form onSubmit={ handleSubmit }>
            <input ref={ input } type="text" className="username"/>
            <button type="submit" className="submit">Go</button>
        </form>

    return (
        <div className="app">
            { username ?
                <Query query={ USER_QUERY } variables={ { username } }>
                    { ({ data: { user } }) => {
                        const {
                            name,
                            avatarUrl,
                            bio,
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
                                    <blockquote className="content__bio">
                                        <p>{ bio }</p>
                                    </blockquote>
                                    <div className="content__left">
                                        <SimpleCard value={ totalContributions || 'Zero' }
                                                    text='Total Contributions'
                                                    desc='All the contributions from the past year'
                                                    isBig/>
                                        <Title title="Details Contributions" tag={ 5 }/>
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
                                    </div>
                                    <div className="content__right">
                                        <SimpleCard value={ totalCount || 'Zero' }
                                                    text='Total Repositories'
                                                    desc='All the repositories from the account'
                                                    isBig/>
                                        <Title title="Pinned Repositories" tag={ 5 }/>
                                        { nodes && <RepoCards items={ nodes }/> }
                                    </div>

                                    <div className="content__bottom">
                                        <GithubCalendar username={ username }/>
                                    </div>
                                </div>

                            </Fragment>
                        )
                    } }
                </Query> : contributionDom()
            }
        </div>
    );
}

export default App;
