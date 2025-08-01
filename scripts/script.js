// set date values on footer

var URL
// handle case where no index.html is specified in url
if (document.URL.split("/").slice(-2)[0] =='derbyshire' &
    document.URL.split("/").slice(-1)[0] == '') {
    URL = "index.html"
}
else {
    URL = document.URL.split("/").slice(-1)[0]
}


async function displayNewsIfValid() {
    try {
        const response = await fetch('content/news.txt');
        if (!response.ok) throw new Error('Failed to fetch news.txt');

        const text = await response.text();
        const lines = text.trim().split('\n');

        const today = new Date();
        const newsItemContainer = document.querySelector('.news-list');

        if (!newsItemContainer) {
            console.warn('No element with class "news-list" found.');
            return;
        }

        let newsItemDisplayed = false;

        for (let line of lines) {
            const [dateStr, message] = line.split(',,');
            const newsDate = new Date(dateStr.trim());

            if (today <= newsDate) {
                const newsItem = document.createElement('li');
                newsItem.classList.add('news-item')
                newsItem.innerHTML = message.trim();
                newsItemContainer.appendChild(newsItem);
                newsItemDisplayed = true;
            }
        }

        if (!newsItemDisplayed) {
            document.querySelector('.news-header').style.display = 'none';
        }
    } catch (err) {
        console.error('Error displaying banner:', err);
    }
}

async function displayBannerIfValid() {
    try {
        const response = await fetch('content/banner.txt');
        if (!response.ok) throw new Error('Failed to fetch banner.txt');

        const text = await response.text();
        const lines = text.trim().split('\n');

        const today = new Date();
        const bannerContainer = document.querySelector('.banner');

        if (!bannerContainer) {
            console.warn('No element with class "banner" found.');
            return;
        }

        let bannerDisplayed = false;

        for (let line of lines) {
            const [dateStr, message] = line.split(',,');
            const bannerDate = new Date(dateStr.trim());

            if (today <= bannerDate) {
                const banner = document.createElement('div');
                banner.innerHTML = message.trim();
                banner.style.cssText = `
                    background-color:rgb(248, 159, 152);
                    color:rgb(18, 77, 128)
                    padding: 10px;
                    text-align: center;
                    font-weight: bold;
                    border: 1px solid #ccc;
                `;
                bannerContainer.appendChild(banner);
                bannerDisplayed = true;

            }
        }

        if (!bannerDisplayed) {
            bannerContainer.style.display = 'none';
        }
    } catch (err) {
        console.error('Error displaying banner:', err);
    }
}