import React, { useEffect, useState } from "react";
import {
  getAllGateways,
  getGatewayById,
  createGateway,
  deleteGateway,
  updateGateway,
} from "../api/gateway";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  CircularProgress,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

const Home = () => {
  const [gateways, setGateways] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");
  const [id, setid] = useState("");
  const [name, setName] = useState("");
  const [ipv4, setipv4] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    if (!editing) {
      setUid("");
      setName("");
      setipv4("");
    }
  };
  const handleClose = () => {
    setOpen(false);
    setEditing(false);
  };
  const navigate = useNavigate();

  const handleEdit = async (id) => {
    const response = await getGatewayById(id);
    setid(id);
    setOpen(true);
    setUid(response.data.gateway.uid);
    setName(response.data.gateway.name);
    setipv4(response.data.gateway.ipv4);
  };

  const saveChanges = async () => {
    const response = await updateGateway(id, uid, name, ipv4);
    if (response.status === 200) {
      const res = await getAllGateways();
      if (res.status === 200) {
        setGateways(res.data);
      }
      setOpen(false);
      setEditing(false);
    } else {
      console.log(response);
    }
  };
  const handleDelete = async (id) => {
    const response = await deleteGateway(id);
    if (response.status === 200) {
      setGateways(
        gateways.filter((gateway) => gateway._id !== response.data.data._id)
      );
    } else {
      console.log(response);
    }
  };

  const handleCreate = async (e) => {
    const response = await createGateway(uid, name, ipv4);
    if (response.status === 201) {
      setOpen(false);
      loadGateways();
    } else {
      console.log(response);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px #325ca8 ",
    boxShadow: 24,
    p: 4,
  };

  async function loadGateways() {
    setLoading(true)
    const res = await getAllGateways();
    if (res.status === 200) {
      setGateways(res.data);
    }
    setLoading(false)
  }

  useEffect(() => {
    loadGateways();
  }, [setGateways]);

  return (
    <>
      <div className="flex justify-center">
        <div className="my-20">
          {loading ? (
            <div className="flex my-80">
              <div className="justify-center text-xl">
              <div className="ml-4">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
              </div>
                <p>Loading...</p>
              </div>
              
              
              
            </div>
            
          ) : (
            <div>
              <div className="flex justify-center">
                <span className="uppercase text-blue-600 text-4xl font-bold">
                  Gateways
                </span>
              </div>

              <div className="flex justify-end mb-4">
                <Tooltip title="Add new gateway">
                  <Button
                    variant="contained"
                    className="hover:scale-110 w-[120px]"
                    style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
                    onClick={handleOpen}
                  >
                    <AddBoxIcon className="mr-2 " />
                    <p className="pt-1">NEW</p>
                  </Button>
                </Tooltip>
              </div>
              <div className="w-[850px] h-[400px] ">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">UID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">IPv4</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {gateways.map((gateway, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center"> {gateway.uid} </TableCell>
                          <TableCell align="center">{gateway.name}</TableCell>
                          <TableCell align="center">{gateway.ipv4}</TableCell>
                          <TableCell align="center">
                            <div className="flex justify-center">
                              <div>
                                <Tooltip title="Details">
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    className="cursor-pointer hover:scale-110"
                                    onClick={() => {
                                      navigate(`/gateway/${gateway._id}`);
                                    }}
                                  >
                                    <VisibilityIcon />
                                  </Button>
                                </Tooltip>
                              </div>
                              <div className="ml-2">
                                <Tooltip title="Edit">
                                  <Button
                                    variant="contained"
                                    className="cursor-pointer hover:scale-110"
                                    onClick={() => {
                                      setEditing(true);
                                      handleEdit(gateway._id);
                                    }}
                                  >
                                    <EditIcon />
                                  </Button>
                                </Tooltip>
                              </div>
                              <div className="ml-2">
                                <Tooltip title="Delete">
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                      handleDelete(gateway._id);
                                    }}
                                    className="cursor-pointer hover:scale-110"
                                    style={{
                                      backgroundColor: "#eb4034",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Tooltip>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="rounded-lg">
          <form>
            <div className="flex justify-center mb-4 font-bold text-blue-700">
              <span className="text-xl">
                {editing ? "EDIT GATEWAY" : "NEW GATEWAY"}
              </span>
            </div>
            <div>
              <TextField
                className="w-full"
                type="text"
                label="UID"
                name="uid"
                value={uid}
                onChange={(e) => {
                  setUid(e.target.value);
                }}
                placeholder="Gateway's UID"
              />
            </div>
            <div className="mt-4">
              <TextField
                className="w-full"
                value={name}
                type="text"
                label="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Gateway's Name"
              />
              <div className="mt-4">
                <TextField
                  className="w-full"
                  value={ipv4}
                  type="text"
                  label="IPv4 Address"
                  onChange={(e) => {
                    setipv4(e.target.value);
                  }}
                  placeholder="Gateway's IPv4 Address"
                />
              </div>
              <div className="mt-4  flex justify-center">
                <div className="mt-2">
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-[200px] hover:scale-110"
                    style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
                    onClick={editing ? saveChanges : handleCreate}
                  >
                    <SaveIcon className="hover:scale-110 mr-2" />
                    {editing ? "Save Changes" : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
