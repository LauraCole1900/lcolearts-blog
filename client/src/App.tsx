import React, { ReactElement } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Navigation from "./components/navbar";
import { Blog, BlogEntry, LoginPage, NotFound } from "./components/pages";
import Footer from "./components/footer";
import './App.css';


//=====================//
//      Functions      //
//=====================//

// Creates Apollo Client http link for GraphQL operations
const httpLink: ApolloLink = createHttpLink({
  uri: "/graphql"
});

// Sets authentication into context
const authLink: ApolloLink = setContext((_, { headers }) => {
  const token: string | null = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

// Instantiates the client object and the cache object with some specific options
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          oneConcert: {
            merge: true
          },
          addRepertoire: {
            merge: true
          }
        }
      }
    }
  })
});

const App = (): ReactElement => {


  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Navigation />
          <Container fluid className="mycontainer">
            <Routes>
              <Route path="/" element={<Blog />} />
              <Route path="/blog/*" element={<BlogEntry />} />
              <Route path="/log_me_in" element={<LoginPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
          <Footer />
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
