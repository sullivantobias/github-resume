import React, { Fragment, useState, useRef } from 'react';
import Query from "./graphql/query";
import USER_QUERY from "./graphql/queries/user";
import Title from './components/title';
import Image from './components/image';
import Text from './components/text';
import Cards from "./components/cards";
import GithubCalendar from "./components/github-calendar";

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
                            createdAt,
                            followers,
                            following,
                            pinnedItems: { nodes }
                        } = user;

                        const creationDate = new Date(createdAt);
                        const fullDate = `${ creationDate.getFullYear() }-${ creationDate.getMonth() + 1 }-${ creationDate.getDate() }`

                        return (
                            <Fragment>
                                <Title tag={ 1 } title={ name }/>
                                <Image props={ { src: avatarUrl, alt: name } }/>
                                <Text text={ bio }/>

                                { nodes && <Cards items={ nodes }/> }
                                <span>Followers { followers.totalCount }</span>
                                <span>Followers { following.totalCount }</span>

                                <div>
                                    <span>{ location }</span>
                                    <span>{ websiteUrl }</span>
                                </div>
                                <span>Creation: { fullDate }</span>

                                <GithubCalendar username={ username }/>
                            </Fragment>
                        )
                    } }
                </Query> : contributionDom()
            }
        </div>
    );
}

export default App;
