import React from 'react';

import '../css/footer.css';

export default () => {
  return (
    <section className="mt-5">
      <div className="container">
        <div className="row pt-5 text-center">
          <div className="col footer-text">Follow Us</div>
        </div>
        <div className="row">
          <div className="underline" />
        </div>
        <div className="row pb-5">
          <a className="col-2 d-flex align-items-center justify-content-center follow-link" href="https://open.weixin.qq.com/qr/code?username=uWaterlooCSSA">
            <img className="footer-logos" src="/wechat-logo.png" alt="wechat logo" />
          </a>
          <a className="col-2 d-flex align-items-center justify-content-center follow-link" href="http://www.weibo.com/waterloocssa?topnav=1&wvr=5&topsug=1">
            <img className="footer-logos" src="/weibo-logo.png" alt="weibo logo" />
          </a>
          <a className="col-2 d-flex align-items-center justify-content-center follow-link" href="https://google.com">
            <img className="footer-logos" src="/douyin-logo.png" alt="douyin logo" />
          </a>
          <a className="col-2 d-flex align-items-center justify-content-center follow-link" href="https://www.facebook.com/UWCSSA">
            <img className="footer-logos" src="/facebook-logo.png" alt="facebook logo" />
          </a>
          <a className="col-2 d-flex align-items-center justify-content-center follow-link" href="https://www.youtube.com/channel/UCWX2hXnIrMP9HQ47u_Mq8hA">
            <img className="footer-logos" src="/youtube-logo.png" alt="youtube logo" />
          </a>
          <a className="col-2 d-flex align-items-center justify-content-center follow-link" href="https://www.instagram.com/kwcssa">
            <img className="footer-logos" src="/instagram-logo.png" alt="instagram logo" />
          </a>
        </div>
        <div className="row text-center mt-4">
          <div className="col copyright">&copy; 2006 - 2019 &nbsp;KWCSSA &nbsp;ALL RIGHTS RESERVED &nbsp;滑铁卢-基奇纳中国学生学者联谊会 &nbsp;版权所有</div>
        </div>
      </div>
    </section>
  );
}