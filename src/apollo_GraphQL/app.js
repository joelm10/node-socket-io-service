import ApolloAPI from '../../lib/transport/apollo_GraphQL';

/**
 *
 */
const init = () => {
    try {
        console.log('should triggger apollo client');

        const { qry, uri } = testData.apollo;
        //  Setup query wrapper
        const graphQL = new ApolloAPI(uri);
        //  Send request
        graphQL.sendRequest(qry);
    } catch (e) {
        console.warn(`error: ${e}`);
    }
};

// Test apollo client
const testData = {
    apollo: {
        qry: `{
        rates(currency: "USD") {
          currency
        }
      }`,
        uri: 'https://48p1r2roz4.sse.codesandbox.io'
    }
};

init();
