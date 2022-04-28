import { ReactElement, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, Params, useParams } from "react-router-dom";
import { ApolloCache, useMutation, useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { TagCloud } from "react-tagcloud";
import { DELETE_ENTRY, QUERY_ALL_ENTRIES } from "../../utils/gql";
import PostCard from "../post";
import { ConfirmModal, ErrorModal, SuccessModal } from "../modals";
import { Post } from "../../utils/interfaces";

interface TagObj {
  value: string
  count: number
}


const Blog = (): ReactElement => {

  //=================//
  //      Hooks      //
  //=================//

  const params: Readonly<Params<string>> = useParams();
  let navigate: NavigateFunction = useNavigate();


  //=================//
  //      State      //
  //=================//

  const [pageReady, setPageReady] = useState<boolean>(false);
  const [entriesToRender, setEntriesToRender] = useState<Array<Post>>([]);
  const [tagsToRender, setTagsToRender] = useState<Array<Object>>([]);
  const color: { luminosity: string, hue: string, format: string } = {
    luminosity: "dark",
    hue: "#031105",
    format: "hex"
  }

  // States passed to modals
  const [errThrown, setErrThrown] = useState<string | unknown>();
  const [entryId, setEntryId] = useState<string>();

  // Modal states
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showErr, setShowErr] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);


  //=================//
  //     GraphQL     //
  //=================//

  const { loading, data, refetch } = useQuery(QUERY_ALL_ENTRIES, {});

  const [deleteEntry, { error: deleteEntryError, data: deleteEntryData }] = useMutation(DELETE_ENTRY, {
    update(cache: ApolloCache<any>, { data: { deleteEntry } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const existingPosts: any = cache.readQuery({ query: QUERY_ALL_ENTRIES });
        // Filter out data returned from the mutation
        const updatedPosts: Post[] = existingPosts!.getAllEntries.filter((post: Post): boolean => post._id !== deleteEntry._id);
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
  const handleShowConfirm = () => setShowConfirm(true);


  //=================//
  //     Methods     //
  //=================//

  const handleDeleteEntry = async (id: string): Promise<void> => {
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

  const handleKeyword = (word: string): void => {
    console.log({ word });
    navigate(`/tags/${word}`)
  };


  //=================//
  //    Tag Cloud    //
  //=================//

  const fetchTags = (): string[] | void => {
    let allTags: string[] = [];
    sortedEntries.map((entry: Post): string[] => {
      allTags = allTags.concat(entry.postKeywords);
      return allTags;
    });
    createTagObjectsForCloud(allTags);
  };

  const createTagObjectsForCloud = (tags: string[]): TagObj[] | void => {
    let mappedTags: TagObj[] = [{ value: "", count: 0 }];
    tags.map((tag: any): Object[] => {
      let count: number = 0;
      mappedTags.forEach((currentTagObj: TagObj): TagObj[] => {
        if (!Object.values(currentTagObj).includes(0) || Object.values(currentTagObj).includes(tag)) {
          return tag;
        } else {
          for (let j: number = 0; j < tags.length; j++) {
            if (tags[j] === tag) {
              ++count
            }
          }
          mappedTags = [...mappedTags, { value: tag, count: count }]
          count = 0;
        }
        return mappedTags;
      });
      return mappedTags;
    });
    filterTagObjectsForCloud(mappedTags);
  };

  const filterTagObjectsForCloud = (tagArr: TagObj[]): TagObj[] | void => {
    let dedupedTags: TagObj[] = [];
    tagArr = tagArr.filter(tag => tag.value !== "");
    const map = new Map();
    for (const tag of tagArr) {
      if (!map.has(tag.value)) {
        map.set(tag.value, true);
        dedupedTags.push({
          value: tag.value,
          count: tag.count
        })
      }
    }
    setTagsToRender(dedupedTags);
  };


  //=================//
  //  Run on render  //
  //=================//

  useEffect((): void => {
    if (entriesArr?.length) {
      fetchTags();
      if (Object.keys(params).length) {
        const filteredEntries: Post[] = sortedEntries.filter((post: Post): boolean => post.postKeywords.includes(params.tag!));
        setEntriesToRender(filteredEntries);
        setPageReady(true);
      } else {
        setEntriesToRender(sortedEntries);
        setPageReady(true);
      }
    }
  }, [entriesArr, params]);


  //================//
  //  Conditionals  //
  //================//

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

            <Col sm={3} className="centered">
              <h3>Tags</h3>
              <TagCloud
                minSize={12}
                maxSize={48}
                tags={tagsToRender}
                colorOptions={color}
                onClick={(e: any) => handleKeyword(e.value)}
              />
            </Col>
          </Row>

          <ConfirmModal
            entryDelete={() => handleDeleteEntry(entryId!)}
            show={showConfirm === true}
            hide={() => handleHideConfirm()}
          />

          <SuccessModal
            show={showSuccess === true}
            hide={() => handleHideSuccess()}
          />

          <ErrorModal
            show={showErr === true}
            hide={() => handleHideErr()}
          />

        </Container>
      }
    </>
  )
}

export default Blog;