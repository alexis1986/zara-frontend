class ApiService {
    async getPodcasts() {
        const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`);
        const responseAsJson = await response.json();
        return responseAsJson.feed.entry.map(podcast => {                      
                        return {
                            id: podcast.id.attributes["im:id"],
                            name: podcast["im:name"].label,
                            image: podcast["im:image"][podcast["im:image"].length - 1].label,
                            author: podcast["im:artist"].label                        
                        }
                    });
    }

    async getPodcastImageUrl(podcastId) {
        const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}`);
        return response.json();
    }
}  

export default new ApiService();