import { useState, useEffect } from "react";

import getFundraiser from "../api/get-fundraiser";
import getUser from "../api/get-user";

export default function useFundraiser(fundraiserId) {
  const [fundraiser, setFundraiser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // Here we pass the fundraiserId to the getFundraiser function.
    getFundraiser(fundraiserId)
      .then((fundraiser) => {

        getUser(fundraiser.owner)
      .then((user) => {
      fundraiser.ownerDetails=user;
      setFundraiser(fundraiser);
        setIsLoading(false);
//        setUser(user);
//        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    // This time we pass the fundraiserId to the dependency array so that the hook will re-run if the fundraiserId changes.
  }, [fundraiserId]);

  return { fundraiser, isLoading, error };
}