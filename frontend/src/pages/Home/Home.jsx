import React from "react";
import styles from "./Home.module.css";
import { Link, useHistory } from "react-router-dom";
import Card from "../../components/shared/card/Card";
import Button from "../../components/shared/button/Button";

const Home = () => {
  const history = useHistory();

  const startRegister = () => {
    history.push("/authenticate");
  };

  return (
    <div className={styles.cardWapper}>
      <Card title="Welcome to CodersHouse!" icon="logo">
        <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>
        <div>
          <Button text="Let's Go" onClick={startRegister} />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
