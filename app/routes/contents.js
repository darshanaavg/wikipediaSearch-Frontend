import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    store: service(),
    model(params) {
        this.set('title', params.text);
        this.controllerFor('contents').send('search', this.get('title'));
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('pageTitle', this.get('title'));
        controller.set('model', model);
        controller.set('form.searchText', '');
    },
    actions: {
        loading: function () {
            let form = this.controller.get('form');
            if (form.searchText) {
                this.controllerFor('contents').send('search');
            }
        }        
    },
});
