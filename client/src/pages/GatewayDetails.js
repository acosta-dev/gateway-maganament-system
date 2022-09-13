import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createPeripheral,
  updatePeripheral,
  deleteGateway,
} from "../api/peripherals";
import { getGatewayById } from "../api/gateway";

import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Modal,
  Box,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

const GatewayDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pid, setPid] = useState("");
  const [peripherals, setPeripherals] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [uid, setUId] = useState("");
  const [vendor, setVendor] = useState("");
  const [active, setActive] = useState(false);

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

  const handleOpen = (isEditing, euid, evendor, estatus, epid) => {
    setEditing(isEditing);
    if (!isEditing) {
      setUId("");
      setVendor("");
      setActive(false);
    } else {
      setUId(euid);
      setVendor(evendor);
      setActive(estatus);
      setPid(epid);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    const response = await createPeripheral(uid, vendor, active, id);
    if (response.status === 201) {
      const res = await getGatewayById(id);
      if (res.status === 200) {
        setName(res.data.gateway.name);
        setPeripherals(res.data.peripheral);
      }
      setOpen(false);
    } else {
      console.log(response);
    }
  };

  const handleDelete = async (did) => {
    const response = await deleteGateway(did);
    if (response.status === 200) {
      setPeripherals(
        peripherals.filter(
          (peripheral) => peripheral._id !== response.data.peripheral._id
        )
      );
      setOpen(false);
    } else {
      console.log(response);
    }
  };
  const handleEdit = async () => {
    const response = await updatePeripheral(pid, uid, vendor, active, id);
    if (response.status === 200) {
      setEditing(false);
      loadPeripherals();
      setOpen(false);
    } else {
      console.log(response);
    }
  };

  async function loadPeripherals() {
    const res = await getGatewayById(id);
    if (res.status === 200) {
      setName(res.data.gateway.name);
      setPeripherals(res.data.peripheral);
    }
  }

  useEffect(() => {
    loadPeripherals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPeripherals]);

  return (
    <div>
      <div className="flex justify-center my-20">
        <div>
          <div className="flex justify-center mb-4">
            <div>
              <div >
                <span className="text-blue-600 text-4xl font-bold">{name}</span>
              </div>
              <div className="flex justify-center">
                <div>
                  <span className="text-1xl font-bold text-blue-600 uppercase">
                    peripherals
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  navigate(-1);
                }}
                className="hover:scale-110"
              >
                <div className="mr-2">
                  <ArrowBackIcon />
                </div>
                BACK
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  setEditing(false);
                  handleOpen();
                }}
                style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
                className="hover:scale-110"
              >
                <div className="mr-2">
                  {" "}
                  <AddBoxIcon />
                </div>
                NEW
              </Button>
            </div>
          </div>

          <div className="w-[850px] h-[400px] ">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">UID</TableCell>
                    <TableCell align="center">Vendor</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {peripherals.map((peripheral, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center"> {peripheral.uid} </TableCell>
                      <TableCell align="center">{peripheral.vendor}</TableCell>
                      <TableCell align="center">
                        {peripheral.status ? "ACTIVE" : "INACTIVE"}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
                          <div>
                            <Tooltip title="Edit">
                              <Button
                                variant="contained"
                                className="cursor-pointer hover:scale-110"
                                onClick={() => {
                                  handleOpen(
                                    true,
                                    peripheral.uid,
                                    peripheral.vendor,
                                    peripheral.status,
                                    peripheral._id
                                  );
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
                                className="cursor-pointer hover:scale-110"
                                onClick={() => {
                                  handleDelete(peripheral._id);
                                }}
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
                {editing ? "EDIT PERIPHERAL" : "NEW PERIPHERAL"}
              </span>
            </div>
            <div>
              <TextField
                className="w-full"
                type="text"
                label="UID"
                value={uid}
                onChange={(e) => {
                  setUId(e.target.value);
                }}
                name="uid"
                placeholder="Peripheral's UID"
              />
            </div>
            <div className="mt-4">
              <TextField
                className="w-full"
                type="text"
                label="Vendor"
                value={vendor}
                onChange={(e) => {
                  setVendor(e.target.value);
                }}
                placeholder="Peripheral's Vendor"
              />
              <div className="flex justify-center">
                <FormGroup className="mt-4">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={active}
                        onChange={(e) => {
                          setActive(e.target.checked);
                        }}
                      />
                    }
                    label="Active?"
                  />
                </FormGroup>
              </div>
              <div className="mt-4  flex justify-center">
                <div className="mt-2">
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-[200px] hover:scale-110"
                    style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
                    onClick={!editing ? handleCreate : handleEdit}
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
    </div>
  );
};

export default GatewayDetails;
