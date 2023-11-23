const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const { default: pluginContentBlog } = require('@docusaurus/plugin-content-blog')
const { DEFAULT_OPTIONS } = require('@docusaurus/plugin-content-blog/lib/options')

const GOOGLE_TAG_ID = 'GT-K8K7B54'

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'NIG supercomputer',
  tagline: 'National Institute of Genetics, Japan',
  url: 'https://sc.nig.ac.jp',
  baseUrl: '/',
  // url: 'http://192.168.11.50/',
  // url: 'http://133.39.114.45', 
  //baseUrl: '/~oogasawa/nigsc_homepage2/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  organizationName: 'oogasawa', // Usually your GitHub org/user name.
  projectName: 'nigsc_homepage2', // Usually your repo name.

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en']
  },

  scripts: [{
    src: '/js/google-tag-default.js'
  }, {
    async: true,
    src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`
  }, {
    src: '/js/google-tag-config.js'
  }],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        theme: {
          customCss: [require.resolve('./src/css/custom.css')]
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          routeBasePath: '/'
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: '最近のお知らせ',
          blogSidebarCount: 16
        }
      })
    ]
  ],
  themeConfig:
  ({
    navbar: {
      title: 'トップページ',
      logo: {
        alt: 'NIGSC Logo',
        src: 'img/nigsc_logo.png'
      },
      items: [
        {
          type: 'doc',
          docId: 'guides/overview',
          label: 'システム概要'
        },

        {
          type: 'doc',
          docId: 'guides/start_of_use',
          label: '利用案内'
        },
        {
          type: 'doc',
          docId: 'application/application',
          label: '利用申請等'
        },
        {
          type: 'doc',
          docId: 'advanced_guides/advanced_guide_2023',
          label: '活用方法'
        },
        // {
        //   type: 'doc',
        //   docId: 'operation/operation',
        //   label: '稼働状況'
        // },
        {
          type: 'doc',
          docId: 'report/report',
          label: '成果報告'
        },
        {
          type: 'localeDropdown',
          position: 'right'
        }
      ]
    },
    footer: {
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
            }
          ]
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
              href: 'https://www.ddbj.nig.ac.jp/dra/index.html'
            },
            {
              label: 'Japanese Genotype-phenotype Archive (JGA)',
              href: 'https://www.ddbj.nig.ac.jp/jga/index.html'
            },
            {
              label: 'Submission portal D-way',
              href: 'https://ddbj.nig.ac.jp/D-way/'
            }
          ]
        },
        {
          title: 'Supercomputer',
          items: [
            {
              label: 'NIG Supercomputer',
              href: 'https://sc.ddbj.nig.ac.jp'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} National Institute of Genetics.`
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme
    },
    colorMode: {
      disableSwitch: true
    }
  }),

  plugins: [
    [
      require.resolve('docusaurus-lunr-search'), {
        languages: ['ja', 'en']
      }
    ],
    [
      async function pluginBlogGlobalData (context, options) {
        const plugin = await pluginContentBlog(context, options)
        return {
          name: 'nigsc-plugin-blog-data',
          loadContent: plugin.loadContent,
          contentLoaded: async function contentLoaded ({ content, actions: { setGlobalData } }) {
            setGlobalData(content)
          }
        }
      }, { ...DEFAULT_OPTIONS }
    ]
  ]
}
