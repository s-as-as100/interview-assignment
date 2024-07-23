// src/Header.tsx
import React, { Dispatch, SetStateAction } from "react";
import styles from "./Header.module.css";
import callIcon from "../../assets/call.svg";
import Image from "next/image";

type HeaderProps = {
  onOpenModal: () => void;
};

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <h1 className={styles.title}>Team</h1>
      </div>
      <div className={styles.header_right}>
        <div className={styles.header_side} onClick={onOpenModal}>
          <Image src={callIcon} alt="callIcon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
