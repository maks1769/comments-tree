import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        comments: [],
        count: 0,
    },
    mutations: {
        setComments(state, items) {
            state.comments = items;
        },
    },
    actions: {
        fetchComments({state, commit}) {
            fetch('comments.json')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const setId = (object) => {
                        for (let i in object) {
                            let property = object[i];
                            if (typeof property === 'object') {
                                if (property.length === undefined) {
                                    property.id = state.count;
                                    state.count++;
                                }
                                setId(property);
                            }
                        }
                    };
                    setId(data);

                    commit('setComments', data);

                    localStorage.setItem('localComments', JSON.stringify(data));
                });
        },

        getLocalComments({commit}) {
            if (localStorage.getItem('localComments') !== null) {
                commit('setComments', JSON.parse(localStorage.getItem('localComments')));
            }
        },

        updateComments({commit}, data) {
            commit('setComments', data);
            localStorage.setItem('localComments', JSON.stringify(data));
        }
    },
});

export default store;