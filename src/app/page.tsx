"use client";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import DialPad from "@/components/Dialpad/DialPad";
import { useState } from "react";

export default function Home() {
  const [showDialPad, setShowDialPad] = useState(false);

  const onCloseModal = () => {
    setShowDialPad(false);
  };

  const onOpenModal = () => {
    setShowDialPad(true);
  };

  return (
    <main className={styles.main}>
      <Header onOpenModal={onOpenModal} />
      {showDialPad && <DialPad onCloseModal={onCloseModal} />}
    </main>
  );
}
