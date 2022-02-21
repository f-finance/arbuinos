import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

import { findArbitrage } from "../components/arbitrage";
/* import { TezosToolkit } from "@taquito/taquito"; */
import { initDexFunctions, ENV, DEX } from "../components/storage";
import { watch } from "../components/watch:client";

function Arbuinos() {
  const ulRef = useRef(null);

  useEffect(async () => {
    ConsoleLogHTML.connect(ulRef.current, {}, false); // Redirect log messages
    console.log("Hello! I'm a bot build based on @arbuinos SDK");
    setTimeout(
      () =>
        console.log(
          "As a demo bot I'm only looking for an opportunities at QuipuSwap and PLENTY without execution ..."
        ),
      1500
    );
    setTimeout(
      () =>
        console.log(
          "So you can try to exploit arbitrages manually if you are faster then other bots :)"
        ),
      4000
    );
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://api.tzkt.io/v1/events")
      .build();

    await connection.start();

    const state = {
      tezos: new taquito.TezosToolkit(ENV.TEZOS_RPC_HOST),
      dexState: {},
    };

    for (const dex of ENV.USED_DEX) {
      state.dexState[dex] = await initDexFunctions[dex](state);
      console.log(
        `${Object.keys(DEX).find((key) => DEX[key] == dex)} is initialised`
      );
    }

    await watch(
      state.dexState,
      ({ newDexState }) => {
        findArbitrage({ ...state, dexState: newDexState }).then(
          (arbitrages) => {
            if (arbitrages.length > 0) {
              console.log(
                "Just found arbitrages!",
                JSON.stringify(arbitrages, null, 2)
              );
            }
          }
        );
      },
      connection
    );
  });
  return (
    <ul ref={ulRef} className={clsx(styles.consoleContainer)} style={{}}></ul>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [isRunning, startBot] = useState(null);
  return (
    <>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <img src="img/arbuinos.png" />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <button
              className="button button--secondary button--lg"
              onClick={() => (!isRunning ? startBot(true) : startBot(null))}
            >
              {!isRunning ? "Run demo bot" : "Stop demo bot"}
            </button>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              Learn how to build your own
            </Link>
          </div>
          <div className={clsx(styles.terminal)}>
            {isRunning && <Arbuinos />}
          </div>
        </div>
      </header>
    </>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Head>
        <script src="browser/signalr.min.js"></script>
        <script
          type="application/javascript"
          src="//cdn.rawgit.com/Alorel/console-log-html/master/console-log-html.min.js"
        ></script>
        <script
          src="https://unpkg.com/@taquito/taquito@11.2.0-beta-RC.0/dist/taquito.min.js"
          crossorigin="anonymous"
          integrity="sha384-xxD6xXwrySOXsNY/7nuDQL14yoB/rz8DYUc3lPfDpaWrICSCUFXqpG1Mp44N9BA1"
        ></script>
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
