const memoStore = {
  namespaced: true,
  state: {
      projectList: [],
  },
  getters: {
    getProjectList: state => state.projectList,
  },
  mutations: {
    setProjectList: (state, value) => state.projectList = value,
  },
}

export default memoStore