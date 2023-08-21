const memoStore = {
  namespaced: true,
  state: {
      workspaceList: [],
  },
  getters: {
    getWorkspaceList: state => state.workspaceList,
  },
  mutations: {
      setWorkspaceList: (state, value) => state.workspaceList = value,
  },
}

export default memoStore