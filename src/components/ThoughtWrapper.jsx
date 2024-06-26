import { useEffect, useState } from "react";
import { Thought } from "./Thought";

export const ThoughtWrapper = ({ newThought }) => {
  const [thoughts, setThoughts] = useState([]);

  const API_ENDPOINT =
    "https://project-happy-thoughts-api-4mf8.onrender.com/thoughts";
  const METHOD = "GET";

  //Fetching all thoughts
  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch(API_ENDPOINT, { method: METHOD });
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setThoughts(data);
      } catch (error) {
        throw new Error("Error", error);
      }
    };

    fetchThoughts(); // Fetch when component is first mounted

    const fetchInterval = setInterval(fetchThoughts, 30000); // Fetch every 60 seconds.
    return () => {
      clearInterval(fetchInterval); // Clean up the interval when the component unmounts.
    };
  }, [newThought]);

  return (
    <section className="thought-wrapper">
      <h2>These are our happy thoughts</h2>
      {thoughts.map(thought => {
        return (
          <Thought
            key={thought._id}
            thought={thought}
          />
        );
      })}
    </section>
  );
};
