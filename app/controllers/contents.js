import Controller from '@ember/controller';
import { computed } from '@ember/object';
export default Controller.extend({
    content: Ember.inject.controller(),
    hitCount: null,
    success: null,
    started: null,
    dataCount: null,
    pageSize: 25,
    fromCount: 0,
    form: computed(function () {
        return {
            searchText: ''
        }
    }),
    actions: {
        search: function (pageTitle) {
            let text = this.get('form.searchText');
            let title = this.get('pageTitle');
            let fetchObject = {
                method: 'GET'
            }
            title = title ? title : pageTitle;
            this.set('started', 1);
            let url = 'http://localhost:8080/wiki/search?text=' + title + '&from=' + this.fromCount
                + '&size=' + this.pageSize + '&searchText=' + text;
            fetch(url, fetchObject)
                .then(res => res.json())
                .then((json) => {
                    this.set('form.searchText', text);
                    this.set('started', 0);
                    this.set('hitCount', json.hitCount);
                    this.set('model', json.response);
                    if (json.response.length == 0) {
                        this.set('dataCount', 0)
                    } else {
                        this.set('dataCount', 1);
                    }
                }).catch((err) => {
                    console.error(err);
                });
        },
        showcontent: function (title, content) {
            this.get('content').send('showContent', title, content);
        },
        nextPage: function () {
            if (this.get('dataCount'))
                this.fromCount += this.get('hitCount') <= (this.fromCount + this.pageSize) ? 0 : this.pageSize;
            else
                this.fromCount += -this.pageSize;

            this.send('search', this.get('pageTitle'));
        },
        previousPage: function () {
            this.fromCount -= this.pageSize;
            this.fromCount = this.fromCount < 0 ? 0 : this.fromCount;
            this.send('search', this.get('pageTitle'));
        }
    }
});
