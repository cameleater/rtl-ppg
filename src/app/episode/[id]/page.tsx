"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/episode.module.scss";
import type { Episode } from "@/types/tvmaze";
import { FaBackward } from "react-icons/fa";

interface EpisodeDetailsProps {
  params: {
    id: string;
  };
}

export default function EpisodeDetails({ params }: EpisodeDetailsProps) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await fetch(
          `https://api.tvmaze.com/episodes/${params.id}`
        );
        const data: Episode = await response.json();
        setEpisode(data);
      } catch (error) {
        console.error("Failed to fetch episode:", error);
      }
    };

    fetchEpisode();
  }, [params.id]);

  if (!episode) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        <FaBackward /> Back to Show
      </button>

      <div className={styles.episode}>
        <h1>{episode.name}</h1>

        <div className={styles.metadata}>
          <span>Season {episode.season}</span>
          <span>Episode {episode.number}</span>
        </div>

        {episode.image && (
          <div className={styles.imageWrapper}>
            <Image
              src={episode.image.original}
              alt={episode.name}
              width={800}
              height={600}
              className={styles.image}
              priority
            />
          </div>
        )}

        {episode.summary && (
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: episode.summary }}
          />
        )}
      </div>
    </div>
  );
}
