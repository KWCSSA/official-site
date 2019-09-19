import React from 'react';

import '../css/home.css';
import Footer from './Footer';

const Home = () => {
  return (
    <React.Fragment>
      <section className="home-overlay">
        <div className="overlay-mask">
          <h1 className="ml-sm-5 ml-3 home-text">滑铁卢-基奇纳</h1>
          <h1 className="ml-sm-5 ml-3 home-text">中国学生学者联谊会</h1>
          <h1 className="ml-sm-5 ml-3 home-text-eng">Kitchener-Waterloo Chinese Student & Scholars Association</h1>
        </div>
      </section>
      <section className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center"><img src="/logo.png" alt="KWCSSA logo" className="description-logo" /></div>
          <div className="col-12 col-lg-8 d-flex align-items-center justify-content-center ch-text"><h5>
            滑铁卢-基奇纳中国学生学者联谊会（简称KWCSSA）是一个独立，非营利性的服务组织。
            作为加拿大Kitchener-Waterloo地区最大以及最具有影响力的中国学生会，
            KWCSSA致力于为即将要或已经在加拿大滑铁卢学习工作的中国学生学者们提供所需的帮助和服务，丰富课余生活，
            拓展未来发展空间，同时促进中国学生学者与加拿大的文化交流与互动，帮助大家更好的融入本地社会。
            KWCSSA创办于2006年，最初宗旨是帮助中国学生们熟悉大学生活，以及给学生们的学习生活提供各种便利。
          </h5></div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default Home;