import { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, GraphQLRequest, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Footer from "./components/footer";
import Navigation from "./components/navbar";
import { Blog, BlogEntry, LandingPage, LoginPage, Music, NotFound, PostForm, SongForm, SongPage } from "./components/pages";
import './App.css';


//=====================//
//      Functions      //
//=====================//

// Creates Apollo Client http link for GraphQL operations
const httpLink: ApolloLink = createHttpLink({
  uri: "/graphql"
});

// Sets authentication into context
const authLink: ApolloLink = setContext((_: GraphQLRequest, { headers }: any) => {
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
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog/page/:pageNum" element={<Blog />} />
              <Route path="/blog/:blogId" element={<BlogEntry />} />
              <Route path="/blog" element={<Navigate to="/blog/page/1" replace={true} />} />
              <Route path="/edit_post/:postId" element={<PostForm />} />
              <Route path="/edit_song/:songId" element={<SongForm />} />
              <Route path="/log_me_in" element={<LoginPage />} />
              <Route path="/music/page/:pageNum" element={<Music />} />
              <Route path="/music/:songId" element={<SongPage />} />
              <Route path="/music" element={<Navigate to="/music/page/1" replace={true} />} />
              <Route path="/new_post" element={<PostForm />} />
              <Route path="/new_song" element={<SongForm />} />
              <Route path="/tags/:tag" element={<Blog />} />
              <Route path="/tags/:tag/:pageNum" element={<Blog />} />
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
