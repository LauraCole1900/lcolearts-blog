import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, Params, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { TagCloud } from "react-tagcloud";
import { DELETE_ENTRY, QUERY_ALL_ENTRIES } from "../../utils/gql";
import PostCard from "../post";
import { ConfirmModal, ErrorModal, SuccessModal } from "../modals";
import { Post } from "../../utils/interfaces";

const Blog = (): ReactElement => {

  const params: Readonly<Params<string>> = useParams();
  let navigate = useNavigate();

  const [pageReady, setPageReady] = useState<boolean>(false);
  const [entriesToRender, setEntriesToRender] = useState<Array<Post>>([]);
  const [tagsToRender, setTagsToRender] = useState<Array<Object>>([]);
  const color = {
    luminosity: "dark",
    hue: "#031105"
  }

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

  const fetchTags = (): string[] | void => {
    let allTags: string[] = [];
    let mappedTags: Object[] = [{}];
    sortedEntries.map((entry: Post): string[] => {
      console.log("tags", entry.postKeywords);
      allTags = allTags.concat(entry.postKeywords);
      return allTags;
    });
    console.log({ allTags });
    allTags.map((tag: any): Object[] => {
      let count: number = 0;
      console.log("values", Object.values(mappedTags));
      if (Object.values(mappedTags).includes(tag)) {
        console.log("includes", tag);
        return tag;
      } else {
        for (let i = 0; i < allTags.length; i++) {
          if (allTags[i] === tag) {
            ++count
          }
        }
        mappedTags = [...mappedTags, { value: tag, count: count }]
        count = 0;
      }
      console.log({ mappedTags });
      return mappedTags;
    })
    setTagsToRender(mappedTags);
  }

  // allTags.map((tag: any): Object[] => {
  //   let count: number = 0;
  //   // iterate through mappedTags array
  //   // check each key to see if it matches the current tag
  //   // if yes, increment the value
  //   // if no, add an object with the tag as a key and the value of 1
  //   for (const obj of mappedTags) {
  //     if (tag in obj) {
  //       count++;
  //       mappedTags = [...mappedTags, { mappedTags[tag]: count }];
  //       count = 0;
  //     } else {
  //       mappedTags = [...mappedTags, { tag: 1 }];
  //     }
  //   }
  //   console.log({ mappedTags });
  //   return mappedTags;
  // })


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
    navigate(`/tags/${word}`)
  };

  useEffect(() => {
    if (entriesArr?.length) {
      fetchTags();
      if (Object.keys(params).length) {
        const filteredEntries = sortedEntries.filter((post: Post): boolean => post.postKeywords.includes(params.tag!));
        setEntriesToRender(filteredEntries);
        setPageReady(true);
      } else {
        setEntriesToRender(sortedEntries);
        setPageReady(true);
      }
    }
  }, [entriesArr, params]);


  if (loading) {
    return <h1>Loading....</h1>
  }


  return (
    <>
      {pageReady === true &&
        <Container>
          <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              <h1>Blog</h1>
            </Col>
          </Row>

          <Row>
            {entriesToRender?.length
              ? <Col sm={{ span: 8, offset: 1 }}>
                <PostCard entries={entriesToRender} setEntryId={setEntryId} handleShowConfirm={handleShowConfirm} handleKeyword={handleKeyword} />
              </Col>
              : <Col sm={{ span: 8, offset: 1 }}>
                <h1>Coming soon!</h1>
              </Col>}

            <Col sm={2}>
              <TagCloud
                minSize={12}
                maxSize={48}
                tags={tagsToRender}
                colorOptions={color}
                onClick={(e: any) => handleKeyword(e.value[0])}
              />
            </Col>
          </Row>

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
      }
    </>
  )
}

export default Blog;