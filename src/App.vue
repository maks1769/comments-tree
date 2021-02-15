<template>
  <div id="app">
    <ul class="list"
        v-for="(item, index) in comments"
        :key="index"
    >
      <CommentItem :comment="item"/>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CommentItem from './components/CommentItem.vue';

export default {
  name: 'App',

  components: {
    CommentItem,
  },

  computed: mapState([
    'comments',
  ]),

  async created() {
    if (localStorage.getItem("localComments") !== null) {
      await this.$store.dispatch('getLocalComments');
    } else {
      await this.$store.dispatch('fetchComments');
    }
  },
}
</script>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: whitesmoke;
  color: #2c3e50;
}

#app {
  overflow: hidden;
}

.list {
  list-style-type: none;

  &__item {
    padding: 5px;
  }

  &__text {
    position: relative;

    &:before {
      position: absolute;
      content: '';
      top: calc(50% - 1px / 2);
      left: -200px;
      height: 1px;
      width: 200px;
      background-color: #2c3e50;
    }
  }

  &__input {
    background-color: lightgrey;
    border: none;
    padding: 9px;
    border-radius: 5px;
    font-size: 16px;
  }

  &__btn {
    background-color: transparent;
    border: 2px solid;
    border-radius: 5px;
    padding: 7px;
    transition: .3s;
    margin: 0 5px;
    width: 70px;

    &.remove {
      border-color: red;

      &:hover {
        background-color: red;
      }
    }

    &.edit {
      border-color: blue;

      &:hover {
        background-color: blue;
      }
    }

    &:hover {
      color: white;
      transition: .3s;
      cursor: pointer;
    }
  }
}
</style>
