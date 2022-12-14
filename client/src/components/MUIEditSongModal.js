import { useContext, useState } from "react";
import GlobalStoreContext from "../store";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // // width: 400,
    // backgroundColor: "blue",
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState(store.currentSong.title);
    const [artist, setArtist] = useState(store.currentSong.artist);
    const [youTubeId, setYouTubeId] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId,
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal open={store.currentModal === "EDIT_SONG"}>
            <Box sx={style}>
                <div
                    id="edit-song-modal"
                    className="is-visible modal-dialog"
                    data-animation="slideInOutLeft"
                >
                    <div id="edit-song-root" className="modal-root">
                        <div
                            id="edit-song-modal-header"
                            className="modal-header"
                        >
                            Edit Song
                        </div>
                        <div
                            id="edit-song-modal-content"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "30% 70%",
                                gridTemplateRows: "33% 33% 33%",
                                fontSize: "16pt",
                            }}
                        >
                            <div
                                id="title-prompt"
                                className="modal-prompt"
                                style={{
                                    display: "block",
                                    gridArea: "1/1/2/2",
                                }}
                            >
                                Title:
                            </div>
                            <input
                                id="edit-song-modal-title-textfield"
                                className="modal-textfield"
                                type="text"
                                defaultValue={title}
                                onChange={handleUpdateTitle}
                                style={{
                                    display: "block",
                                    gridArea: "1/2/2/3",
                                }}
                            />
                            <div
                                id="artist-prompt"
                                className="modal-prompt"
                                style={{
                                    display: "block",
                                    gridArea: "2/1/3/2",
                                }}
                            >
                                Artist:
                            </div>
                            <input
                                id="edit-song-modal-artist-textfield"
                                className="modal-textfield"
                                type="text"
                                defaultValue={artist}
                                onChange={handleUpdateArtist}
                                style={{
                                    display: "block",
                                    gridArea: "2/2/3/3",
                                }}
                            />
                            <div
                                id="you-tube-id-prompt"
                                className="modal-prompt"
                                style={{
                                    display: "block",
                                    gridArea: "3/1/4/2",
                                }}
                            >
                                You Tube Id:
                            </div>
                            <input
                                id="edit-song-modal-youTubeId-textfield"
                                className="modal-textfield"
                                type="text"
                                defaultValue={youTubeId}
                                onChange={handleUpdateYouTubeId}
                                style={{
                                    display: "block",
                                    gridArea: "3/2/4/3",
                                }}
                            />
                        </div>
                        <div
                            className="modal-footer"
                            id="confirm-cancel-container"
                        >
                            <input
                                type="button"
                                id="edit-song-confirm-button"
                                className="modal-button"
                                value="Confirm"
                                onClick={handleConfirmEditSong}
                            />
                            <input
                                type="button"
                                id="edit-song-cancel-button"
                                className="modal-button"
                                value="Cancel"
                                onClick={handleCancelEditSong}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
