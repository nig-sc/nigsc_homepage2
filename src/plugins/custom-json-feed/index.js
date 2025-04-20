const fs = require('fs');
const path = require('path');

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

module.exports = function customJSONFeedPlugin(context, options) {
  return {
    name: 'custom-json-feed-plugin',
    async postBuild({ outDir, siteConfig }) {
      const baseUrl = siteConfig.url;
      const languages = ['ja', 'en']; // サポートする言語
      const defaultLang = 'ja'; // デフォルト言語

      console.log("🚀 Starting JSON Feed Generation...");

      // Docusaurus のプロジェクトルートを取得
      const siteDir = context.siteDir;

      languages.forEach((lang) => {
        console.log(`🔹 Processing JSON Feed for language: ${lang}`);

        const feed = {
          version: "https://jsonfeed.org/version/1.1",
          title: `${siteConfig.title} (${lang.toUpperCase()})`,
          home_page_url: `${baseUrl}/${lang}`,
          feed_url: `${baseUrl}/${lang}/feed.json`,
          description: siteConfig.tagline,
          language: lang,
          favicon: `${baseUrl}/favicon.ico`,
          items: [],
        };

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

            feed.items.push({
              id: url,
              url: url,
              title: title,
              content_text: description,
              date_published: new Date().toISOString(),
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

              feed.items.push({
                id: url,
                url: url,
                title: title,
                content_text: description,
                date_published: fs.statSync(filePath).mtime.toISOString(),
              });
            }
          });
        }

        // JSON Feed ファイルを書き出す
        const jsonFileName = lang === defaultLang ? 'feed.json' : `feed-${lang}.json`;
        console.log(`📂 Writing JSON Feed file: ${path.join(outDir, jsonFileName)}`);
        fs.writeFileSync(path.join(outDir, jsonFileName), JSON.stringify(feed, null, 2));
      });

      console.log("🎉 JSON Feed Generation Completed!");
    },
  };
};
