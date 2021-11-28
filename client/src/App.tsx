import React, { ReactElement } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Navigation from "./components/navbar";
import { Blog, BlogEntry, NotFound } from "./components/pages";
import Footer from "./components/footer";
import './App.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
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
