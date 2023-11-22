const style = document.createElement('style');
style.textContent = `
    #archive-content {
        width: 50%;
        margin: 0 auto;
    }

    #archive-content table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 1rem;
        margin-top: 30px; // 添加这一行
    }

    #archive-content th,
    #archive-content td {
        padding: 8px;
        text-align: left;
    }

    #archive-content th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    #archive-content tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    #archive-content tr:nth-child(odd) {
        background-color: #fff;
    }

    #archive-content a {
        color: inherit;
        text-decoration: none;
    }

    #archive-content h2 {
        text-align: center;
    }

    #archive-content a:hover {
        color: blue;
        cursor: pointer;
        font-weight: bold;
    }
`;
document.head.appendChild(style);


(function () {
    const archiveTab = `
        <li class="menu-item menu-item-archive">
            <a class="menu-item-link" href="javascript:void(0)" id="archive-link">Archive</a>
        </li>
    `;

    const navList = document.querySelector('.nav-list');
    navList.insertAdjacentHTML('beforeend', archiveTab);

    const archiveLink = document.getElementById('archive-link');

    const loadMDFile = async () => {
        const targetUrl = 'https://xargin-blog-crawler.pages.dev/xargin_blogs.md';
        const response = await fetch(targetUrl);
        if (response.ok) {
            // console.log('MD file fetched successfully');
            const mdText = await response.text();
            return mdText;
        } else {
            console.log('Error fetching MD file:', response.status, response.statusText);
            return '';
        }
    };
      

    const convertMDToHTML = (mdText) => {
        const converter = new showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        });
        const htmlContent = converter.makeHtml(mdText);
        return htmlContent;
    };
    

    const createArchiveContent = (htmlContent) => {
        const siteContent = document.querySelector('.site-content');
        const archiveContainer = document.createElement('div');
        archiveContainer.style.display = 'none';
        archiveContainer.id = 'archive-content';
        const title = '<h2 style="font-size: 30px; font-weight: 800; letter-spacing: -.01em; margin-bottom: 20px;">历史文章</h2>';
        const darkModeStyle = `
        <style>
            .dark-mode #archive-content {
                color: white;
            }
            // .dark-mode #archive-content tr:nth-child(even) {
            //     background-color: #2b2b2b;
            // }
            // .dark-mode #archive-content tr:nth-child(odd) {
            //     background-color: #383838;
            // }
            .dark-mode #archive-content tr:nth-child(even) {
                background-color: #20232a;
            }
            .dark-mode #archive-content tr:nth-child(odd) {
                background-color: #282c35;
            }
            .dark-mode #archive-content th {
                background-color: #20232a;
            }
            #archive-content tr:hover {
                background-color: #BEBEBE;
            }
        
            .dark-mode #archive-content tr:hover {
                background-color: #666;
            }
    </style>
        `;
        archiveContainer.innerHTML = `${darkModeStyle}${title}${htmlContent}`;
        siteContent.appendChild(archiveContainer);
        return archiveContainer;
    };
    
    

    const updatePageContent = (archiveContent) => {
        const siteContentElement = document.querySelector('.site-content');
        const contentAreaElement = siteContentElement.querySelector('.content-area');
    
        if (contentAreaElement) {
            contentAreaElement.appendChild(archiveContent);
        } else {
            console.error('Could not find the content-area element to update');
        }
    };

    const showArchive = () => {
        const mainContent = document.querySelector('.site-main');
        mainContent.style.display = 'none';

        const archiveContent = document.querySelector('#archive-content');
        archiveContent.style.display = 'block';
    };

    const hideArchive = () => {
        const mainContent = document.querySelector('.site-main');
        mainContent.style.display = 'block';

        const archiveContent = document.querySelector('#archive-content');
        archiveContent.style.display = 'none';
    };

    let isArchiveVisible = false;
    let isContentLoaded = false;

    archiveLink.addEventListener('click', async () => {
        if (!isContentLoaded) {
            const mdText = await loadMDFile();
            const htmlContent = convertMDToHTML(mdText);
            // console.log('HTML content:', htmlContent);
            
            const archiveContent = createArchiveContent(htmlContent);
            updatePageContent(archiveContent);
            isContentLoaded = true;
        }
    
        if (!isArchiveVisible) {
            showArchive();
            isArchiveVisible = true;
        } else {
            hideArchive();
            isArchiveVisible = false;
        }
    });

    document.addEventListener('DOMContentLoaded', async () => {
        console.log('Extension loaded');
        const mdText = await loadMDFile();
    
        if (mdText) {
            // console.log('MD text:', mdText);
            const htmlContent = convertMarkdownToHTML(mdText);
            // console.log('HTML content:', htmlContent);
            injectArchiveSection(htmlContent);
        } else {
            console.log('Failed to load MD file');
        }
    });

    setInterval(async () => {
        const mdText = await loadMDFile();
        const htmlContent = convertMDToHTML(mdText);
        const archiveContent = document.querySelector('#archive-content');
        if (archiveContent) {
            archiveContent.innerHTML = htmlContent;
        }
    }, 3600000);
})();
