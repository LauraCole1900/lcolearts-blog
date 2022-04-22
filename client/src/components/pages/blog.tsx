import React, { ReactElement, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { DELETE_ENTRY, QUERY_ALL_ENTRIES } from "../../utils/gql";
import PostCard from "../post";
import { ConfirmModal, ErrorModal, SuccessModal } from "../modals";
import { Post } from "../../utils/interfaces";

const Blog = (): ReactElement => {


  // States passed to modals
  const [errThrown, setErrThrown] = useState<string | unknown>();
  const [entryId, setEntryId] = useState<string>();

  // Modal states
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showErr, setShowErr] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // GraphQL variables
  const { loading, data, refetch } = useQuery(QUERY_ALL_ENTRIES, {});

  const [deleteEntry, { error: deleteEntryError, data: deleteEntryData }] = useMutation(DELETE_ENTRY, {
    update(cache, { data: { deleteEntry } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const existingPosts: any = cache.readQuery({ query: QUERY_ALL_ENTRIES });
        // Filter out data returned from the mutation
        const updatedPosts: Post[] = existingPosts!.getAllEntries.filter((post: Post) => post._id !== deleteEntry._id);
        // Update the cache by setting post data to the above-filtered data
        cache.writeQuery({
          query: QUERY_ALL_ENTRIES,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { getAllEntries: updatedPosts },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });
  const entriesArr: Post[] = data?.getAllEntries || [];
  const arrToSort: Post[] = [...entriesArr];
  const sortedEntries: Post[] = arrToSort.sort((a, b) => (a.postDate! < b.postDate!) ? 1 : -1);


  //=====================//
  //    Modal Methods    //
  //=====================//

  // Sets boolean to show or hide relevant modal
  const handleHideConfirm = () => setShowConfirm(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);

  // Shows Confirm modal
  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleDeleteEntry = async (id: string) => {
    console.log({ id });
    handleHideConfirm();
    try {
      const { data } = await deleteEntry({
        variables: { id: id },
      });
      handleShowSuccess();
    } catch (err) {
      console.error(err);
      setErrThrown(err);
      handleShowErr();
    }
  };

  const handleKeyword = (word: string) => {
    console.log({ word });
    // takes user back to blog page--maybe don't do this here?
  }

  if (loading) {
    return <h1>Loading....</h1>
  }


  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <h1>Blog</h1>
          </Col>
        </Row>
        {sortedEntries?.length
          ? <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              <PostCard entries={sortedEntries} setEntryId={setEntryId} handleShowConfirm={handleShowConfirm} handleKeyword={handleKeyword} />
            </Col>
          </Row>
          : <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              <h1>Coming soon!</h1>
            </Col>
          </Row>}

        <ConfirmModal
          entryDelete={() => handleDeleteEntry(entryId!)}
          show={showConfirm === true}
          hide={() => handleHideConfirm()}
        />

        <SuccessModal
          params={[]}
          show={showSuccess === true}
          hide={() => handleHideSuccess()}
        />

        <ErrorModal
          errmsg={errThrown}
          show={showErr === true}
          hide={() => handleHideErr()}
        />

      </Container>
    </>
  )
}

export default Blog;