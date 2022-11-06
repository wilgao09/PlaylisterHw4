import { useContext } from "react";
import { useHistory } from "react-router-dom";
import SongCard from "./SongCard.js";
import MUIEditSongModal from "./MUIEditSongModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { GlobalStoreContext } from "../store/index.js";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    } else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    if (!store.currentList) {
        let id = props.match.params.id;
        store.setCurrentList(id);
        return (
            <div
                style={{
                    textAlign: "center",
                    fontSize: "45pt",
                    overflow: "scroll",
                    height: "100%",
                }}
            >
                You need access to this playlist. And you don't.
                <img src="https://gumlet.assettype.com/afkgaming%2Fimport%2Fmedia%2Fimages%2F55143-08bf98e6a4535406acafc015adf99434.jpeg?format=auto" />
            </div>
        );
    }

    return (
        <Box
            sx={{
                height: "80%",
                overflow: "scroll",
            }}
        >
            <List
                id="playlist-cards"
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                }}
            >
                {store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={"playlist-song-" + index}
                        key={"playlist-song-" + index}
                        index={index}
                        song={song}
                    />
                ))}
            </List>
            {modalJSX}
        </Box>
    );
}

export default WorkspaceScreen;
