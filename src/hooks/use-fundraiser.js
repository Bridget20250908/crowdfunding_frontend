import {useState, useEffect} from "react";

import getFundraiser from "../api/get-fundraiser";
import getUser from "../api/get-user";

export default function useFundraiser(fundraiserId) {
    const [fundraiser, setFundraiser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        let cancelled = false;

        async function loadFundraiser() {
            setIsLoading(true);
            setError(null);
            try {
                const f = await getFundraiser(fundraiserId);

                // fetch owner
                f.ownerDetails = await getUser(f.owner);

                // fetch all pledge supporters in parallel
                if (Array.isArray(f.pledges) && f.pledges.length > 0) {
                    const supporters = await Promise.all(
                        f.pledges.map((p) => getUser(p.supporter))
                    );
                    f.pledges = f.pledges.map((p, i) => ({...p, supporterDetails: supporters[i]}));
                }

                if (!cancelled) {
                    setFundraiser(f);
                }
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        if (fundraiserId) loadFundraiser();

        return () => {
            cancelled = true;
        };
    }, [fundraiserId]);

    return {fundraiser, isLoading, error};
}