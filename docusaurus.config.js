const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'NIG supercomputer',
    tagline: 'National Institute of Genetics, Japan',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/~oogasawa/nigsc/',
    i18n:{
        defaultLocale: 'ja',
        locales: ['ja', 'en'],
    },
    plugins: [[require.resolve('docusaurus-lunr-search'), {
        languages: ['ja', 'en']
    }]],
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'oogasawa', // Usually your GitHub org/user name.
    projectName: 'nigsc_homepage2', // Usually your repo name.
    themeConfig: {
        colorMode: {
            disableSwitch: true,
        },
        navbar: {
            title: 'NIG Supercomputer',
            logo: {
                alt: 'NIGSC Logo',
                src: 'img/nigsc_logo.png',
            },
            items: [
                {
                    to: "guides/divisions",
                    docId: 'divisions',
                    position: 'left',
                    label: '利用案内',
                }, 
                {
                    to: 'application/application',
                    docId: 'application',
                    position: 'left',
                    label: '利用申請等',
                },
                {
                    to: 'advanced_guides/advanced_guide',
                    docId: 'advanced_guide',
                    position: 'left',
                    label: '活用方法',
                },
                {
                    to: 'operation/operation',
                    docId: 'operation',
                    position: 'left',
                    label: '稼働状況',
                },
                {
                    to: 'report/report_2020',
                    docId: 'report_2020',
                    position: 'left',
                    label: '成果報告',
                },
                {
                    type: 'localeDropdown',
                    position: 'right',
                }

            ],
        },
        footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Top',
              to: 'top',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
   prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
        {
            theme: {
                customCss: [require.resolve('./src/css/custom.css')],
            },
            
        docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            showLastUpdateTime: true,
            routeBasePath: '/',
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
