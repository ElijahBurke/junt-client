import React from 'react';
import './HomeInfo.scss';
import InfoItem from './InfoItem/InfoItem';
import CvImg from './CvImg.svg';
import DataImg from './DataImg.svg';

const ABTesting = {
  title: 'A/B Testing',
  body: 'Test different hypothesis to check their validity. Track different applications to see how subtle changes effect your response rates.',
  img: CvImg,
  reversed: false,
};

const ValidatedLearning = {
  title: 'Validated Learning',
  body: 'Analyse data to gain detailed insights into which changes in your strategy are yielding greater results and suggest pivots to optimise your response rate.',
  img: DataImg,
  reversed: true,
};

const infoItems = [ABTesting, ValidatedLearning];

function HomeInfo() {
  return (
    <div className="HomeInfo__home-info">
      {infoItems.map((item) => <InfoItem key={item.title} data={item} />)}
    </div>
  );
}

export default HomeInfo;
