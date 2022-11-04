import { useContext } from "react";
import AuthContext from "../auth";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function MUIDeleteModal() {
    const { auth } = useContext(AuthContext);
    console.log("content");
    console.log(AuthContext);
    console.log("STORE STATE");
    console.log(auth);

    return (
        <Modal open={auth.failedLogin || auth.failedRegister ? true : false}>
            <Box sx={style}>
                <div className="modal-dialog">
                    <header className="dialog-header">Failed Operation</header>
                    <div>
                        <Alert severity="error">
                            {auth.failedLogin
                                ? auth.failedLogin
                                : auth.failedRegister}
                        </Alert>
                    </div>
                    <div
                        id="confirm-cancel-container"
                        style={{ backgroundColor: "#eeeee4" }}
                    >
                        <Button onClick={() => auth.resetFailure()}>Ok</Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
