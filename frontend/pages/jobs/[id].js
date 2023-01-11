import Layout from "../../components/layout/Layout";
import axios from "axios";
import NotFound from "../../components/layout/NotFound";

import JobDetails from "../../components/job/JobDetails";

export default function JobDeatailsPage({
  job,
  candidates,
  access_token,
  error,
}) {
  // if(error === "Not found.") return <NotFound /> // this will work  if api retrun || below code will also work
  if (error?.includes("Not found.")) return <NotFound />;

  return (
    <Layout title={job.title}>
      <JobDetails
        job={job}
        candidates={candidates}
        access_token={access_token}
      />
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  try {
    const res = await axios.get(`
        ${process.env.API_URL}api/jobs/${params.id}/`);


    const job = res.data.job;
    const candidates = res.data.candidates;

    const access_token = req.cookies.access || '';

    return {
      props: {
        job,
        candidates,
        access_token,

      },
    };
  } catch (error) {
    return {
      props: {
        error: "error.response.data.detail",
      },
    };
  }
}
