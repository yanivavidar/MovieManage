const ProjectReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "ADD":
      return [...state, action.payload];

    case "DELETE_BY_MOVIEID":
      return state.filter((x) => x.movieID !== action.payload);

    case "DELETE_BY_MEMBERID":
      return state.filter((x) => x.memberID !== action.payload);

    default:
      return state;
  }
};

export default ProjectReducer;
