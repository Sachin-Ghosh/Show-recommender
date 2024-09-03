import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

export default function Page() {
  const router = useRouter();
  const [show, setShow] = useState();
  const id = router.query.id;

  const fetchShow = async () => {
    let url = "https://api.tvmaze.com/shows/" + id;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    setShow(data);
  };

  useEffect(() => {
    if (id) {
      fetchShow();
    }
  }, [id]);


  const schedule = show?.schedule;
  const days = schedule
    ? `${schedule.time} on ${schedule.days.join(", ")}`
    : "N/A";

  const externals = show?.externals;
  const tvrage = externals ? `tvrage: ${externals.tvrage}` : "N/A";
  const thetvdb = externals ? `thetvdb: ${externals.thetvdb}` : "N/A";
  const imdb = externals ? `imdb: ${externals.imdb}` : "N/A";

  return (
    <>
    <Layout title="Show Details">
        <div className="max-w-[54rem] mx-auto p-4 bg-gray-100 shadow-md rounded-md mt-4">
          {show?.image && (
            <div className="mb-4 flex justify-center">
              <img
                src={show.image.medium}
                alt={show.name}
                className="w-auto h-auto rounded-md"
              />
            </div>
          )}
          <h3 className="text-2xl font-semibold underline flex justify-center mt-8 mb-2">Name of show: {show?.name}</h3>
          <div className="text-base mt-10">
            <strong className="font-semibold ">Summary:</strong>{" "}
            {ReactHtmlParser(show?.summary)}
          </div>
          <div className="text-base mt-2 mb-2">
            <span>Language: {show?.language}</span> <br />
            <span>Genres: {show?.genres.join(", ")}</span> <br />
            <span>Runtime: {show?.runtime}</span> <br />
            <span>Rating: {show?.rating.average}</span> <br />
            <span>Schedule: {days}</span> <br />
            <span className="font-semibold">Externals:</span>
            <div className="ml-4">
              {tvrage && <div>{tvrage}</div>}
              {thetvdb && <div>{thetvdb}</div>}
              {imdb && <div>{imdb}</div>}
            </div>
          </div>
          {show?.officialSite && (
            <div className="mb-4">
              <span className="font-semibold">Official Site:</span>{" "}
              <a
                href={show.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {show.officialSite}
              </a>
            </div>
          )}
          
          {/* Render additional details based on the show ID */}
        </div>
      </Layout>
    </>
  );
}


