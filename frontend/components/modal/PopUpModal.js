import React from "react";
import ProfileCardComponent from "../UserProfileCard/ProfileCardComponent";

// reactstrap components
import {
  Button,
  Modal,
  Row,
  Col,
} from "reactstrap";

function PopUpModal({user,onClose}) {
  const [modalDefaultOpen, setModalDefaultOpen] = React.useState(true);
  return (

    <>
      <Row>
        <Col md="4">
          <Modal
            isOpen={modalDefaultOpen}
            toggle={() => setModalDefaultOpen(false)}
          >
            <div className=" modal-header">
              <h6 className=" modal-title" id="modal-title-default">
                Detail of {user.first_name + " " + user.last_name}
              </h6>
              <button
                aria-label="Close"
                className=" close"
                onClick={() => setModalDefaultOpen(false)}
                type="button"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className=" modal-body">
              <p>
                First Name: <b>{user.first_name}</b><br></br><br></br>
                Last Name: <b>{user.last_name}</b><br></br><br></br>
                Email: <b>{user.email}</b>
              </p>
            </div>
            <div className=" modal-footer">
              {/* <Button color="primary" type="button">
                Save changes
              </Button> */}
              <Button
                className=" ml-auto"
                color="link"
                onClick={() => { setModalDefaultOpen(false); onClose()}}
                type="button"
              >
                Close
              </Button>
            </div>
          </Modal>
        </Col>
        
      </Row>
    </>
  );
}

export default PopUpModal;