import React from 'react';
import {Spinner} from 'reactstrap';

export const Loading = (props) => {
    return (
        <div className="col mx-auto my-auto">
            <Spinner color="success">Loading...</Spinner>
        </div>
    );
};