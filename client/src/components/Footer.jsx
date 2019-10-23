import React from 'react';

import '../css/footer.css';

function renderLinks() {
	const followInfo = [
		{ name: 'weibo', url: 'http://www.weibo.com/waterloocssa?topnav=1&wvr=5&topsug=1' },
		{ name: 'bilibili', url: 'https://space.bilibili.com/432570267' },
		{
			name: 'douyin',
			url:
				'https://www.iesdouyin.com/share/user/94903437884?u_code=14k1l9jkh&sec_uid=MS4wLjABAAAAZytH11upLDVG5Wgaxeu24wJTGiuxIBzuTZRRBSLb87Y'
		},
		{ name: 'facebook', url: 'https://www.facebook.com/UWCSSA' },
		{ name: 'youtube', url: 'https://www.youtube.com/channel/UCWX2hXnIrMP9HQ47u_Mq8hA' },
		{ name: 'instagram', url: 'https://www.instagram.com/kwcssa' }
	];
	return followInfo.map(({ name, url }) => {
		const src = `/${name}-logo.png`;
		const alt = `${name} logo`;
		return (
			<a key={name} className='col d-flex align-items-center justify-content-center follow-link' href={url}>
				<img className='footer-logos' src={src} alt={alt} />
			</a>
		);
	});
}

export default () => {
	return (
		<section className='section-wrapper mt-3'>
			<div className='container'>
				<div className='row pt-5 text-center'>
					<div className='col footer-text'>Follow Us</div>
				</div>
				<div className='row'>
					<div className='underline' />
				</div>
				<div className='row d-flex align-items-center justify-content-center'>
					<img className='footer-qrcode' src='/wechat-qrcode.jpg' alt='wechat: uWaterlooCSSA' />
				</div>
				<div className='row pb-5'>{renderLinks()}</div>
				<div className='row text-center mt-4 pb-4'>
					<div className='col copyright'>
						&copy; 2006 - 2019 &nbsp;KWCSSA &nbsp;ALL RIGHTS RESERVED &nbsp;滑铁卢-基奇纳中国学生学者联谊会 &nbsp;版权所有
					</div>
				</div>
			</div>
		</section>
	);
};
