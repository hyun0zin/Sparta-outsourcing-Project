const apiKey = import.meta.env.VITE_APP_YOUTUBE_API_KEY;
const searchKeyWordFields = 'items(snippet(channelId))';
const videoSnippetFields = 'items(snippet(channelId,channelTitle,thumbnails(standard)))';
const channelStatisticsFields = 'items(statistics(subscriberCount,videoCount,viewCount))';
const channelSnippetStatisticsFields =
  'items(snippet(title,description,thumbnails(medium(url))),statistics(subscriberCount,videoCount,viewCount))';

const request = {
  getSearchKeyWord: `/search?part=snippet&type=video&order=viewCount&fields=${searchKeyWordFields}&regionCode=KR&key=${apiKey}`,
  getMostPopularVideos: `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${apiKey}`,
  getByChannelId: `/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=${apiKey}`,
  getVidoeId: `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${apiKey}`,
  getI18nRegions: `/i18nRegions?part=snippet&hl=es_MX&key=${apiKey}`,
  getChannelBannerURL: (channelId) => `/channels?part=brandingSettings&id=${channelId}&key=${apiKey}`,

  getVideoSnippet: `/videos?part=snippet&fields=${videoSnippetFields}&key=${apiKey}`,
  getChannelStatistics: `/channels?part=statistics&fields=${channelStatisticsFields}&key=${apiKey}`,
  getChannelSnippetStatistics: `/channels?part=snippet,statistics&fields=${channelSnippetStatisticsFields}&key=${apiKey}`,
  getLikedAndCommentApi: `/videos?part=snippet%2Cstatistics&key=${apiKey}`
};

export default request;
