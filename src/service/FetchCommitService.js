// import necessary modules
import axios, { AxiosError } from "axios";

// class that facilitates fetching the commits
class FetchCommitService {
    // facilitates fetching the commits
    static fetchCommits = ({owner, repo, pat, branch, per_page, page}) => {
        // set default values for pagination
        if (!per_page)  per_page = 10;
        if (!page)      page = 1;
        // set the default branch is no branch is given
        if (!branch)    branch = 'main';

        // send the request
        // https://docs.github.com/en/rest/commits/commits#list-commits
        return new Promise((resolve, reject) => {
            axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}`, {
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': `Bearer ${pat}`
                }
            }).then(({data}) => {
                resolve(data);
            }).catch(err => {
                console.log(err);
                if (err instanceof AxiosError) {
                    reject({status: err.response.status, message: err.message});
                } else {                    
                    reject({status: 500, message: 'Internal Server error'});
                }
            });
        })        
    }
};

// export the class
export default FetchCommitService;