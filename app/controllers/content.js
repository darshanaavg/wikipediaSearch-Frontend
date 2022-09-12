import Controller from '@ember/controller';
export default Controller.extend({
    title: null,
    content: null,
    actions: {
        showContent: function (title, content) {
            this.set('title', title);
            this.set('content', content)
        }
    }
});
