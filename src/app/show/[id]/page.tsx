"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import useShowStore from "@/store/shows";
import styles from "@/styles/showDetails.module.scss";
import { FaBackward } from "react-icons/fa";

export default function ShowDetails({
  params,
}: {
  params: Promise<{ ["id"]: string }>;
}) {
  const { currentShow, episodes, setCurrentShow, setEpisodes, clearShow } =
    useShowStore();
  const router = useRouter();

  useEffect(() => {
    const fetchShowData = async () => {
      const id = (await params).id;

      try {
        const [showResponse, episodesResponse] = await Promise.all([
          fetch(`https://api.tvmaze.com/shows/${id}`),
          fetch(`https://api.tvmaze.com/shows/${id}/episodes`),
        ]);

        const showData = await showResponse.json();
        const episodesData = await episodesResponse.json();

        setCurrentShow(showData);
        setEpisodes(episodesData);
      } catch (error) {
        console.error("Failed to fetch show data:", error);
      }
    };

    fetchShowData();
    return () => clearShow();
  }, [params.id]);

  if (!currentShow) return <div>Loading...</div>;

  return (
    <div className={styles.showDetails}>
      <button onClick={() => router.back()} className={styles.backButton}>
        <FaBackward /> Back to Search
      </button>
      <div className={styles.header}>
        {currentShow.image && (
          <Image
            src={currentShow.image.original}
            alt={currentShow.name}
            width={300}
            height={400}
          />
        )}
        <div>
          <h1>{currentShow.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: currentShow.summary }} />
        </div>
      </div>

      <h2>Episodes</h2>
      <div className={styles.episodeList}>
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className={styles.episode}
            onClick={() => router.push(`/episode/${episode.id}`)}
          >
            <h3>{episode.name}</h3>
            <p>
              Season {episode.season}, Episode {episode.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
