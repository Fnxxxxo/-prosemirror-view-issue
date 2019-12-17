<template>
  <div class="container">
    <pre class="container-input" ref="editor"/>
  </div>
</template>

<script>
  import 'prosemirror-view/style/prosemirror.css'
  import { EditorState } from 'prosemirror-state'
  import { mapState } from 'vuex'
  import { schema } from 'prosemirror-schema-basic'
  import { keymap } from 'prosemirror-keymap'
  import { baseKeymap } from 'prosemirror-commands'
  import { EditorView } from 'prosemirror-view'

  export default {
    data() {
      return {
        editorView: null
      }
    },
    computed: {
      ...mapState(['viewState'])
    },
    watch: {
      viewState(val) {
        if (this.editorView) {
          this.editorView.updateState(val)
        }
      }
    },
    methods: {
      createState() {
        return EditorState.create({
          schema,
          plugins: [
            // @see http://prosemirror.net/docs/ref/#commands.baseKeymap
            keymap(baseKeymap)
          ]
        })
      }
    },
    created() {
      this.$store.commit('updateState', this.createState())
    },
    mounted() {
      // Init input element.
      const editorDom = this.$refs['editor']
      this.editorView = new EditorView(editorDom, {
        state: this.createState(),
        dispatchTransaction: (transaction) => {
          this.$store.commit('updateState', transaction)
        }
      })
    }
  }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #e0e0e0;
  }

  .container-input {
    width: 300px;
    height: 40px;
    background: #fff;
  }

  .ProseMirror {
    width: 100%;
    height: 100%;
  }
</style>
