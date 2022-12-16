import {
  FreelancerCreationAttributes,
  JobCreationAttributes,
  ProposalCreationAttributes,
  UserCreationAttributes,
} from '../../interfaces';

const users: UserCreationAttributes[] = [
  {
    email: 'ahmed@gmail.com',
    name: 'Ahmed',
    password: '$2a$12$/r.zmtkl2VHN/H8l2Tspe.Sipr3BSjW1XH71iyaehiK.gwLUWi81i', // 1234578 rounds:12
    role: 'freelancer', // 1
  },
  {
    email: 'omar@gmail.com',
    name: 'Omar',
    password: '$2a$12$ajt9EE0j6bWor63vZ6g1PepC3Y60B5ey0KqS0AHnj6Q3zRmN0/V.m', // omar123456 rounds:12
    role: 'client', // 2
  },
  {
    email: 'mohammad@gmail.com',
    name: 'Mohammad',
    password: '$2a$12$uYVCagm1jekXMnqmpDgRQeNJz.euighyJDWBmwMDkX439OJdJg61q', // mohammad123456 rounds:12
    role: 'freelancer', // 3
  },
  {
    email: 'ali@gmail.com',
    name: 'Ali',
    password: '$2a$12$XhsgeG0WhiddYr/5MphSWO5ykgaldvPNHQPP4CTpc3IHb3sTTfdz.', // ali123456 rounds:12
    role: 'client', // 4
  },
  {
    email: 'Islam@gmail.com',
    name: 'Tajkia Islam',
    password: '$2a$12$ES71.6GBjUY.nH9/UY.sJ.orrOfzLrX/sz8bwIsFkifQHldehClEq', // sanaa123456 rounds:12
    role: 'freelancer', // 5
  },
  {
    email: 'mart@gmail.com',
    name: 'Mart Biemans',
    password: '$2a$12$Yt4VmeAcI8tLA8NqYIL5quEUwrmFM9k6n5tPA2Wq0Go7clq2PM21G', // mart123456 rounds:12
    role: 'freelancer', // 6
  },
  {
    email: 'rawan@gmail.com',
    name: 'Rawan',
    password: '$2a$12$w5PjAmhjKIR/PHSrVe384eTkxbR6cWUkK4y6sMbufm/r.SS21nn.S', // rawan123456  rounds:12
    role: 'freelancer',
  },
  {
    email: 'karam@gmail.com',
    name: 'karam',
    password: '$2a$12$w5PjAmhjKIR/PHSrVe384eTkxbR6cWUkK4y6sMbufm/r.SS21nn.S', // rawan123456  rounds:12
    role: 'freelancer',
  },
];

const freelancers: FreelancerCreationAttributes[] = [
  {
    userId: 1,
    image:
      'https://i.pinimg.com/564x/fb/93/42/fb934271045db664e380178ed0517f1a.jpg',
    title: 'translator',
    major: 'Writing & Translation',
    brief:
      "<p>a German Translator.Words travel Worlds. Translators do the Driving. Your words represent you, your app, your website, your organization, your image - You couldn't risk ruining with false interpretation.</p>",
    portfolio: 'https://github.com/',
  },
  {
    userId: 3,
    image:
      'https://i.pinimg.com/564x/fb/93/42/fb934271045db664e380178ed0517f1a.jpg',
    title: 'senior full-stack web developer',
    major: 'Web Development',
    brief: '<p>I\'m experts in building Stunning User experiences.I deliver <strong> Full- stack web </strong>, <strong>mobile</strong >, and <strong> blockchain </strong> application development using </p > <ul><li>React </li><li> Firebase</li > <li>AngularJS </li><li> TypeScript</li > <li>NodeJS, Solidity, and Flutter.</li></ul >',
    portfolio: 'https://github.com/',
  },
  {
    userId: 5,
    title: 'Graphic Designer',
    image:
      'https://i.pinimg.com/564x/fb/93/42/fb934271045db664e380178ed0517f1a.jpg',
    major: 'Graphics & Design',
    brief:
      '<p>a talented graphic designer. I have a wide experience in design. With +3 years of experience in Adobe Photoshop, Illustrator and Indesign, I can help you craft your idea in an eye-catching design.</p>',
    portfolio: 'https://www.behance.net/tajkiaislam',
  },
  {
    userId: 6,
    title: 'Graphic Designer',
    image:
      'https://i.pinimg.com/564x/fb/93/42/fb934271045db664e380178ed0517f1a.jpg',
    major: 'Graphics & Design',
    brief:
      '<p>I am an Art Director, Digital Artist, Illustrator & Designer and my studio is currently located in Groningen, The Netherlands.</p>',
    portfolio:
      'https://www.behance.net/martbiemans/subscription?tracking_source=for_you&promoid=KCJMVKGL&mv=other',
  },
  {
    userId: 7,
    title: 'Talented Digital Marketer | Advertising Specialist',
    image:
      'https://i.pinimg.com/564x/fb/93/42/fb934271045db664e380178ed0517f1a.jpg',
    major: 'Digital Marketing',
    brief: '<p>From growing my own brand online over the past 7 years to launching my own social media marketing agency I know just how difficult it can be to grow an authentic, engaged community online. I offer a no hacks, no gimmicks and no nonsense approach to social media helping you deliver your brands message clearly and effectively. Resulting in growth on social and leads through to the business. I’m a specialist in instagram, tiktok and pinterest but have a vast knowledge on all other social media platforms too.</p>',
    portfolio:
      'https://www.behance.net/rawan-b977c00?tracking_source=search_users%7CrawanBehance',
  },
  {
    userId: 8,
    image:
      'https://i.pinimg.com/564x/fb/93/42/fb934271045db664e380178ed0517f1a.jpg',
    title: 'senior Mobile developer',
    major: 'Mobile Development',
    brief: '<p>Alcax Solutions Ltd. is an ISO:9001 certified software and mobile app development company having a team of 150+ highly skilled web and mobile experts (iOS, Android, React Native, Flutter, MEAN, MERN, PHP, .NET, Magento, Wordpress etc.) and a strong portfolio of delivering 1500+ web and mobile apps to 500+ clients worldwide.</p>',
    portfolio: 'https://github.com/',
  },
];

