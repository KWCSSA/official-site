import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../css/events/eventBanners.css';

function mapStateToProps(state) {
  return {
    event: state.event
  }
}

export default connect(mapStateToProps, null)(props => {
  const renderContent = () => {
    if (props.event) {
      const settings = {
        arrows: false,
        dots: true,
        lazyload: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true
      }
      return (
        <section className="section-wrapper top-gap">
          <div className="containers">
            <Slider className="banners" {...settings}>
              {props.event.banners.map(banner => {
                return (
                  <a href={banner.link} key={banner.id}><img src={banner.pic[props.version]} alt="" style={{ width: "100%" }} /></a>
                );
              })}
            </Slider>
          </div>
        </section>
      );
    }
  }

  return (
    <React.Fragment>{renderContent()}</React.Fragment>
  );
});