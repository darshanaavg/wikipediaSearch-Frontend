import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
  store: service(),
  model() {
    const store = this.get('store');
    return store.findAll('list');
  }
});

// @RequestMapping(value = "/wiki/move", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
// 	@ResponseBody
// 	public Map loadWikipediaContentsToES(@RequestBody String text) {

// 		wikipediaContentService wikiService = new wikipediaContentService();

// 		String message = wikiService.loadWikipediaContentsToES(text);

// 		return Collections.singletonMap("response", message);

// 	}