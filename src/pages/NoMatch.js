import React from "react";

import { Col } from "../components/Grid/Col";
import { Row } from "../components/Grid/Row";
import { Container } from "../components/Grid/Container";

import Jumbotron from "../components/Jumbotron/Jumbotron";

const NoMatch = () =>
  <Container fluid>
    <Row>
        <Jumbotron>
          <h1>Page Not Found!</h1>
        </Jumbotron>
    </Row>
  </Container>;

export default NoMatch;