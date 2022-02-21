import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";
const projectName = "arbuinos";

const FeatureList = [
  {
    title: "Easy to Use",
    // Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        {projectName} is an SDK for building trading arbitrage bots on Tezos
        DeFi
      </>
    ),
  },
  {
    title: "Supports major Tezos DEXes",
    // Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        It works with most liquid DEXes from the Tezos DeFi ecosyshem&nbsp;
        <a href="https://quipuswap.com/">QuipuSwap</a>,{" "}
        <a href="https://plentydefi.com/">PLENTY</a> and more to come...
      </>
    ),
  },
  {
    title: "Extendability in mind",
    // Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your arbitrage bot reusing basic templates.{" "}
        {projectName} can be extended to include more DEXes, complex trading
        paths and custom execution logic. You can choose differnt deployemnt
        options as well as an observability strategies.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {/*<Svg className={styles.featureSvg} alt={title} /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
