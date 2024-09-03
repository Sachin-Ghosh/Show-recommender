
import { useState, useEffect } from 'react';
import ShowCard from '../components/ShowCard';
import Layout from '@/components/Layout';

export default function Home() {
  const [shows, setShows] = useState([]);

  async function fetchData() {
    let res = await fetch('https://api.tvmaze.com/shows');
    let data = await res.json();
    console.log(data[0]);
    setShows(data);
  }

  useEffect(function () {
    fetchData();
  }, []);

  return (
    <Layout title="Show List">
      <div>
        <div className="flex flex-wrap">
          {shows.map((show) => (
            <div key={show.id} className="m-4">
              <ShowCard show={show} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
