"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./DialPad.module.css";
import Image from "next/image";
import crossIcon from "../../assets/cancel.svg";
import avatarIcon from "../../assets/avatar.jpg";
import callIcon from "../../assets/phone-call.png";
import cancelCall from "../../assets/missed-call.png";

type DialPadProps = {
  onCloseModal: () => void;
};

const DialPad: React.FC<DialPadProps> = ({ onCloseModal }) => {
  const [input, setInput] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{
    name: string;
    number: string;
    type: string;
  } | null>(null);
  const [selectedNumber, setSelectedNumber] = useState("");

  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCall = (contact: {
    name: string;
    number: string;
    type: string;
  }) => {
    setSelectedContact(contact);
    setIsCalling(true);
    setTime(0);
    setIsRunning(true);
    setInput("");
  };

  const handleEndCall = () => {
    console.log("Ending call with number:", selectedNumber); // Debug log

    setIsCalling(false);
    setInput("");
  };

  const handleCallByNumber = () => {
    console.log("Initiating call with number:", input); // Debug log

    setIsCalling(true);
    setTime(0);
    setIsRunning(true);
    setSelectedNumber(input);
    // setInput("");
  };

  const buttons = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
    { number: "*", letters: "" },
    { number: "0", letters: "" },
    { number: "#", letters: "" },
  ];

  const contacts = [
    { name: "John Doe", number: "1547687895", type: "Home" },
    { name: "John Doe", number: "1234557893", type: "Business" },
    { name: "John Doe", number: "1579563457", type: "Mobile" },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.number.includes(input)
  );

  const callScreenButton = [
    { number: "1", name: "Hold" },
    { number: "2", name: "Mute" },
    { number: "3", name: "New Call" },
    { number: "4", name: "Conference" },
    { number: "5", name: "Transfer" },
    { number: "6", name: "Att. transfer" },
    { number: "7", name: "Record" },
    { number: "8", name: "Keypad" },
    { number: "9", name: "Video" },
    { number: "*", name: "" },
    { number: "0", name: "" },
    { number: "#", name: "" },
  ];

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (time >= 300) {
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [time]);

  return (
    <div className={styles.modal}>
      <div className={styles.dialPad}>
        <div>
          {isCalling ? (
            <div className={styles.selectedCalling}>
              <span className={styles.nameSelect}>{selectedContact?.name}</span>
              <span className={styles.numberSelect}>
                {selectedContact?.number ?? input}
              </span>
              <span style={{ color: "white", fontSize: "10px" }}>
                {" "}
                {formatTime(time)}
              </span>
            </div>
          ) : (
            <>
              <div className={styles.crossIconContainer} onClick={onCloseModal}>
                <Image
                  src={crossIcon}
                  alt="cross icon"
                  className={styles.cross}
                />
              </div>
              <div className={styles.display}>
                {input || "Enter Name/Number "}
              </div>
            </>
          )}
        </div>
        <div className={styles.buttons}>
          {isCalling
            ? callScreenButton.map((button) => (
                <button key={button.number} className={styles.button}>
                  <div className={styles.button_label}>
                    <span className={styles.number}>{button.number}</span>
                    <span className={styles.letters}>{button.name}</span>
                  </div>
                </button>
              ))
            : buttons.map((button) => (
                <button
                  key={button.number}
                  className={styles.button}
                  onClick={() => handleButtonClick(button.number)}
                >
                  <div className={styles.button_label}>
                    <span className={styles.number}>{button.number}</span>
                    <span className={styles.letters}>{button.letters}</span>
                  </div>
                </button>
              ))}

          <button className={styles.button} onClick={handleBackspace}>
            ⌫
          </button>
          <span
            className={styles.callConnect}
            onClick={isCalling ? handleEndCall : handleCallByNumber}
          >
            <Image
              alt="call"
              src={isCalling ? cancelCall : callIcon}
              style={{
                width: "60px",
                height: "60px",
                cursor: "pointer",
              }}
            />
          </span>
          <button className={styles.button} onClick={handleClear}>
            C
          </button>
        </div>
        {input && (
          <div className={styles.contactList}>
            {filteredContacts.map((contact, index) => (
              <div
                key={index}
                className={styles.contactItem}
                onClick={() => handleCall(contact)}
              >
                <Image
                  src={avatarIcon}
                  alt="Avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <div className={styles.name}>{contact.name}</div>
                  <div className={styles.labelTemplate}>
                    {contact.number} ({contact.type})
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DialPad;
