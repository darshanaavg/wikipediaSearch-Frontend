import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    store: service(),
    model(params) {
        const store = this.get('store');
        return store.peekRecord('content', params.pageId);
    }
});