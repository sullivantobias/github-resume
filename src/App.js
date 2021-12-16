import React, { Fragment } from 'react';
import Query from "./graphlql/query";
import USER_QUERY from "./graphlql/queries/user";
import Title from './components/title';
import Image from './components/image';
import Text from './components/text';

const App = () => {
  return (
      <div className="app">
          <Query query={USER_QUERY} variables={{ username: 'sullivantobias'}}>
              {({ data: { user: { name, avatarUrl, bio } } }) =>
                  <Fragment>
                      <Title tag={1} title={name} />
                      <Image props={ { src: avatarUrl, alt: name } }/>
                      <Text text={ bio } />
                  </Fragment>
              }
          </Query>

      </div>
  );
}

export default App;
