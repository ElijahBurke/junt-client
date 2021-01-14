const initialState = {
  showSideNav: false,
  user: {
    id: 0,
    name: false,
    email: false,
  },
  error: '',
  tests: [
    // {
    //   id: 0,
    //   name: '',
    //   desc: '',
    //   cover: '',
    //   // applicationIds: [],
    // },
  ],
  // can we make tests an object with ids as key?
  application: {},
};

export default initialState;
