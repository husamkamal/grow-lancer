import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Pagination, Stack, Snackbar, Alert, TextField,
} from '@mui/material';
import { Tabs, Filter } from '../../components';
import './style.css';
import { getJobs } from '../../helpers';
import {
  JobSearch, ParamsT, TabListInt,
} from '../../interfaces';
import UserContext from '../../context';
import TabChildJobs from './tabChildJobs';

function JobsSearch() {
  const { state } = useLocation();

  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [jobsCount, setJobsCount] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [jobs, setJobs] = useState<JobSearch[]>([]);
  const [budget, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>(state?.category || '');
  const [title, setTitle] = useState<string>('');

  const { user } = useContext(UserContext);

  const changeCategory: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCategory(e.target.value);
  };
  const priceChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (Number(e.target.value) >= 0) { setPrice(Number(e.target.value)); }
  };
  const valueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const iconChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    setCategory('');
  };

  useEffect(() => {
    if (user?.major?.major && !category) {
      setCategory(user?.major?.major);
    }
  }, []);

  useEffect(() => {
    const params: ParamsT = {};

    if (budget) {
      params.budget = budget;
    }
    if (category) {
      params.category = category;
    }
    if (title) {
      params.title = title;
    }
    if (page) {
      params.page = page;
    }

    const getData = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await getJobs('/api/v1/jobs', { params });
        setLoading(false);
        const { rows, count } = data.data;
        setJobs(rows);
        setJobsCount(count);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    getData();
  }, [budget, category, title, page]);

  // tablist props
  const tablist: Array<TabListInt> = [{
    label: 'Most Popular',
    child: <TabChildJobs loading={loading} jobs={jobs} user={user} />,
  }];

  return (
    <div className="container jobs-page">
      <div className="searrchInput">
        <TextField
          className="searchInputHomePage"
          type="search"
          placeholder="search for a job"
          name="titleSearch"
          onChange={valueChange}
          variant="standard"
        />
      </div>
      <Filter
        category={category}
        changeCategory={changeCategory}
        priceChange={priceChange}
        iconChange={iconChange}
        price={budget}
      />
      <Tabs tablist={tablist} />
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(jobsCount / 5)}
          shape="rounded"
          className="pagination"
          onChange={handleChange}
        />
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={error}
          onClose={() => setError(false)}
          autoHideDuration={6000}
        >
          <Alert severity="error">
            Something went Wrong, Try Again later!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default JobsSearch;
