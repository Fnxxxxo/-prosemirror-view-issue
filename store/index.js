/**
 * Created by Jaron Long on 2019/12/17
 */
export const state = () => ({
  viewState: null
})

export const mutations = {
  updateState(state, transaction) {
    if (state.viewState) {
      state.viewState = state.viewState.apply(transaction)
    } else {
      state.viewState = transaction
    }
  }
}
