// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const projectName = "arbuinos";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: projectName,
  tagline: "Tezos DEX arbitrage bot",
  url: `https://${projectName}.8kb.dev`,
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "f-finance", // Usually your GitHub org/user name.
  projectName, // Usually your repo name.
  plugins: ["./docusuarusWebpack5Plugin"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: projectName,
        logo: {
          alt: `${projectName} logo`,
          src: `img/${projectName}.png`,
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Quick Start",
          },
          {
            href: `https://github.com/f-finance/${projectName}`,
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
              {
                label: "Icons created by Freepik",
                href: "https://www.flaticon.com/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ${projectName} Built with Docusaurus for Tezos DeFi Hackathon 2022 by f-finance team`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