const jobs: JobCreationAttributes[] = [
  {
    title: 'Back End Developer', // 1
    description:
      '<p>We are searching for a Back End Developer to join and support our growing team to develop a mobile application. The developer must be either available for full-time or can deliver the completed tasks on time.</p>',
    category: 'Programming & Tech',
    budget: 3000,
    time: '3 months',
    isOccupied: true,
    userId: 2,
  },
  {
    title: 'full stack engineer', // 2
    description:
      '<p>Creating a bespoke online booking system with React and Netlify</p>',
    category: 'Programming & Tech',
    budget: 1500,
    time: '2 months',
    userId: 2,
    isOccupied: false,
  },
  {
    title: 'Live streaming app using nodejs', // 3
    description:
      '<p>I want a app which you can share video, screen and audio then other side users need to join and view the stream. Bare minimum just need functionality for streaming and viewing and multiple streams independently</p>',
    category: 'Programming & Tech',
    budget: 1500,
    time: '5 months',
    isOccupied: false,
    userId: 2,
  },
  {
    title: 'UI Development for mobile app (React)', // 4
    description:
      '<p>Need UI to be developed for mobile application. UI design (HTML) is ready for the same UI is to be developed in core React & not web view.Please connect for design document.</p>',
    category: 'Graphics & Design',
    budget: 500,
    time: '1 month',
    isOccupied: false,
    userId: 4,
  },
  {
    title: 'Digital Marketing/Marketing/Content Creator', // 5
    description:
      '<p>Our company has started manufacturing a new range of spray dried food ingredients. We need someone to improve market visibility of these products and attract new customers on different platforms.</p>',
    category: 'Digital Marketing',
    budget: 900,
    time: '6 months',
    isOccupied: true,
    userId: 4,
  },
  {
    title: 'I need a translator for my research', // 6
    description:
      '<p>I am working on an honors thesis discussing the influence of the American Revolution on Thaddius Kosciusko\'s political and military ideas. As I do not know Polish, I need a translated version of this document for my research. Is about 60 pages. First page is attached for reference. The document is "Can the Poles Win Independence"</p>',
    category: 'Writing & Translation',
    budget: 600,
    time: '1 month',
    isOccupied: false,
    userId: 2,
  },
  {
    title: 'I need an animator', // 7
    description:
      "<p>Hello,I'm working on a feature documentary about a late Mexican painter, sculptor and muralist. The film tells the story of his birth registry in a sequence of drawings done by the artist himself. I like to animate these pencil drawings. There are about 15 original drawings that were scanned. The total duration of the sequence is about 65 sec. I envision some sort of paper cutout style, but I'm open to collaborative work. Thanks'</p>",
    category: 'Video & Animation',
    budget: 750,
    time: '2 months',
    isOccupied: false,
    userId: 4,
  },
  {
    title: 'Project Manager/Consultant', // 8
    description:
      '<p>We are looking for a Business Project Manager or Consultant with business planning experience to help build up a startup Website Development and Marketing Company.</p>',
    category: 'Business',
    budget: 900,
    time: '3-6 months',
    isOccupied: false,
    userId: 2,
  },
  {
    // 9
    title:
      'I need someone clean up a voice recording from static noise and other background noises',
    description:
      '<p>I have voice recordings I can’t hear clearly sone words are clear I need someone boost up the voices remove static background noice so voices can clearly be herd</p>',
    category: 'Music & Audio',
    budget: 900,
    time: '2 months',
    isOccupied: false,
    userId: 4,
  },
];

