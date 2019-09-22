import React from 'react';

import '../../css/home/home.css';
import HighlightEvent from './HighlightEvent';

const Home = (props) => {
  return (
    <React.Fragment>
      <section className="home-overlay">
        <div className="overlay-mask d-flex justify-content-center">
          <h1 className="ml-sm-5 ml-3 home-text">滑铁卢-基奇纳</h1>
          <h1 className="ml-sm-5 ml-3 home-text">中国学生学者联谊会</h1>
          <h1 className="ml-sm-5 ml-3 home-text-eng">Kitchener-Waterloo Chinese Student & Scholars Association</h1>
        </div>
      </section>
      <section className="section-wrapper">
        <div className="container mt-3 mb-3 description">
          <div className="row">
            <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center"><img src="/logo.png" alt="KWCSSA logo" className="description-logo" /></div>
            <div className="col-12 d-lg-none mt-4 "></div>
            <div className="col-12 col-lg-8 d-flex align-items-center justify-content-center description-text ch-text"> {/* TODO: Make this dynamic */}
              滑铁卢基奇纳学生学者联谊会（简称KWCSSA），是KW地区唯一由中国驻多伦多领事馆认证的非营利性组织。
              滑铁卢目前有超过一万位的中国学生学者，KWCSSA的宗旨是希望通过举办各类娱乐活动、学术活动以及交流活动，缓解大家的压力丰富大家的课余生活。
              KWCSSA还拥有全加拿大最大的非营利性学生论坛-滑大论坛，滑大论坛有超过15万的注册会员，近四百万的总发帖量，是在KW地区生活的必备神器。
            </div>
          </div>
        </div>
      </section>
      <section className="section-wrapper">
        <div className="container pb-5"><HighlightEvent /></div>
      </section>
    </React.Fragment>
  );
}

export default Home;