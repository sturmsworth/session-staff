import { Container, Spinner, Stack } from "react-bootstrap";

const Loading = () => {
  return (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100 text-center">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="secondary" />
        </div>
      </Stack>
    </Container>
  );
};

export default Loading;
