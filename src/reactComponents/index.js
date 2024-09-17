import React, { Fragment } from 'react';

/**
 * This fild contains demo helpers components for examples
 */
export const HeaderWrapper = (props) => {
    const { appName } = props;
    return (
        <Fragment>
            <nav id="" className="navbar navbar-expand-sm navbar-dark bg-teal" role="navigation">
                <div className="container-fluid"></div>
            </nav>
            <header id="gel-header" role="banner">
                <div className="container">
                    <div>
                        <h1>{appName}</h1>
                    </div>
                </div>
            </header>
        </Fragment>
    );
};

export const listWrapper = (
    <div className="card" >
        <h1>List Wrapper</h1>
        List wrapper goes here <br />
        This component is disabled by default using react state.<br />
        This component is updated via featureToggle from backend data source. (SocketIO)
    </div >
);

export const tabWrapper = (
    <div className="card">
        <h1>Tab Wrapper</h1>
        Tab wrapper content goes. <br />This component is enabled by default using react state
    </div>
);

