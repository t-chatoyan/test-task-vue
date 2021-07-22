const calculator = {
  namespaced: true,
  state: {
    calculatorSum: null
  },
  actions: {
    calculate: ({ commit }: any, params: any) => {
      const sum = parseInt(params.numberOne) + parseInt(params.numberTwo)
      commit('setSum', sum)
    }
  },
  mutations: {
    setSum (state: { calculatorSum: any }, data: any) {
      state.calculatorSum = data
    }
  },
  getters: {
    calculatorSum: (state: { calculatorSum: any }) => state.calculatorSum
  }
}

export default calculator
