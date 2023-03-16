import { ReactElement, useEffect, useMemo, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { ApolloCache, useMutation, useQuery } from "@apollo/client";
import { Col, Container, Image, Row, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { DELETE_SONG, QUERY_ALL_SONGS } from "../../utils/gql";
import { Song } from "../../utils/interfaces";
import { ConfirmModal, ErrorModal, SuccessModal } from "../modals";
import { Checkmark, CloseIcon, EditIcon } from "../../pix";
import Auth from "../../utils/auth";
import { sortAsc, sortDesc } from "../../utils/helpers";

const Music = (): ReactElement => {

  //=================//
  //      Hooks      //
  //=================//

  const params: Readonly<Params<string>> = useParams();


  //=================//
  //      State      //
  //=================//

  const [pageReady, setPageReady] = useState<boolean>(false);
  const [songsToRender, setSongsToRender] = useState<Array<Song>>([]);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('');

  // States passed to modals
  const [btnName, setBtnName] = useState();
  const [errThrown, setErrThrown] = useState<string | undefined>();
  const [songId, setSongId] = useState<string>();

  // Modal states
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showErr, setShowErr] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);


  //=================//
  //     GraphQL     //
  //=================//

  const { loading, data, refetch } = useQuery(QUERY_ALL_SONGS, {});

  const [deleteSong, { error: deleteSongError, data: deleteSongData }] = useMutation(DELETE_SONG, {
    update(cache: ApolloCache<Song>, { data: { deleteSong } }) {
      try {
        // Retrieve existing song data that is stored in the cache
        const existingSongs: any = cache.readQuery({ query: QUERY_ALL_SONGS });
        // Filter out data returned from the mutation
        const updatedSongs: Song[] = existingSongs!.getAllSongs.filter((song: Song): boolean => song._id !== deleteSong._id);
        // Update the cache by setting song data to the above-filtered data
        cache.writeQuery({
          query: QUERY_ALL_SONGS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { getAllSongs: updatedSongs },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });
  const songsArr: Song[] = useMemo(() => { return data?.getAllSongs || [] }, [data?.getAllSongs]);
  const arrToSort: Song[] = [...songsArr];
  let sortedSongs: Song[] = arrToSort.sort((a, b) => (a.songTitle! > b.songTitle!) ? 1 : -1);

  //=====================//
  //    Modal Methods    //
  //=====================//

  // Sets boolean to show or hide relevant modal
  const handleHideConfirm = () => setShowConfirm(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);
  const handleShowConfirm = (id: any) => {
    setSongId(id);
    setShowConfirm(true);
  }


  //=================//
  //     Methods     //
  //=================//

  const handleDeleteSong = async (id: string): Promise<void> => {
    handleHideConfirm();
    try {
      const { data } = await deleteSong({
        variables: { id: id },
      });
      handleShowSuccess();
    } catch (err: any) {
      console.error(err);
      setErrThrown(err);
      handleShowErr();
    }
  };

  // Handles column sorting
  const handleColumnSort = (col: string): Array<Song> | void => {
    const endOffset: number = itemOffset + 15;
    switch (sortBy) {
      case `${col}-asc`:
        switch (col) {
          case col:
            sortedSongs = sortDesc(songsArr, col);
            setSortBy(`${col}-desc`);
            break;
          default:
            sortedSongs = sortAsc(songsArr, col);
            setSortBy(`${col}-asc`);
        };
        break;
      default:
        switch (col) {
          case col:
            sortedSongs = sortAsc(songsArr, col);
            setSortBy(`${col}-asc`);
            break;
          default:
            sortedSongs = sortDesc(songsArr, col);
            setSortBy(`${col}-desc`);
        };
    };
    setSongsToRender(sortedSongs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedSongs.length / 15));
  }

  // Handles click on table headers
  const handleColumnClick = (e: any): void => {
    const column: string = e.currentTarget.dataset.col;
    handleColumnSort(column);
  }

  // Handles click on pagination navigation
  const handlePageClick = (e: any): void => {
    const newOffset: number = (e.selected * 15);
    setItemOffset(newOffset);
  };


  //=================//
  //  Run on render  //
  //=================//

  useEffect((): void => {
    const endOffset: number = itemOffset + 15;
    if (songsArr?.length) {

      if (sortBy === '') {
        handleColumnSort("songTitle");
      } else {
        const sortByArr = sortBy.split('-');
        if (sortByArr[1] === 'asc') {
          sortedSongs = sortAsc(songsArr, sortByArr[0]);
        } else {
          sortedSongs = sortDesc(songsArr, sortByArr[0]);

        }
      }

      setSongsToRender(sortedSongs.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(sortedSongs.length / 15));
      setCurrentPage(Math.round(itemOffset / 15));

      setPageReady(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songsArr, sortBy, itemOffset, params]);


  // Set tab text on initial render
  useEffect((): void => {
    document.title = `Music Catalog`
  }, []);


  //================//
  //  Conditionals  //
  //================//

  if (loading) {
    return <h1>Loading....</h1>
  }

  return (
    <Container>
      <Row>
        <Col sm={{ span: 10, offset: 1 }}>
          {songsArr.length === 0
            ? <h1>No compositions found</h1>
            : <>
              <h1>Compositions</h1>

              {pageCount > 1 &&
                <Row className="centered">
                  <Col sm={{ span: 8, offset: 1 }} className="pagination music-pagination top-pagination">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="< previous"
                      forcePage={currentPage}
                    />
                  </Col>
                </Row>}

              <Table striped bordered hover className="ltBg">
                <thead>
                  <tr className="bottomed">
                    <td className="textCenter clickable" data-col="songMajorWork" onClick={handleColumnClick}>MW</td>
                    <td className="clickable" data-col="songTitle" onClick={handleColumnClick}>Title</td>
                    <td className="clickable" data-col="songVoicing" onClick={handleColumnClick}>Voicing</td>
                    <td className="clickable" data-col="songAccompaniment" onClick={handleColumnClick}>Accompaniment</td>
                    <td className="clickable" data-col="songSacred" onClick={handleColumnClick}>Sacred?</td>
                    <td className="clickable" data-col="songLiturgy" onClick={handleColumnClick}>Liturgical Season</td>
                    <td className="clickable" data-col="songYear" onClick={handleColumnClick}>© Year</td>
                  </tr>
                </thead>
                <tbody>
                  {songsToRender.map(song =>
                    <tr key={song._id}>
                      {song.songMajorWork === true
                        ? <td><Image fluid src={Checkmark} alt="Major Work" className="iconSmall" /></td>
                        : <td></td>}
                      <td><a href={`/music/${song._id}`}>{song.songTitle}</a></td>
                      <td>{song.songVoicing}</td>
                      <td>{song.songAccompaniment}</td>
                      {song.songSacred === true
                        ? <td>Sacred</td>
                        : <td>Secular</td>}
                      {song.songSacred === true
                        ? <td>{song.songLiturgy}</td>
                        : <td></td>}
                      {song.songYear
                        ? <td>{song.songYear}</td>
                        : <td></td>}
                      {Auth.loggedIn() &&
                        <>
                          <td><a href={`/edit_song/${song._id}`} title="Edit"><Image data-popover="Edit" alt="Edit" src={EditIcon} className="iconSmall actionIcon" /></a></td>
                          <td><Image data-popover="Delete" alt="Delete" src={CloseIcon} className="iconSmall actionIcon" onClick={() => handleShowConfirm(song._id)} /></td>
                        </>}
                    </tr>
                  )}
                </tbody>
              </Table>
            </>}
        </Col>
      </Row>

      {pageCount > 1 &&
        <Row className="centered">
          <Col sm={{ span: 8, offset: 1 }} className="pagination music-pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              forcePage={currentPage}
            />
          </Col>
        </Row>}

      <ConfirmModal
        entryDelete={() => handleDeleteSong(songId!)}
        show={showConfirm === true}
        hide={() => handleHideConfirm()}
      />

      <SuccessModal
        btnname={btnName}
        params={[]}
        show={showSuccess === true}
        hide={() => handleHideSuccess()}
      />

      <ErrorModal
        btnname={btnName}
        errmsg={errThrown}
        show={showErr === true}
        hide={() => handleHideErr()}
      />

    </Container>
  )
}

export default Music;