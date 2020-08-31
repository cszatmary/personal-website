import React, { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar as RSNavbar, NavbarToggler, Nav, NavItem, Collapse, Container } from "reactstrap";

import styles from "@/styles/components/Navbar.module.scss";
import { classNames } from "@/utils/mod";
import { LogoImg } from "./LogoImg";

export interface NavbarProps {
  className?: string;
  brandText?: string;
  brandLink?: string;
  items: Map<string, string>;
}

export const Navbar: FunctionComponent<NavbarProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function toggle(): void {
    setIsOpen(!isOpen);
  }

  function handleItemClicked(): void {
    if (isOpen) {
      setIsOpen(false);
    }
  }

  const items: JSX.Element[] = [];
  for (const [item, link] of props.items) {
    let active: undefined | string;
    // Need to add this check or `/` will match every link
    const path = router.pathname;
    if ((path === "/" && link === "/") || (path.startsWith(link) && link !== "/")) {
      active = "active";
    }

    items.push(
      <NavItem key={item}>
        <Link href={link}>
          <a className={classNames("nav-link pl-2", active)} onClick={handleItemClicked}>
            {item.toUpperCase()}
          </a>
        </Link>
      </NavItem>,
    );
  }

  return (
    <RSNavbar
      className={classNames(styles.csNavbar, props.className)}
      dark
      // fixed="top"
      expand="md"
      role="navigation"
    >
      <Container>
        {/* Navbar Brand */}
        <Link href={props.brandLink ?? "/"}>
          <a className="navbar-brand mr-auto" onClick={handleItemClicked}>
            <LogoImg version="mixed" />
            {props.brandText ? (
              <span className="d-none d-md-inline pl-2">{props.brandText}</span>
            ) : null}
          </a>
        </Link>
        <NavbarToggler className={styles.csNavToggler} onClick={toggle}>
          <span className={classNames("navbar-toggler-icon", styles.csTogglerIcon)} />
        </NavbarToggler>
        {/* Navbar Body */}
        <Collapse className="pl-2" isOpen={isOpen} navbar>
          <Nav className={classNames("ml-auto", styles.navbarBody)} navbar>
            {items}
          </Nav>
        </Collapse>
      </Container>
    </RSNavbar>
  );
};
