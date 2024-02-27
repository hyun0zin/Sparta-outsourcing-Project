import styled from 'styled-components';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { getBanner, getMostChannelInfo } from '../../api/dataApi';
import { useParams } from 'react-router-dom';
import RecentVideo from './RecentVideo';
import Loading from '../layout/Loading';
import { useQuery } from '@tanstack/react-query';
import { useChannelDetailInfo } from '../../hooks/useChannelDetailInfo';
import VideoInfoGraph from './VideoInfoGraph';

export default function Detail() {
  const params = useParams();
  const channelId = params.id;

  // const [detailInfo, setDetailInfo] = useState(null);

  // channelId로 채널 정보 데이터 불러오기
  // const {
  //   data: channelInfo,
  //   isLoading: isChannelInfoLoading,
  //   error: channelInfoError
  // } = useQuery({
  //   queryKey: ['channelInfo', channelId],
  //   queryFn: () => getChannelInfoById(channelId)
  // });

  const {
    data: channelInfo,
    isLoading: isChannelInfoLoading,
    error: channelInfoError
  } = useChannelDetailInfo(channelId);

  // 댓글수, 좋아요 수 불러오기 -> React Query로 => 아직 X
  // const {
  //   data: detailInfo,
  //   isLoading: isDetailInfoLoading,
  //   error: detailInfoError
  // } = useQuery({
  //   queryKey: ['detailInfo', ],
  //   queryFn: () => getDetailDataApi('OzHPMTZXs8U') // videoId
  // });

  // console.log(detailInfo);

  // banner url 불러오기 -> React Query로
  const {
    data: bannerUrl,
    isLoading: isBannerUrlLoading,
    error: bannerUrlError
  } = useQuery({
    queryKey: ['bannerUrl', channelId, channelInfo],
    queryFn: () => getBanner(channelId)
  });

  const formattedBannerUrl = `${bannerUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`;

  // 채널 방문 link 불러오기 -> React Query로
  const {
    data: channelLink,
    isLoading: isChannelLinkLoading,
    error: channelLinkError
  } = useQuery({
    queryKey: ['channelLink', channelId],
    queryFn: () => getMostChannelInfo(channelId)
  });

  // 채널 방문 버튼 클릭시, 채널 페이지로 이동

  const onChannelBtnClickHandler = () => {
    const youtubeURL = `https://www.youtube.com/${channelLink}`;
    window.open(youtubeURL, '_blank');
  };

  // 평균 좋아요수, 댓글수 불러오기

  if (isChannelInfoLoading || isBannerUrlLoading || isChannelLinkLoading) return <Loading />;
  if (channelInfoError || bannerUrlError || channelLinkError)
    return <div>Error: {channelInfoError?.message || bannerUrlError?.message || channelLinkError?.message}</div>;

  return (
    <Wrap>
      <Header />
      <BannerContainer>{bannerUrl ? <BannerImage src={formattedBannerUrl} alt="Banner Image" /> : ''}</BannerContainer>
      <BottomContainer>
        <DetailInfoContainer>
          <ProfileContainer>
            <ProfileImage src={channelInfo?.thumbnailUrl} alt="Channel Thumbnail" />
            {channelInfo && (
              <>
                <YoutuberTitle>{channelInfo.channelTitle}</YoutuberTitle>
                <Text>구독자 {channelInfo.subscriberCount}</Text>
                <Text>영상 평균 조회수 {channelInfo.averageViewCount}</Text>
              </>
            )}
          </ProfileContainer>
          {channelInfo && (
            <>
              <ChannelDescription> {channelInfo.description} </ChannelDescription>
            </>
          )}
          <LinkToChannel onClick={onChannelBtnClickHandler}>채널 방문</LinkToChannel>
          <GraphContainer>
            <Graph>
              <VideoInfoGraph channelId={channelId} />
            </Graph>
            <Table>
              테이블 자리
              {channelInfo && (
                <>
                  <Text>구독자 수 {channelInfo.subscriberCount} 명</Text>
                  <Text>영상 평균 조회수 {channelInfo.averageViewCount} 회</Text>
                </>
              )}
              {/* {detailInfo && (
              <>
                <Text>특정 영상 좋아요 수 {detailInfo.likeCount} 개</Text>
                <Text>특정 영상 댓글 수 {detailInfo.commentCount} 개</Text>
              </>
            )} */}
            </Table>
          </GraphContainer>
          <VideoContainer>
            <RecentVideoTitle>최근 영상 </RecentVideoTitle>
            <RecentVideo channelId={channelId} />
          </VideoContainer>
        </DetailInfoContainer>
      </BottomContainer>
      <Footer />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 300px;
  background-color: #febe98; // 배너이미지가 없는 경우 배경색깔 주기
`;

const BannerImage = styled.img`
  text-align: center;
  width: 100%;
`;
const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const DetailInfoContainer = styled.div`
  width: 1920px;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  padding: 10px;
`;

const ProfileImage = styled.img`
  background-color: black;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px;
`;

const YoutuberTitle = styled.span`
  font-size: xx-large;
  font-weight: 800;
`;

const Text = styled.span`
  font-size: large;
  font-weight: 600;
`;
const ChannelDescription = styled.p`
  margin: 0 200px;
  width: 1280px;
  font-size: large;
  line-height: 1.5;
`;
const LinkToChannel = styled.button`
  width: 150px;
  border-color: transparent;
  border-radius: 10px;
  height: 40px;
  margin-left: 200px;
  margin-top: 30px;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 20px;
  margin: 0 200px;
`;

const Graph = styled.div`
  width: 50%;
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
`;

const Table = styled.div`
  width: 50%;
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const VideoContainer = styled.div`
  width: 100%;

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RecentVideoTitle = styled.div`
  font-size: larger;
  padding: 10px;
  font-weight: 600;
  width: 1280px;
`;
