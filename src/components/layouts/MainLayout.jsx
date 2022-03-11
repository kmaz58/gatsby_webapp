import React from 'react';
import { Container, Row, Col, Navbar, NavLink } from 'react-bootstrap';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../../images/logo.png"
import contact_icon from "../../images/telephone.png"
import { Link } from "gatsby"
import { BsGearFill } from "@react-icons/all-files/bs/BsGearFill";
import '../../styles/main.scss';

function MainLayout(props) {
    const { children } = props;

    return (
        <>
            <Navbar className="color-nav">
                <Container >
                    <div>

                    </div>
                    <div>
                        <NavLink href="/contact"><img id="contact" src={contact_icon} alt="Contact" height="32" width="32" /></NavLink>
                    </div>
                </Container>
            </Navbar>
            <div className="d-flex">
                <ProSidebar>
                    <Menu iconShape="square">
                        <img id="logo" src={logo} alt="logo_image" />
                        <MenuItem><Link to="/">Dashboard</Link></MenuItem>
                        <MenuItem><BsGearFill /></MenuItem>
                        <MenuItem><Link to="/config/">Settings</Link></MenuItem>
                        <SubMenu title="Components">
                            <MenuItem>Component 1</MenuItem>
                            <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>
                </ProSidebar>
                <Container className="mt-5">
                    <Row>
                        <Col>
                            {children}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}


export default MainLayout;
