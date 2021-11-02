const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { default: pluginContentBlog } = require('@docusaurus/plugin-content-blog/lib');
const { DEFAULT_OPTIONS } = require('@docusaurus/plugin-content-blog/lib/pluginOptionSchema');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'NIG supercomputer',
    tagline: 'National Institute of Genetics, Japan',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    i18n:{
        defaultLocale: 'ja',
        locales: ['ja', 'en'],
    },
    plugins: [
      [require.resolve('docusaurus-lunr-search'), {
        languages: ['ja', 'en']
      }],
      [function pluginBlogGlobalData (context, options) {
        const plugin = pluginContentBlog(context, options)

        return {
          name: 'plugin-blog-global-data',
          loadContent: plugin.loadContent,
          contentLoaded: async function contentLoaded ({ content, actions: { setGlobalData } }) {
            setGlobalData(content)
          }
        }
      }, {
        ...DEFAULT_OPTIONS
      }]
    ],
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: '/img/favicon.ico',
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
                    to: "guides/overview",
                    docid: 'overview',
                    position: 'left',
                    label: '利用案内',
                },
                {
                    to: 'application/application',
                    docid: 'application',
                    position: 'left',
                    label: '利用申請等',
                },
                {
                    to: 'advanced_guides/advanced_guide',
                    docid: 'advanced_guide',
                    position: 'left',
                    label: '活用方法',
                },
                {
                    to: 'operation/operation',
                    docid: 'operation',
                    position: 'left',
                    label: '稼働状況',
                },
                {
                    to: 'report/report',
                    docid: 'report',
                    position: 'left',
                    label: '成果報告',
                },
                {
                    to: 'blog',
                    position: 'left',
                    label: 'お知らせ',
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
          title: 'Search',
          items: [
              {
                  label: 'getentry',
                  href: 'http://getentry.ddbj.nig.ac.jp/top-j.html'
              },
              {
                  label: 'ARSA',
                  href: 'https://www.ddbj.nig.ac.jp/services/arsa.html'
              },
              {
                  label: 'DRASearch',
                  href: 'https://ddbj.nig.ac.jp/DRASearch/'
              },
          ],
        },
        {
          title: 'Database',
          items: [
              {
                  label: 'Annotated/Assembled Sequences (DDBJ)',
                  href: 'https://www.ddbj.nig.ac.jp/ddbj/index.html'
              },
              {
                  label: 'Sequence Read Archive (DRA)',
                  href: 'https://www.ddbj.nig.ac.jp/dra/index.html',
              },
              {
                  label: 'Japanese Genotype-phenotype Archive (JGA)',
                  href: 'https://www.ddbj.nig.ac.jp/jga/index.html',
              },
              {
                  label: 'Submission portal D-way',
                  href: 'https://ddbj.nig.ac.jp/D-way/',
              },

          ],
        },
        {
          title: 'Supercomputer',
          items: [
            {
              label: 'NIG Supercomputer',
              href: 'https://sc.ddbj.nig.ac.jp',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} National Institute of Genetics.`,
    },
   prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic', {
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          routeBasePath: '/'
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "最近のお知らせ",
          blogSidebarCount: 16
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
