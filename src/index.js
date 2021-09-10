import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default function App() {
  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=tKSnBo7yu25cGc1GeR8QeNpoVTnJbxt4')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      })
      .then(data => {
        setData(data);
        console.log('ARRAY ====> ', data)
      })
      .catch(error => {
        console.error('Error fetching data', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  if (loading) return 'Loading...';
  if (error) return 'Error!!';

  return (
    <div className="container container-fluid">
      <div className="header">
        <div className="row">
          <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12"><h3>NY Times Most Popular</h3></div>
          <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6">
            <input className="search  col-md-4 col-lg-4 col-sm-6 col-xs-6" type="text" placeholder="Search..."/>
            {/* <i className="fa fa-search pull-right"></i> */}
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-12 col-sm-6 col-sx-6">
        {data.results.map(article => (<p key={article}>{article.adx_keywords}</p>))}
      </div>
    </div>
  )
}
const display =
  <div>
    <App />
  </div>

ReactDOM.render(display, document.getElementById("root"));
