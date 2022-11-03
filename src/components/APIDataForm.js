// import required modules
import { useForm } from "react-hook-form";
import './APIDataForm.css';

// the form is presented to retrieve the basic information needed 
// to fetch the list of commits
// for the GitHub API
// https://docs.github.com/en/rest/commits/commits#list-commits
export default function APIDataForm(props) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        if (errors && Object.keys(errors).length > 0) return;
        props.setUserData(data);
    }

    return (
        <div className="api-data-form-container">
            <div>
                <h1 className="text-center">Fill out this form to get started!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='border rounded p-5'>
                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="owner">Owner</label>
                            <input type="text" id="owner" className="form-control" placeholder="OWNER"
                                defaultValue={'github'} {...register('owner', {
                                    required: true,
                                })}
                            />
                            {errors && errors.owner && <div className="form-text text-danger">Owner is required</div>}
                            {watch('owner') && <div className="form-text text-success">Looks good</div>}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="repo">Repository</label>
                            <input type="text" id="repo" className="form-control" placeholder="REPO"
                                defaultValue={'docs'} {...register('repo', {
                                    required: true,
                                })}
                            />
                            {errors && errors.repo && <div className="form-text text-danger">Repository is required</div>}
                            {watch('repo') && <div className="form-text text-success">Looks good</div>}
                        </div>
                    </div>
                    <div className="form-row row mt-3">
                        <div className="form-group col-md-6">
                            <label htmlFor="pat">Personal Access Token</label>
                            <input type="password" id="pat" className="form-control" placeholder="PAT"
                                defaultValue={''} {...register('pat', {
                                    required: true,
                                    pattern: /ghp_[A-Za-z0-9{36}]/
                                })}
                            />
                            {errors && errors.pat && (
                                errors.pat.type === 'required' ? 
                                <div className="form-text text-danger">PAT is required</div>
                                :  <div className="form-text text-danger">Incorrect pattern for PAT</div>
                            )}
                            {watch('pat') && !errors.pat && <div className="form-text text-success">Looks good</div>}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="branch">Branch</label>
                            <input type="text" id="branch" className="form-control" placeholder="main"
                                defaultValue={'main'} {...register('branch', {
                                    required: true,
                                })}
                            />
                            {errors && errors.branch && <div className="form-text text-danger">Branch is required</div>}
                            {watch('branch') && <div className="form-text text-success">Looks good</div>}
                        </div>
                    </div>
                    <div className="form-row mt-3">
                        <button type="submit" className="btn btn-success w-100">Launch</button>
                    </div>
                </form>
                </div>
        </div>
    )
};