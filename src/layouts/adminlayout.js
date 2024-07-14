import Top from "../components/top";
import Footer from "../components/footer";
import React, { Fragment } from "react";
import "../styles/defaultlayout.css";
import { Container, Row ,Col , Table} from "react-bootstrap";
import SideBar from "../components/sidebar";

export default function AdminLayout({
  className = "container fluid",
  children,
}) {
  return (
    <>
      <Container fluid>
        <Top />
        {/* <div className={className}>{children}</div> */}
        <Container>
            <Row>
                <Col xs= {2}>
                    <SideBar />
                </Col>
                <Col xs= {10}>
             {children}
                </Col>
            </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
}
