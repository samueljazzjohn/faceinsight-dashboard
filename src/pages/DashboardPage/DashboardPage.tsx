import React, { useEffect, useState } from 'react';
import { getFacebookUserData, getPageInsights } from '../../api/facebookApi';
import withAuth from '../../auth/withAuth';
import CustomButton from '../../components/CustomButton';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: string;
  name: string;
  picture: {
    data: {
      url: string;
    };
  };
  accessToken: string;
}

interface Page {
  id: string;
  name: string;
}

const DashboardPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [pageData, setPageData] = useState<{ data: Page[] } | null>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [insightStatus, setInsightStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sinceDate, setSinceDate] = useState<string>('');
  const [untilDate, setUntilDate] = useState<string>('');
  const [submitInsightStatus, setSubmitInsightStatus] = useState<boolean>(true);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [fetchMessage, setFetchMessage] = useState<string>('');


  const navigate = useNavigate()


  const getUserData = async (accessToken: string) => {
    try {
      const res = await getFacebookUserData({ accessToken })
      setUserData({ ...res.data.profile, accessToken });
      setPageData(res.data.pages);
      setIsLoading(false);
    } catch (error) {
      navigate('/login')
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('token') || ''
    getUserData(accessToken)
  }, [])

  const fetchInsights = async () => {
    try {
      setFetchStatus(false);
      setFetchMessage('Fetching insights...');
      setSubmitInsightStatus(false)
      const res = await getPageInsights({
        accessToken: userData!.accessToken,
        pageId: selectedPage,
        userId: localStorage.getItem('userId') || '',
        since: sinceDate,
        until: untilDate
      });
      setInsights(res.data.data);
      setInsightStatus(true)
    } catch (error:any) {
      setInsightStatus(false)
      setFetchStatus(true);
      console.error('Error fetching insights', error);
      if(error?.response?.status==400){
        setFetchMessage(error.response.data.error.message);
      }else if(error?.response?.status==401){
        setFetchMessage('Session expired')
        navigate('/login')
      }
      else{
        setFetchMessage('Failed to fetch page insights');
      }
    } finally{
      setSubmitInsightStatus(true)
    }
  };

  const getInsightValue = (metricName: string) => {
    const metric = insights.find((insight) => insight.name === metricName);
    return metric ? metric.values[metric.values.length - 1].value : 'No data available';
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }


  return (
    <>
     {fetchStatus && (
                <div className={`bg-red-100 border-l-4 border-red-500 text-red-700 p-4 fixed bottom-0 w-full z-10`} role="alert">
                    <p className="font-bold">Error!</p>
                    <p>{fetchMessage}</p>
                </div>
            )}
      <div className="bg-gray-100 p-8">
        {userData && (
          <div className="flex-col justify-center items-center space-x-4 mb-6">
            <img
              src={userData.picture.data.url}
              alt={userData.name}
              className="w-16 h-16 mx-auto rounded-full shadow-lg"
            />
            <h2 className="text-3xl font-semibold text-gray-800">{userData.name}</h2>
          </div>
        )}

        {pageData && (
          <div className="mb-6 mt-8">
            <label className="block text-xl font-medium text-gray-700 mb-2">
              Select a Page
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white text-black border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setSelectedPage(e.target.value)}
              >
                <option value="" className='text-black'>Select a page</option>
                {pageData.data.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
            <label className="block text-xl font-medium text-gray-700 mb-2 mt-4">
              Select Date Range
            </label>
            <div className="flex space-x-4">
              <input
                type="date"
                className="block w-1/2 bg-white text-black border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setSinceDate(e.target.value)}
              />
              <input
                type="date"
                className="block w-1/2 bg-white text-black border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setUntilDate(e.target.value)}
              />
            </div>
            <CustomButton
              onClick={fetchInsights}
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
              {submitInsightStatus ? 'Get Insights': 'Fetching Insight...' }
            </CustomButton>
          </div>
        )}
      </div>

      {insights && insightStatus && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Total Followers / Fans</h3>
            <p className="text-lg text-gray-700">{getInsightValue('page_follows')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Total Engagement</h3>
            <p className="text-lg text-gray-700">{getInsightValue('page_post_engagements')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Total Impressions</h3>
            <p className="text-lg text-gray-700">{getInsightValue('page_impressions_unique')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Total Reactions</h3>
            <p className="text-lg text-gray-700">{getInsightValue('page_actions_post_reactions_total')}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(DashboardPage);
