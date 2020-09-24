function NodeX(X) {
    let { state, mutations, actives, getters } = X
    this.state = state
    this.mutations = mutations
    this.actives = actives
    this.getters = getters
}
NodeX.prototype.mapActions = function (Arr) {

}

module.exports = NodeX