import { ReactElement, useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { ApolloCache, useMutation, useQuery } from "@apollo/client";
import { Col, Container, Image, Row, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { DELETE_SONG, QUERY_ALL_SONGS } from "../../utils/gql";
import { Song } from "../../utils/interfaces";
import { ConfirmModal, ErrorModal, SuccessModal } from "../modals";
import { Checkmark, CloseIcon, EditIcon } from "../../pix";
import Auth from "../../utils/auth";

const Music = (): ReactElement => {

  //=================//
  //      Hooks      //
  //=================//

  const params: Readonly<Params<string>> = useParams();
  let navigate: NavigateFunction = useNavigate();


  //=================//
  //      State      //
  //=================//

  const [pageReady, setPageReady] = useState<boolean>(false);
  const [songsToRender, setSongsToRender] = useState<Array<Song>>([]);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const color: { luminosity: string, hue: string, format: string } = {
    luminosity: "dark",
    hue: "#031105",
    format: "hex"
  }

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
        const updatedSongs: Song[] = existingSongs!.getAllSongs.filter((song: Song): boolean => song._id !== deleteSong.id);
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
  const songsArr: Song[] = data?.getAllSongs || [];
  const arrToSort: Song[] = [...songsArr];
  const sortedSongs: Song[] = arrToSort.sort((a, b) => (a.songTitle! > b.songTitle!) ? 1 : -1);

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

  // Handles click on pagination navigation
  const handlePageClick = (e: any): void => {
    const newOffset: number = (e.selected * 30);
    setItemOffset(newOffset);
  };


  //=================//
  //  Run on render  //
  //=================//

  useEffect((): void => {
    if (songsArr?.length) {
      const endOffset: number = itemOffset + 15;
      setSongsToRender(sortedSongs.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(sortedSongs.length / 15));
      setPageReady(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songsArr, itemOffset, params]);


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
              <Table striped bordered hover>
                <thead>
                  <tr className="bottomed">
                    <td className="centered">MW</td>
                    <td>Title</td>
                    <td>Voicing</td>
                    <td>Accompaniment</td>
                    <td>Sacred?</td>
                    <td>Liturgical Season</td>
                    <td>© Year</td>
                  </tr>
                </thead>
                <tbody>
                  {sortedSongs.map(song =>
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
        <Row>
          <Col sm={{ span: 8, offset: 1 }} className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
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