import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NIG supercomputer',
  tagline: 'National Institute of Genetics',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  //url: 'http://localhost',
  //url: 'http://192.168.11.99',
  url: 'https://sc.ddbj.nig.ac.jp',
  
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  //baseUrl: '/~oogasawa/nigsc_homepage2/',
  baseUrl: '/',
  
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'oogasawa', // Usually your GitHub org/user name.
  projectName: 'nigsc_homepage2', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en']
  },

 plugins: [
    require.resolve('./src/plugins/custom-rss-feed'), // カスタムRSSプラグインを追加
    require.resolve('./src/plugins/custom-json-feed'), // カスタムJson Feedプラグインを追加
  ],
  
  presets: [
    [
      'classic',
      {
        docs: {
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.ts'),
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: false,
          blogSidebarCount: 0,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: 'NIG Supercomputer',
      logo: {
        alt: 'NIG supercomputer logo',
        src: 'img/nigsc_logo.png', 
      },
      items: [

        {
          type: 'doc',
          docId: 'guides/top_page/top_page', // document ID
          position: 'left',
          label: 'システム概要', // sidebar label
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'guidesSidebar',
        //   position: 'left',
        //   label: 'システム概要',
        // },
        
        {
          type: 'docSidebar',
          sidebarId: 'applicationSidebar',
          position: 'left',
          label: '各種申請等',
        },
        {
          type: 'docSidebar',
          sidebarId: 'advancedGuidesSidebar',
          position: 'left',
          label: '活用方法',
        },
        {
          type: 'docSidebar',
          sidebarId: 'operationSidebar',
          position: 'left',
          label: '稼働状況',
        },
        {
          type: 'docSidebar',
          sidebarId: 'reportSidebar',
          position: 'left',
          label: '成果報告',
        },

        
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'html',
          position: 'right',
          value: ` <a href="https://sc.ddbj.nig.ac.jp/search"><img src="https://sc.ddbj.nig.ac.jp/img/search.png" height="45" width="200" /></a>`,
        },
      ],
    },
    footer: {
      style: 'light',
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
      copyright: `Copyright © ${new Date().getFullYear()} National Institute of Genetics.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
