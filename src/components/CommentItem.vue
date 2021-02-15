<template>
  <li class="list__item">
    <input class="list__input"
           v-if="isShown"
           v-model="comment.text"
    >
    <span class="list__text"
          v-else
          @click="setBlur"
          v-tooltip="'click to edit'"
    >
      {{comment.text}}
    </span>
    <button class="list__btn edit"
        v-if="isShown"
        @click="editItem()"
    >
      Edit
    </button>
    <button class="list__btn remove"
            @click="deleteItem(comment.id)"
    >
      Delete
    </button>

    <ul class="list"
        v-if="comment.children"
    >
      <CommentItem v-for="(item, index) in comment.children"
                   :comment="item"
                   :key="index"
      />
    </ul>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CommentItem",

  data() {
    return {
      isShown: false,
    }
  },

  props: {
    comment: Object,
  },

  computed: mapState([
    'comments',
  ]),

  methods:{
    deleteItem(index) {
      this.$store.dispatch('updateComments', this.filteredItem(this.comments, index))
    },

    editItem() {
      this.isShown = false;
      this.$store.dispatch('updateComments', this.comments)
    },

    filteredItem(data, id) {
      return data.filter(item => {
        if (item.children) {
          item.children = this.filteredItem(item.children, id);
        }
        return item.id !== id
      })
    },

    setBlur() {
      this.isShown = true;
    }
  },
}
</script>
