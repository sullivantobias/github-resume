import React from 'react';
import { useQuery } from "@apollo/client";
import Loader from "../components/loader";
import Error from "../components/error";

/**
 *
 * @param children
 * @param query
 * @param variables
 * @returns {JSX.Element|*}
 */
const Query = ({ children, query, variables, logoutElement }) => {
    const { data, loading, error } = useQuery(query, {
        variables
    });

    if (loading) return <Loader/>;
    if (error) return <Error logoutElement={ logoutElement } message={ error.message }/>;

    return children({ data });
};

export default Query;