const proposals: ProposalCreationAttributes[] = [
  {
    // translate job
    description:
      '<p>Hi there,We would like to translate your text from Polish to English and provide you with high quality professional translation service.We have worked on several similar projects in past. We are the leading translation agency of this website with 9 years of experience.</p>',
    attachments: 'https://www.freelancer.com/u/eTranslators?w=f&ngsw-bypass=',
    freelancerId: 1,
    isAccepted: false,
    jobId: 6,
  },
  {
    // animation job
    description:
      '<p>Hello I have reviewed your job description and completely understand your requirement for I need a cartoon/animation artist. I can start working on your project immediately.I have expertise in area of After Effects, Graphic Design, Photoshop, Animation and Logo Design</p>',
    attachments: 'https://www.freelancer.com/u/MetaDesignIndia',
    isAccepted: false,
    freelancerId: 5,
    jobId: 7,
  },
  {
    // back-end-deeveloper
    description:
      '<p>I have gone through with your job details and understood it. I am ready to join you as a Back End Developer on immediate basis .I am a professional android mobile application developer with 5+ year of experience and happy to let you know that we have right skills and experience to complete your project on time and with quality.</p>',
    attachments: 'www.vita-wunderschoen.de',
    isAccepted: false,
    freelancerId: 3,
    jobId: 8,
  },
  {
    // full-stack job
    description:
      '<p>Hi sir, Could you let me know more details about project full stack engineer.We are highly interested to work for you</p>',
    attachments:
      'https://prnt.sc/ramtyj https://prnt.sc/ra38bm https://prnt.sc/ra38mk',
    isAccepted: false,
    freelancerId: 2,
    jobId: 2,
  },
  {
    // full-stack job
    description:
      "<p>Hi Hope you are well. Here is a senior web developer who have enough experience in booking system, real estate, e-coomerce. If you hire me, I can provide the best result. If you have any figma design, it will be easy to develop but if not, it's ok. I can provide also. Hope to discuss soon. Thanks.</p>",
    attachments:
      'https://prnt.sc/ramtyj https://prnt.sc/ra38bm https://prnt.sc/ra38mk',
    isAccepted: false,
    freelancerId: 6,
    jobId: 3,
  },
  {
    // Live streaming app using nodejs
    description:
      '<p>I am Full Stack Developer. I went through your requirements and would like to discuss further regarding more specific details and requirements. I would like to inform you that me along with my team have around 5+ years of experience in Full Stack Developement and complete IT solution including Website, Ecommerce Platforms, ELearning Platforms, Single page application and Automation. We strictly follow the software development standard and and our work is client centric. We respect deadline and our work include back-end, front-end , customization website security and SEO.</p>',
    attachments: 'https://caseace.in/',
    isAccepted: true,
    freelancerId: 2,
    jobId: 1,
  },
  {
    // UI Development for mobile app (React)
    description:
      "<p>Hello, hope you're well. I have reviewed your project description and I can design an eye-catching and user-friendly interface for your app using React.js as per your requirements. The final cost and timeline will be given after the complete analysis of requirements with you.</p>",
    attachments: 'https://www.freelancer.com/u/junkyfunky',
    isAccepted: false,
    freelancerId: 3,
    jobId: 4,
  },
  {
    // UI Development for mobile app (React)
    description:
      "<p>Hello there,Good Day!As per project requirements I can develop the UI designs, do modification & new development in your project or be able to create the Website from scratch as well in React with using Redux/Material/Typescript/HTML5. As you know in Reactjs virtual DOM implementation and rendering optimizations. Migrating between React's versions is quite easy, too, you don't need to install updates one by one. I'm quite sure that I will provide you with app good performance & attractive UI/UX designs and debugging of code. Let's begin the glorious journey of working with you.I have integrated 3rd party libraries by myself in applications.</p>",
    attachments: 'Trica.co',
    isAccepted: false,
    freelancerId: 4,
    jobId: 4,
  },
  {
    // Digital Marketing/Marketing/Content Creator
    description:
      '<p>Hi Employer,I read your job posting requirements for managing your social media platforms,account,branding and promotion</p>',
    attachments: 'https://candyville.ca/',
    isAccepted: true,
    freelancerId: 5,
    jobId: 5,
  },
];

export {
  users, freelancers, jobs, proposals,
};
