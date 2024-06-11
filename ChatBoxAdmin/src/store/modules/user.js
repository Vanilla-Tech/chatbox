import axios from "axios";
import Vue from "vue";

// state
const getDefaultState = () => ({
  productList: [],
  departmentsList: [],
  userTypesList: ["AGENT", "ADMIN"],
  user: {
    id: null,
    customerImage: null,
    name: null,
    password: null,
    type: null,
    staffId: null,
    icNumber: null,
    email: null,
    departments: null,
    displayName: null,
    chatThreshold: null
  },
  title: "User",
  loader: false
});

const state = getDefaultState();

// getters
const getters = {};

// actions
const actions = {
  reset({ commit }) {
    commit("RESET_USER");
  },
  setUser({ commit }, { id }) {
    return new Promise(resolve => {
      axios.get("/users/" + id).then(response => {
        if (response.data) {
          commit("SET_USER", response.data);
        } else {
          commit("SET_USER", null);
        }
        resolve(response);
      });
    });
  },
  saveUser({ state }) {
    return new Promise(resolve => {
      var mappedDepartments = state.user.departments
        ? state.user.departments.map(x => {
          return x.id;
        })
        : [];

      const url = state.user.id == null ? "/users/createuser" : "/users/updateuser";

      axios
        .post(url, {
          id: state.user.id,
          customerImage: state.user.customerImage,
          name: state.user.name,
          type: state.user.type,
          staffId: state.user.staffId,
          icNumber: state.user.icNumber,
          email: state.user.email,
          departments: mappedDepartments,
          chatThreshold: state.user.chatThreshold,
          password: state.user.password,
          displayName: state.user.displayName
        })
        .then(response => {
          // if (response.data) {
          //   commit('SET_USER', response.data)
          // } else {
          //   commit('SET_USER', null)
          // }
          resolve(response);
        });
    });
  },
  setTitle({ commit }, { title }) {
    commit("SET_TITLE", title);
  },
  setLoader({ commit }, { loader }) {
    commit("SET_LOADER", loader);
  },
  resetUser({ commit }) {
    commit("RESET_USER", getDefaultState());
  },

  initUserAdd({ commit }, { id }) {
    var promises = [axios.get("department/list")];
    if (id) promises.push(axios.get("users/" + id));

    return new Promise(resolve => {
      axios.all(promises).then(response => {
        commit("SET_DEPARTMENTS_LIST", response[0].data);

        if (response.length == 1) return;

        var editData = response[1].data;
        var newDepartments = [];
        if (editData.departments && editData.departments.length > 0)
          editData.departments.forEach(x => {
            newDepartments.push(response[0].data.filter(a => a.id == x)[0]);
          });
        editData.departments = newDepartments;
        editData.customerImage = editData.picture;
        delete editData.picture;

        if (id != undefined) commit("SET_USER", editData);
        resolve(response);
      });
    });
  }
};

// mutations
const mutations = {
  RESET_USER(state, data) {
    Object.assign(state, data);
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_GRID_USER(state, gridData) {
    state.kendo.gridData = gridData;
  },
  SET_SOURCE_GRID_USER(state, productList) {
    state.productList = productList;
  },
  SET_USER_DATA(state, data) {
    state.user[data.key] = data.value;
  },
  SET_KENDO_DATA(state, data) {
    Vue.lodash.each(data, (value, key) => {
      state.kendo[key] = value;
    });
  },
  SET_TITLE(state, title) {
    state.title = title;
  },
  SET_LOADER(state, loader) {
    state.loader = loader;
  },
  SET_Filter(state, filter) {
    state.kendo.filter = filter;
  },

  SET_DEPARTMENTS_LIST(state, data) {
    state.departmentsList = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
