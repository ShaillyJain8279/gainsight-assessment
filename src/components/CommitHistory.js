import { useCallback, useEffect, useState } from "react";
import FetchCommitService from "../service/FetchCommitService";

// displays the commit history
export default function CommitHistory(props) {
    const [commits, setCommits] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    const fetchCommits = useCallback(() => {
        FetchCommitService.fetchCommits({
            ...props,
            page,
        }).then(setCommits)
        .catch(setError);
    }, [props, page]);

    useEffect(() => {
        fetchCommits();
    }, [fetchCommits]);

    return (
        <div className="commit-history-container">
            {JSON.stringify(commits)};
        </div>
    );
};