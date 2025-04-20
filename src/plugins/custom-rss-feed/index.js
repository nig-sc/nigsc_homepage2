const fs = require('fs');
const path = require('path');
const { Feed } = require('feed');

// ✅ 指定したディレクトリ以下の Markdown (.md, .mdx) を **再帰的に** 取得する関数
function getAllMarkdownFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) {
    return results;
  }

  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      // 📂 サブディレクトリを再帰的に探索
      results = results.concat(getAllMarkdownFilesRecursively(fullPath));
    } else if (file.isFile() && (file.name.endsWith('.md') || file.name.endsWith('.mdx'))) {
      // ✅ Markdown ファイルを取得
      results.push(fullPath);
    }
  });

  return results;
}

module.exports = function customRSSPlugin(context, options) {
  return {
    name: 'custom-rss-plugin',
    async postBuild({ outDir, siteConfig, routes }) {
      const baseUrl = siteConfig.url;
      const languages = ['ja', 'en']; // サポートする言語
      const defaultLang = 'ja'; // デフォルト言語

      console.log("🚀 Starting RSS Feed Generation...");

      // Docusaurus のプロジェクトルートを取得
      const siteDir = context.siteDir;

      languages.forEach((lang) => {
        console.log(`🔹 Processing RSS for language: ${lang}`);

        const feed = new Feed({
          title: `${siteConfig.title} (${lang.toUpperCase()})`,
          description: siteConfig.tagline,
          id: `${baseUrl}/${lang}`,
          link: `${baseUrl}/${lang}`,
          language: lang,
          favicon: `${baseUrl}/favicon.ico`,
          copyright: `© ${new Date().getFullYear()} ${siteConfig.title}`,
        });

        // 📌 `docs/` の情報を取得（再帰的に検索）
        const docsDir = lang === defaultLang
          ? path.join(siteDir, 'docs') 
          : path.join(siteDir, `i18n/${lang}/docusaurus-plugin-content-docs/current`);

        console.log(`📖 Looking for Docs in: ${docsDir}`);

        if (!fs.existsSync(docsDir)) {
          console.warn(`⚠️ Docs directory not found: ${docsDir}`);
        } else {
          console.log(`✅ Found Docs directory: ${docsDir}`);

          // 📂 **サブディレクトリも含めた全 Markdown ファイルを取得**
          const markdownFiles = getAllMarkdownFilesRecursively(docsDir);

          if (markdownFiles.length === 0) {
            console.warn(`⚠️ No Markdown files found in: ${docsDir}`);
          } else {
            console.log(`📄 Found ${markdownFiles.length} Markdown files in Docs directory`);
          }

          markdownFiles.forEach((filePath) => {
            console.log(`📄 Parsing Docs Markdown file: ${filePath}`);

            const content = fs.readFileSync(filePath, 'utf-8');

            // description の取得（フロントマター or 最初の段落）
            let description = "";
            const matchDescription = content.match(/description:\s*["']?(.*?)["']?\n/);
            if (matchDescription) {
              description = matchDescription[1];
            } else {
              const firstParagraph = content.split("\n\n")[1]; // 最初の段落を取得
              description = firstParagraph ? firstParagraph.substring(0, 200) + "..." : "No description available.";
            }

            // タイトルの取得
            const titleMatch = content.match(/title:\s*["']?(.*?)["']?\n/);
            const title = titleMatch ? titleMatch[1] : path.basename(filePath).replace(/\.mdx?$/, '').replace(/_/g, ' ');
            const relativePath = path.relative(docsDir, filePath).replace(/\.mdx?$/, '');
            const url = `${baseUrl}/docs/${relativePath}`;

            feed.addItem({
              title: title,
              id: url,
              link: url,
              description: description,
              date: new Date(),
            });
          });
        }

        // 📌 `blog/` の情報を取得
        const blogDir = lang === defaultLang 
          ? path.join(siteDir, 'blog') 
          : path.join(siteDir, `i18n/${lang}/docusaurus-plugin-content-blog`);

        console.log(`📝 Looking for Blog in: ${blogDir}`);

        if (!fs.existsSync(blogDir)) {
          console.warn(`⚠️ Blog directory not found: ${blogDir}`);
        } else {
          console.log(`✅ Found Blog directory: ${blogDir}`);

          const files = fs.readdirSync(blogDir);
          files.forEach((file) => {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
              const filePath = path.join(blogDir, file);
              console.log(`📰 Parsing Blog Markdown file: ${filePath}`);

              const content = fs.readFileSync(filePath, 'utf-8');

              // description の取得（フロントマター or 最初の段落）
              let description = "";
              const matchDescription = content.match(/description:\s*["']?(.*?)["']?\n/);
              if (matchDescription) {
                description = matchDescription[1];
              } else {
                const firstParagraph = content.split("\n\n")[1]; // 最初の段落を取得
                description = firstParagraph ? firstParagraph.substring(0, 200) + "..." : "No description available.";
              }

              // タイトルの取得
              const titleMatch = content.match(/title:\s*["']?(.*?)["']?\n/);
              const title = titleMatch ? titleMatch[1] : file.replace(/\.mdx?$/, '');
              const url = `${baseUrl}/${lang}/blog/${file.replace(/\.mdx?$/, '')}`;

              feed.addItem({
                title: title,
                id: url,
                link: url,
                description: description,
                date: fs.statSync(filePath).mtime,
              });
            }
          });
        }

        // RSS ファイルを書き出す
        const rssFileName = lang === defaultLang ? 'rss.xml' : `rss-${lang}.xml`;
        console.log(`📂 Writing RSS file: ${path.join(outDir, rssFileName)}`);
        fs.writeFileSync(path.join(outDir, rssFileName), feed.rss2());
      });

      console.log("🎉 RSS Feed Generation Completed!");
    },
  };
};
