import React from 'react';

// Core leaders profile
import CoreLeader1 from './assets/core-leaders/1.jpg';
import CoreLeader2 from './assets/core-leaders/2.jpg';
import CoreLeader3 from './assets/core-leaders/3.jpg';
import CoreLeader4 from './assets/core-leaders/4.jpg';
import CoreLeader5 from './assets/core-leaders/5.jpg';
import CoreLeader6 from './assets/core-leaders/6.jpg';
// Carousel images
import CarouselImageFirst from './assets/carousel/first.jpg'
// Mission & Vision
import VisionAndMissionImage from './assets/mission-and-vision.jpg';


const carouselContent = [
  {
    id: 1,
    title: 'carousel 1',
    label: '01',
    image: CarouselImageFirst,
  },
  {
    id: 2,
    title: 'carousel 2',
    label: '02',
    image: CarouselImageFirst,
  },
  {
    id: 3,
    title: 'carousel 3',
    label: '03',
    image: CarouselImageFirst,
  },
  {
    id: 4,
    title: 'carousel 4',
    label: '04',
    image: CarouselImageFirst,
  },
];

const coreLeadersContent = [
  {
    id: 1,
    label: 'Marlon Whitehead',
    image: CoreLeader1,
  },
  {
    id: 2,
    label: 'Celia Davis',
    image: CoreLeader2,
  },
  {
    id: 3,
    label: 'Ellen Potter',
    image: CoreLeader3,
  },
  {
    id: 4,
    label: 'Zoe Manning',
    image: CoreLeader4,
  },
  {
    id: 5,
    label: 'Cade Menzie',
    image: CoreLeader5,
  },
  {
    id: 6,
    label: 'Zoe Manning',
    image: CoreLeader6,
  },
]

const missionVisionContent = {
  title: 'Mission & Vision',
  type: 'mission-vision-short',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec, ' +
    'sit euismod orci sapien consectetur donec id id sollicitudin. Blandit ' +
    'purus ipsum pretium venenatis orci, sit aliquet ac. Tincidunt commodo,' +
    ' a enim eu aenean elit enim. Egestas in tortor elementum dictum. Mus ' +
    'ut placerat ut gravida amet auctor ultricies. A vitae nulla enim mauris,' +
    ' non. Turpis varius eget scelerisque at arcu enim sollicitudin pellentesque' +
    ' id. Sit enim malesuada pretium tempor. Viverra faucibus gravida at magna' +
    '. Netus nunc venenatis diam et ultricies. Venenatis lectus lorem aliquam ' +
    'faucibus sed at.\n Iaculis at quis suspendisse ac maecenas facilisi ' +
    'tincidunt ut. Arcu in senectus amet feugiat varius.',
  image: VisionAndMissionImage,
}

// Put youtube video id's here
const prospectingVideosContent = [
  'JdRH3SNvR94',
  'JdRH3SNvR94',
  'JdRH3SNvR94',
  'JdRH3SNvR94',
  'JdRH3SNvR94',
]


export {
  carouselContent,
  coreLeadersContent,
  missionVisionContent,
  prospectingVideosContent,
};
