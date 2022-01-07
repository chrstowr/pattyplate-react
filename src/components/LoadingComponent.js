import React from 'react';
import ReactLoading from 'react-loading';

export const Loading = (props) => { 
    return (
        <div className="col">
                <ReactLoading 
                    type={props.type ? props.type : 'balls'} 
                    color={props.color ? props.color : '#ffffff'} 
                    height={props.height ? props.height : 600} 
                    width={props.width ? props.width : 600} />
        </div>
    );
};