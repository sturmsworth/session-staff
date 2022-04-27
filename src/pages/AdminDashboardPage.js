import React, { useContext } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";

import AdminChooseYear from "../components/AdminChooseYear";
// import AdminFilterSettings from "../components/AdminFilterSettings";
import AdminTable from "../components/AdminTable";
import AdminPersonalInfoModal from "../components/AdminPersonalInfoModal";
import AdminEmergencyInfoModal from "../components/AdminEmergencyInfoModal";
import AdminAttachmentsModal from "../components/AdminAttachmentsModal";

import { adminColumns } from "../utils/tableConstants";

const AdminDashboardPage = () => {
  const { tableMetaData, tableLoading, year } = useContext(TableDataContext);
  // const [showCompletedChecked, setShowCompletedChecked] = useState(false);

  return (
    <Container className="py-5 text-center">
      <Row className="pt-3 mt-5">
        <Col>
          <span className="h3 cinzel">{`${year} Session Staff Data`}</span>
        </Col>
      </Row>

      <Row>
        <Col>
          <AdminChooseYear />
        </Col>
      </Row>

      {/* <Row className="pt-2 mt-2">
        <Col>
          <AdminFilterSettings
            showCompletedChecked={showCompletedChecked}
            setShowCompletedChecked={setShowCompletedChecked}
          />
        </Col>
      </Row> */}

      <Row>
        <Col>
          {tableLoading ? (
            <div>Loading...</div>
          ) : (
            // <div>Done Loading!</div>
            <AdminTable columns={adminColumns} data={tableMetaData} />
          )}
        </Col>
      </Row>

      <AdminPersonalInfoModal />
      <AdminEmergencyInfoModal />
      <AdminAttachmentsModal />
    </Container>
  );
};

export default AdminDashboardPage;
