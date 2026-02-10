import {useState, useEffect} from "react";

import getPledge from "../api/get-pledge";
import getUser from "../api/get-user";

export default function usePledge(pledgeId) {
    const [pledge, setPledge] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        let cancelled = false;

        async function loadPledge() {
            setIsLoading(true);
            setError(null);
            try {
                const p = await getPledge(pledgeId);

                // fetch supported
                p.supporterDetails = await getUser(p.supporter);

                if (!cancelled) {
                    setPledge(p);
                }
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        if (pledgeId) loadPledge();

        return () => {
            cancelled = true;
        };
    }, [pledgeId]);

    return {pledge, isLoading, error};
}