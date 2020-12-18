import React from 'react';
import ReactDOM from 'react-dom';

import AxiosApi from '../../../lib/transport/axios_REST/index.js';

// sample components
import { HeaderWrapper } from '../reactComponents/index.js';

const exampleProps = {
    apiConfig: {
        url: 'https://jsonplaceholder.typicode.com/todos',
        options: {}
    }
};
/**
 *  Example react Component for Axios API:
 *  -   connect to api- uses GET
 *  -   display data
  */
class ExampleAxiosAPI extends React.Component {
    constructor(props) {
        super(props);
        //  Step 1: add state level apiData holder
        this.state = {
            apiData: '',
            loading: false
        };

    }
    //  Step 2: Add this helper method to request API data
    loadApiData = () => {
        const { apiConfig: { url } } = this.props;

        const apiWrapper = new AxiosApi(url, '');
        // Trigger loader
        this.setState({
            loading: true
        });

        apiWrapper
            .get()
            .then((res) => {
                // NOTE: be aware of the shape of the respons
                let apiResponse = JSON.stringify(res.data);
                apiResponse = JSON.parse(apiResponse);
                // Mock timer for example only
                setTimeout(() => {
                    this.setState({
                        apiData: apiResponse,
                        loading: false
                    });
                }, 2500);
            })
            .catch((error) => {
                const errorMessage = {
                    statusText: error.response.statusText,
                    statusCode: error.response.status
                };

                this.setState({
                    apiData: `Error: ${errorMessage.statusText} StatusCode: ${error.response.status}`,
                    loading: false
                });
            });
    }

    render() {
        const { apiConfig: { url } } = this.props;
        //  Step 3: access state 
        const { loading, apiData } = this.state;

        // Example content 
        const appName = 'Example of Axios API request';
        const introductionData = (<div className="row">
            <div className="col-12">
                This example has a simple API GET request to data source - {url} - and update the contents of a child component.
            </div>
        </div>);
        const apiDataWrapper = apiData.length && apiData.map((item) => {
            return <li>Title: {item.title} | Completed: {item.completed.toString()}</li>;
        });
        const sampleWrapper = (
            <React.Fragment>
                <button onClick={this.loadApiData} label="Load Data">Load API data:</button><br /><br />
                <h4>Api response below:</h4>
                <div>
                    {/*  Step 4: Add loader, based on statee */}
                    {loading && (<div> Loading...</div>)}
                    {/*  Step 5: Add Data response, based on state */}
                    {!loading && apiData.length ? <div className="card"><ul>{apiDataWrapper}</ul></div> : !loading && 'api data not loaded yet...'}
                </div>
            </React.Fragment>
        )
        const mainWrapper = (
            <main id="gel-main" role="main">
                <section className="container">
                    {introductionData}
                    {sampleWrapper}<br />
                </section>
            </main >
        )
        return (
            <React.Fragment>
                <HeaderWrapper appName={appName} />
                {mainWrapper}
            </React.Fragment >
        )
    }
}

// Rendering method
const rootNode = 'app';
const rootElement = document.getElementById(rootNode);

// Render to page
ReactDOM.render(<ExampleAxiosAPI {...exampleProps} />, rootElement);
